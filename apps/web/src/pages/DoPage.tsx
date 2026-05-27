import { useState } from 'react'
import { waterSports, entertainment, shopping, type Business } from '../data/businesses'
import BizLogo from '../components/BizLogo'

// ─── TYPES ───────────────────────────────────────────────────────────────────
type MainTab = 'do' | 'shop'

// ─── DO filters ──────────────────────────────────────────────────────────────
type DoCat = 'All' | 'Water Sports & Rentals' | 'Entertainment' | 'Parks & Nature'
const DO_CATS: DoCat[] = ['All', 'Water Sports & Rentals', 'Entertainment', 'Parks & Nature']
const doItems: Business[] = [...waterSports, ...entertainment]

// ─── SHOP filters ─────────────────────────────────────────────────────────────
type ShopCat = 'All' | 'Surf & Sport' | 'Apparel & Gifts' | 'Home & Decor' | 'Food & Convenience'
const SHOP_CATS: ShopCat[] = ['All', 'Surf & Sport', 'Apparel & Gifts', 'Home & Decor', 'Food & Convenience']

function matchShopCat(subcat: string, cat: ShopCat): boolean {
  if (cat === 'All') return true
  if (cat === 'Surf & Sport')
    return /surf|bike|sport|rentals|paddle|water/i.test(subcat)
  if (cat === 'Apparel & Gifts')
    return /apparel|clothing|boutique|gift|jewelry|souvenir|printing|department/i.test(subcat)
  if (cat === 'Home & Decor')
    return /home|decor|furniture|design|antique|garden/i.test(subcat)
  if (cat === 'Food & Convenience')
    return /market|deli|butcher|candy|pharmacy|liquor|convenience|grocery|seafood market/i.test(subcat)
  return true
}

const TOWNS = ['All', 'Beach Haven', 'Barnegat Light', 'Harvey Cedars', 'Surf City', 'Ship Bottom', 'Long Beach Township', 'Brant Beach', 'Holgate']

const DO_CAT_COLOR: Record<string, { color: string; bg: string }> = {
  'Water Sports & Rentals': { color: 'var(--teal-deep)', bg: 'rgba(72,108,107,0.08)' },
  'Entertainment':          { color: 'var(--moss)',      bg: 'rgba(107,142,92,0.1)' },
}

// Module-level so it's always available in JSX renders
const PARK_SUBCATS = /park|nature|dog park|wildlife|boat ramp|bay beach/i

export default function DoPage() {
  const [tab, setTab]           = useState<MainTab>('do')
  const [doCat, setDoCat]       = useState<DoCat>('All')
  const [shopCat, setShopCat]   = useState<ShopCat>('All')
  const [townFilter, setTownFilter] = useState('All')

  const filteredDo = doItems.filter(a => {
    if (townFilter !== 'All' && a.town !== townFilter) return false
    if (doCat === 'Parks & Nature') return PARK_SUBCATS.test(a.subcat)
    if (doCat !== 'All' && a.cat !== doCat) return false
    return true
  })

  const filteredShop = shopping.filter(s => {
    if (!matchShopCat(s.subcat, shopCat)) return false
    if (townFilter !== 'All' && s.town !== townFilter) return false
    return true
  })

  return (
    <div className="pg-wrap">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <span>Do &amp; Shop</span>
          <span className="rule" />
          <span>LBI · Water Sports · Entertainment · Shopping</span>
        </div>
        <h1><em>Do</em> &amp; Shop</h1>
        <p className="pg-lede">
          <b>{doItems.length} activities</b> and <b>{shopping.length} shops</b> across Long Beach Island —
          surf lessons, boat rentals, amusements, parks, boutiques, surf shops &amp; more.
        </p>
        <div className="pg-tabs">
          <button
            className={`pg-tab${tab === 'do' ? ' active' : ''}`}
            onClick={() => setTab('do')}
          >
            <span className="tab-lbl">Things To Do</span>
            <span className="tab-val">{doItems.length}</span>
          </button>
          <button
            className={`pg-tab${tab === 'shop' ? ' active' : ''}`}
            onClick={() => setTab('shop')}
          >
            <span className="tab-lbl">Shopping</span>
            <span className="tab-val">{shopping.length}</span>
          </button>
          <button
            className={`pg-tab${tab === 'do' && doCat === 'Water Sports & Rentals' ? ' active' : ''}`}
            onClick={() => { setTab('do'); setDoCat('Water Sports & Rentals') }}
          >
            <span className="tab-lbl">Water Sports</span>
            <span className="tab-val">{waterSports.length}</span>
          </button>
          <button
            className={`pg-tab${tab === 'do' && doCat === 'Entertainment' ? ' active' : ''}`}
            onClick={() => { setTab('do'); setDoCat('Entertainment') }}
          >
            <span className="tab-lbl">Entertainment</span>
            <span className="tab-val">{entertainment.length}</span>
          </button>
        </div>
      </div>

      <div className="pg-grid">

        {/* ── Main column ────────────────────────────────────────────────────── */}
        <div>

          {/* ── DO TAB ──────────────────────────────────────────────────────── */}
          {tab === 'do' && (
            <>
              <div className="pg-chips">
                {DO_CATS.map(c => (
                  <button
                    key={c}
                    className={`pg-chip${doCat === c ? ' on' : ''}`}
                    onClick={() => setDoCat(c)}
                  >
                    {c}
                    {c !== 'All' && (
                      <span className="ct">
                        {c === 'Parks & Nature'
                          ? doItems.filter(a => PARK_SUBCATS.test(a.subcat)).length
                          : doItems.filter(a => a.cat === c).length}
                      </span>
                    )}
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
                {filteredDo.length} result{filteredDo.length !== 1 ? 's' : ''} ·
                Hours &amp; availability vary — call ahead to confirm
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {filteredDo.map(a => {
                  const cc = DO_CAT_COLOR[a.cat] ?? { color: 'var(--slate)', bg: 'var(--sand)' }
                  return (
                    <div key={a.id} className="lc">
                      <div className="lc-head" style={{ marginBottom: 0 }}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                          <BizLogo name={a.name} web={a.web} />
                          <div>
                            <h3 className="lc-name" style={{ fontSize: 20 }}>{a.name}</h3>
                            <p className="lc-sub">{a.town} · {a.subcat}</p>
                          </div>
                        </div>
                        <span style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: cc.color, background: cc.bg, padding: '4px 10px', borderRadius: 4, flexShrink: 0 }}>
                          {a.cat}
                        </span>
                      </div>
                      {a.note && (
                        <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.45, marginTop: 12 }}>{a.note}</p>
                      )}
                      {(a.phone || a.web || a.address) && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line-soft)', alignItems: 'center' }}>
                          {a.phone && <a href={`tel:${a.phone}`} style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>{a.phone}</a>}
                          {a.web && <a href={a.web} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>Website →</a>}
                          {a.address && <span style={{ fontSize: 12, color: 'var(--slate-soft)', marginLeft: 'auto' }}>{a.address}</span>}
                        </div>
                      )}
                    </div>
                  )
                })}
                {filteredDo.length === 0 && (
                  <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--slate)' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>Nothing matches those filters</p>
                    <p style={{ fontSize: 13, marginTop: 6 }}>Try a different category or town</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── SHOP TAB ────────────────────────────────────────────────────── */}
          {tab === 'shop' && (
            <>
              <div className="pg-chips">
                {SHOP_CATS.map(c => (
                  <button
                    key={c}
                    className={`pg-chip${shopCat === c ? ' on' : ''}`}
                    onClick={() => setShopCat(c)}
                  >
                    {c}
                    {c !== 'All' && <span className="ct">{shopping.filter(s => matchShopCat(s.subcat, c)).length}</span>}
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
                {filteredShop.length} shop{filteredShop.length !== 1 ? 's' : ''}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {filteredShop.map(s => (
                  <div key={s.id} className="lc">
                    <div className="lc-head" style={{ marginBottom: 0 }}>
                      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <BizLogo name={s.name} web={s.web} />
                        <div>
                          <h3 className="lc-name" style={{ fontSize: 20 }}>{s.name}</h3>
                          <p className="lc-sub">{s.town} · {s.subcat}</p>
                        </div>
                      </div>
                    </div>
                    {s.note && (
                      <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.45, marginTop: 12 }}>{s.note}</p>
                    )}
                    {(s.phone || s.web || s.address) && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line-soft)', alignItems: 'center' }}>
                        {s.phone && <a href={`tel:${s.phone}`} style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>{s.phone}</a>}
                        {s.web && <a href={s.web} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>Website →</a>}
                        {s.address && <span style={{ fontSize: 12, color: 'var(--slate-soft)', marginLeft: 'auto' }}>{s.address}</span>}
                      </div>
                    )}
                  </div>
                ))}
                {filteredShop.length === 0 && (
                  <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--slate)' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>Nothing matches those filters</p>
                    <p style={{ fontSize: 13, marginTop: 6 }}>Try a different category or town</p>
                  </div>
                )}
              </div>
            </>
          )}

        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          {tab === 'do' ? (
            <>
              <div className="aside-card">
                <p className="aside-title">🚲 18-Mile Bike Path</p>
                <p className="aside-body">
                  Runs end-to-end from Barnegat Light to Holgate along the bay side.
                  Rent a cruiser and ride the whole island — a bucket-list LBI experience.
                </p>
              </div>
              <div className="aside-card">
                <p className="aside-title">Water Sports</p>
                <ul className="aside-list">
                  <li>Pontoon boat rentals island-wide</li>
                  <li>Surf lessons for all levels</li>
                  <li>Kayak &amp; SUP rentals on the bay</li>
                  <li>Head boat fishing — Viking Village</li>
                  <li>Parasailing out of Beach Haven</li>
                </ul>
              </div>
              <div className="aside-card advisory">
                <p className="aside-title">Beach Haven</p>
                <p className="aside-body">
                  Most of LBI's amusements, mini golf, and family entertainment is
                  in Beach Haven. Fantasy Island and Thundering Surf are classics.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="aside-card">
                <p className="aside-title">Shopping Tips</p>
                <ul className="aside-list">
                  <li>Bay Village (Beach Haven) has the highest concentration of boutiques</li>
                  <li>Ron Jon in Ship Bottom is open 24/7, year-round</li>
                  <li>Farias has six locations across LBI — surf gear and bikes</li>
                  <li>Oskar Huber in Ship Bottom for high-end coastal furnishings</li>
                </ul>
              </div>
              <div className="aside-card advisory">
                <p className="aside-title">Surf Shops</p>
                <p className="aside-body">
                  Multiple surf shops offer board rentals, lessons, and gear.
                  Most are open daily in season — call ahead off-season.
                </p>
              </div>
            </>
          )}
        </aside>

      </div>
    </div>
  )
}
