import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sun, CloudSun, CloudRain, Cloud, Umbrella, Droplets, Waves, Bug, Thermometer, Car, Calendar, type LucideIcon } from 'lucide-react'
import { tideKeyTimes } from '../data/conditions'
import { todayEvents } from '../data/events'
import { useTides } from '../hooks/useTides'
import { useNow } from '../hooks/useNow'
import { useWeather } from '../hooks/useWeather'
import { useWaterTemp } from '../hooks/useWaterTemp'
import { useUV, classifyUV } from '../hooks/useUV'
import { useBuoy } from '../hooks/useBuoy'
import { useRipCurrent, ripRiskColor } from '../hooks/useRipCurrent'
import TideCard, { timeStrToFrac, dateToFrac, fmtNowLabel } from '../components/TideCard'

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
import { friendlyShortForecast, tideContext, seasonStatus, type SeasonStatus } from '../lib/copy'

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

// "Happening today" is hidden for now — it's hand-maintained (not live) and
// risks going stale. Flip to true to restore the section as-is; revisit when
// it's backed by a live source (Google Calendar embed / Ticketmaster feed).
const SHOW_HAPPENING_TODAY = false

// Color treatment for the season badge on each "Happening today" event.
const SEASON_COLOR: Record<SeasonStatus['kind'], { color: string; bg: string }> = {
  upcoming: { color: '#9a5a24', bg: 'rgba(196,90,62,0.12)' }, // amber — not open yet
  open:     { color: 'var(--teal-deep)', bg: 'rgba(72,108,107,0.1)' },
  closed:   { color: 'var(--slate)', bg: 'rgba(15,31,46,0.05)' },
}

// ─── FORECAST ICONS ───────────────────────────────────────────────────────────
function WeatherIcon({ type }: { type: string }) {
  const map: Record<string, LucideIcon> = { Sun, CloudSun, Rain: CloudRain, Cloud }
  const Icon = map[type] ?? Cloud
  return <Icon size={26} strokeWidth={1.5} color="var(--teal-deep)" />
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function TodayPage() {
  const [activeDay, setActiveDay] = useState(0)

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

        {/* Static hub copy + links — crawlable homepage text naming the island
            and pushing equity to the core landing pages. Literal JSX only. */}
        <div className="card">
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)', margin: 0 }}>
            On LBI is the local guide to <b>Long Beach Island, New Jersey</b> — an 18-mile
            barrier island on the Jersey Shore with six beach towns from Barnegat Light to
            Beach Haven and Holgate. Live ocean temperature, tides, and surf above; guides
            to every town, beach badges, and things to do below.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
            {[
              ['/towns', 'LBI Towns & Map'],
              ['/lbi-conditions', 'Water Temp & Tides'],
              ['/beaches', 'Beach Badges 2026'],
              ['/eat', 'Where to Eat'],
              ['/do', 'Things to Do'],
              ['/getting-around', 'Getting Around'],
            ].map(([href, label]) => (
              <Link
                key={href}
                to={href}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px',
                  background: 'var(--sand)', border: '1px solid var(--line)', borderRadius: 6,
                  color: 'var(--ink)', textDecoration: 'none', fontSize: 13, fontWeight: 600,
                }}
              >
                {label} <ArrowRight size={14} strokeWidth={2} color="var(--teal-deep)" />
              </Link>
            ))}
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

          const pillars: Array<{ Icon: LucideIcon; label: string; score: number }> = [
            { Icon: Umbrella, label: 'Lounge', score: loungeScore },
            { Icon: Droplets, label: 'Swim', score: swimScore },
            { Icon: Waves, label: 'Surf', score: surfScore },
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
                    <div style={{ lineHeight: 1, display: 'flex', justifyContent: 'center' }}>
                      <p.Icon size={28} strokeWidth={1.5} color="var(--teal-deep)" />
                    </div>
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
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Waves size={14} strokeWidth={1.5} /> Rip current risk · {rip ? (
                  <strong style={{ color: ripRiskColor(rip.risk) }}>{rip.risk} across the island</strong>
                ) : (
                  <strong style={{ color: 'var(--slate)' }}>see safebeachday.com</strong>
                )}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Bug size={14} strokeWidth={1.5} /> Bugs · <strong>{heroBugLevel}</strong>
                </span>
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

        <Link to="/lbi-conditions" className="live-cta">
          <span className="live-badge">Live</span>
          <span>LBI ocean temp, tides &amp; flooding</span>
          <span className="cta-arrow"><ArrowRight size={16} strokeWidth={2.5} /></span>
        </Link>

        {/* Waves — only renders when the buoy actually returned a reading.
            NDBC buoys go offline for maintenance, so hiding the card on
            missing data is preferable to showing dashes. */}
        {buoy && (
          <div className="card">
            <div className="card-head">
              <h2 className="card-title">Waves</h2>
              <span className="card-sub"><span className="live-pip" />Live · Barnegat Buoy 44091</span>
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
                  ? <><span className="live-pip" />Live · NWS forecast</>
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
              Icon: Thermometer,
              val: liveWaterTemp != null ? String(Math.round(liveWaterTemp)) : '72',
              suf: '°',
              lab: 'Water temp',
              href: null as string | null,
            },
            {
              Icon: Sun,
              val: liveUV != null ? String(Math.round(liveUV)) : '8',
              suf: '',
              lab: liveUV != null ? `UV · ${classifyUV(liveUV)}` : 'UV index · high',
              href: null,
            },
            {
              Icon: Car,
              val: '→',
              suf: '',
              lab: 'Traffic & cams',
              href: '/getting-around',
            },
          ].map((m) => {
            const inner = (
              <>
                <div className="metric-ico">
                  <m.Icon size={18} strokeWidth={1.5} />
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

        {/* Events — "Happening today" (hidden via SHOW_HAPPENING_TODAY) */}
        {SHOW_HAPPENING_TODAY && (
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
              const hasTime = /\d/.test(e.time)
              const hour = e.time.match(/^(\d+)/)?.[1] ?? '?'
              const ap = e.time.toLowerCase().includes('pm') ? 'pm' : 'am'
              const season = seasonStatus(e.seasonOpens, e.seasonCloses, now)
              const inner = (
                <div className="event" key={i}>
                  <div className="event-time">
                    {hasTime ? (
                      <>
                        <span className="h">{hour}</span>
                        <span className="ap">{ap}</span>
                      </>
                    ) : (
                      <span className="h"><Calendar size={18} strokeWidth={1.5} /></span>
                    )}
                  </div>
                  <div>
                    <div className="event-title">{e.title}</div>
                    <div className="event-meta">{e.venue}{e.time ? ` · ${e.time}` : ''}</div>
                    {season && (
                      <div style={{ marginTop: 6 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: SEASON_COLOR[season.kind].color, background: SEASON_COLOR[season.kind].bg, padding: '2px 8px', borderRadius: 3 }}>
                          <Calendar size={11} strokeWidth={1.5} />{season.label}
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 7, textAlign: 'right' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      {!e.free && (
                        <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--slate-soft)', fontWeight: 700 }}>Tickets</span>
                      )}
                      <span className={`event-price ${e.free ? 'free' : ''}`}>{e.free ? 'Free' : e.price}</span>
                    </div>
                    {e.recurring && (
                      <span style={{ fontSize: 11, color: 'var(--slate)', lineHeight: 1.4, maxWidth: 150 }}>
                        {e.recurring}
                      </span>
                    )}
                    {e.cta && (
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--teal-deep)', lineHeight: 1.4 }}>
                        {e.cta}
                      </span>
                    )}
                  </div>
                </div>
              )
              return e.web
                ? <a key={i} href={e.web} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>{inner}</a>
                : inner
            })}
          </div>
        </div>
        )}

      </div>
    </div>
  )
}
