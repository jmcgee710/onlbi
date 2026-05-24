import { useState } from 'react'
import { tideKeyTimes, forecast } from '../data/conditions'
import { beaches } from '../data/beaches'
import { todayEvents, happyHoursActive } from '../data/events'
import { useTides, type TideEvent } from '../hooks/useTides'
import { useNow } from '../hooks/useNow'
import { useWeather } from '../hooks/useWeather'
import { useWaterTemp } from '../hooks/useWaterTemp'
import { useUV, classifyUV } from '../hooks/useUV'
import {
  classifyBugLevel,
  describeBugs,
  describeWind,
  windDirCategory,
} from '../lib/scoring'

// Water temp comes from a Tides & Currents station that has a temp sensor.
// AC is the closest reliable one to LBI.
const WATER_TEMP_STATION = '8534720' // Atlantic City

// NOAA station IDs — change here if you want different reference points.
const BAY_STATION = '8534208' // Beach Haven Coast Guard Station
const BAY_NAME = 'Beach Haven Coast Guard Station'
const OCEAN_STATION = '8534720' // Atlantic City (Ocean) — nearest dedicated ocean station
const OCEAN_NAME = 'Atlantic City (Ocean)'

// Coordinates for the NWS forecast lookup. Beach Haven proper.
// Weather is essentially uniform across 18-mi LBI, so one point is fine.
const LBI_LAT = 39.5604
const LBI_LON = -74.2429

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

// ─── TIDE CARD ───────────────────────────────────────────────────────────────
// Self-contained card for one tide station (bay or ocean). Computes its own
// chart points and "next event" highlight from the events it receives.
function TideCard({
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
              ? `🟢 Live · ${stationName}`
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

  // Two independent NOAA fetches — bay tides and ocean tides differ in both
  // timing and amplitude, so they get their own charts.
  const { tides: bayTides, loading: bayLoading } = useTides(BAY_STATION)
  const { tides: oceanTides, loading: oceanLoading } = useTides(OCEAN_STATION)

  // Live clock — re-renders every minute so the chart markers track real time.
  const now = useNow()
  const nowT = dateToFrac(now)
  const nowLabel = fmtNowLabel(now)

  // Live 5-day forecast from NWS. liveCurrent is the first NWS period
  // ("This Afternoon" / "Tonight") and is what powers the hero strip.
  const { forecast: liveForecast, current: liveCurrent, loading: weatherLoading } =
    useWeather(LBI_LAT, LBI_LON)

  // Live water temp from NOAA Tides & Currents (AC station has the sensor).
  const { temp: liveWaterTemp } = useWaterTemp(WATER_TEMP_STATION)
  // Live UV index from Open-Meteo (NWS doesn't expose UV in standard forecast).
  const { uv: liveUV } = useUV(LBI_LAT, LBI_LON)

  // Find the next upcoming HIGH tide on the ocean side for the hero sub-line.
  const oceanEvents = oceanTides ?? tideKeyTimes
  const nextHigh = oceanEvents.find(
    (e) => e.type === 'High' && timeStrToFrac(e.time) > nowT,
  )

  // Live values for hero display, with mock fallbacks so it never blanks.
  const heroDateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  const heroToday = liveForecast?.[0]
  const heroHi = heroToday?.hi ?? 81
  const heroLo = heroToday?.lo ?? 65
  const heroCondition = liveCurrent?.shortForecast ?? heroToday?.shortForecast ?? 'Sunny'
  const heroWind = heroToday?.wind ?? 'SSW 12'

  // Bug pressure for the hero copy + rip-status row.
  const heroBugScore = heroToday?.bugScore ?? 65
  const heroBugLevel = classifyBugLevel(heroBugScore)
  const heroWindDirCat = windDirCategory(heroToday?.windDir ?? 'S')
  const bugCopy = describeBugs(heroBugScore, heroWindDirCat, now)
  const windCopy = heroToday
    ? describeWind(heroToday.windSpeed, heroToday.windDir)
    : 'a soft southwest breeze'

  const mockForecast = [
    { dow: 'Today', hi: 81, lo: 65, ico: 'Sun',      score: 88 },
    { dow: 'Sun',   hi: 78, lo: 62, ico: 'CloudSun', score: 71 },
    { dow: 'Mon',   hi: 72, lo: 60, ico: 'Rain',     score: 34 },
    { dow: 'Tue',   hi: 75, lo: 61, ico: 'Cloud',    score: 74 },
    { dow: 'Wed',   hi: 83, lo: 66, ico: 'Sun',      score: 94 },
  ]
  const forecastData = liveForecast ?? mockForecast

  return (
    <div className="content">
      {/* LEFT COLUMN */}
      <div className="col">

        {/* Hero */}
        <div className="hero">
          <div className="hero-row">
            <div>
              <div className="hero-eyebrow">Long Beach Island · {heroDateStr}</div>
              <h1>Today <em>on</em><br />the island.</h1>
              <div className="hero-sub">
                {heroToday ? (
                  <>
                    {heroToday.shortForecast} with {windCopy}.
                    {bugCopy && <> {bugCopy}</>}
                    {nextHigh && (
                      <> <strong>Next high tide at {nextHigh.time}.</strong></>
                    )}
                  </>
                ) : (
                  <>
                    Clear skies with a soft southwest breeze.{' '}
                    <strong>High tide at 10:45.</strong>
                  </>
                )}
              </div>
            </div>
            <div>
              <div className="hero-temps">
                <span className="big">{heroHi}</span><span className="deg">°</span>
                <span className="lo">/ {heroLo}°</span>
              </div>
              <div className="hero-condition">{heroCondition}</div>
            </div>
          </div>
          <div className="hero-stats">
            {[
              {
                label: 'Water',
                val: liveWaterTemp != null ? String(Math.round(liveWaterTemp)) : '72',
                suf: '°F',
                sub: liveWaterTemp != null ? 'Atlantic City buoy · live' : 'Warming through 3 pm',
              },
              {
                label: 'Wind',
                val: heroWind,
                suf: '',
                sub: heroToday ? heroToday.shortForecast : 'Light, steady',
              },
              {
                label: 'UV Index',
                val: liveUV != null ? String(Math.round(liveUV)) : '8',
                suf: '/11',
                sub: liveUV != null ? `${classifyUV(liveUV)} · live` : 'High · reapply at 1 pm',
              },
              { label: 'Bridge', val: '—', suf: '', sub: 'Live data coming soon' },
            ].map((s) => (
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
            <span>🪰 Bugs · <strong>{heroBugLevel}</strong></span>
          </div>
        </div>

        {/* Tides — split into Bay and Ocean since they differ in timing + height */}
        <TideCard
          title="Bay Tide"
          stationName={BAY_NAME}
          liveTides={bayTides}
          loading={bayLoading}
          fallbackEvents={tideKeyTimes}
          nowT={nowT}
          nowLabel={nowLabel}
        />
        <TideCard
          title="Ocean Tide"
          stationName={OCEAN_NAME}
          liveTides={oceanTides}
          loading={oceanLoading}
          fallbackEvents={tideKeyTimes}
          nowT={nowT}
          nowLabel={nowLabel}
        />

        {/* Forecast */}
        <div className="card">
          <div className="card-head">
            <h2 className="card-title">Five-day outlook</h2>
            <span className="card-sub">
              {weatherLoading
                ? 'Loading…'
                : liveForecast
                  ? '🟢 Live · NWS forecast'
                  : 'Sample data'}
            </span>
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
            { ico: '🌉', val: '—', suf: '', lab: 'Bridge wait · soon' },
            {
              ico: '🌊',
              val: liveWaterTemp != null ? String(Math.round(liveWaterTemp)) : '72',
              suf: '°',
              lab: 'Water temp',
            },
            {
              ico: '☀️',
              val: liveUV != null ? String(Math.round(liveUV)) : '8',
              suf: '',
              lab: liveUV != null ? `UV · ${classifyUV(liveUV)}` : 'UV index · high',
            },
            { ico: '🏖️', val: '6/6', suf: '', lab: 'Beaches open' },
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
