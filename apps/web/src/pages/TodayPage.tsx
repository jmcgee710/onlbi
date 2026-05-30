import { useState } from 'react'
import { Link } from 'react-router-dom'
import { tideKeyTimes, forecast } from '../data/conditions'
import { todayEvents } from '../data/events'
import { useTides, type TideEvent } from '../hooks/useTides'
import { useNow } from '../hooks/useNow'
import { useWeather } from '../hooks/useWeather'
import { useWaterTemp } from '../hooks/useWaterTemp'
import { useUV, classifyUV } from '../hooks/useUV'
import { useBuoy } from '../hooks/useBuoy'
import { useRipCurrent, ripRiskColor } from '../hooks/useRipCurrent'

// NDBC offshore buoy nearest to LBI for wave/swell/sea-temp data.
const BUOY_STATION = '44091' // Barnegat
import {
  classifyBugLevel,
  computeLoungeScore,
  computeSwimScore,
  computeSurfScore,
  describeBugs,
  describeWind,
  scoreShortLabel,
  windDirCategory,
} from '../lib/scoring'
import { friendlyShortForecast, tideContext } from '../lib/copy'

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
  // Live wave/swell from the Barnegat offshore buoy.
  const { reading: buoy } = useBuoy(BUOY_STATION)
  const { rip } = useRipCurrent()

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
  const heroConditionRaw =
    liveCurrent?.shortForecast ?? heroToday?.shortForecast ?? 'Sunny'
  const heroCondition = friendlyShortForecast(heroConditionRaw)
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
                    {friendlyShortForecast(heroToday.shortForecast)} with {windCopy}.
                    {bugCopy && <> {bugCopy}</>}
                    {nextHigh && (
                      <>
                        {' '}
                        <strong>
                          Next high tide {tideContext(nextHigh.time, now)}.
                        </strong>
                      </>
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
                {heroToday?.dow === 'Tonight' ? (
                  // After-sunset edge case: NWS gives us only the night
                  // period, no day high. Show the low explicitly so we
                  // don't display "65° / 65°" with the same number twice.
                  <>
                    <span className="big">{heroLo}</span>
                    <span className="deg">°</span>
                    <span className="lo">tonight</span>
                  </>
                ) : (
                  <>
                    <span className="big">{heroHi}</span>
                    <span className="deg">°</span>
                    <span className="lo">/ {heroLo}°</span>
                  </>
                )}
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
                href: null as string | null,
              },
              {
                label: 'Wind',
                val: heroWind,
                suf: '',
                sub: heroToday ? heroToday.shortForecast : 'Light, steady',
                href: null,
              },
              {
                label: 'UV Index',
                val: liveUV != null ? String(Math.round(liveUV)) : '8',
                suf: '/11',
                sub: liveUV != null ? `${classifyUV(liveUV)} · live` : 'High · reapply at 1 pm',
                href: null,
              },
              {
                label: 'Traffic',
                val: '→',
                suf: '',
                sub: 'NJ511 + beach cams',
                href: '/getting-around',
              },
            ].map((s) => {
              const inner = (
                <>
                  <div className="label">{s.label}</div>
                  <div className="val">
                    {s.val}
                    <small>{s.suf}</small>
                  </div>
                  <div className="sub">{s.sub}</div>
                </>
              )
              if (s.href) {
                return (
                  <Link
                    to={s.href}
                    key={s.label}
                    className="hero-stat"
                    style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                  >
                    {inner}
                  </Link>
                )
              }
              return (
                <div className="hero-stat" key={s.label}>
                  {inner}
                </div>
              )
            })}
          </div>
        </div>


        {/* Three activity scores — same day can rate differently for lounging
            vs swimming vs surfing (e.g. perfect sun + 55°F water + 9ft surf
            = Peak lounge, Tough swim, Great surf). */}
        {(() => {
          const loungeScore = heroToday
            ? computeLoungeScore({
                precipPct: heroToday.precipPct,
                hi: heroToday.hi,
                ico: heroToday.ico,
                windSpeed: heroToday.windSpeed,
                bugScore: heroToday.bugScore,
              })
            : 88
          const swimScore = heroToday
            ? computeSwimScore({
                seaTempF: buoy?.waterTempF ?? liveWaterTemp ?? null,
                waveHeightFt: buoy?.waveHeightFt ?? null,
                hi: heroToday.hi,
                precipPct: heroToday.precipPct,
                ico: heroToday.ico,
                windSpeed: heroToday.windSpeed,
                bugScore: heroToday.bugScore,
              })
            : 65
          const surfScore = heroToday
            ? computeSurfScore({
                waveHeightFt: buoy?.waveHeightFt ?? null,
                wavePeriodSec: buoy?.wavePeriodSec ?? null,
                windDir: heroToday.windDir,
                windSpeed: heroToday.windSpeed,
                precipPct: heroToday.precipPct,
                seaTempF: buoy?.waterTempF ?? null,
              })
            : 50

          const pillars: Array<{ emoji: string; label: string; score: number }> = [
            { emoji: '🏖️', label: 'Lounge', score: loungeScore },
            { emoji: '🏊', label: 'Swim', score: swimScore },
            { emoji: '🏄', label: 'Surf', score: surfScore },
          ]

          return (
            <div className="card score-card">
              <div className="card-head">
                <div>
                  <h2 className="card-title">Today's Scores</h2>
                  <div className="card-sub" style={{ marginTop: 4 }}>
                    By how you'd use the beach
                  </div>
                </div>
                <a href="https://safebeachday.com" target="_blank" rel="noopener noreferrer" className="section-link">Live conditions ↗</a>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 16,
                  margin: '12px 0 18px',
                }}
              >
                {pillars.map((p) => (
                  <div key={p.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 30, lineHeight: 1 }}>{p.emoji}</div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 56,
                        fontWeight: 300,
                        color: 'var(--navy)',
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                        marginTop: 6,
                      }}
                    >
                      {p.score}
                    </div>
                    <div
                      style={{
                        fontSize: 10.5,
                        textTransform: 'uppercase',
                        letterSpacing: '0.16em',
                        color: 'var(--slate, #6b8580)',
                        marginTop: 4,
                      }}
                    >
                      {p.label}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: 'var(--teal-deep, #1b3654)',
                        fontStyle: 'italic',
                        marginTop: 4,
                      }}
                    >
                      {scoreShortLabel(p.score)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="score-bullets">
                {heroToday && (
                  <span>{describeWind(heroToday.windSpeed, heroToday.windDir)}</span>
                )}
                {liveWaterTemp != null && (
                  <span>Water {Math.round(liveWaterTemp)}°F at Atlantic City</span>
                )}
                {liveUV != null && (
                  <span className={liveUV >= 6 ? 'warn' : undefined}>
                    UV {Math.round(liveUV)} — {classifyUV(liveUV)}
                  </span>
                )}
                {buoy?.waveHeightFt != null && buoy.waveHeightFt >= 2.5 && (
                  <span className={buoy.waveHeightFt >= 4 ? 'warn' : undefined}>
                    Surf {buoy.waveHeightFt.toFixed(1)} ft offshore
                    {buoy.waveHeightFt >= 4 ? ' — rough water' : ''}
                  </span>
                )}
                {buoy?.waterTempF != null && buoy.waterTempF < 65 && (
                  <span className="warn">
                    Sea temp {Math.round(buoy.waterTempF)}°F — cold for swimming
                  </span>
                )}
              </div>

              <div className="rip-status">
                <span>🌊 Rip current risk · {rip ? (
                  <strong style={{ color: ripRiskColor(rip.risk) }}>{rip.risk} across the island</strong>
                ) : (
                  <strong style={{ color: 'var(--slate)' }}>see safebeachday.com</strong>
                )}</span>
                <span>🪰 Bugs · <strong>{heroBugLevel}</strong></span>
              </div>
            </div>
          )
        })()}

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

        {/* Waves — only renders when the buoy actually returned a reading.
            NDBC buoys go offline for maintenance, so hiding the card on
            missing data is preferable to showing dashes. */}
        {buoy && (
          <div className="card">
            <div className="card-head">
              <h2 className="card-title">Waves</h2>
              <span className="card-sub">🟢 Live · Barnegat Buoy 44091</span>
            </div>
            <div className="tide-events">
              <div className="tide-event">
                <div className="lab">Height</div>
                <div className="time">
                  {buoy.waveHeightFt != null
                    ? `${buoy.waveHeightFt.toFixed(1)}ft`
                    : '—'}
                </div>
                <div className="ft">significant</div>
              </div>
              <div className="tide-event">
                <div className="lab">Period</div>
                <div className="time">
                  {buoy.wavePeriodSec != null
                    ? `${buoy.wavePeriodSec.toFixed(0)}s`
                    : '—'}
                </div>
                <div className="ft">dominant</div>
              </div>
              <div className="tide-event">
                <div className="lab">Direction</div>
                <div className="time">{buoy.waveDir ?? '—'}</div>
                <div className="ft">
                  {buoy.waveDirDeg != null ? `${Math.round(buoy.waveDirDeg)}°` : ''}
                </div>
              </div>
              <div className="tide-event">
                <div className="lab">Sea temp</div>
                <div className="time">
                  {buoy.waterTempF != null
                    ? `${Math.round(buoy.waterTempF)}°F`
                    : '—'}
                </div>
                <div className="ft">offshore</div>
              </div>
            </div>
            <div
              style={{
                fontSize: 11,
                opacity: 0.6,
                marginTop: 8,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {(() => {
                const mins = Math.max(
                  0,
                  Math.round((now.getTime() - buoy.observedAt.getTime()) / 60000),
                )
                if (mins < 60) return `Observed ${mins} min ago`
                const h = Math.floor(mins / 60)
                const m = mins % 60
                return `Observed ${h}h${m > 0 ? ` ${m}m` : ''} ago`
              })()}
            </div>
          </div>
        )}

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

        {/* Metrics — live water + UV, plus a link to the traffic/cams page.
            "Beaches open" tile was removed: aggregate-only data is misleading
            without per-beach status, which we don't have a real feed for. */}
        <div className="metrics">
          {[
            {
              ico: '🌊',
              val: liveWaterTemp != null ? String(Math.round(liveWaterTemp)) : '72',
              suf: '°',
              lab: 'Water temp',
              href: null as string | null,
            },
            {
              ico: '☀️',
              val: liveUV != null ? String(Math.round(liveUV)) : '8',
              suf: '',
              lab: liveUV != null ? `UV · ${classifyUV(liveUV)}` : 'UV index · high',
              href: null,
            },
            {
              ico: '🚦',
              val: '→',
              suf: '',
              lab: 'Traffic & cams',
              href: '/getting-around',
            },
          ].map((m) => {
            const inner = (
              <>
                <div className="metric-ico">
                  <span style={{ fontSize: 18 }}>{m.ico}</span>
                </div>
                <div>
                  <div className="metric-val">
                    {m.val}
                    <small>{m.suf && ' ' + m.suf}</small>
                  </div>
                  <div className="metric-lab">{m.lab}</div>
                </div>
              </>
            )
            if (m.href) {
              return (
                <Link
                  to={m.href}
                  key={m.lab}
                  className="metric"
                  style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  {inner}
                </Link>
              )
            }
            return (
              <div className="metric" key={m.lab}>
                {inner}
              </div>
            )
          })}
        </div>

        {/* Events */}
        <div className="card">
          <div className="card-head">
            <h2 className="card-title">Happening today</h2>
            <a
              href="https://welcometolbi.com/events/"
              target="_blank"
              rel="noopener noreferrer"
              className="section-link"
            >
              Full calendar ↗
            </a>
          </div>
          <div className="events">
            {todayEvents.map((e, i) => {
              const hour = e.time.match(/^(\d+)/)?.[1] ?? '?'
              const ap = e.time.toLowerCase().includes('pm') ? 'pm' : 'am'
              const inner = (
                <div className="event" key={i}>
                  <div className="event-time">
                    <span className="h">{hour}</span>
                    <span className="ap">{ap}</span>
                  </div>
                  <div>
                    <div className="event-title">{e.title}</div>
                    <div className="event-meta">
                      {e.venue} · {e.time}
                      {e.recurring && (
                        <span style={{ marginLeft: 6, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal-deep)', background: 'rgba(72,108,107,0.08)', padding: '2px 7px', borderRadius: 3 }}>
                          {e.recurring}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`event-price ${e.free ? 'free' : ''}`}>{e.free ? 'Free' : e.price}</span>
                </div>
              )
              return e.web
                ? <a key={i} href={e.web} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>{inner}</a>
                : inner
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
