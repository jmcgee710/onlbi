import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useWaterTemp — fetch latest water temperature from a NOAA Tides & Currents
// station that reports it. Not every station has a water-temp sensor; AC
// (8534720) is the closest reliable one to LBI.
// Source: api.tidesandcurrents.noaa.gov (free, no key, CORS-enabled)
// ─────────────────────────────────────────────────────────────────────────────

export function useWaterTemp(station: string) {
  const [temp, setTemp] = useState<number | null>(null)
  const [observedAt, setObservedAt] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const url =
      `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter` +
      `?product=water_temperature&station=${station}` +
      `&date=latest&units=english&time_zone=lst_ldt&format=json`

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`NOAA water_temperature returned ${r.status}`)
        return r.json() as Promise<{
          data?: Array<{ t: string; v: string }>
          error?: { message: string }
        }>
      })
      .then((data) => {
        if (cancelled) return
        if (data.error) throw new Error(data.error.message)
        const latest = data.data?.[0]
        if (!latest?.v) throw new Error('No water temperature reading available')
        const num = parseFloat(latest.v)
        if (Number.isNaN(num)) throw new Error('Invalid water temperature value')
        setTemp(num)
        setObservedAt(latest.t)
        // eslint-disable-next-line no-console
        console.log(`[useWaterTemp ${station}] ${num}°F at ${latest.t}`)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const msg = err instanceof Error ? err.message : String(err)
        setError(msg)
        // eslint-disable-next-line no-console
        console.warn('[useWaterTemp] falling back to mock:', msg)
      })

    return () => {
      cancelled = true
    }
  }, [station])

  return { temp, observedAt, error, loading: temp === null && error === null }
}
