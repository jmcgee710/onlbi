import type { TideEvent } from '../hooks/useTides'

// ─── TIME HELPERS ─────────────────────────────────────────────────────────────
// Convert "4:22 AM" to fraction of day (0=midnight, 0.5=noon, 1=next midnight)
export function timeStrToFrac(s: string): number {
  const m = s.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!m) return 0
  let h = Number(m[1])
  const min = Number(m[2])
  const isPM = m[3].toUpperCase() === 'PM'
  if (isPM && h !== 12) h += 12
  if (!isPM && h === 12) h = 0
  return (h * 60 + min) / (24 * 60)
}

export function dateToFrac(d: Date): number {
  return (d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60) / (24 * 60)
}

export function fmtNowLabel(d: Date): string {
  let h = d.getHours()
  const m = d.getMinutes()
  const ampm = h >= 12 ? 'p' : 'a'
  h = h % 12 === 0 ? 12 : h % 12
  return `Now ${h}:${String(m).padStart(2, '0')}${ampm}`
}

// ─── TIDE CHART ──────────────────────────────────────────────────────────────
type TidePoint = { tFrac: number; ft: number; type: 'High' | 'Low' }

function TideChart({
  nowT,
  nowLabel,
  points,
}: {
  nowT: number
  nowLabel: string
  points: TidePoint[]
}) {
  const W = 600
  const H = 120
  const x = (t: number) => t * W

  // Normalize heights so high tides sit near the top of the chart.
  const fts = points.map((p) => p.ft)
  const minFt = Math.min(...fts) - 0.5
  const maxFt = Math.max(...fts) + 0.5
  const y = (ft: number) => {
    const norm = (ft - minFt) / (maxFt - minFt) // 0=low, 1=high
    return 14 + (1 - norm) * (H - 28)
  }

  const sorted = [...points].sort((a, b) => a.tFrac - b.tFrac)

  // Extrapolate synthetic boundary points at t=0 and t=1 so the curve spans
  // the full chart instead of stopping at the first/last real event.
  // Tide cycle is ~12.4 hours, so half-cycle ≈ 6.2 h = 0.258 day-fraction.
  // Beyond the first event (going backwards) the next opposite-type tide sat
  // ~6.2 h earlier — we use the day's avg high/low to estimate that anchor,
  // then linearly interpolate from there to the first real event at t=0.
  // Same logic forward from the last real event for t=1.
  const HALF_CYCLE = 6.2 / 24
  const highs = sorted.filter((p) => p.type === 'High')
  const lows = sorted.filter((p) => p.type === 'Low')
  const avgHigh = highs.length ? highs.reduce((s, p) => s + p.ft, 0) / highs.length : sorted[0].ft
  const avgLow = lows.length ? lows.reduce((s, p) => s + p.ft, 0) / lows.length : sorted[0].ft

  const first = sorted[0]
  const last = sorted[sorted.length - 1]
  const priorAnchorFt = first.type === 'High' ? avgLow : avgHigh
  const priorAnchorT = first.tFrac - HALF_CYCLE
  const nextAnchorFt = last.type === 'High' ? avgLow : avgHigh
  const nextAnchorT = last.tFrac + HALF_CYCLE
  const leftFt =
    priorAnchorFt + ((0 - priorAnchorT) / (first.tFrac - priorAnchorT)) * (first.ft - priorAnchorFt)
  const rightFt =
    last.ft + ((1 - last.tFrac) / (nextAnchorT - last.tFrac)) * (nextAnchorFt - last.ft)

  const padded: TidePoint[] = [
    { tFrac: 0, ft: leftFt, type: first.type },
    ...sorted,
    { tFrac: 1, ft: rightFt, type: last.type },
  ]

  // Smooth bezier curve across the padded points.
  let path = `M ${x(padded[0].tFrac)} ${y(padded[0].ft)}`
  for (let i = 1; i < padded.length; i++) {
    const p0 = padded[i - 1]
    const p1 = padded[i]
    const dx = (p1.tFrac - p0.tFrac) * W
    path += ` C ${x(p0.tFrac) + dx / 2} ${y(p0.ft)}, ${x(p1.tFrac) - dx / 2} ${y(p1.ft)}, ${x(p1.tFrac)} ${y(p1.ft)}`
  }
  const fillPath = `${path} L ${W} ${H} L 0 ${H} Z`

  // Interpolate height at `nowT` along the padded curve so the dot lands on it
  // regardless of where in the day we are.
  let nowFt = padded[0].ft
  for (let i = 1; i < padded.length; i++) {
    if (padded[i].tFrac >= nowT) {
      const p0 = padded[i - 1]
      const p1 = padded[i]
      const tt = (nowT - p0.tFrac) / (p1.tFrac - p0.tFrac)
      const e = tt * tt * (3 - 2 * tt)
      nowFt = p0.ft + (p1.ft - p0.ft) * e
      break
    }
  }

  return (
    <div className="tide-chart">
      <svg viewBox={`0 0 ${W} ${H + 8}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="tideFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B8CDC8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#B8CDC8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tideLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6B9694" />
            <stop offset="50%" stopColor="#1B3654" />
            <stop offset="100%" stopColor="#6B9694" />
          </linearGradient>
        </defs>
        <path d={fillPath} fill="url(#tideFill)" />
        <path d={path} fill="none" stroke="url(#tideLine)" strokeWidth="2" strokeLinecap="round" />
        <line x1={x(nowT)} x2={x(nowT)} y1={0} y2={H} stroke="#C45A3E" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
        <circle cx={x(nowT)} cy={y(nowFt)} r="5" fill="#C45A3E" />
        <circle cx={x(nowT)} cy={y(nowFt)} r="9" fill="#C45A3E" opacity="0.18" />
        {sorted.map((p, i) => (
          <circle
            key={i}
            cx={x(p.tFrac)}
            cy={y(p.ft) + (p.type === 'High' ? -2 : 2)}
            r="3"
            fill={p.type === 'High' ? '#6B9694' : '#1B3654'}
          />
        ))}
      </svg>
      <div className="tide-marks">
        <span>12a</span><span>4a</span><span>8a</span>
        <span style={{ color: '#C45A3E', fontWeight: 700 }}>{nowLabel}</span>
        <span>4p</span><span>8p</span><span>12a</span>
      </div>
    </div>
  )
}

// ─── TIDE CARD ───────────────────────────────────────────────────────────────
// Self-contained card for one tide station (bay or ocean). Computes its own
// chart points and "next event" highlight from the events it receives.
export default function TideCard({
  title,
  stationName,
  liveTides,
  loading,
  fallbackEvents,
  nowT,
  nowLabel,
}: {
  title: string
  stationName: string
  liveTides: TideEvent[] | null
  loading: boolean
  fallbackEvents: TideEvent[]
  nowT: number
  nowLabel: string
}) {
  const events = liveTides ?? fallbackEvents
  const tidePoints: TidePoint[] = events.map((e) => ({
    tFrac: timeStrToFrac(e.time),
    ft: parseFloat(e.ft),
    type: e.type,
  }))
  const nextEventIndex = events.findIndex((e) => timeStrToFrac(e.time) > nowT)

  return (
    <div className="card">
      <div className="card-head">
        <h2 className="card-title">{title}</h2>
        <span className="card-sub">
          {loading
            ? 'Loading…'
            : liveTides
              ? <><span className="live-pip" />Live · {stationName}</>
              : `Sample · ${stationName}`}
        </span>
      </div>
      <TideChart nowT={nowT} nowLabel={nowLabel} points={tidePoints} />
      <div className="tide-events">
        {events.map((t, i) => (
          <div key={i} className={`tide-event ${i === nextEventIndex ? 'now' : ''}`}>
            <div className="lab">{t.type}{i === nextEventIndex ? ' · Next' : ''}</div>
            <div className="time">{t.time}</div>
            <div className="ft">{t.ft}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
