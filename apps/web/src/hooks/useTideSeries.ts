import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useTideSeries — yesterday → tomorrow high/low predictions for one NOAA
// station, so the homepage can draw today's full curve (midnight to midnight
// needs the events on either side) and list the next events after "now".
// Times are station-local wall clock (lst_ldt = America/New_York), kept as
// minutes from local midnight today so no browser-timezone math is involved.
// Source: api.tidesandcurrents.noaa.gov (free, no key, CORS-enabled).
// ─────────────────────────────────────────────────────────────────────────────

export type TidePoint = {
  min: number // minutes from today's local midnight (negative = yesterday)
  ft: number
  type: 'High' | 'Low'
  label: string // "4:33 PM"
}

type NoaaHilo = { predictions?: Array<{ t: string; v: string; type: 'H' | 'L' }>; error?: { message: string } }

/** Wall-clock parts for "now" in America/New_York, whatever the viewer's timezone. */
export function nyNow(d: Date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    })
      .formatToParts(d)
      .map((p) => [p.type, p.value]),
  )
  const y = Number(parts.year), m = Number(parts.month), day = Number(parts.day)
  return { y, m, day, min: Number(parts.hour) * 60 + Number(parts.minute) }
}

function ymd(y: number, m: number, d: number, offsetDays: number): string {
  const dt = new Date(Date.UTC(y, m - 1, d + offsetDays))
  return dt.toISOString().slice(0, 10).replace(/-/g, '')
}

function fmtClock(hh: number, mm: number): string {
  const ap = hh >= 12 ? 'PM' : 'AM'
  const h12 = hh % 12 === 0 ? 12 : hh % 12
  return `${h12}:${String(mm).padStart(2, '0')} ${ap}`
}

export function useTideSeries(station: string) {
  const [points, setPoints] = useState<TidePoint[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const { y, m, day } = nyNow()
    const today = ymd(y, m, day, 0)
    const url =
      `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter` +
      `?product=predictions&begin_date=${ymd(y, m, day, -1)}&end_date=${ymd(y, m, day, 1)}` +
      `&datum=MLLW&station=${station}&time_zone=lst_ldt&units=english&interval=hilo&format=json`

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`NOAA returned ${r.status}`)
        return r.json() as Promise<NoaaHilo>
      })
      .then((data) => {
        if (cancelled) return
        if (data.error) throw new Error(data.error.message)
        if (!data.predictions?.length) throw new Error('No tide predictions returned')
        const pts = data.predictions.map((p) => {
          const [date, time] = p.t.split(' ')
          const [hh, mm] = time.split(':').map(Number)
          const d = date.replace(/-/g, '')
          const dayOffset = d < today ? -1 : d > today ? 1 : 0
          return {
            min: dayOffset * 1440 + hh * 60 + mm,
            ft: Number(p.v),
            type: p.type === 'H' ? 'High' : 'Low',
            label: fmtClock(hh, mm),
          } satisfies TidePoint
        })
        setPoints(pts)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : String(err))
      })

    return () => {
      cancelled = true
    }
  }, [station])

  return { points, error, loading: points === null && error === null }
}

/** The next `n` high/low events after `nowMin`. */
export function nextTides(points: TidePoint[], nowMin: number, n = 2): TidePoint[] {
  return points.filter((p) => p.min > nowMin).slice(0, n)
}

/**
 * Polyline points for today's tide curve, cosine-interpolated between NOAA's
 * high/low predictions (the standard way to draw a tide between extremes).
 * All stations share one height scale so the bay's small range reads as small.
 */
export function tideCurve(points: TidePoint[], width = 296, height = 44, maxFt = 5.2): string {
  const out: string[] = []
  for (let min = 0; min <= 1440; min += 30) {
    const i = points.findIndex((p) => p.min > min)
    if (i <= 0) continue
    const a = points[i - 1], b = points[i]
    const f = (min - a.min) / (b.min - a.min)
    const ft = a.ft + (b.ft - a.ft) * (1 - Math.cos(Math.PI * f)) / 2
    const x = (min / 1440) * width
    const y = height - 4 - (Math.max(0, ft) / maxFt) * (height - 8)
    out.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return out.join(' ')
}
