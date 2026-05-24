import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useUV — fetch current UV index from Open-Meteo.
// Source: api.open-meteo.com (free, no API key, CORS-enabled).
// NWS doesn't expose UV in its standard forecast endpoint; Open-Meteo does.
// WHO UV scale: 0-2 Low · 3-5 Moderate · 6-7 High · 8-10 Very High · 11+ Extreme
// ─────────────────────────────────────────────────────────────────────────────

export function classifyUV(uv: number): 'Low' | 'Moderate' | 'High' | 'Very High' | 'Extreme' {
  if (uv < 3) return 'Low'
  if (uv < 6) return 'Moderate'
  if (uv < 8) return 'High'
  if (uv < 11) return 'Very High'
  return 'Extreme'
}

export function useUV(lat: number, lon: number) {
  const [uv, setUV] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}` +
      `&current=uv_index&timezone=America%2FNew_York`

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`Open-Meteo returned ${r.status}`)
        return r.json() as Promise<{ current?: { uv_index?: number } }>
      })
      .then((data) => {
        if (cancelled) return
        const val = data.current?.uv_index
        if (typeof val !== 'number') throw new Error('No UV in Open-Meteo response')
        setUV(val)
        // eslint-disable-next-line no-console
        console.log('[useUV] live UV index:', val)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const msg = err instanceof Error ? err.message : String(err)
        setError(msg)
        // eslint-disable-next-line no-console
        console.warn('[useUV] falling back to mock:', msg)
      })

    return () => {
      cancelled = true
    }
  }, [lat, lon])

  return { uv, error, loading: uv === null && error === null }
}
