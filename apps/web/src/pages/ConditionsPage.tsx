import { Link } from 'react-router-dom'
import { Thermometer, Sun, Waves } from 'lucide-react'
import { tideKeyTimes } from '../data/conditions'
import { useTides } from '../hooks/useTides'
import { useNow } from '../hooks/useNow'
import { useWaterTemp } from '../hooks/useWaterTemp'
import { useUV, classifyUV } from '../hooks/useUV'
import { useBuoy } from '../hooks/useBuoy'
import { useRipCurrent, ripRiskColor } from '../hooks/useRipCurrent'
import TideCard, { dateToFrac, fmtNowLabel } from '../components/TideCard'
import FaqSection from '../components/FaqSection'

// Same NOAA / NDBC reference stations TodayPage uses, so the two pages agree.
const BAY_STATION = '8534208' // Beach Haven Coast Guard Station (bay side)
const BAY_NAME = 'Beach Haven Coast Guard Station'
const OCEAN_STATION = '8534720' // Atlantic City (Ocean) — nearest dedicated ocean station
const OCEAN_NAME = 'Atlantic City (Ocean)'
const WATER_TEMP_STATION = '8534720' // AC has the water-temp sensor closest to LBI
const BUOY_STATION = '44091' // Barnegat offshore buoy

const LBI_LAT = 39.5604
const LBI_LON = -74.2429

// JSON-LD: a WebPage describing the live-conditions resource + the Place it covers.
// Static (no live values) so it's identical server-side and client-side.
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'LBI Ocean Temperature, Tides & Live Beach Conditions',
  description:
    'Live Long Beach Island ocean temperature, high and low tide times from Barnegat Light through Holgate, surf, UV, rip-current risk, and beach cameras — updated in real time.',
  url: 'https://onlongbeachisland.com/lbi-conditions',
  about: {
    '@type': 'Place',
    name: 'Long Beach Island, New Jersey',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
  },
}

export default function ConditionsPage() {
  // Live clock — drives the tide chart "now" marker (same pattern as TodayPage).
  const now = useNow()
  const nowT = dateToFrac(now)
  const nowLabel = fmtNowLabel(now)

  // Live feeds. Each renders a loading/fallback state server-side and on the
  // first client paint, then hydrates — so the indexable prose below is never
  // blocked or replaced by a network fetch.
  const { tides: bayTides, loading: bayLoading } = useTides(BAY_STATION)
  const { tides: oceanTides, loading: oceanLoading } = useTides(OCEAN_STATION)
  const { temp: waterTemp } = useWaterTemp(WATER_TEMP_STATION)
  const { uv } = useUV(LBI_LAT, LBI_LON)
  const { reading: buoy } = useBuoy(BUOY_STATION)
  const { rip } = useRipCurrent()

  return (
    <div className="pg-wrap">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── Hero (static, indexable copy) ───────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <Link to="/" style={{ color: 'var(--teal-deep)', textDecoration: 'none', fontWeight: 600 }}>← LBI</Link>
          <span className="rule" />
          <span>Live conditions</span>
        </div>
        <h1>LBI Ocean Temperature, Tides &amp; <em>Conditions</em></h1>
        <p className="pg-lede">
          Today&apos;s Long Beach Island <b>ocean temperature</b>, <b>tide times</b> from
          Barnegat Light through Holgate, surf height, UV index, rip-current risk, and live
          beach cameras — updated in real time for the whole island: Barnegat Light, Loveladies,
          North Beach, Harvey Cedars, Surf City, Ship Bottom, Brant Beach, Beach Haven, and Holgate.
        </p>
      </div>

      <div className="pg-grid">

        {/* ── Main column ───────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Water temp heading — crawlable text so the page ranks for
              "lbi water temp" / "ocean temp lbi"; the live number hydrates below. */}
          <article className="lc" id="water-temp">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              LBI Water Temperature Today
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
              Today&apos;s Long Beach Island ocean temperature is shown live below, read from the
              nearest NOAA water-temperature sensor (Atlantic City). Water temps on LBI climb through
              the summer — typically low-to-mid 60s°F in June, up to the low 70s°F in July and August,
              and often warmest after a stretch of south wind.
            </p>
          </article>

          {/* Live ocean temp + UV + rip — hydrates over the static loading state */}
          <div className="metrics">
            <div className="metric">
              <div className="metric-ico"><Thermometer size={18} strokeWidth={1.5} /></div>
              <div>
                <div className="metric-val">
                  {waterTemp != null ? Math.round(waterTemp) : '—'}
                  <small> °F</small>
                </div>
                <div className="metric-lab">Ocean temp · Atlantic City</div>
              </div>
            </div>
            <div className="metric">
              <div className="metric-ico"><Sun size={18} strokeWidth={1.5} /></div>
              <div>
                <div className="metric-val">
                  {uv != null ? Math.round(uv) : '—'}
                </div>
                <div className="metric-lab">{uv != null ? `UV · ${classifyUV(uv)}` : 'UV index'}</div>
              </div>
            </div>
            <div className="metric">
              <div className="metric-ico"><Waves size={18} strokeWidth={1.5} /></div>
              <div>
                <div className="metric-val" style={{ fontSize: 22, color: ripRiskColor(rip?.risk) }}>
                  {rip ? rip.risk : '—'}
                </div>
                <div className="metric-lab">Rip-current risk</div>
              </div>
            </div>
          </div>

          {/* Tides — bay and ocean differ in timing and amplitude */}
          <div id="tides" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <article className="lc">
              <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
                LBI Tide Times Today
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
                Today&apos;s high tide and low tide times for Long Beach Island are charted below —
                the ocean (oceanfront) tide first, then the back-bay tide, which runs on a different
                schedule. Tide times shift about 50 minutes later each day.
              </p>
            </article>
            <TideCard
              title="Ocean Tide"
              stationName={OCEAN_NAME}
              liveTides={oceanTides}
              loading={oceanLoading}
              fallbackEvents={tideKeyTimes}
              nowT={nowT}
              nowLabel={nowLabel}
            />
            <TideCard
              title="Bay Tide"
              stationName={BAY_NAME}
              liveTides={bayTides}
              loading={bayLoading}
              fallbackEvents={tideKeyTimes}
              nowT={nowT}
              nowLabel={nowLabel}
            />
          </div>

          {/* Surf — heading is always crawlable; the live buoy card renders when data returns */}
          <article className="lc" id="surf">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              LBI Surf Report
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
              Live wave height, period, and direction for Long Beach Island come from the offshore
              NDBC Barnegat buoy (44091). When the buoy is reporting, the current reading appears
              below; check rip-current risk above before you get in.
            </p>
          </article>

          {/* Waves — only when the buoy actually returned a reading */}
          {buoy && (
            <div className="card">
              <div className="card-head">
                <h2 className="card-title">Surf &amp; Sea Temp</h2>
                <span className="card-sub"><span className="live-pip" />Live · Barnegat Buoy 44091</span>
              </div>
              <div className="tide-events">
                <div className="tide-event">
                  <div className="lab">Height</div>
                  <div className="time">{buoy.waveHeightFt != null ? `${buoy.waveHeightFt.toFixed(1)}ft` : '—'}</div>
                  <div className="ft">significant</div>
                </div>
                <div className="tide-event">
                  <div className="lab">Period</div>
                  <div className="time">{buoy.wavePeriodSec != null ? `${buoy.wavePeriodSec.toFixed(0)}s` : '—'}</div>
                  <div className="ft">dominant</div>
                </div>
                <div className="tide-event">
                  <div className="lab">Direction</div>
                  <div className="time">{buoy.waveDir ?? '—'}</div>
                  <div className="ft">{buoy.waveDirDeg != null ? `${Math.round(buoy.waveDirDeg)}°` : ''}</div>
                </div>
                <div className="tide-event">
                  <div className="lab">Sea temp</div>
                  <div className="time">{buoy.waterTempF != null ? `${Math.round(buoy.waterTempF)}°F` : '—'}</div>
                  <div className="ft">offshore</div>
                </div>
              </div>
            </div>
          )}

          {/* ── Static prose: how LBI tides work ─────────────────────────────── */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 14 }}>
              How tides work on Long Beach Island
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
              Long Beach Island has <b>semi-diurnal tides</b> — two high tides and two low tides
              roughly every 24 hours and 50 minutes, so each day&apos;s tide times shift about 50
              minutes later than the day before. There are two very different tides to watch on a
              barrier island. The <b>ocean (oceanfront) tide</b> is what surfers, swimmers, and
              anglers care about; the <b>bay (back-bay) tide</b> runs on the Barnegat Bay side and
              matters for boating, paddling, clamming, and flooding.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)', marginTop: 12 }}>
              The two are not in sync: the bay tide typically lags the ocean tide and has a smaller
              range, because water has to flow in and out through Barnegat Inlet at the north end and
              Little Egg Inlet at the south. That&apos;s why we show the ocean and bay tide charts
              separately above — a low ocean tide does not mean low water in the bay. Tide heights
              also run higher around the new and full moon (<b>spring tides</b>) and lower at the
              quarter moons (neap tides).
            </p>
          </article>

          {/* ── Static prose: flooding ───────────────────────────────────────── */}
          <article className="lc" style={{ borderLeft: '3px solid var(--teal-deep)' }}>
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 14 }}>
              Flooding on LBI: what to watch
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
              Most LBI flooding is <b>back-bay flooding</b> on the bay side, not ocean overwash. On
              the highest tides of the month — especially when a high tide lines up with a strong,
              persistent onshore or northeast wind, or a coastal storm — bay water can push up over
              the lowest-lying streets and the Route 72 Causeway approach in <b>Ship Bottom</b>, the
              island&apos;s main on-and-off point. This is sometimes called &quot;sunny-day&quot; or
              nuisance flooding because it can happen with clear skies, purely from tide and wind.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)', marginTop: 12 }}>
              The practical rule for residents and day-trippers: check the <b>bay high-tide time</b>
              {' '}above and the wind before you plan your drive on or off the island, and give the
              causeway extra time around a bay high tide during a wind event. For official warnings,
              always check the latest National Weather Service coastal-flood statements and our{' '}
              <Link to="/alerts" style={{ color: 'var(--teal-deep)' }}>LBI alerts page</Link>.
            </p>
          </article>

          {/* FAQ — visible Q/A + FAQPage JSON-LD for utility-query snippets */}
          <FaqSection
            title="LBI Conditions FAQ"
            faqs={[
              {
                q: 'What is the water temperature at LBI today?',
                a: "Today's Long Beach Island ocean temperature is shown live at the top of this page, read from the nearest NOAA sensor (Atlantic City). LBI water temps are typically in the low-to-mid 60s°F in June and reach the low 70s°F in July and August.",
              },
              {
                q: 'When is high tide and low tide on LBI today?',
                a: "Today's high and low tide times are in the tide charts above — the ocean tide and the back-bay tide run on different schedules. Tide times shift roughly 50 minutes later each day, so check the current day's chart.",
              },
              {
                q: 'Is there a surf report for LBI?',
                a: 'Yes — live wave height, period, and direction from the offshore NDBC Barnegat buoy (44091) appear in the surf section above when the buoy is reporting, alongside the island-wide NWS rip-current risk.',
              },
            ]}
          />

          {/* Internal links — distribute equity to the hub + town guides */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 20, marginBottom: 14 }}>
              Conditions by town
            </h2>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 14 }}>
              Tides and water temperature are essentially the same up and down the island, but badge
              prices, lifeguard hours, and beach rules differ by town. Pick yours:
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                ['barnegat-light', 'Barnegat Light'],
                ['harvey-cedars', 'Harvey Cedars'],
                ['surf-city', 'Surf City'],
                ['ship-bottom', 'Ship Bottom'],
                ['long-beach-township', 'Long Beach Township'],
                ['beach-haven', 'Beach Haven'],
              ].map(([slug, name]) => (
                <Link
                  key={slug}
                  to={`/${slug}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px',
                    background: 'var(--sand)', border: '1px solid var(--line)', borderRadius: 6,
                    color: 'var(--ink)', textDecoration: 'none',
                    fontFamily: 'var(--font-display)', fontSize: 16,
                  }}
                >
                  {name} <span style={{ color: 'var(--teal-deep)' }}>→</span>
                </Link>
              ))}
            </div>
          </article>
        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          <div className="aside-card">
            <p className="aside-title">Live data sources</p>
            <ul className="aside-list">
              <li><span>Tides — NOAA Tides &amp; Currents (bay &amp; ocean stations)</span></li>
              <li><span>Ocean temp — NOAA, Atlantic City sensor</span></li>
              <li><span>Surf &amp; sea temp — NDBC Barnegat Buoy 44091</span></li>
              <li><span>UV index — Open-Meteo</span></li>
              <li><span>Rip risk — NWS Surf Zone Forecast</span></li>
            </ul>
          </div>

          <div className="aside-card advisory">
            <p className="aside-title" style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Waves size={15} strokeWidth={1.5} /> Before you go</p>
            <p className="aside-body">
              Always swim near a lifeguard. If you&apos;re caught in a rip current, don&apos;t fight
              it — swim parallel to shore until you&apos;re free, then back in. Rip risk above is the
              island-wide NWS forecast, not a beach-by-beach guarantee.
            </p>
          </div>

          <div className="aside-card">
            <p className="aside-title">More live &amp; local</p>
            <ul className="aside-list">
              <li>
                <Link to="/getting-around" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Live beach &amp; causeway cameras →
                </Link>
              </li>
              <li>
                <Link to="/towns" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Compare all six LBI towns →
                </Link>
              </li>
              <li>
                <Link to="/beaches" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Beach badges &amp; lifeguard hours →
                </Link>
              </li>
              <li>
                <Link to="/" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Today on the island (full dashboard) →
                </Link>
              </li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  )
}
