import { useState } from 'react'
import { dining, nightlife } from '../data/businesses'
import BizLogo from '../components/BizLogo'

// ─── FILTERS ─────────────────────────────────────────────────────────────────
type CatFilter = { label: string; test: (subcat: string) => boolean }

const CAT_FILTERS: CatFilter[] = [
  { label: 'All',             test: () => true },
  { label: 'Seafood',         test: s => /seafood|raw bar|crab|shellfish|oyster|clam/i.test(s) },
  { label: 'Breakfast',       test: s => /breakfast|bagel|brunch/i.test(s) },
  { label: 'Italian',         test: s => /italian/i.test(s) },
  { label: 'Bar & Grill',     test: s => /bar.*(grill|restaurant)|grill|tavern|sports bar/i.test(s) },
  { label: 'Coffee & Treats', test: s => /coffee|ice cream|bakery|candy|fudge|açaí|custard|waffle|belgian/i.test(s) },
  { label: 'Pizza',           test: s => /pizza/i.test(s) },
  { label: 'Deli',            test: s => /deli|market|cafe|snack/i.test(s) },
]

const TOWNS = ['All', 'Beach Haven', 'Barnegat Light', 'Harvey Cedars', 'Surf City', 'Ship Bottom', 'Long Beach Township', 'Brant Beach', 'Manahawkin']
const NIGHTLIFE_TOWNS = ['All', 'Beach Haven', 'Barnegat Light', 'Harvey Cedars', 'Surf City', 'Ship Bottom', 'Long Beach Township', 'Brant Beach']

const byobCount = dining.filter(b => /BYOB/i.test(b.note ?? '')).length

export default function EatPage() {
  const [tab, setTab]               = useState<'eats' | 'nightlife'>('eats')
  const [catFilter, setCatFilter]   = useState('All')
  const [townFilter, setTownFilter] = useState('All')
  const [nightlifeTown, setNightlifeTown] = useState('All')

  const activeCatTest = CAT_FILTERS.find(f => f.label === catFilter)?.test ?? (() => true)

  const filteredEats = dining.filter(b => {
    if (townFilter !== 'All' && b.town !== townFilter) return false
    if (catFilter  !== 'All' && !activeCatTest(b.subcat)) return false
    return true
  })

  return (
    <div className="pg-wrap">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <span>Eat &amp; Drink</span>
          <span className="rule" />
          <span>LBI · {dining.length + nightlife.length} spots</span>
        </div>
        <h1>Eat &amp; <em>Drink</em></h1>
        <p className="pg-lede">
          <b>{dining.length} restaurants</b> and <b>{nightlife.length} bars</b> across Long
          Beach Island — seafood shacks, raw bars, Italian, BYOB gems &amp; nightlife.
        </p>
        <div className="pg-tabs">
          <button
            className={`pg-tab${tab === 'eats' ? ' active' : ''}`}
            onClick={() => setTab('eats')}
          >
            <span className="tab-lbl">Restaurants</span>
            <span className="tab-val">{dining.length}</span>
          </button>
          <button
            className={`pg-tab${tab === 'nightlife' ? ' active' : ''}`}
            onClick={() => setTab('nightlife')}
          >
            <span className="tab-lbl">Bars &amp; Nightlife</span>
            <span className="tab-val">{nightlife.length}</span>
          </button>
          <button className="pg-tab" style={{ pointerEvents: 'none' }}>
            <span className="tab-lbl">BYOB</span>
            <span className="tab-val">{byobCount}</span>
          </button>
        </div>
      </div>

      <div className="pg-grid">

        {/* ── Main column ────────────────────────────────────────────────────── */}
        <div>

          {/* RESTAURANTS */}
          {tab === 'eats' && (
            <>
              <div className="pg-chips">
                {CAT_FILTERS.map(f => (
                  <button
                    key={f.label}
                    className={`pg-chip${catFilter === f.label ? ' on' : ''}`}
                    onClick={() => setCatFilter(f.label)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="pg-chips" style={{ marginBottom: 24 }}>
                {TOWNS.map(t => (
                  <button
                    key={t}
                    className={`pg-chip${townFilter === t ? ' on' : ''}`}
                    onClick={() => setTownFilter(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <p style={{ fontSize: 12, color: 'var(--slate-soft)', marginBottom: 18 }}>
                {filteredEats.length} spot{filteredEats.length !== 1 ? 's' : ''} ·
                Hours vary — always call ahead in summer
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {filteredEats.map(b => {
                  const isByob = /BYOB/i.test(b.note ?? '')
                  return (
                    <div key={b.id} className="lc">
                      <div className="lc-head" style={{ marginBottom: 0 }}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                          <BizLogo name={b.name} web={b.web} />
                          <div>
                            <h3 className="lc-name" style={{ fontSize: 20 }}>{b.name}</h3>
                            <p className="lc-sub">{b.town} · {b.subcat}</p>
                          </div>
                        </div>
                        {isByob && (
                          <span style={{
                            fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
                            fontWeight: 700, color: 'var(--teal-deep)', background: 'rgba(72,108,107,0.08)',
                            padding: '4px 10px', borderRadius: 4, flexShrink: 0,
                          }}>
                            BYOB
                          </span>
                        )}
                      </div>
                      {b.note && (
                        <p style={{ fontSize: 12.5, color: 'var(--slate)', lineHeight: 1.45, marginTop: 12, fontStyle: 'italic' }}>
                          {b.note}
                        </p>
                      )}
                      {(b.phone || b.web) && (
                        <div style={{ display: 'flex', gap: 20, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line-soft)' }}>
                          {b.phone && (
                            <a href={`tel:${b.phone}`} style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                              {b.phone}
                            </a>
                          )}
                          {b.web && (
                            <a href={b.web} target="_blank" rel="noopener noreferrer"
                              style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                              Website →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
                {filteredEats.length === 0 && (
                  <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--slate)' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>Nothing matches those filters</p>
                    <p style={{ fontSize: 13, marginTop: 6 }}>Try a different category or town</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* BARS & NIGHTLIFE */}
          {tab === 'nightlife' && (
            <>
              <div className="pg-chips" style={{ marginBottom: 24 }}>
                {NIGHTLIFE_TOWNS.map(t => (
                  <button
                    key={t}
                    className={`pg-chip${nightlifeTown === t ? ' on' : ''}`}
                    onClick={() => setNightlifeTown(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {nightlife
                  .filter(n => nightlifeTown === 'All' || n.town === nightlifeTown)
                  .map(n => (
                    <div key={n.id} className="lc">
                      <div className="lc-head" style={{ marginBottom: 0 }}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                          <BizLogo name={n.name} web={n.web} />
                          <div>
                            <h3 className="lc-name" style={{ fontSize: 20 }}>{n.name}</h3>
                            <p className="lc-sub">{n.town} · {n.subcat}</p>
                          </div>
                        </div>
                      </div>
                      {n.note && (
                        <p style={{ fontSize: 12.5, color: 'var(--slate)', lineHeight: 1.45, marginTop: 12 }}>
                          {n.note}
                        </p>
                      )}
                      {(n.phone || n.web) && (
                        <div style={{ display: 'flex', gap: 20, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line-soft)' }}>
                          {n.phone && (
                            <a href={`tel:${n.phone}`} style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                              {n.phone}
                            </a>
                          )}
                          {n.web && (
                            <a href={n.web} target="_blank" rel="noopener noreferrer"
                              style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                              Website →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </>
          )}

        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          <div className="aside-card advisory">
            <p className="aside-title">BYOB Guide</p>
            <p className="aside-body">
              Many LBI restaurants are BYOB — look for the badge on each listing.
              Kubel's, Stefano's, and Raimondo's are classics. Always call ahead to confirm.
            </p>
          </div>
          <div className="aside-card">
            <p className="aside-title">Island Tip</p>
            <p className="aside-body">
              In July and August, waits at top spots can hit 1–2 hours on weekends.
              Go early, eat late, or try the north end (Barnegat Light) for shorter waits.
            </p>
          </div>
          <div className="aside-card">
            <p className="aside-title">Quick Stats</p>
            <div className="aside-mini">
              <div>
                <div className="st-lbl">Restaurants</div>
                <div className="st-val" style={{ fontSize: 26, marginTop: 4 }}>{dining.length}</div>
              </div>
              <div>
                <div className="st-lbl">Bars</div>
                <div className="st-val" style={{ fontSize: 26, marginTop: 4 }}>{nightlife.length}</div>
              </div>
              <div>
                <div className="st-lbl">BYOB Spots</div>
                <div className="st-val" style={{ fontSize: 26, marginTop: 4 }}>{byobCount}</div>
              </div>
              <div>
                <div className="st-lbl">Total</div>
                <div className="st-val" style={{ fontSize: 26, marginTop: 4 }}>{dining.length + nightlife.length}</div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}
