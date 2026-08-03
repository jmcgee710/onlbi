import { Link } from 'react-router-dom'
import { Waves } from 'lucide-react'
import { findTownGuide, townGuides } from '../data/townGuides'
import { beachBadgeInfo } from '../data/beachBadges'
import { lifeguardInfo } from '../data/beaches'
import { towns } from '../data/towns'
import { buildBreadcrumbSchema } from '../lib/breadcrumbSchema'
import FaqSection from '../components/FaqSection'

interface TownGuidePageProps {
  slug: string
}

export default function TownGuidePage({ slug }: TownGuidePageProps) {
  const guide = findTownGuide(slug)
  // Section guides (Holgate, Loveladies, …) carry partOf — badge, lifeguard,
  // and town-hall data all belong to the parent municipality (LBT).
  const dataSlug = guide?.partOf?.slug ?? slug
  const badge  = beachBadgeInfo.find(b => b.townSlug === dataSlug)
  const guards = lifeguardInfo.find(l => l.townSlug === dataSlug)
  const town   = towns.find(t => t.slug === dataSlug)

  if (!guide) {
    return (
      <div className="pg-wrap">
        <div className="pg-hero">
          <h1>Town not found</h1>
          <p className="pg-lede"><Link to="/" style={{ color: 'var(--teal-deep)' }}>← Back home</Link></p>
        </div>
      </div>
    )
  }

  // JSON-LD structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: guide.name,
    description: guide.metaDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: guide.name,
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    containedInPlace: guide.partOf
      ? {
          '@type': 'Place',
          name: `${guide.partOf.name}, Long Beach Island, New Jersey`,
        }
      : {
          '@type': 'Place',
          name: 'Long Beach Island, New Jersey',
        },
    ...(guide.neighborhoods && guide.neighborhoods.length > 0
      ? {
          containsPlace: guide.neighborhoods.map(n => ({
            '@type': 'Place',
            name: n.name,
            description: n.blurb,
          })),
        }
      : {}),
  }

  const breadcrumbData = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'LBI Towns', path: '/towns' },
    ...(guide.partOf ? [{ name: guide.partOf.name, path: `/${guide.partOf.slug}` }] : []),
    { name: guide.name, path: `/${guide.slug}` },
  ])

  return (
    <div className="pg-wrap">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <Link to="/" style={{ color: 'var(--teal-deep)', textDecoration: 'none', fontWeight: 600 }}>← LBI</Link>
          <span className="rule" />
          <span>{guide.eyebrow}</span>
        </div>
        <h1>
          {guide.name.includes(' ')
            ? <>{guide.name.split(' ').slice(0, -1).join(' ')}{' '}<em>{guide.name.split(' ').slice(-1)[0]}</em></>
            : <em>{guide.name}</em>}
        </h1>
        <p className="pg-lede">{guide.intro}</p>
        {guide.partOf && (
          <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 10 }}>
            {guide.name} is a section of{' '}
            <Link to={`/${guide.partOf.slug}`} style={{ color: 'var(--teal-deep)', fontWeight: 600 }}>
              {guide.partOf.name}
            </Link>
            {' '}— township beach badges, parking rules, and services apply here.
          </p>
        )}

        <div className="pg-tabs pg-tabs-static" style={{ pointerEvents: 'none' }}>
          <div className="pg-tab active">
            <span className="tab-lbl">Daily Badge</span>
            <span className="tab-val">
              {badge && badge.pricing.daily > 0 ? `$${badge.pricing.daily}` : <em>Varies</em>}
            </span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">Lifeguard</span>
            <span className="tab-val" style={{ fontSize: 17 }}>
              {guards?.hours.includes('Verify') ? <em>Varies</em> : '10am–5pm'}
            </span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">Season</span>
            <span className="tab-val" style={{ fontSize: 17 }}>
              June&nbsp;–&nbsp;<em>Sept</em>
            </span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">Guide</span>
            <span className="tab-val" style={{ fontSize: 17 }}>2026</span>
          </div>
        </div>
      </div>

      <div className="pg-grid">

        {/* ── Main column ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {guide.sections.map((section, i) => (
            <article key={i} className="lc">
              <h2 className="lc-name" style={{ fontSize: 24, marginBottom: section.body || section.bullets ? 14 : 0 }}>
                {section.title}
              </h2>
              {section.body && (
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
                  {section.body}
                </p>
              )}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="aside-list" style={{ fontSize: 14, marginTop: section.body ? 14 : 0 }}>
                  {section.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </article>
          ))}

          {/* Neighborhoods & sections, north to south */}
          {guide.neighborhoods && guide.neighborhoods.length > 0 && (
            <article className="lc">
              <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 6 }}>
                Neighborhoods &amp; Sections
              </h2>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 16 }}>
                Listed north to south. {guide.shortName} isn&apos;t one continuous town — it&apos;s a string
                of distinct sections, so where you stay really matters.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {guide.neighborhoods.map((n, i) => (
                  <li key={i} style={{ paddingLeft: 14, borderLeft: '2px solid var(--line)' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, margin: 0 }}>
                      {n.slug ? (
                        <Link to={`/${n.slug}`} style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                          {n.name} →
                        </Link>
                      ) : (
                        n.name
                      )}
                    </h3>
                    <div style={{ fontSize: 12, color: 'var(--teal-deep)', fontWeight: 600, margin: '2px 0 6px' }}>
                      {n.position}
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0 }}>{n.blurb}</p>
                  </li>
                ))}
              </ul>
            </article>
          )}

          {/* FAQ — renders visible Q/A + FAQPage JSON-LD (schema.org) */}
          {guide.faqs && guide.faqs.length > 0 && (
            <FaqSection faqs={guide.faqs} title={`${guide.shortName} FAQ`} />
          )}

          {/* Who it's best for */}
          <article className="lc" style={{ background: 'var(--paper)', borderLeft: '3px solid var(--teal-deep)' }}>
            <h2 className="lc-name" style={{ fontSize: 22, marginBottom: 10 }}>
              Who {guide.shortName} is best for
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', fontStyle: 'italic' }}>
              {guide.bestFor}
            </p>
          </article>

          {/* Related towns */}
          {guide.related.length > 0 && (
            <article className="lc">
              <h2 className="lc-name" style={{ fontSize: 20, marginBottom: 14 }}>
                Nearby on the island
              </h2>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {guide.related.map(r => (
                  <Link
                    key={r.slug}
                    to={`/${r.slug}`}
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
                    {r.name} <span style={{ color: 'var(--teal-deep)' }}>→</span>
                  </Link>
                ))}
              </div>
            </article>
          )}
        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          <div className="aside-card">
            <p className="aside-title">Quick Facts</p>
            <div className="aside-mini">
              <div>
                <div className="st-lbl">Daily Badge</div>
                <div className="st-val" style={{ fontSize: 22, marginTop: 4 }}>
                  {badge && badge.pricing.daily > 0 ? `$${badge.pricing.daily}` : 'Call'}
                </div>
              </div>
              <div>
                <div className="st-lbl">Under 12</div>
                <div className="st-val ok" style={{ fontSize: 16, marginTop: 4 }}>Free</div>
              </div>
              <div>
                <div className="st-lbl">Season</div>
                <div className="st-val" style={{ fontSize: 13, marginTop: 4, lineHeight: 1.2 }}>Mid-June – Labor Day</div>
              </div>
              <div>
                <div className="st-lbl">Guarded</div>
                <div className="st-val" style={{ fontSize: 13, marginTop: 4, lineHeight: 1.2 }}>10am – 5pm</div>
              </div>
              {town && (
                <>
                  <div>
                    <div className="st-lbl">Zip Code</div>
                    <div className="st-val" style={{ fontSize: 15, marginTop: 4 }}>{town.zip}</div>
                  </div>
                  <div>
                    <div className="st-lbl">Area Code</div>
                    <div className="st-val" style={{ fontSize: 15, marginTop: 4 }}>609</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="aside-card advisory">
            <p className="aside-title" style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Waves size={15} strokeWidth={1.5} /> Beach Day Tips</p>
            <ul className="aside-list">
              <li>Always swim near a lifeguard stand</li>
              <li>If caught in a rip, swim parallel to shore</li>
              <li>Pre-season badges are cheapest — buy in May</li>
              <li>Bay side = calm; ocean side = waves</li>
            </ul>
          </div>

          <div className="aside-card">
            <p className="aside-title">More for {guide.shortName}</p>
            <ul className="aside-list">
              <li>
                <Link to="/lbi-conditions" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Today&apos;s {guide.shortName} water temp &amp; tides →
                </Link>
              </li>
              <li>
                <Link to={`/beaches/${dataSlug}`} style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Beach details &amp; badge prices →
                </Link>
              </li>
              <li>
                <Link to="/lbi-town-boundaries" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Town boundaries &amp; block numbers →
                </Link>
              </li>
              <li>
                <Link to="/eat" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Eat &amp; Drink directory →
                </Link>
              </li>
              <li>
                <Link to="/do" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Do &amp; Shop directory →
                </Link>
              </li>
              <li>
                <Link to="/accessibility" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>
                  Accessibility info →
                </Link>
              </li>
            </ul>
          </div>

          <div className="aside-card">
            <p className="aside-title">All LBI Towns</p>
            <ul className="aside-list">
              {townGuides
                .filter(t => !t.partOf && t.slug !== guide.slug)
                .map(t => (
                  <li key={t.slug}>
                    <Link to={`/${t.slug}`} style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontWeight: 500 }}>
                      {t.name} →
                    </Link>
                  </li>
                ))}
            </ul>
            <p className="aside-title" style={{ marginTop: 14 }}>LBT Sections</p>
            <ul className="aside-list">
              {townGuides
                .filter(t => t.partOf && t.slug !== guide.slug)
                .map(t => (
                  <li key={t.slug}>
                    <Link to={`/${t.slug}`} style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontWeight: 500 }}>
                      {t.name} →
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>

      </div>
    </div>
  )
}
