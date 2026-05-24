import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useTides — fetch today's high/low tide events from NOAA
// Source: api.tidesandcurrents.noaa.gov (free, no API key, CORS-enabled)
// Pass a 7-digit NOAA station ID. Common LBI-area stations:
//   8534208  Beach Haven Coast Guard Station (bay side)
//   8534720  Atlantic City (Ocean)
//   8534048  Beach Haven Crest (LBI, likely bay side)
//   8533615  Barnegat Inlet, USCG Station (north end of LBI)
//   8534319  Tuckerton / Little Egg Inlet (south of Holgate)
// Find more at: https://tidesandcurrents.noaa.gov/map/index.html
// ─────────────────────────────────────────────────────────────────────────────

export type TideEvent = {
  time: string // "4:22 AM"
  type: 'High' | 'Low'
  ft: string // "0.3ft"
}

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

export function useTides(station: string) {
  const [tides, setTides] = useState<TideEvent[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const today = fmtDate(new Date())
    const url =
      `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter` +
      `?product=predictions&begin_date=${today}&end_date=${today}` +
      `&datum=MLLW&station=${station}&time_zone=lst_ldt` +
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
        console.log(`[useTides ${station}] live NOAA tides loaded:`, events)
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
  }, [station])

  return { tides, error, loading: tides === null && error === null }
}
