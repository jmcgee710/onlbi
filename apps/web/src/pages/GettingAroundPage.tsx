import { useState } from 'react'
import { shuttleRoutes, cameras, parkingInfo, causewayInfo } from '../data/gettingAround'

type Tab = 'transit' | 'traffic' | 'parking' | 'cams'

const liveCams = cameras.filter(c => c.status === 'live').length

export default function GettingAroundPage() {
  const [tab, setTab] = useState<Tab>('transit')

  return (
    <div className="pg-wrap">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <span>Getting Around</span>
          <span className="rule" />
          <span>LBI · Transit · Traffic · Parking</span>
        </div>
        <h1>Getting <em>Around</em></h1>
        <p className="pg-lede">
          LBI Beach Shuttle routes, causeway traffic tips, parking rules
          &amp; live beach cameras — everything to move around the island.
        </p>
        <div className="pg-tabs">
          {([
            ['transit', 'Transit',  shuttleRoutes.length, 'routes'],
            ['traffic', 'Traffic',  'Rt', '72'],
            ['parking', 'Parking',  parkingInfo.length, 'towns'],
            ['cams',    'Cameras',  liveCams, 'live'],
          ] as [Tab, string, string | number, string][]).map(([t, lbl, val, em]) => (
            <button
              key={t}
              className={`pg-tab${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
            >
              <span className="tab-lbl">{lbl}</span>
              <span className="tab-val">{val}<em> {em}</em></span>
            </button>
          ))}
        </div>
      </div>

      <div className="pg-grid">

        {/* ── Main column ────────────────────────────────────────────────────── */}
        <div>

          {/* TRANSIT */}
          {tab === 'transit' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="aside-card advisory">
                <p className="aside-title" style={{ fontSize: 17, marginBottom: 6 }}>LBI Beach Shuttle</p>
                <p className="aside-body">
                  Memorial Day – Labor Day · Day passes available at kiosks.{' '}
                  <strong>$2/ride · $8 day pass</strong>
                </p>
              </div>

              {shuttleRoutes.map((r, i) => (
                <div key={i} className="lc">
                  <div className="lc-head" style={{ marginBottom: 0 }}>
                    <div>
                      <h3 className="lc-name" style={{ fontSize: 22 }}>{r.route}</h3>
                    </div>
                    <span className="lc-cta">{r.fare}</span>
                  </div>
                  <div className="st-row c3" style={{ marginTop: 16 }}>
                    <div className="st">
                      <div className="st-lbl">Frequency</div>
                      <div className="st-val" style={{ fontSize: 17 }}>{r.freq}</div>
                    </div>
                    <div className="st">
                      <div className="st-lbl">First Run</div>
                      <div className="st-val" style={{ fontSize: 17 }}>{r.firstRun}</div>
                    </div>
                    <div className="st">
                      <div className="st-lbl">Last Run</div>
                      <div className="st-val" style={{ fontSize: 17 }}>{r.lastRun}</div>
                    </div>
                  </div>
                  <div className="lc-feats" style={{ flexWrap: 'nowrap', overflowX: 'auto', gap: 8 }}>
                    {r.stops.map((s, j) => (
                      <span key={j} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                        <span style={{
                          background: 'rgba(72,108,107,0.1)', color: 'var(--teal-deep)',
                          fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 4,
                        }}>{s}</span>
                        {j < r.stops.length - 1 && <span style={{ color: 'var(--slate-soft)', fontSize: 11 }}>→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="lc">
                <div className="lc-head" style={{ marginBottom: 0 }}>
                  <div>
                    <h3 className="lc-name" style={{ fontSize: 22 }}>🚲 18-Mile Bike Path</h3>
                    <p className="lc-sub">Barnegat Light → Holgate · Bay side</p>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5, marginTop: 14 }}>
                  Runs the full length of LBI along the bay side. Open year-round.
                  Bike rentals available at multiple shops across the island.
                </p>
              </div>
            </div>
          )}

          {/* TRAFFIC */}
          {tab === 'traffic' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="lc">
                <div className="lc-head" style={{ marginBottom: 0 }}>
                  <div>
                    <h3 className="lc-name">Route 72 Causeway</h3>
                    <p className="lc-sub">Manahawkin Bay Bridge · the only road on/off LBI</p>
                  </div>
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-soft)', marginTop: 12 }}>
                  There's no public real-time wait-time feed for the causeway. Check a live camera or the NJ511 map for current conditions, and plan around the peak times below.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
                  <button
                    onClick={() => setTab('cams')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: 'var(--sand)', border: '1px solid var(--line)', borderRadius: 6, color: 'var(--ink)', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)', cursor: 'pointer' }}
                  >
                    📹 Live cameras →
                  </button>
                  <a
                    href={causewayInfo.nj511url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: 'var(--sand)', border: '1px solid var(--line)', borderRadius: 6, color: 'var(--ink)', textDecoration: 'none', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)' }}
                  >
                    🚦 NJ511 traffic map ↗
                  </a>
                  <a
                    href={causewayInfo.floodSensorUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: 'var(--sand)', border: '1px solid var(--line)', borderRadius: 6, color: 'var(--ink)', textDecoration: 'none', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)' }}
                  >
                    🌊 Bay flood sensor ↗
                  </a>
                </div>
              </div>

              <div className="lc">
                <h3 className="lc-name" style={{ fontSize: 20, marginBottom: 18 }}>Peak Times</h3>
                {[
                  { day: 'Friday',   dir: 'Eastbound (to LBI)',  time: '2 PM – 8 PM',  level: 'Heavy' },
                  { day: 'Saturday', dir: 'Both directions',      time: '10 AM – 2 PM', level: 'Moderate' },
                  { day: 'Sunday',   dir: 'Westbound (from LBI)', time: '2 PM – 7 PM',  level: 'Heavy' },
                  { day: 'Monday',   dir: 'Westbound (from LBI)', time: '12 PM – 5 PM', level: 'Moderate' },
                ].map((t, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 0', borderBottom: i < 3 ? '1px solid var(--line-soft)' : 'none',
                  }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{t.day}</p>
                      <p style={{ fontSize: 12, color: 'var(--slate)', marginTop: 2 }}>{t.dir} · {t.time}</p>
                    </div>
                    <span style={{
                      fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700,
                      padding: '4px 10px', borderRadius: 4,
                      color: t.level === 'Heavy' ? 'var(--coral)' : 'var(--sun)',
                      background: t.level === 'Heavy' ? 'rgba(196,90,62,0.08)' : 'rgba(212,162,78,0.1)',
                    }}>{t.level}</span>
                  </div>
                ))}
              </div>

              <div className="lc">
                <h3 className="lc-name" style={{ fontSize: 20, marginBottom: 16 }}>Alternate Routes</h3>
                {[
                  { name: 'Route 539 North', desc: 'Via Tuckerton — adds ~15 min but avoids bridge backup', tag: 'Best alternate' },
                  { name: 'Early Morning',   desc: 'Before 9 AM on summer weekends — typically under 5 min wait', tag: 'Recommended' },
                  { name: 'Route 9 South',   desc: 'Via Little Egg Harbor — longer but sometimes faster peak Saturdays', tag: 'Option' },
                ].map((r, i) => (
                  <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < 2 ? '1px solid var(--line-soft)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{r.name}</p>
                      <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--teal-deep)', background: 'rgba(72,108,107,0.08)', padding: '3px 8px', borderRadius: 3 }}>
                        {r.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: 12.5, color: 'var(--slate)' }}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PARKING */}
          {tab === 'parking' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ fontSize: 12, color: 'var(--slate-soft)', marginBottom: 4 }}>
                Parking rules by town · LBI has no live parking sensors — arrive early in peak season or ride the free LBI Shuttle.
              </p>
              {parkingInfo.map((p, i) => (
                <div key={i} className="lc">
                  <div className="lc-head" style={{ marginBottom: 10 }}>
                    <h3 className="lc-name" style={{ fontSize: 20 }}>{p.town}</h3>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 500, color: 'var(--teal-deep)', textAlign: 'right' }}>
                      {p.cost}
                    </span>
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{p.overview}</p>
                  {p.notes && (
                    <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--slate)', marginTop: 8 }}>{p.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CAMERAS */}
          {tab === 'cams' && (
            <div>
              <p style={{ fontSize: 12, color: 'var(--slate-soft)', marginBottom: 18 }}>
                {liveCams} of {cameras.length} cameras online · Click any to open the live LBT feed in a new tab
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
                {cameras.map((cam, i) => {
                  const isLive = cam.status === 'live'
                  const card = (
                    <div style={{
                      borderRadius: 8, overflow: 'hidden', border: '1px solid var(--line)',
                      background: isLive ? 'var(--ink)' : 'var(--sand)',
                      transition: 'transform 0.15s, box-shadow 0.15s',
                      cursor: cam.url ? 'pointer' : 'default',
                      height: '100%',
                    }}>
                      <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6, position: 'relative' }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: isLive ? '#4ade80' : 'var(--slate-soft)' }} />
                        <p style={{
                          fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700,
                          color: isLive ? 'rgba(251,247,239,0.7)' : 'var(--slate-soft)',
                        }}>
                          {isLive ? 'Live' : 'Offline'}
                        </p>
                        {cam.url && (
                          <span style={{
                            position: 'absolute', top: 8, right: 10, fontSize: 11,
                            color: isLive ? 'rgba(251,247,239,0.5)' : 'var(--slate)',
                          }}>
                            ↗
                          </span>
                        )}
                      </div>
                      <div style={{ padding: '12px 14px 14px', background: isLive ? 'rgba(255,255,255,0.05)' : 'var(--shell)' }}>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500, color: isLive ? 'var(--shell)' : 'var(--ink)', lineHeight: 1.2, marginBottom: 4 }}>
                          {cam.name}
                        </p>
                        <p style={{ fontSize: 11, color: isLive ? 'rgba(251,247,239,0.5)' : 'var(--slate)' }}>
                          {cam.location}
                        </p>
                      </div>
                    </div>
                  )
                  return cam.url ? (
                    <a
                      key={i}
                      href={cam.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {card}
                    </a>
                  ) : (
                    <div key={i}>{card}</div>
                  )
                })}
              </div>

              <div className="aside-card" style={{ marginTop: 24 }}>
                <p className="aside-title">About these cams</p>
                <p className="aside-body">
                  All cameras are public traffic & beach feeds operated by{' '}
                  <a
                    href="https://www.longbeachtownship.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--teal-deep)', textDecoration: 'none', borderBottom: '1px solid rgba(72,108,107,0.35)' }}
                  >
                    Long Beach Township
                  </a>
                  . All 5 cams open on the same LBT live-view page in a new tab.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          {tab === 'transit' && (
            <>
              <div className="aside-card">
                <p className="aside-title">Quick Reference</p>
                <div className="aside-mini">
                  <div>
                    <div className="st-lbl">Day Pass</div>
                    <div className="st-val" style={{ fontSize: 24, marginTop: 4 }}>$8</div>
                  </div>
                  <div>
                    <div className="st-lbl">Single Ride</div>
                    <div className="st-val" style={{ fontSize: 24, marginTop: 4 }}>$2</div>
                  </div>
                  <div>
                    <div className="st-lbl">Season</div>
                    <div className="st-val" style={{ fontSize: 14, marginTop: 4 }}>Memorial–Labor Day</div>
                  </div>
                  <div>
                    <div className="st-lbl">Routes</div>
                    <div className="st-val" style={{ fontSize: 24, marginTop: 4 }}>{shuttleRoutes.length}</div>
                  </div>
                </div>
              </div>
            </>
          )}
          {tab === 'traffic' && (
            <div className="aside-card advisory">
              <p className="aside-title">Best Strategy</p>
              <ul className="aside-list">
                <li>Cross before 9 AM on summer weekends</li>
                <li>Route 539 via Tuckerton is the best alternate</li>
                <li>Sunday 2–7 PM is the worst westbound window</li>
                <li>NJ511 app has real-time Rt 72 alerts</li>
              </ul>
            </div>
          )}
          {tab === 'parking' && (
            <>
              <div className="aside-card">
                <p className="aside-title">Parking Tips</p>
                <ul className="aside-list">
                  <li>Arrive before 9 AM on weekends for best availability</li>
                  <li>Bay-side streets often have spots when beach lots fill</li>
                  <li>Beach Haven has the most lots — also the most competition</li>
                  <li>Barnegat Light State Park rarely fills on weekdays</li>
                </ul>
              </div>
              <div className="aside-card advisory">
                <p className="aside-title">Badge Parking Note</p>
                <p className="aside-body">
                  Many beach lots require a beach badge to park. Check signage. HC spots are typically unrestricted near access points.
                </p>
              </div>
            </>
          )}
          {tab === 'cams' && (
            <div className="aside-card">
              <p className="aside-title">Camera Coverage</p>
              <div className="aside-mini">
                <div>
                  <div className="st-lbl">Live</div>
                  <div className="st-val ok" style={{ fontSize: 28, marginTop: 4 }}>{liveCams}</div>
                </div>
                <div>
                  <div className="st-lbl">Total</div>
                  <div className="st-val" style={{ fontSize: 28, marginTop: 4 }}>{cameras.length}</div>
                </div>
              </div>
            </div>
          )}
        </aside>

      </div>
    </div>
  )
}
