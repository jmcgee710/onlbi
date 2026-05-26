import { useState } from 'react'
import { Link } from 'react-router-dom'
import { beaches } from '../data/beaches'
import { beachBadgeInfo } from '../data/beachBadges'

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const badgeByTown = Object.fromEntries(
  beachBadgeInfo.map(b => [b.townSlug, b.pricing.daily])
)

function fmtPrice(n: number | 'free' | undefined): string {
  if (!n || n === 0) return '⚠️ call'
  if (n === 'free') return 'Free'
  return `$${n}`
}

function shortHours(h: string): { text: string; tone: 'ok' | 'warn' } {
  if (h.includes('Verify')) return { text: 'Verify', tone: 'warn' }
  const m = h.match(/(\d+(?:am|pm)–\d+(?:am|pm))/)
  return { text: m ? m[1] : '10–5', tone: 'ok' }
}

function shortDogs(d: string): { text: string; sub: string } {
  if (d.includes('Verify')) return { text: 'Verify', sub: 'check town rules' }
  if (d.includes('No dogs')) {
    const range = d.match(/(\w+ \d+[–—]\w+ \d+)/)
    return { text: 'Seasonal', sub: range ? range[1] : 'restricted' }
  }
  if (d.includes('Sept 16')) return { text: 'Allowed', sub: 'Sept 16–May 14' }
  return { text: 'Varies', sub: d.slice(0, 28) }
}

type BadgeTab = 'conditions' | 'badges' | 'weather'

export default function BeachesPage() {
  const [tab, setTab]               = useState<BadgeTab>('conditions')
  const [lifeguardOnly, setLifeguardOnly] = useState(false)
  const [accessibleOnly, setAccessibleOnly] = useState(false)

  const filtered = beaches.filter(b => {
    if (lifeguardOnly && !b.lifeguarded) return false
    if (accessibleOnly && !b.mobiMatStreets?.length) return false
    return true
  })

  const dailyPrices = beachBadgeInfo.map(b => b.pricing.daily).filter(p => p > 0)
  const minPrice = dailyPrices.length ? Math.min(...dailyPrices) : 10
  const maxPrice = dailyPrices.length ? Math.max(...dailyPrices) : 15

  return (
    <div className="pg-wrap">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <span>LBI · New Jersey</span>
          <span className="rule" />
          <span>2026 Season</span>
        </div>
        <h1>LBI <em>Beaches</em></h1>
        <p className="pg-lede">
          <b>6 municipalities,</b> 18 miles of barrier island. Badge prices, lifeguard
          hours, beach rules &amp; accessibility — all in one place.
        </p>
        <div className="pg-tabs">
          {([
            ['conditions', 'Conditions',   '6', 'towns'],
            ['badges',     'Badge Prices', `$${minPrice}–$${maxPrice}`, ''],
            ['weather',    'Weather',      'NOAA', ''],
          ] as [BadgeTab, string, string, string][]).map(([t, lbl, val, em]) => (
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

          {/* CONDITIONS */}
          {tab === 'conditions' && (
            <>
              <div className="pg-chips">
                <span className="st-lbl" style={{ marginRight: 4, color: 'var(--slate-soft)' }}>Filter</span>
                <button
                  className={`pg-chip${lifeguardOnly ? ' on' : ''}`}
                  onClick={() => setLifeguardOnly(v => !v)}
                >
                  🛟 Lifeguarded
                  <span className="ct">{beaches.filter(b => b.lifeguarded).length}</span>
                </button>
                <button
                  className={`pg-chip${accessibleOnly ? ' on' : ''}`}
                  onClick={() => setAccessibleOnly(v => !v)}
                >
                  ♿ Accessible
                  <span className="ct">{beaches.filter(b => b.mobiMatStreets?.length).length}</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {filtered.map(b => {
                  const hrs = shortHours(b.lifeguardHours)
                  const dogs = shortDogs(b.dogRules)
                  const daily = badgeByTown[b.townSlug]
                  return (
                    <Link key={b.townSlug} to={`/beaches/${b.townSlug}`} style={{ textDecoration: 'none' }}>
                      <div className="lc">
                        <div className="lc-head">
                          <div>
                            <h3 className="lc-name">{b.name}</h3>
                            <p className="lc-sub">{b.highlight}</p>
                          </div>
                          <span className="lc-cta">Details →</span>
                        </div>
                        <div className="st-row">
                          <div className="st">
                            <div className="st-lbl">Lifeguard</div>
                            <div className={`st-val${hrs.tone === 'warn' ? ' warn' : ''}`} style={{ fontSize: 18 }}>
                              {hrs.text}
                            </div>
                            <div className="st-note">June–Labor Day</div>
                          </div>
                          <div className="st">
                            <div className="st-lbl">Badge</div>
                            <div className="st-val">{daily ? `$${daily}` : '⚠️'}</div>
                            <div className="st-note">12+ · daily</div>
                          </div>
                          <div className="st">
                            <div className="st-lbl">Dogs</div>
                            <div className={`st-val${dogs.text === 'Verify' ? ' warn' : ''}`} style={{ fontSize: 18 }}>
                              {dogs.text}
                            </div>
                            <div className="st-note">{dogs.sub}</div>
                          </div>
                          <div className="st">
                            <div className="st-lbl">Season</div>
                            <div className="st-val" style={{ fontSize: 16 }}>June–<em>Sept</em></div>
                          </div>
                        </div>
                        {(b.beachTram || b.bayBeach || b.mobiMatStreets?.length || b.noFreeDay) && (
                          <div className="lc-feats">
                            {b.beachTram && (
                              <span className="lc-feat">🚌 Beach tram available</span>
                            )}
                            {b.bayBeach && (
                              <span className="lc-feat">🌊 Bay beach</span>
                            )}
                            {!!b.mobiMatStreets?.length && (
                              <span className="lc-feat">♿ Mobi-Mat · {b.mobiMatStreets.length} access streets</span>
                            )}
                            {b.noFreeDay && (
                              <span className="lc-feat">🎫 {b.noFreeDay}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </Link>
                  )
                })}
                {filtered.length === 0 && (
                  <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--slate)' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>No beaches match those filters</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* BADGE PRICES */}
          {tab === 'badges' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="aside-card advisory" style={{ marginBottom: 4 }}>
                <p className="aside-title" style={{ fontSize: 15, marginBottom: 6 }}>
                  2026 Badge Prices — Verified May 2026
                </p>
                <p className="aside-body">
                  Under 12 always free. Prices below are for guests 12 and older. Pre-season seasonal badges offer the best
                  per-day value. <a href="https://mybeachmobile.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal-deep)', textDecoration: 'none', borderBottom: '1px solid rgba(72,108,107,0.35)' }}>My Beach Mobile app</a> accepted at select towns.
                </p>
              </div>
              {beachBadgeInfo.map(b => (
                <div key={b.townSlug} className="lc">
                  <div className="lc-head">
                    <div>
                      <h3 className="lc-name">{b.townName}</h3>
                      <p className="lc-sub">{b.badgeOffice.location}</p>
                    </div>
                    {b.pricing.digitalApp && (
                      <span className="lc-cta" style={{ fontSize: 11, color: 'var(--teal-deep)' }}>App ✓</span>
                    )}
                  </div>
                  <div className="st-row">
                    <div className="st">
                      <div className="st-lbl">Daily</div>
                      <div className="st-val">${b.pricing.daily}</div>
                    </div>
                    <div className="st">
                      <div className="st-lbl">Weekly</div>
                      <div className="st-val">${b.pricing.weekly}</div>
                    </div>
                    <div className="st">
                      <div className="st-lbl">Pre-Season</div>
                      <div className="st-val">${b.pricing.preseason}</div>
                      <div className="st-note">by {b.pricing.preseasonDeadline}</div>
                    </div>
                    <div className="st">
                      <div className="st-lbl">Senior 65+</div>
                      <div className="st-val">{fmtPrice(b.pricing.senior)}</div>
                      <div className="st-note">{b.pricing.seniorType}</div>
                    </div>
                  </div>
                  <div className="lc-feats">
                    {b.pricing.veteranDaily === 'free' && (
                      <span className="lc-feat">🇺🇸 Veterans — free daily</span>
                    )}
                    {b.pricing.veteranLifetime === 'free' && (
                      <span className="lc-feat">🇺🇸 Veterans — free lifetime</span>
                    )}
                    {b.pricing.cashOnly && (
                      <span className="lc-feat dim">💵 Cash/check only on beach</span>
                    )}
                    <a
                      href={b.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lc-feat"
                      style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}
                    >
                      Official source ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* WEATHER */}
          {tab === 'weather' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="lc">
                <div className="lc-head" style={{ marginBottom: 0 }}>
                  <h3 className="lc-name">Bay vs. Ocean</h3>
                </div>
                <div className="st-row c2" style={{ marginTop: 18 }}>
                  <div className="st">
                    <div className="st-lbl">Ocean Side</div>
                    <div className="st-val" style={{ fontSize: 18 }}>Waves + surf</div>
                    <div className="st-note">2–4 ft typical · rip current risk</div>
                  </div>
                  <div className="st">
                    <div className="st-lbl">Bay Side</div>
                    <div className="st-val ok" style={{ fontSize: 18 }}>Calm &amp; warm</div>
                    <div className="st-note">Great for young swimmers &amp; paddleboards</div>
                  </div>
                </div>
              </div>
              <div className="lc">
                <div className="lc-head" style={{ marginBottom: 0 }}>
                  <h3 className="lc-name">UV &amp; Sun Safety</h3>
                </div>
                <div className="st-row c3" style={{ marginTop: 18 }}>
                  <div className="st">
                    <div className="st-lbl">SPF Recommended</div>
                    <div className="st-val">30<em>+</em></div>
                    <div className="st-note">Reapply every 2 hrs</div>
                  </div>
                  <div className="st">
                    <div className="st-lbl">Peak UV Hours</div>
                    <div className="st-val" style={{ fontSize: 17 }}>10am–<em>2pm</em></div>
                    <div className="st-note">Seek shade or cover up</div>
                  </div>
                  <div className="st">
                    <div className="st-lbl">Live Conditions</div>
                    <div className="st-val" style={{ fontSize: 17 }}><a href="https://safebeachday.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>NOAA ↗</a></div>
                    <div className="st-note">safebeachday.com</div>
                  </div>
                </div>
              </div>
              <div className="lc">
                <div className="lc-head" style={{ marginBottom: 12 }}>
                  <h3 className="lc-name">Season Quick Reference</h3>
                </div>
                <div className="st-row">
                  <div className="st">
                    <div className="st-lbl">Lifeguards</div>
                    <div className="st-val" style={{ fontSize: 16 }}>Mid-June–<em>Labor Day</em></div>
                  </div>
                  <div className="st">
                    <div className="st-lbl">Badges Required</div>
                    <div className="st-val" style={{ fontSize: 16 }}>Memorial–<em>Labor Day</em></div>
                  </div>
                  <div className="st">
                    <div className="st-lbl">Water Temp</div>
                    <div className="st-val">62–<em>75°F</em></div>
                    <div className="st-note">July peak</div>
                  </div>
                  <div className="st">
                    <div className="st-lbl">Rip Risk</div>
                    <div className="st-val warn" style={{ fontSize: 16 }}>Moderate</div>
                    <div className="st-note">swim near guards</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          <div className="aside-card advisory">
            <p className="aside-title">🌊 Rip Current Safety</p>
            <p className="aside-body">
              Always swim near a lifeguard stand. If caught in a rip, swim <strong>parallel</strong> to
              shore — never fight it straight toward shore. Check{' '}
              <a href="https://safebeachday.com" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--teal-deep)', textDecoration: 'none', borderBottom: '1px solid rgba(72,108,107,0.35)' }}>
                safebeachday.com
              </a>{' '}
              for today's rip forecast.
            </p>
          </div>
          <div className="aside-card">
            <p className="aside-title">Season Dates</p>
            <div className="aside-mini">
              <div>
                <div className="st-lbl">Badge Season</div>
                <div className="st-val" style={{ fontSize: 16, marginTop: 4 }}>Memorial–Labor Day</div>
              </div>
              <div>
                <div className="st-lbl">Guards On Duty</div>
                <div className="st-val" style={{ fontSize: 16, marginTop: 4 }}>Mid-June–Labor Day</div>
              </div>
              <div>
                <div className="st-lbl">Under 12</div>
                <div className="st-val ok" style={{ fontSize: 16, marginTop: 4 }}>Always Free</div>
              </div>
              <div>
                <div className="st-lbl">Pre-Season Ends</div>
                <div className="st-val" style={{ fontSize: 16, marginTop: 4 }}>Early June</div>
              </div>
            </div>
          </div>
          <div className="aside-card">
            <p className="aside-title">Swim Safety Tips</p>
            <ul className="aside-list">
              <li>Swim between the flags — always</li>
              <li>Ask a lifeguard about rip channels before entering</li>
              <li>Buddy system — never swim alone</li>
              <li>Stay out of the water during lightning</li>
              <li>Check conditions at safebeachday.com</li>
            </ul>
          </div>
          <div
            style={{
              background: 'var(--ink)', color: 'var(--shell)', borderRadius: 8,
              padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16,
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--coral)', fontWeight: 700, marginBottom: 6 }}>
                Live Conditions
              </div>
              <div style={{ fontSize: 14 }}>
                <strong>safebeachday.com</strong> — daily rip current forecast by beach
              </div>
            </div>
            <a
              href="https://safebeachday.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--shell)', fontSize: 18, textDecoration: 'none', flexShrink: 0 }}
            >
              →
            </a>
          </div>
        </aside>

      </div>
    </div>
  )
}
