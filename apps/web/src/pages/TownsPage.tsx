import { Link } from 'react-router-dom'
import { townGuides } from '../data/townGuides'
import { beachBadgeInfo } from '../data/beachBadges'
import { villageBlocks } from '../data/boundaries'
import { SITE_URL } from '../lib/seo'
import { buildBreadcrumbSchema } from '../lib/breadcrumbSchema'
import LbiTownsMap from '../components/LbiTownsMap'
import FaqSection from '../components/FaqSection'

const badgeByTown = Object.fromEntries(
  beachBadgeInfo.map(b => [b.townSlug, b.pricing.daily])
)

// Table cell styling for the Long Beach Township section list.
const thin: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 10px',
  borderBottom: '2px solid var(--line)',
  color: 'var(--ink)',
  whiteSpace: 'nowrap',
}
const tdc: React.CSSProperties = {
  padding: '8px 10px',
  borderBottom: '1px solid var(--line)',
  color: 'var(--ink-soft)',
  verticalAlign: 'top',
}

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
  const ordered = ORDER
    .map(slug => townGuides.find(t => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))

  // NOTE: the ImageObject for /lbi-towns-map.png now lives on /lbi-map, which
  // is the page built for map intent. Declaring the same contentUrl here too
  // split the signal between two pages for the queries /lbi-map exists to win.
  // The image is still this page's og:image (see STATIC_SEO in lib/seo.ts).

  // JSON-LD: ordered ItemList of the six municipalities for SEO.
  const itemListData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Towns of Long Beach Island, New Jersey',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: ordered.length,
    itemListElement: ordered.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      url: `${SITE_URL}/${t.slug}`,
    })),
  }

  return (
    <div className="pg-wrap">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'LBI Towns', path: '/towns' },
          ])),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <span>LBI · New Jersey</span>
          <span className="rule" />
          <span>6 towns · 18 miles</span>
        </div>
        <h1>LBI Towns <em>&amp; Map</em></h1>
        <p className="pg-lede">
          <b>LBI stands for Long Beach Island</b>, an 18-mile barrier island on the Jersey
          Shore in Ocean County, New Jersey. It sits between Barnegat Bay and the Atlantic,
          reached by the Route 72 Causeway into Ship Bottom. Six distinct municipalities
          stretch north to south — each with its own personality, beach badges, and pace.
          Pick the one that matches your trip.
        </p>
        <div className="pg-tabs pg-tabs-static" style={{ pointerEvents: 'none' }}>
          <div className="pg-tab active">
            <span className="tab-lbl">Towns</span>
            <span className="tab-val">{ordered.length}</span>
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
          {/* Visual island map — targets "map of LBI towns" intent */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 6 }}>Map of LBI Towns</h2>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 16 }}>
              Long Beach Island runs 18 miles north to south. Tap a town to open its guide —
              Barnegat Light sits at the north tip, Holgate at the south. The shaded bands are all
              Long Beach Township: it isn&apos;t one continuous town but a patchwork of sections
              woven between the boroughs — Loveladies actually sits north of Harvey Cedars, and High
              Bar Harbor is a bayside enclave off Barnegat Light.
            </p>
            <LbiTownsMap />
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 14 }}>
              <Link to="/lbi-map" style={{ color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                Open the full LBI map &amp; island layout →
              </Link>
              {'  ·  '}
              <Link to="/lbi-town-boundaries" style={{ color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                Where every town boundary falls →
              </Link>
            </p>
          </article>

          {/* Boundary teaser — the split-street hook, linking to the full page */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 22, marginBottom: 10 }}>Which Town Is My Street Actually In?</h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 12 }}>
              On LBI your mailing address often isn&apos;t your town. Two of the island&apos;s
              boundaries run straight down the middle of a street, so neighbors facing each other
              live in different towns, pay different taxes, and need different beach badges:
            </p>
            <ul className="aside-list" style={{ fontSize: 14 }}>
              <li><span><strong>South 2nd Street</strong> — north side Surf City, south side Ship Bottom. All of South 3rd Street is Ship Bottom, despite a Surf City mailing address.</span></li>
              <li><span><strong>31st Street</strong> — north side Ship Bottom, south side Brant Beach in Long Beach Township.</span></li>
              <li><span><strong>Division Avenue is not a town line.</strong> It sits two blocks inside Surf City and marks where the street numbering flips, not where the towns divide.</span></li>
            </ul>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 12 }}>
              <Link to="/lbi-town-boundaries" style={{ color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                Full boundary guide, plus block ranges for all 14 Long Beach Township villages →
              </Link>
            </p>
          </article>

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
                    <span className="lc-cta-btn">Read guide <span className="arw">→</span></span>
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

          {/* LBT sections — the full village list, north to south. Block ranges
              come from src/data/boundaries.ts so this table and the boundaries
              page can never disagree. The four sections with their own guides
              link through; the rest link to the full boundary breakdown. */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 22, marginBottom: 10 }}>Inside Long Beach Township</h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 12 }}>
              Long Beach Township isn&apos;t one continuous town — it&apos;s a patchwork of{' '}
              <b>{villageBlocks.length} named villages</b> woven between the five boroughs, in five
              separate pieces. Loveladies sits <em>north</em> of Harvey Cedars; Holgate is the south
              tip. They all share one beach badge and one police department, but the section name is
              what rental listings and locals use, and each one has a Boulevard block range behind it:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={thin}>Section</th>
                    <th style={thin}>Blocks</th>
                    <th style={thin}>Street range</th>
                  </tr>
                </thead>
                <tbody>
                  {villageBlocks.map(v => (
                    <tr key={v.name}>
                      <td style={{ ...tdc, color: 'var(--ink)', fontWeight: 500 }}>
                        {v.slug
                          ? <Link to={`/${v.slug}`} style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>{v.name} →</Link>
                          : v.name}
                      </td>
                      <td style={{ ...tdc, fontFamily: 'var(--font-display)', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                        {v.blocks}
                      </td>
                      <td style={tdc}>{v.streetRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 14, lineHeight: 1.6 }}>
              Village middles are solid; village ends are softer, because the main source is a
              beach-badge list that skips streets with no beach access.{' '}
              <Link to="/lbi-town-boundaries" style={{ color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                See the block ranges, the street-name crosswalk and what each claim rests on →
              </Link>
            </p>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 14, marginBottom: 8 }}>
              The four most searched-for sections have their own guides:
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { slug: 'holgate', name: 'Holgate' },
                { slug: 'brant-beach', name: 'Brant Beach' },
                { slug: 'loveladies', name: 'Loveladies' },
                { slug: 'north-beach', name: 'North Beach' },
              ].map(s => (
                <Link
                  key={s.slug}
                  to={`/${s.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 16px',
                    background: 'var(--sand)',
                    border: '1px solid var(--line)',
                    borderRadius: 6,
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-display)',
                    fontSize: 16,
                  }}
                >
                  {s.name} <span style={{ color: 'var(--teal-deep)' }}>→</span>
                </Link>
              ))}
            </div>
          </article>

          {/* Towns near LBI — mainland gateways people search alongside the island */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 22, marginBottom: 10 }}>Towns near LBI (on the mainland)</h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 12 }}>
              Long Beach Island itself has six towns, but a few mainland towns are part of most LBI
              trips — you pass through them on the way in, and many visitors stay or stock up there:
            </p>
            <ul className="aside-list" style={{ fontSize: 14 }}>
              <li><span><strong>Manahawkin / Stafford Township</strong> — the mainland gateway just west of the Route 72 Causeway, with the big supermarkets, big-box stores, and the last chain restaurants before the bridge.</span></li>
              <li><span><strong>Tuckerton</strong> — a historic bayshore town south of the causeway, home to the Tuckerton Seaport &amp; Baymen&apos;s Museum.</span></li>
              <li><span><strong>Barnegat</strong> — the mainland township across the bay to the northwest, sharing its name with Barnegat Light and Barnegat Inlet but a separate town on Route 9.</span></li>
            </ul>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 12 }}>
              None of these are on the island — to reach any LBI beach you cross the Causeway into Ship Bottom first.
            </p>
          </article>

          {/* What is LBI — cheap featured-snippet targets */}
          <FaqSection
            title="Long Beach Island FAQ"
            faqs={[
              {
                q: 'What does LBI stand for?',
                a: 'LBI stands for Long Beach Island, a barrier island on the Jersey Shore in Ocean County, New Jersey.',
              },
              {
                q: 'Where is Long Beach Island?',
                a: 'Long Beach Island is on the southern New Jersey coast in Ocean County, roughly halfway between Atlantic City and Toms River. The only road access is the Route 72 Causeway from Manahawkin, which brings you onto the island at Ship Bottom.',
              },
              {
                q: 'What county is LBI in?',
                a: 'Long Beach Island is in Ocean County, New Jersey. It is reached from the mainland via the Route 72 Causeway into Ship Bottom.',
              },
              {
                q: 'How long is Long Beach Island?',
                a: 'Long Beach Island is about 18 miles long and quite narrow — in places you can see the ocean and Barnegat Bay from the same block. It is divided into six municipalities from Barnegat Light in the north to Beach Haven and Holgate in the south.',
              },
            ]}
          />
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
                <Link to="/lbi-map" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Map of LBI &amp; island layout →
                </Link>
              </li>
              <li>
                <Link to="/lbi-town-boundaries" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Town boundaries &amp; block numbers →
                </Link>
              </li>
              <li>
                <Link to="/lbi-town-services" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Police, schools &amp; ZIP codes →
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
