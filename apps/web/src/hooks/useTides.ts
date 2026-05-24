import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useTides — fetch today's high/low tide events from NOAA
// Source: api.tidesandcurrents.noaa.gov (free, no API key, CORS-enabled)
// Station 8534720 = Atlantic City. Closest reliable tide station to LBI.
// ⚠️  Tides at Barnegat Inlet will differ by ~10–20 min from AC — refine later
//     with a Barnegat-specific station if/when one is available.
// ─────────────────────────────────────────────────────────────────────────────

export type TideEvent = {
  time: string // "4:22 AM"
  type: 'High' | 'Low'
  ft: string // "0.3ft"
}

const STATION = '8534720' // NOAA Atlantic City

function fmtDate(d: Date): string {
  // YYYYMMDD for NOAA's date params
  return (
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0')
  )
}

function fmtTime(noaaTime: string): string {
  // "2026-05-24 04:22" → "4:22 AM"
  const time = noaaTime.split(' ')[1] ?? ''
  const [hhStr, mmStr] = time.split(':')
  const hh = Number(hhStr)
  const mm = Number(mmStr)
  if (Number.isNaN(hh) || Number.isNaN(mm)) return noaaTime
  const period = hh >= 12 ? 'PM' : 'AM'
  const h12 = hh % 12 === 0 ? 12 : hh % 12
  return `${h12}:${String(mm).padStart(2, '0')} ${period}`
}

type NOAAResponse = {
  predictions?: Array<{ t: string; v: string; type: 'H' | 'L' }>
  error?: { message: string }
}

export function useTides() {
  const [tides, setTides] = useState<TideEvent[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const today = fmtDate(new Date())
    const url =
      `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter` +
      `?product=predictions&begin_date=${today}&end_date=${today}` +
      `&datum=MLLW&station=${STATION}&time_zone=lst_ldt` +
      `&units=english&interval=hilo&format=json`

    let cancelled = false

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`NOAA returned ${r.status}`)
        return r.json() as Promise<NOAAResponse>
      })
      .then((data) => {
        if (cancelled) return
        if (data.error) throw new Error(data.error.message)
        if (!data.predictions || data.predictions.length === 0) {
          throw new Error('No tide predictions returned')
        }
        const events: TideEvent[] = data.predictions.map((p) => ({
          time: fmtTime(p.t),
          type: p.type === 'H' ? 'High' : 'Low',
          ft: `${Number(p.v).toFixed(1)}ft`,
        }))
        setTides(events)
        // eslint-disable-next-line no-console
        console.log('[useTides] live NOAA tides loaded:', events)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const msg = err instanceof Error ? err.message : String(err)
        setError(msg)
        // eslint-disable-next-line no-console
        console.warn('[useTides] falling back to mock data:', msg)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { tides, error, loading: tides === null && error === null }
}
