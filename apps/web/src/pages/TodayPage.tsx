import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sun, CloudSun, CloudRain, Cloud, Video, type LucideIcon } from 'lucide-react'
import { useWeather } from '../hooks/useWeather'
import { useWaterTemp } from '../hooks/useWaterTemp'
import { useBuoy } from '../hooks/useBuoy'
import { useRipCurrent, type RipRisk } from '../hooks/useRipCurrent'
import { useSunset } from '../hooks/useSunset'
import { useUsgsWaterTemps } from '../hooks/useUsgsWaterTemps'
import { useTideSeries, nextTides, tideCurve, nyNow } from '../hooks/useTideSeries'
import { useNow } from '../hooks/useNow'
import IslandMap from '../components/IslandMap'
import { cameras } from '../data/gettingAround'
import {
  classifyBugLevel,
  computeLoungeScore,
  computeSwimScore,
  computeSurfScore,
  describeBugs,
  isFlySeason,
  scoreShortLabel,
  scoreVerdict,
  windDirCategory,
} from '../lib/scoring'
import { friendlyShortForecast } from '../lib/copy'

// Weather is essentially uniform across the 18-mile island; one point is fine.
const LBI_LAT = 39.5604
const LBI_LON = -74.2429

const BUOY_STATION = '44091' // NDBC Barnegat, offshore
const OCEAN_STATION = '8534720' // NOAA Atlantic City — tides + surf-zone water temp
const USGS_NORTH = '01409125' // Barnegat Bay at Barnegat Light
const USGS_SOUTH = '01409335' // Little Egg Inlet near Tuckerton

// NOAA bay-side tide prediction stations, north to south. Water temp only
// where USGS has a sensor nearby.
const BAY_STATIONS = [
  { id: 'B1', station: '8533631', name: 'High Bar', sub: 'Barnegat Light · bayside', usgs: USGS_NORTH, tempSrc: 'USGS sensor' },
  { id: 'B2', station: '8533862', name: 'North Beach', sub: 'Bayside' },
  { id: 'B3', station: '8533935', name: 'Rt 72 Causeway', sub: 'Manahawkin Bay bridge' },
  { id: 'B4', station: '8534208', name: 'Beach Haven', sub: 'Coast Guard station · bayside', usgs: USGS_SOUTH, tempSrc: 'USGS · Little Egg Inlet' },
] as const

const TOWNS = [
  { to: '/barnegat-light', name: 'Barnegat Light', meta: 'Borough · north tip' },
  { to: '/loveladies', name: 'Loveladies', meta: 'Long Beach Twp.' },
  { to: '/harvey-cedars', name: 'Harvey Cedars', meta: 'Borough' },
  { to: '/surf-city', name: 'Surf City', meta: 'Borough' },
  { to: '/ship-bottom', name: 'Ship Bottom', meta: 'Borough · causeway' },
  { to: '/brant-beach', name: 'Brant Beach', meta: 'Long Beach Twp.' },
  { to: '/beach-haven', name: 'Beach Haven', meta: 'Borough' },
  { to: '/holgate', name: 'Holgate', meta: 'Long Beach Twp. · south end' },
]

const OCEAN = '#2A6F97'
const BAY = '#4E7A5A'

const WEATHER_ICON: Record<string, LucideIcon> = { Sun, CloudSun, Rain: CloudRain, Cloud }

function scoreTone(n: number): string {
  return n >= 70 ? '#8FD1A6' : n >= 50 ? '#E9C27A' : '#F0A07A'
}

const RIP_STYLE: Record<RipRisk, { bg: string; fg: string; note: string }> = {
  Low: { bg: '#E3EEE5', fg: '#2F5A3B', note: 'Low still means rips near jetties and piers.' },
  Moderate: { bg: '#F6ECD6', fg: '#7A5412', note: 'Stronger rips possible. Swim near a lifeguard.' },
  High: { bg: '#F7E1DA', fg: '#8A2E17', note: 'Life-threatening rips likely. The surf zone is dangerous for all swimmers.' },
}

/** "-0.004" → "0.0", so a slightly negative MLLW prediction doesn't print "-0.0". */
function fmtFt(ft: number): string {
  return (Math.abs(ft) < 0.05 ? 0 : ft).toFixed(1)
}

/** "25 to 30 mph" → "25–30" */
function windRange(speed: string): string {
  return speed.replace(/\s*mph/i, '').replace(/\s+to\s+/, '–')
}

// ─── TIDE STATION CARD ────────────────────────────────────────────────────────
function TideStationCard(props: {
  id: string
  name: string
  sub: string
  station: string
  color: string
  temp?: number | null
  tempSrc?: string
  footnote?: string
}) {
  const { points, error } = useTideSeries(props.station)
  const nowMin = nyNow(useNow()).min
  const next = points ? nextTides(points, nowMin) : []

  return (
    <article className="h-card">
      <div className="h-card-top">
        <div className="h-station">
          <span className="h-pin" style={{ background: props.color }}>{props.id}</span>
          <div>
            <div className="h-station-name">{props.name}</div>
            <div className="h-muted">{props.sub}</div>
          </div>
        </div>
        {props.temp != null && (
          <div className="h-temp">
            <div className="h-big">{Math.round(props.temp)}°</div>
            <div className="h-tiny">{props.tempSrc}</div>
          </div>
        )}
      </div>
      {error ? (
        <div className="h-muted">NOAA predictions are unavailable right now.</div>
      ) : (
        <>
          <div className="h-pair">
            {[0, 1].map((i) => {
              const p = next[i]
              return (
                <div key={i}>
                  <div className="h-tiny">{p ? `Next ${p.type.toLowerCase()}` : 'Next tide'}</div>
                  <div className="h-strong">{p ? `${p.label} · ${fmtFt(p.ft)} ft` : '—'}</div>
                </div>
              )
            })}
          </div>
          <div className="h-curve">
            <svg viewBox="0 0 296 44" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" y1="40" x2="296" y2="40" stroke="#E4DCCD" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              {points && (
                <polyline
                  points={tideCurve(points)}
                  fill="none"
                  stroke={props.color}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              )}
            </svg>
            {points && (
              <span className="h-now" style={{ left: `${(nowMin / 1440) * 100}%` }}>
                <span>Now</span>
              </span>
            )}
          </div>
        </>
      )}
      {props.footnote && <div className="h-tiny">{props.footnote}</div>}
    </article>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function TodayPage() {
  const [side, setSide] = useState<'ocean' | 'bay'>('ocean')
  const now = useNow()

  const { forecast, current } = useWeather(LBI_LAT, LBI_LON)
  const { temp: surfTemp } = useWaterTemp(OCEAN_STATION)
  const { reading: buoy } = useBuoy(BUOY_STATION)
  const { rip } = useRipCurrent()
  const { sunset } = useSunset(LBI_LAT, LBI_LON)
  const { temps: bayTemps } = useUsgsWaterTemps([USGS_NORTH, USGS_SOUTH])

  const today = forecast?.[0]
  const tonight = today?.dow === 'Tonight'
  const waveFt = buoy?.waveHeightFt ?? null
  const seaTemp = buoy?.waterTempF ?? surfTemp ?? null

  // ── Scores: the site's scoring.ts on live NWS + buoy inputs ──
  const scores = today
    ? (() => {
        const wind = current ? `${current.windDir} ${windRange(current.windSpeed)} mph` : today.wind
        const dirCat = windDirCategory(today.windDir)
        const swimBits = [
          seaTemp != null && `${Math.round(seaTemp)}° water`,
          waveFt != null && `${waveFt.toFixed(1)} ft waves`,
          rip && `${rip.risk.toLowerCase()} rip risk`,
        ].filter(Boolean) as string[]
        const surfBits = [
          waveFt != null && `${waveFt.toFixed(1)} ft${buoy?.wavePeriodSec != null ? ` at ${Math.round(buoy.wavePeriodSec)} s` : ''}`,
          `${today.windDir} wind${dirCat === 'west' ? ' (offshore)' : dirCat === 'east' ? ' (onshore)' : ''}`,
        ].filter(Boolean) as string[]
        return [
          {
            name: 'Lounge',
            score: computeLoungeScore({
              precipPct: today.precipPct, hi: today.hi, ico: today.ico,
              windSpeed: today.windSpeed, bugScore: today.bugScore,
            }),
            why: `${friendlyShortForecast(today.shortForecast)}, ${today.hi}°, wind ${wind}.`,
          },
          {
            name: 'Swim',
            score: computeSwimScore({
              seaTempF: seaTemp, waveHeightFt: waveFt, hi: today.hi, precipPct: today.precipPct,
              ico: today.ico, windSpeed: today.windSpeed, bugScore: today.bugScore,
            }),
            why: swimBits.length ? `${swimBits.join(', ')}.` : 'Waiting on water readings.',
          },
          {
            name: 'Surf',
            // No buoy reading = no surf score (scoring.ts would return a neutral 50).
            score: waveFt == null ? null : computeSurfScore({
              waveHeightFt: waveFt, wavePeriodSec: buoy?.wavePeriodSec ?? null,
              windDir: today.windDir, windSpeed: today.windSpeed,
              precipPct: today.precipPct, seaTempF: buoy?.waterTempF ?? null,
            }),
            why: waveFt == null ? 'Waiting on the offshore buoy.' : `${surfBits.join(', ')}.`,
          },
        ]
      })()
    : null

  const inFlySeason = isFlySeason(now)
  const bugLevel = today ? (inFlySeason ? classifyBugLevel(today.bugScore) : 'None') : null
  const bugNote = !inFlySeason
    ? 'Out of season. The flies run late June to early September and are worst on a west wind.'
    : today
      ? describeBugs(today.bugScore, windDirCategory(today.windDir), now) || 'Few around with today’s wind.'
      : ''

  // Date + "updated" stamp only render once live data arrives (client-side),
  // so the prerendered HTML never carries a stale build-time date.
  const stamp = forecast
    ? `${now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'America/New_York' })} · Updated ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' })}`
    : 'Live conditions'

  const stats = [
    { label: tonight ? 'Low tonight' : 'High today', val: today ? `${tonight ? today.lo : today.hi}°` : '—', unit: '' },
    { label: 'Wind', val: current ? `${current.windDir} ${windRange(current.windSpeed)}` : '—', unit: current ? 'mph' : '' },
    { label: 'Waves', val: waveFt != null ? waveFt.toFixed(1) : '—', unit: waveFt != null ? 'ft' : '' },
    { label: 'Sunset', val: sunset ? sunset.replace(/ (AM|PM)$/, '') : '—', unit: sunset?.slice(-2) ?? '' },
  ]

  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="h-hero">
        <div className="h-hero-copy">
          <div className="h-eyebrow">{stamp}</div>
          <h1 className="h-title">Long Beach Island, <em>right now.</em></h1>
          {/* Static, crawlable hub copy — literal JSX, never bound to live data. */}
          <p className="h-lede">
            On LBI is the local guide to <b>Long Beach Island, New Jersey</b> — an 18-mile barrier
            island on the Jersey Shore with six beach towns from Barnegat Light to Beach Haven and
            Holgate. Live tides and water temps from both sides of the island, today’s beach scores,
            and a guide to every town.
          </p>
        </div>
        <div className="h-stats">
          {stats.map((s) => (
            <div key={s.label} className="h-stat">
              <div className="h-label">{s.label}</div>
              <div className="h-stat-val">{s.val} {s.unit && <small>{s.unit}</small>}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Beach scores ── */}
      <section className="h-scores" aria-labelledby="scores-title">
        <div className="h-scores-intro">
          <div>
            <div className="h-label h-label-dark">Today’s beach scores</div>
            <h2 id="scores-title" className="h-scores-title">
              {today ? scoreVerdict(today.score) : 'Scoring today’s beach…'}
            </h2>
            <p className="h-scores-lede">Scored three ways, because a washout on the sand can still be a surf day.</p>
          </div>
          <Link to="/lbi-conditions" className="h-link-light">How scores work →</Link>
        </div>
        <div className="h-score-grid">
          {(scores ?? [{ name: 'Lounge' }, { name: 'Swim' }, { name: 'Surf' }]).map((c) => {
            const s = 'score' in c && c.score != null ? { ...c, score: c.score } : null
            return (
              <article key={c.name} className="h-score">
                <div className="h-label h-label-dark">{c.name}</div>
                <div className="h-score-row">
                  <span className="h-score-num">{s ? s.score : '—'}</span>
                  {s && <span className="h-score-word" style={{ color: scoreTone(s.score) }}>{scoreShortLabel(s.score)}</span>}
                </div>
                <div
                  className="h-meter"
                  role="meter"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={s?.score ?? 0}
                  aria-label={`${c.name} score`}
                >
                  {s && <div style={{ width: `${s.score}%`, background: scoreTone(s.score) }} />}
                </div>
                <div className="h-score-why">{'why' in c ? c.why : ' '}</div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── Tides & water temps ── */}
      <section id="tides" className="h-tides">
        <div className="h-tides-head">
          <div>
            <h2 className="h-h2">Tides &amp; water temps</h2>
            <p className="h-sub">
              Four bay stations and the open ocean. Bay tides run hours behind the ocean and rise far
              less — plan the boat ramp and the beach separately.
            </p>
          </div>
          <div className="h-live"><span className="live-pip" />Live · NOAA · USGS · NDBC · NWS</div>
        </div>

        <div className="h-side-toggle" role="group" aria-label="Choose side of the island">
          <button type="button" aria-pressed={side === 'ocean'} onClick={() => setSide('ocean')}>Ocean side</button>
          <button type="button" aria-pressed={side === 'bay'} onClick={() => setSide('bay')}>Bay side</button>
        </div>

        <div className="h-tides-grid" data-side={side}>
          <div className="h-col h-col-bay">
            <div className="h-colhead"><span style={{ background: BAY }} />Barnegat Bay · west</div>
            {BAY_STATIONS.map((s) => (
              <TideStationCard
                key={s.id}
                id={s.id}
                name={s.name}
                sub={s.sub}
                station={s.station}
                color={BAY}
                temp={'usgs' in s ? bayTemps?.[s.usgs] : null}
                tempSrc={'tempSrc' in s ? s.tempSrc : undefined}
              />
            ))}
            <p className="h-tiny h-src">Tides: NOAA predictions. Bay water temp only where USGS has a sensor — Barnegat Light and Little Egg Inlet.</p>
          </div>

          <div className="h-col h-col-map">
            <div className="h-map"><IslandMap /></div>
            <div className="h-duo">
              <div className="h-card">
                <div className="h-label">Island forecast · NWS</div>
                <div className="h-forecast">
                  {(forecast ?? []).slice(0, 4).map((d) => {
                    const Icon = WEATHER_ICON[d.ico] ?? Cloud
                    return (
                      <div key={d.dow}>
                        <div className="h-strong h-small">{d.dow}</div>
                        <Icon size={24} strokeWidth={1.6} color={d.ico === 'Sun' ? '#A8701F' : d.ico === 'Rain' ? OCEAN : '#5A6570'} aria-label={d.shortForecast} />
                        <div className="h-strong h-small">{d.hi}°</div>
                        <div className="h-tiny">{d.lo}°</div>
                      </div>
                    )
                  })}
                  {!forecast && <div className="h-muted">Loading the NWS forecast…</div>}
                </div>
              </div>
              <div className="h-card">
                <div className="h-label">Greenheads</div>
                <div className="h-big">{bugLevel ?? '—'}</div>
                <div className="h-body">{bugNote}</div>
              </div>
            </div>
          </div>

          <div className="h-col h-col-ocean">
            <div className="h-colhead"><span style={{ background: OCEAN }} />Atlantic Ocean · east</div>
            <TideStationCard
              id="O1"
              name="Ocean tide"
              sub="Same along the whole beachfront"
              station={OCEAN_STATION}
              color={OCEAN}
              footnote="NOAA Atlantic City reference station"
            />
            <article className="h-card">
              <div className="h-label">Ocean water temp</div>
              <div className="h-pair">
                <div>
                  <div className="h-big">{surfTemp != null ? `${Math.round(surfTemp)}°` : '—'}</div>
                  <div className="h-muted">Surf zone · O1</div>
                </div>
                <div>
                  <div className="h-big">{buoy?.waterTempF != null ? `${Math.round(buoy.waterTempF)}°` : '—'}</div>
                  <div className="h-muted">Offshore · O2</div>
                </div>
              </div>
            </article>
            <article className="h-card">
              <div className="h-station">
                <span className="h-pin" style={{ background: OCEAN }}>O2</span>
                <div className="h-label">Waves</div>
              </div>
              <div className="h-waves">
                <span className="h-big">{waveFt != null ? waveFt.toFixed(1) : '—'}</span>
                {waveFt != null && <span className="h-unit">ft</span>}
                {buoy && (
                  <span className="h-body">
                    {buoy.wavePeriodSec != null && `${Math.round(buoy.wavePeriodSec)} s`}
                    {buoy.waveDir && ` · from ${buoy.waveDir}`}
                  </span>
                )}
              </div>
              <div className="h-tiny">NDBC Buoy 44091, offshore of Barnegat</div>
            </article>
            <article className="h-card">
              <div className="h-card-top">
                <div className="h-label">Rip current risk</div>
                {rip && (
                  <span className="h-pill" style={{ background: RIP_STYLE[rip.risk].bg, color: RIP_STYLE[rip.risk].fg }}>
                    {rip.risk}
                  </span>
                )}
              </div>
              <div className="h-body">
                {rip ? RIP_STYLE[rip.risk].note : 'The NWS surf zone forecast isn’t available right now.'}
              </div>
              <div className="h-tiny">NWS Mount Holly surf zone forecast</div>
            </article>
          </div>
        </div>
      </section>

      {/* ── Live cams ── */}
      <section className="h-section">
        <div className="h-section-head">
          <div>
            <h2 className="h-h2">Live cams</h2>
            <p className="h-sub">Long Beach Township’s public cameras. They open the township’s live viewer.</p>
          </div>
          <Link to="/getting-around" className="h-link">Traffic &amp; getting around →</Link>
        </div>
        <div className="h-cams">
          {cameras.map((c) => (
            <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="h-cam">
              <span className="h-cam-top">
                <span className="h-cam-icon"><Video size={14} strokeWidth={2} aria-hidden="true" /></span>
                <span className="h-strong">{c.name}</span>
              </span>
              <span className="h-cam-foot"><span>{c.location}</span><span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Towns ── */}
      <section className="h-section">
        <div className="h-section-head">
          <div>
            <h2 className="h-h2">Find your town</h2>
            <p className="h-sub">Six municipalities, a dozen-plus villages — and exactly where each one starts.</p>
          </div>
          <Link to="/towns" className="h-link">All towns &amp; map →</Link>
        </div>
        <div className="h-towns">
          {TOWNS.map((t) => (
            <Link key={t.to} to={t.to} className="h-town">
              <span className="h-town-name">{t.name}</span>
              <span className="h-town-foot"><span>{t.meta}</span><span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
