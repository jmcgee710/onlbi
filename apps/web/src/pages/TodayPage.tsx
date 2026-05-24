import { useState } from 'react'
import { tideKeyTimes, forecast } from '../data/conditions'
import { beaches } from '../data/beaches'
import { todayEvents, happyHoursActive } from '../data/events'
import { useTides } from '../hooks/useTides'
import { useNow } from '../hooks/useNow'

// ─── TIME HELPERS ─────────────────────────────────────────────────────────────
// Convert "4:22 AM" to fraction of day (0=midnight, 0.5=noon, 1=next midnight)
function timeStrToFrac(s: string): number {
  const m = s.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!m) return 0
  let h = Number(m[1])
  const min = Number(m[2])
  const isPM = m[3].toUpperCase() === 'PM'
  if (isPM && h !== 12) h += 12
  if (!isPM && h === 12) h = 0
  return (h * 60 + min) / (24 * 60)
}

function dateToFrac(d: Date): number {
  return (d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60) / (24 * 60)
}

function fmtNowLabel(d: Date): string {
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

  // Smooth bezier curve through the high/low events.
  const sorted = [...points].sort((a, b) => a.tFrac - b.tFrac)
  let path = `M ${x(sorted[0].tFrac)} ${y(sorted[0].ft)}`
  for (let i = 1; i < sorted.length; i++) {
    const p0 = sorted[i - 1]
    const p1 = sorted[i]
    const dx = (p1.tFrac - p0.tFrac) * W
    path += ` C ${x(p0.tFrac) + dx / 2} ${y(p0.ft)}, ${x(p1.tFrac) - dx / 2} ${y(p1.ft)}, ${x(p1.tFrac)} ${y(p1.ft)}`
  }
  const fillPath = `${path} L ${W} ${H} L 0 ${H} Z`

  // Interpolate tide height at `nowT` along the curve so the "now" dot lands on it.
  let nowFt = sorted[0].ft
  if (nowT <= sorted[0].tFrac) {
    nowFt = sorted[0].ft
  } else if (nowT >= sorted[sorted.length - 1].tFrac) {
    nowFt = sorted[sorted.length - 1].ft
  } else {
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].tFrac >= nowT) {
        const p0 = sorted[i - 1]
        const p1 = sorted[i]
        const tt = (nowT - p0.tFrac) / (p1.tFrac - p0.tFrac)
        const e = tt * tt * (3 - 2 * tt)
        nowFt = p0.ft + (p1.ft - p0.ft) * e
        break
      }
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

// ─── FORECAST ICONS ───────────────────────────────────────────────────────────
function WeatherIcon({ type }: { type: string }) {
  if (type === 'Sun') return <span style={{ fontSize: 28 }}>☀️</span>
  if (type === 'CloudSun') return <span style={{ fontSize: 28 }}>⛅</span>
  if (type === 'Rain') return <span style={{ fontSize: 28 }}>🌧️</span>
  return <span style={{ fontSize: 28 }}>☁️</span>
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function TodayPage() {
  const [activeDay, setActiveDay] = useState(0)
  const today = forecast[0]
  const { tides: liveTides, loading: tidesLoading } = useTides()
  // Show live NOAA data when available, fall back to mock so the page never blanks
  const tideEvents = liveTides ?? tideKeyTimes

  // Live clock — re-renders every minute so the chart marker tracks real time.
  const now = useNow()
  const nowT = dateToFrac(now)
  const nowLabel = fmtNowLabel(now)

  // Parse the tide event strings into (tFrac, ft) so the chart and "next" logic
  // both work whether we're on live NOAA data or the mock fallback.
  const tidePoints: TidePoint[] = tideEvents.map((e) => ({
    tFrac: timeStrToFrac(e.time),
    ft: parseFloat(e.ft),
    type: e.type,
  }))

  // The "next" tide event = the first one whose time hasn't happened yet today.
  // -1 means all of today's events are already past (won't highlight any).
  const nextEventIndex = tideEvents.findIndex((e) => timeStrToFrac(e.time) > nowT)

  const forecastData = [
    { dow: 'Today', hi: 81, lo: 65, ico: 'Sun',      score: 88 },
    { dow: 'Sun',   hi: 78, lo: 62, ico: 'CloudSun', score: 71 },
    { dow: 'Mon',   hi: 72, lo: 60, ico: 'Rain',     score: 34 },
    { dow: 'Tue',   hi: 75, lo: 61, ico: 'Cloud',    score: 74 },
    { dow: 'Wed',   hi: 83, lo: 66, ico: 'Sun',      score: 94 },
  ]

  return (
    <div className="content">
      {/* LEFT COLUMN */}
      <div className="col">

        {/* Hero */}
        <div className="hero">
          <div className="hero-row">
            <div>
              <div className="hero-eyebrow">Long Beach Island · Saturday May 9</div>
              <h1>Today <em>on</em><br />the island.</h1>
              <div className="hero-sub">
                Clear skies and a soft southwest breeze. <strong>High tide at 10:45.</strong> The bridge is moving — go now if you're going.
              </div>
            </div>
            <div>
              <div className="hero-temps">
                <span className="big">81</span><span className="deg">°</span>
                <span className="lo">/ 65°</span>
              </div>
              <div className="hero-condition">Sunny · feels 84°</div>
            </div>
          </div>
          <div className="hero-stats">
            {[
              { label: 'Water',    val: '72', suf: '°F',  sub: 'Warming through 3 pm' },
              { label: 'Wind',     val: 'SSW 12', suf: '', sub: 'Light, steady' },
              { label: 'UV Index', val: '8', suf: '/11', sub: 'High · reapply at 1 pm' },
              { label: 'Bridge',   val: '12', suf: ' min', sub: 'Causeway · light' },
            ].map(s => (
              <div className="hero-stat" key={s.label}>
                <div className="label">{s.label}</div>
                <div className="val">{s.val}<small>{s.suf}</small></div>
                <div className="sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Happy Hour banner */}
        {happyHoursActive.length > 0 && (
          <button className="banner">
            <span className="banner-tag">Happy Hour</span>
            <span className="banner-text">
              <strong>{happyHoursActive.length} spots running deals right now</strong> — {happyHoursActive.map(h => h.name.split(' ')[0]).join(' & ')}, til 7 pm
            </span>
            <span className="banner-arrow">→</span>
          </button>
        )}

        {/* Beach Day Score */}
        <div className="card score-card">
          <div className="card-head">
            <div>
              <h2 className="card-title">Beach Day Score</h2>
              <div className="card-sub" style={{ marginTop: 4 }}>How LBI feels right now</div>
            </div>
            <button className="section-link">Methodology ↗</button>
          </div>
          <div className="score-grid">
            <div className="score-num">88<sub>/100</sub></div>
            <div className="score-meta">
              <div className="score-verdict">A great day to be on the sand.</div>
              <div className="score-bullets">
                <span>Calm SSW breeze · steady at 12 mph</span>
                <span>Water warming through afternoon</span>
                <span className="warn">UV 8 — sunscreen + reapply by 1 pm</span>
              </div>
            </div>
          </div>
          <div className="score-bar">
            <div className="score-bar-track">
              <div className="score-bar-fill" style={{ width: '88%' }} />
            </div>
            <div className="score-bar-labels">
              <span>Stormy</span><span>Decent</span><span>Great</span><span>Peak</span>
            </div>
          </div>
          <div className="rip-status">
            <span>🌊 Rip current risk · <strong>Low across the island</strong></span>
            <span style={{ fontSize: 11, opacity: 0.7, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Updated 8:42 am</span>
          </div>
        </div>

        {/* Tides */}
        <div className="card">
          <div className="card-head">
            <h2 className="card-title">Today's Tides</h2>
            <span className="card-sub">
              {tidesLoading
                ? 'Loading…'
                : liveTides
                  ? '🟢 Live · NOAA Atlantic City'
                  : 'Sample data'}
            </span>
          </div>
          <TideChart nowT={nowT} nowLabel={nowLabel} points={tidePoints} />
          <div className="tide-events">
            {tideEvents.map((t, i) => (
              <div key={i} className={`tide-event ${i === nextEventIndex ? 'now' : ''}`}>
                <div className="lab">{t.type}{i === nextEventIndex ? ' · Next' : ''}</div>
                <div className="time">{t.time}</div>
                <div className="ft">{t.ft}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Forecast */}
        <div className="card">
          <div className="card-head">
            <h2 className="card-title">Five-day outlook</h2>
            <button className="section-link">Hourly →</button>
          </div>
          <div className="forecast">
            {forecastData.map((d, i) => (
              <div key={d.dow} className={`day ${i === activeDay ? 'active' : ''}`} onClick={() => setActiveDay(i)}>
                <div className="dow">{d.dow}</div>
                <div className="ico"><WeatherIcon type={d.ico} /></div>
                <div className="hi">{d.hi}°</div>
                <div className="lo">{d.lo}°</div>
                <div className="scorechip">{d.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="col">

        {/* Metrics */}
        <div className="metrics">
          {[
            { ico: '🌉', val: '12', suf: ' min', lab: 'Bridge wait' },
            { ico: '🌊', val: '72', suf: '°',    lab: 'Water temp' },
            { ico: '☀️', val: '8',  suf: '',      lab: 'UV index · high' },
            { ico: '🏖️', val: '6/6', suf: '',    lab: 'Beaches open' },
          ].map((m, i) => (
            <div className="metric" key={i}>
              <div className="metric-ico"><span style={{ fontSize: 18 }}>{m.ico}</span></div>
              <div>
                <div className="metric-val">{m.val}<small>{m.suf && ' ' + m.suf}</small></div>
                <div className="metric-lab">{m.lab}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Beach status */}
        <div className="card">
          <div className="card-head">
            <h2 className="card-title">Beach status</h2>
            <button className="section-link">All beaches →</button>
          </div>
          <div className="beaches">
            {beaches.map((b, i) => (
              <div className="beach" key={i}>
                <span className={`beach-status ${b.status === 'amber' ? 'warn' : ''}`} />
                <div className="beach-name">
                  {b.name}
                  {b.badge && (
                    <span className={`beach-tag ${b.badge.includes('Best') ? 'best' : b.badge.includes('Rip') ? 'rip' : b.badge.includes('Choppy') ? 'choppy' : 'wild'}`}>
                      {b.badge.replace(/[^\w\s]/g, '').trim()}
                    </span>
                  )}
                </div>
                <div className="beach-temp">{b.temp ? `${b.temp.replace('°F', '')}°` : '—'}</div>
                <div className="beach-go">→</div>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div className="card">
          <div className="card-head">
            <h2 className="card-title">Happening today</h2>
            <button className="section-link">Full calendar →</button>
          </div>
          <div className="events">
            {todayEvents.map((e, i) => {
              const hour = e.time.match(/^(\d+)/)?.[1] ?? '?'
              const ap = e.time.toLowerCase().includes('pm') ? 'pm' : 'am'
              return (
                <div className="event" key={i}>
                  <div className="event-time">
                    <span className="h">{hour}</span>
                    <span className="ap">{ap}</span>
                  </div>
                  <div>
                    <div className="event-title">{e.title}</div>
                    <div className="event-meta">{e.venue} · {e.time}</div>
                  </div>
                  <span className={`event-price ${e.free ? 'free' : ''}`}>{e.free ? 'Free' : e.price}</span>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
