import { useState } from 'react'
import { waterSports, entertainment, type Business } from '../data/businesses'

const doItems: Business[] = [...waterSports, ...entertainment]

const TOWNS = ['All', 'Beach Haven', 'Barnegat Light', 'Harvey Cedars', 'Surf City', 'Ship Bottom', 'Long Beach Township', 'Brant Beach', 'Holgate']

type CatKey = 'All' | 'Water Sports & Rentals' | 'Entertainment'
const CATS: CatKey[] = ['All', 'Water Sports & Rentals', 'Entertainment']

const CAT_ICON: Record<string, string> = {
  'Water Sports & Rentals': '🌊',
  'Entertainment': '🎡',
}

export default function DoPage() {
  const [catFilter, setCatFilter]   = useState<CatKey>('All')
  const [townFilter, setTownFilter] = useState('All')

  const filtered = doItems.filter(a => {
    if (catFilter  !== 'All' && a.cat  !== catFilter)  return false
    if (townFilter !== 'All' && a.town !== townFilter) return false
    return true
  })

  return (
    <div className="pg-wrap">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <span>Things To Do</span>
          <span className="rule" />
          <span>LBI · Water Sports · Entertainment</span>
        </div>
        <h1><em>Things</em> To Do</h1>
        <p className="pg-lede">
          <b>{doItems.length} activities</b> across Long Beach Island — surf lessons, kayak tours,
          pontoon rentals, mini golf, amusements &amp; more.
        </p>
        <div className="pg-tabs">
          <button className="pg-tab active" style={{ pointerEvents: 'none' }}>
            <span className="tab-lbl">All Activities</span>
            <span className="tab-val">{doItems.length}</span>
          </button>
          <button className="pg-tab" style={{ pointerEvents: 'none' }}>
            <span className="tab-lbl">Water Sports</span>
            <span className="tab-val">{waterSports.length}</span>
          </button>
          <button className="pg-tab" style={{ pointerEvents: 'none' }}>
            <span className="tab-lbl">Entertainment</span>
            <span className="tab-val">{entertainment.length}</span>
          </button>
        </div>
      </div>

      <div className="pg-grid">

        {/* ── Main column ────────────────────────────────────────────────────── */}
        <div>
          {/* Category chips */}
          <div className="pg-chips">
            {CATS.map(c => (
              <button
                key={c}
                className={`pg-chip${catFilter === c ? ' on' : ''}`}
                onClick={() => setCatFilter(c)}
              >
                {CAT_ICON[c] && <span>{CAT_ICON[c]}</span>}
                {c}
                {c !== 'All' && (
                  <span className="ct">{doItems.filter(a => a.cat === c).length}</span>
                )}
              </button>
            ))}
          </div>

          {/* Town chips */}
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
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} ·
            Hours &amp; availability vary — call ahead to confirm
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map(a => (
              <div key={a.id} className="lc">
                <div className="lc-head" style={{ marginBottom: 0 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 30, lineHeight: 1, marginTop: 2 }}>{a.icon}</span>
                    <div>
                      <h3 className="lc-name" style={{ fontSize: 20 }}>{a.name}</h3>
                      <p className="lc-sub">{a.town} · {a.subcat}</p>
                    </div>
                  </div>
                  <span style={{
                    fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
                    color: a.cat === 'Water Sports & Rentals' ? 'var(--teal-deep)' : 'var(--moss)',
                    background: a.cat === 'Water Sports & Rentals' ? 'rgba(72,108,107,0.08)' : 'rgba(107,142,92,0.1)',
                    padding: '4px 10px', borderRadius: 4, flexShrink: 0,
                  }}>
                    {CAT_ICON[a.cat]} {a.cat}
                  </span>
                </div>

                {a.note && (
                  <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.45, marginTop: 12 }}>
                    {a.note}
                  </p>
                )}

                {(a.phone || a.web) && (
                  <div style={{ display: 'flex', gap: 20, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line-soft)' }}>
                    {a.phone && (
                      <a href={`tel:${a.phone}`} style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                        {a.phone}
                      </a>
                    )}
                    {a.web && (
                      <a href={a.web} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                        Website →
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}

            {filtered.length === 0 && (
              <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--slate)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>Nothing matches those filters</p>
                <p style={{ fontSize: 13, marginTop: 6 }}>Try a different category or town</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          <div className="aside-card">
            <p className="aside-title">🚲 18-Mile Bike Path</p>
            <p className="aside-body">
              Runs end-to-end from Barnegat Light to Holgate along the bay side.
              Rent a cruiser and ride the whole island — a bucket-list LBI experience.
              Multiple rental shops island-wide.
            </p>
          </div>
          <div className="aside-card">
            <p className="aside-title">Water Sports</p>
            <ul className="aside-list">
              <li>Pontoon boat rentals available island-wide</li>
              <li>Surf lessons for all levels — multiple shops</li>
              <li>Kayak &amp; SUP rentals on the bay side</li>
              <li>Head boat fishing from Viking Village (north)</li>
              <li>Parasailing out of Beach Haven</li>
            </ul>
          </div>
          <div className="aside-card advisory">
            <p className="aside-title">Beach Haven</p>
            <p className="aside-body">
              Most of LBI's amusement parks, mini golf, and family entertainment is
              concentrated in Beach Haven at the south end. Plan at least an evening there —
              Fantasy Island and Thundering Surf are classics.
            </p>
          </div>
        </aside>

      </div>
    </div>
  )
}
