import { useState } from 'react'
import { tideKeyTimes, forecast } from '../data/conditions'
import { beaches } from '../data/beaches'
import { todayEvents, happyHoursActive } from '../data/events'

// ─── TIDE CHART ──────────────────────────────────────────────────────────────
function TideChart() {
  const points = [
    { t: 0, y: 0.85 }, { t: 0.18, y: 1.0 }, { t: 0.45, y: 0.05 },
    { t: 0.71, y: 0.95 }, { t: 0.97, y: 0.1 }, { t: 1.0, y: 0.15 },
  ]
  const W = 600, H = 120
  const x = (t: number) => t * W
  const y = (yy: number) => 14 + yy * (H - 28)

  let path = `M ${x(points[0].t)} ${y(points[0].y)}`
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1], p1 = points[i]
    const dx = (p1.t - p0.t) * W
    path += ` C ${x(p0.t) + dx / 2} ${y(p0.y)}, ${x(p1.t) - dx / 2} ${y(p1.y)}, ${x(p1.t)} ${y(p1.y)}`
  }
  const fillPath = `${path} L ${W} ${H} L 0 ${H} Z`
  const nowT = 0.42

  let ny = 0.2
  for (let i = 1; i < points.length; i++) {
    if (points[i].t >= nowT) {
      const p0 = points[i - 1], p1 = points[i]
      const tt = (nowT - p0.t) / (p1.t - p0.t)
      const e = tt * tt * (3 - 2 * tt)
      ny = p0.y + (p1.y - p0.y) * e
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
        <circle cx={x(nowT)} cy={y(ny)} r="5" fill="#C45A3E" />
        <circle cx={x(nowT)} cy={y(ny)} r="9" fill="#C45A3E" opacity="0.18" />
        <circle cx={x(0.18)} cy={y(1.0) - 2} r="3" fill="#6B9694" />
        <circle cx={x(0.45)} cy={y(0.05) + 2} r="3" fill="#1B3654" />
        <circle cx={x(0.71)} cy={y(0.95) - 2} r="3" fill="#6B9694" />
        <circle cx={x(0.97)} cy={y(0.1) + 2} r="3" fill="#1B3654" />
      </svg>
      <div className="tide-marks">
        <span>12a</span><span>4a</span><span>8a</span>
        <span style={{ color: '#C45A3E', fontWeight: 700 }}>Now 10:18a</span>
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
            <span className="card-sub">High slack 10:45 am</span>
          </div>
          <TideChart />
          <div className="tide-events">
            {tideKeyTimes.map((t, i) => (
              <div key={i} className={`tide-event ${i === 1 ? 'now' : ''}`}>
                <div className="lab">{t.type}{i === 1 ? ' · Now' : ''}</div>
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
