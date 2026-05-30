import { Link } from 'react-router-dom'
import { townGuides } from '../data/townGuides'
import { beachBadgeInfo } from '../data/beachBadges'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const badgeByTown = Object.fromEntries(
  beachBadgeInfo.map(b => [b.townSlug, b.pricing.daily])
)

// Order north → south so the page reads geographically
const ORDER = [
  'barnegat-light',
  'harvey-cedars',
  'surf-city',
  'ship-bottom',
  'long-beach-township',
  'beach-haven',
]

export default function TownsPage() {
  useDocumentMeta({
    title: 'LBI Town Guides: 6 Long Beach Island Towns Compared',
    description:
      'Compare all six Long Beach Island towns — Barnegat Light, Harvey Cedars, Surf City, Ship Bottom, Long Beach Township, and Beach Haven. Pick the right one for your visit.',
  })

  const ordered = ORDER
    .map(slug => townGuides.find(t => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))

  return (
    <div className="pg-wrap">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <span>LBI · New Jersey</span>
          <span className="rule" />
          <span>6 towns · 18 miles</span>
        </div>
        <h1>LBI <em>Towns</em></h1>
        <p className="pg-lede">
          <b>Six distinct municipalities</b> stretch 18 miles down Long Beach Island —
          each with its own personality, beach badges, and pace. Pick the one that
          matches your trip.
        </p>
        <div className="pg-tabs pg-tabs-static" style={{ pointerEvents: 'none' }}>
          <div className="pg-tab active">
            <span className="tab-lbl">Towns</span>
            <span className="tab-val">{townGuides.length}</span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">North to South</span>
            <span className="tab-val" style={{ fontSize: 17 }}>
              <em>Barnegat&nbsp;Light</em>&nbsp;–&nbsp;Holgate
            </span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">Guide Year</span>
            <span className="tab-val">2026</span>
          </div>
        </div>
      </div>

      <div className="pg-grid">

        {/* ── Main column ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {ordered.map((t, i) => {
            const daily = badgeByTown[t.slug]
            return (
              <Link
                key={t.slug}
                to={`/${t.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <article className="lc">
                  <div className="lc-head">
                    <div>
                      <div className="pg-eyebrow" style={{ marginBottom: 8, fontSize: 10, letterSpacing: '0.22em' }}>
                        <span>{i === 0 ? 'North Tip' : i === ordered.length - 1 ? 'South End' : `#${i + 1} from north`}</span>
                      </div>
                      <h2 className="lc-name" style={{ fontSize: 28 }}>{t.name}</h2>
                      <p className="lc-sub" style={{ fontSize: 14 }}>{t.eyebrow}</p>
                    </div>
                    <span className="lc-cta">Read guide →</span>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 16 }}>
                    {t.intro}
                  </p>
                  <div className="st-row c3">
                    <div className="st">
                      <div className="st-lbl">Daily Badge</div>
                      <div className="st-val">
                        {daily && daily > 0 ? `$${daily}` : <em>Varies</em>}
                      </div>
                    </div>
                    <div className="st">
                      <div className="st-lbl">Best For</div>
                      <div className="st-val" style={{ fontSize: 14, lineHeight: 1.3 }}>
                        {t.bestFor.split(',')[0].split('.')[0]}
                      </div>
                    </div>
                    <div className="st">
                      <div className="st-lbl">Sections</div>
                      <div className="st-val">{t.sections.length}</div>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          <div className="aside-card">
            <p className="aside-title">How to choose</p>
            <ul className="aside-list">
              <li><span><strong>Beach Haven</strong> — walkable, lively, family-friendly</span></li>
              <li><span><strong>Ship Bottom</strong> — central, easy access, Ron Jon</span></li>
              <li><span><strong>Surf City</strong> — middle of the island, mix of shops &amp; quiet</span></li>
              <li><span><strong>Harvey Cedars</strong> — narrow, peaceful, big sunsets</span></li>
              <li><span><strong>Barnegat Light</strong> — north tip, lighthouse, fishing port</span></li>
              <li><span><strong>LBT</strong> — patchwork of communities; choose by section</span></li>
            </ul>
          </div>

          <div className="aside-card advisory">
            <p className="aside-title">Beach Badges</p>
            <p className="aside-body">
              Every LBI municipality sells its own badge — they're not interchangeable.
              Plan to buy where you'll spend most of your beach time. Pre-season badges
              (bought before early June) are the cheapest.
            </p>
          </div>

          <div className="aside-card">
            <p className="aside-title">Compare more</p>
            <ul className="aside-list">
              <li>
                <Link to="/beaches" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  All beach badges side-by-side →
                </Link>
              </li>
              <li>
                <Link to="/accessibility" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Accessibility by town →
                </Link>
              </li>
              <li>
                <Link to="/getting-around" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  LBI Shuttle &amp; traffic →
                </Link>
              </li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  )
}
