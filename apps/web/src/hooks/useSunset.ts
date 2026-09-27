import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useSunset — today's sunset time on LBI from Open-Meteo (free, no key,
// CORS-enabled). Returned as a display string like "6:45 PM" (local time).
// ─────────────────────────────────────────────────────────────────────────────

export function useSunset(lat: number, lon: number) {
  const [sunset, setSunset] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}` +
      `&daily=sunset&timezone=America%2FNew_York&forecast_days=1`

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`Open-Meteo returned ${r.status}`)
        return r.json() as Promise<{ daily?: { sunset?: string[] } }>
      })
      .then((data) => {
        if (cancelled) return
        const iso = data.daily?.sunset?.[0] // "2026-09-27T18:45"
        const time = iso?.split('T')[1]
        if (!time) throw new Error('No sunset in Open-Meteo response')
        const [hh, mm] = time.split(':').map(Number)
        const h12 = hh % 12 === 0 ? 12 : hh % 12
        setSunset(`${h12}:${String(mm).padStart(2, '0')} ${hh >= 12 ? 'PM' : 'AM'}`)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : String(err))
      })

    return () => {
      cancelled = true
    }
  }, [lat, lon])

  return { sunset, error, loading: sunset === null && error === null }
}
