import { useState } from 'react'
import { accessibleBeaches, beachTransportServices, restrooms } from '../data/accessibility'

type Tab = 'access' | 'transport' | 'restrooms'

const TRANSPORT_ICONS: Record<string, string> = {
  taxi:  '🚐',
  tram:  '🚌',
  gator: '🚜',
  utv:   '🏍️',
}

const byTown = accessibleBeaches.reduce<Record<string, typeof accessibleBeaches>>((acc, b) => {
  if (!acc[b.town]) acc[b.town] = []
  acc[b.town].push(b)
  return acc
}, {})

export default function AccessibilityPage() {
  const [tab, setTab]             = useState<Tab>('access')
  const [filterMat, setFilterMat] = useState(false)
  const [filterWC, setFilterWC]   = useState(false)

  const filteredBeaches = accessibleBeaches.filter(b => {
    if (filterMat && !b.mobiMat)        return false
    if (filterWC  && !b.wheelchairLoan) return false
    return true
  })

  const filteredByTown = filteredBeaches.reduce<Record<string, typeof accessibleBeaches>>((acc, b) => {
    if (!acc[b.town]) acc[b.town] = []
    acc[b.town].push(b)
    return acc
  }, {})

  return (
    <div className="pg-wrap">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <span>Accessibility</span>
          <span className="rule" />
          <span>LBI · Beach Access · Free Transport</span>
        </div>
        <h1>Beach <em>Access</em></h1>
        <p className="pg-lede">
          <b>Mobi-mats, wheelchair loans &amp; free beach transport</b> across Long Beach Island —
          because everyone deserves to reach the water.
        </p>
        <div className="pg-tabs">
          {([
            ['access',    'Beach Access', accessibleBeaches.length, ''],
            ['transport', 'Transport',    beachTransportServices.length, 'free'],
            ['restrooms', 'Restrooms',    restrooms.length, ''],
          ] as [Tab, string, number, string][]).map(([t, lbl, val, em]) => (
            <button
              key={t}
              className={`pg-tab${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
            >
              <span className="tab-lbl">{lbl}</span>
              <span className="tab-val">{val}{em && <em> {em}</em>}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pg-grid">

        {/* ── Main column ────────────────────────────────────────────────────── */}
        <div>

          {/* BEACH ACCESS */}
          {tab === 'access' && (
            <>
              <div className="aside-card" style={{ marginBottom: 18, padding: '16px 20px' }}>
                <p className="aside-body" style={{ fontSize: 13.5 }}>
                  <strong>Mobi-mats</strong> provide a firm surface from the dune to the water's edge — great for
                  wheelchairs, walkers, and strollers. <strong>Beach wheelchair loans</strong> are typically free and
                  available by reservation. Call ahead on peak weekends.
                </p>
              </div>

              <div className="pg-chips">
                <button
                  className={`pg-chip${filterMat ? ' on' : ''}`}
                  onClick={() => setFilterMat(v => !v)}
                >
                  🛤️ Mobi-Mat
                  <span className="ct">{accessibleBeaches.filter(b => b.mobiMat).length}</span>
                </button>
                <button
                  className={`pg-chip${filterWC ? ' on' : ''}`}
                  onClick={() => setFilterWC(v => !v)}
                >
                  ♿ Wheelchair Loan
                  <span className="ct">{accessibleBeaches.filter(b => b.wheelchairLoan).length}</span>
                </button>
              </div>

              {Object.entries(filteredByTown).map(([town, entries]) => (
                <div key={town} style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--slate-soft)', fontWeight: 600, marginBottom: 12 }}>
                    {town}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {entries.map((b, i) => (
                      <div key={i} className="lc">
                        <div className="lc-head" style={{ marginBottom: 0 }}>
                          <h3 className="lc-name" style={{ fontSize: 20 }}>{b.beach}</h3>
                          {b.hcParking && (
                            <span style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--teal-deep)', background: 'rgba(72,108,107,0.08)', padding: '4px 10px', borderRadius: 4, flexShrink: 0 }}>
                              HC Parking
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                          {b.mobiMat && (
                            <span style={{ fontSize: 11, fontWeight: 600, background: 'rgba(107,142,92,0.1)', color: 'var(--moss)', padding: '4px 10px', borderRadius: 4 }}>
                              🛤️ Mobi-Mat
                            </span>
                          )}
                          {b.wheelchairLoan && (
                            <span style={{ fontSize: 11, fontWeight: 600, background: 'rgba(72,108,107,0.08)', color: 'var(--teal-deep)', padding: '4px 10px', borderRadius: 4 }}>
                              ♿ Wheelchair Loan
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5, marginTop: 12 }}>{b.notes}</p>
                        <div style={{ display: 'flex', gap: 20, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line-soft)' }}>
                          <a href={`tel:${b.contact}`} style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                            {b.contact}
                          </a>
                          {b.sourceUrl && (
                            <a href={b.sourceUrl} target="_blank" rel="noopener noreferrer"
                              style={{ fontSize: 12.5, color: 'var(--slate)', fontWeight: 600, textDecoration: 'none' }}>
                              Official source ↗
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredBeaches.length === 0 && (
                <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--slate)' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>No results for those filters</p>
                </div>
              )}
            </>
          )}

          {/* TRANSPORT */}
          {tab === 'transport' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="aside-card" style={{ background: 'rgba(107,142,92,0.07)', borderColor: 'rgba(107,142,92,0.3)', padding: '16px 20px', marginBottom: 4 }}>
                <p className="aside-body" style={{ fontWeight: 600, color: 'var(--moss)' }}>
                  🎉 All transport services listed here are FREE
                </p>
                <p className="aside-body" style={{ marginTop: 6 }}>
                  LBI towns operate free accessible transport programs so visitors who can't walk to the beach
                  can still get there. Most require a valid beach badge.
                </p>
              </div>

              {beachTransportServices.map((t, i) => (
                <div key={i} className="lc">
                  <div className="lc-head" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 28, lineHeight: 1, marginTop: 2 }}>{TRANSPORT_ICONS[t.type] ?? '🚐'}</span>
                      <div>
                        <h3 className="lc-name" style={{ fontSize: 22 }}>{t.name}</h3>
                        <p className="lc-sub">{t.town}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--moss)', background: 'rgba(107,142,92,0.1)', padding: '5px 12px', borderRadius: 4, flexShrink: 0 }}>
                      FREE
                    </span>
                  </div>
                  <div className="st-row c2" style={{ marginTop: 18 }}>
                    <div className="st">
                      <div className="st-lbl">Season</div>
                      <div className="st-val" style={{ fontSize: 16 }}>{t.season}</div>
                    </div>
                    <div className="st">
                      <div className="st-lbl">Drop-offs</div>
                      <div className="st-val" style={{ fontSize: 22 }}>{t.beachDropoffs.length}</div>
                      <div className="st-note">beach locations</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5, marginTop: 14 }}>{t.description}</p>
                  {t.beachDropoffs.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                      {t.beachDropoffs.map((d, j) => (
                        <span key={j} style={{ fontSize: 11, fontWeight: 600, background: 'rgba(72,108,107,0.08)', color: 'var(--teal-deep)', padding: '4px 10px', borderRadius: 4 }}>
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 20, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line-soft)' }}>
                    <a href={`tel:${t.contact}`} style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                      {t.contact}
                    </a>
                    <a href={t.moreInfo} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 12.5, color: 'var(--slate)', fontWeight: 600, textDecoration: 'none' }}>
                      More info ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* RESTROOMS */}
          {tab === 'restrooms' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="aside-card advisory" style={{ marginBottom: 4 }}>
                <p className="aside-title" style={{ fontSize: 15, marginBottom: 6 }}>⚠️ Limited Data</p>
                <p className="aside-body">
                  Only Beach Haven restrooms are verified as of May 2026. Other towns need
                  field research. Know a public restroom we're missing? <strong>We want to add it.</strong>
                </p>
              </div>

              <div className="lc">
                <h3 className="lc-name" style={{ fontSize: 20, marginBottom: 0 }}>Island Overview</h3>
                <div className="st-row" style={{ marginTop: 16 }}>
                  {[
                    { label: 'Verified',   val: restrooms.filter(r => r.verified).length,   color: 'var(--moss)' },
                    { label: 'Accessible', val: restrooms.filter(r => r.accessible).length, color: 'var(--teal-deep)' },
                    { label: 'Showers',    val: restrooms.filter(r => r.showers).length,    color: 'var(--ink)' },
                    { label: 'Changing',   val: restrooms.filter(r => r.changing).length,   color: 'var(--ink)' },
                  ].map(s => (
                    <div key={s.label} className="st">
                      <div className="st-lbl">{s.label}</div>
                      <div className="st-val" style={{ color: s.color }}>{s.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {restrooms.map((r, i) => (
                <div key={i} className="lc">
                  <div className="lc-head" style={{ marginBottom: 0 }}>
                    <div>
                      <h3 className="lc-name" style={{ fontSize: 20 }}>{r.name}</h3>
                      <p className="lc-sub">{r.town} · {r.hours}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ width: 9, height: 9, borderRadius: '50%', background: r.condition === 'good' ? 'var(--moss)' : r.condition === 'fair' ? 'var(--sun)' : 'var(--coral)' }} />
                      {r.verified && <span style={{ fontSize: 10, color: 'var(--moss)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Verified</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
                    {([
                      ['♿ Accessible', r.accessible],
                      ['🚿 Showers',    r.showers],
                      ['👶 Changing',   r.changing],
                      ['🏠 Enclosed',   r.enclosed],
                    ] as [string, boolean][]).map(([label, val], j) => (
                      <span key={j} style={{
                        fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 4,
                        background: val ? 'rgba(107,142,92,0.1)' : 'var(--sand)',
                        color: val ? 'var(--moss)' : 'var(--slate-soft)',
                      }}>
                        {val ? '✓' : '–'} {label}
                      </span>
                    ))}
                  </div>
                  {r.note && (
                    <p style={{ fontSize: 12.5, color: 'var(--slate)', fontStyle: 'italic', lineHeight: 1.4, marginTop: 12 }}>
                      {r.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          <div className="aside-card">
            <p className="aside-title">Island Summary</p>
            <div className="aside-mini">
              <div>
                <div className="st-lbl">Mobi-Mat Sites</div>
                <div className="st-val" style={{ fontSize: 24, marginTop: 4 }}>{accessibleBeaches.filter(b => b.mobiMat).length}</div>
              </div>
              <div>
                <div className="st-lbl">Wheelchair Loans</div>
                <div className="st-val" style={{ fontSize: 24, marginTop: 4 }}>{accessibleBeaches.filter(b => b.wheelchairLoan).length}</div>
              </div>
              <div>
                <div className="st-lbl">Free Transport</div>
                <div className="st-val ok" style={{ fontSize: 24, marginTop: 4 }}>{beachTransportServices.length}</div>
              </div>
              <div>
                <div className="st-lbl">Towns Covered</div>
                <div className="st-val" style={{ fontSize: 24, marginTop: 4 }}>{Object.keys(byTown).length}</div>
              </div>
            </div>
          </div>
          <div className="aside-card advisory">
            <p className="aside-title">Planning Tips</p>
            <ul className="aside-list">
              <li>Call ahead — most programs require reservations</li>
              <li>Mobi-mats are seasonal (Memorial – Labor Day)</li>
              <li>Low tide = firmer sand = easier wheelchair access</li>
              <li>HC parking is usually unrestricted near access points</li>
              <li>Free transport services — see the Transport tab</li>
            </ul>
          </div>
          {tab === 'transport' && (
            <div className="aside-card">
              <p className="aside-title">Beach Gator</p>
              <p className="aside-body">
                Long Beach Township's Beach Gator is one of the largest accessible beach transport
                programs in the US — running since 1992 with 6 vehicles covering 7+ communities
                from Loveladies to Holgate.
              </p>
            </div>
          )}
          {tab === 'restrooms' && (
            <div className="aside-card">
              <p className="aside-title">Quick Tips</p>
              <ul className="aside-list">
                <li>Most beach towns have restrooms at main access points</li>
                <li>Outdoor rinse stations common at mobi-mat locations</li>
                <li>Wawa (Ship Bottom + LBT) — clean, open 24/7</li>
                <li>Restaurants on Long Beach Blvd are generally public-friendly</li>
              </ul>
            </div>
          )}
        </aside>

      </div>
    </div>
  )
}
