import { Link } from 'react-router-dom'
import { serviceLayers, townServices, zipByPlace, zipCoverage } from '../data/services'
import { towns } from '../data/towns'
import { buildBreadcrumbSchema } from '../lib/breadcrumbSchema'
import FaqSection from '../components/FaqSection'
import AnswerBlock from '../components/AnswerBlock'

// ─────────────────────────────────────────────────────────────────────────────
// LBI TOWN SERVICES — who polices your street, which school district you're in,
// which ZIP you use, and whose beach badge you need.
//
// Municipality is only one of the lines drawn across this island and no two of
// them match. Contact details come from towns.ts (the existing civic dataset);
// this page only adds which service boundary each town falls inside.
// ─────────────────────────────────────────────────────────────────────────────

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 10px',
  borderBottom: '2px solid var(--line)',
  color: 'var(--ink)',
  whiteSpace: 'nowrap',
}
const td: React.CSSProperties = {
  padding: '8px 10px',
  borderBottom: '1px solid var(--line)',
  color: 'var(--ink-soft)',
  verticalAlign: 'top',
}
const body: React.CSSProperties = { fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)' }
const linkStyle: React.CSSProperties = { color: 'var(--teal-deep)', textDecoration: 'none', fontWeight: 600 }

const townBySlug = Object.fromEntries(towns.map(t => [t.slug, t]))

export default function ServicesPage() {
  return (
    <div className="pg-wrap">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'LBI Towns', path: '/towns' },
            { name: 'Town Services', path: '/lbi-town-services' },
          ])),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <Link to="/towns" style={linkStyle}>← LBI Towns</Link>
          <span className="rule" />
          <span>Police · Schools · ZIP · Badges</span>
        </div>
        {/* H1 leads with ZIP codes to match the title tag — ZIP lookups are the
            demonstrated demand on this page, and the service map is what the
            reader gets once they arrive. */}
        <h1>LBI ZIP Codes <em>&amp; Town Services</em></h1>
        <p className="pg-lede">
          The whole island runs on two ZIP codes — and they are only one of the lines drawn across
          Long Beach Island, none of which match each other. Barnegat Light has its own mayor but
          is policed by Long Beach Township. Five of the six towns share one school district; Beach
          Haven runs its own. Here is the ZIP code for every town and section, and who actually
          covers your street.
        </p>
        <div className="pg-tabs pg-tabs-static" style={{ pointerEvents: 'none' }}>
          <div className="pg-tab active">
            <span className="tab-lbl">Municipalities</span>
            <span className="tab-val">6</span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">Police Depts</span>
            <span className="tab-val">5</span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">School Districts</span>
            <span className="tab-val">2</span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">ZIP Codes</span>
            <span className="tab-val">2</span>
          </div>
        </div>
      </div>

      <div className="pg-grid">

        {/* ── Main column ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ZIP is the demonstrated demand on this page and the question was
              only answered two thirds of the way down. Answer it first, in the
              words it gets typed in, then let the tables do the detail. */}
          <AnswerBlock
            answers={[
              {
                q: 'What is the ZIP code for LBI?',
                lead: 'Long Beach Island has two ZIP codes: 08008 covers almost the whole island, and 08006 covers Barnegat Light at the north tip.',
                detail:
                  'Harvey Cedars, Surf City, Ship Bottom, Beach Haven and every Long Beach Township section — Loveladies, Brant Beach, Spray Beach, Holgate and the rest — all share 08008. High Bar Harbor is the one Township address inside 08006.',
              },
              {
                // Deliberately the section-wide question, not "what is the ZIP for
                // Loveladies" — /loveladies already answers that one, and it is the
                // page that should keep it.
                q: 'Do the Long Beach Township sections have their own ZIP codes?',
                lead: 'No. Every Long Beach Township section is 08008, the same code as most of the island — the section name in the address is doing the work the ZIP code cannot.',
                detail:
                  'Loveladies, North Beach, Brant Beach, Beach Haven Crest, Brighton Beach, Peahala Park, Beach Haven Park, Haven Beach, The Dunes, Beach Haven Terrace, Beach Haven Gardens, Spray Beach, North Beach Haven and Holgate all share it. High Bar Harbor is the one Township address inside 08006.',
              },
            ]}
          />

          {/* Per-town lookup — the thing people actually came for */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              Services by Town
            </h2>
            <p style={{ ...body, marginBottom: 14 }}>
              North to south. If your address is a Long Beach Township section — Loveladies, Brant
              Beach, Beach Haven Terrace, Holgate and the rest — read the Long Beach Township row,
              whatever your mail says.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={th}>Town</th>
                    <th style={th}>Police</th>
                    <th style={th}>School district</th>
                    <th style={th}>ZIP</th>
                    <th style={th}>Beach badge</th>
                  </tr>
                </thead>
                <tbody>
                  {townServices.map(s => (
                    <tr key={s.slug}>
                      <td style={{ ...td, color: 'var(--ink)', fontWeight: 500 }}>
                        <Link to={`/${s.slug}`} style={linkStyle}>{s.name}</Link>
                      </td>
                      <td style={td}>{s.police}</td>
                      <td style={td}>{s.schoolDistrict}</td>
                      <td style={{ ...td, whiteSpace: 'nowrap' }}>{townBySlug[s.slug]?.zip ?? '—'}</td>
                      <td style={td}>{s.beachBadge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* The overlay — why none of these lines agree */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              Six Towns, Seven Different Maps
            </h2>
            <p style={{ ...body, marginBottom: 14 }}>
              Each of these layers was drawn by a different authority at a different time, and none
              of them was reconciled against the others. That&apos;s why &ldquo;what town am I
              in&rdquo; doesn&apos;t answer &ldquo;who do I call.&rdquo;
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={th}>Layer</th>
                    <th style={th}>How many</th>
                    <th style={th}>The odd one out</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceLayers.map(l => (
                    <tr key={l.layer}>
                      <td style={{ ...td, color: 'var(--ink)', fontWeight: 500 }}>{l.layer}</td>
                      <td style={{ ...td, whiteSpace: 'nowrap' }}>{l.count}</td>
                      <td style={td}>{l.oddOneOut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* Police */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              Police on LBI — Five Departments, Six Towns
            </h2>
            <p style={{ ...body, marginBottom: 14 }}>
              The number that surprises people: <b>Barnegat Light contracts its policing to Long
              Beach Township.</b> It&apos;s a fully independent borough with its own mayor and
              council, but no police force of its own — the Township department describes itself as
              serving Long Beach Township and Barnegat Light, and the borough sends residents to the
              Township for emergency alerts.
            </p>
            <p style={{ ...body, marginBottom: 16 }}>
              The mirror image is Harvey Cedars. It&apos;s smaller than Barnegat Light and physically
              wedged between two Long Beach Township sections, which would make a contract the
              obvious move — and it kept its own force anyway.
            </p>
            <ul className="aside-list" style={{ fontSize: 14 }}>
              {townServices.filter(s => s.policeNote).map(s => (
                <li key={s.slug}><span><strong>{s.name}</strong> — {s.policeNote}</span></li>
              ))}
            </ul>
            <p style={{ ...body, marginTop: 16, marginBottom: 0 }}>
              In an emergency dial 911 anywhere on the island — dispatch routes it. The distinction
              matters for non-emergency calls, records requests, and knowing whose alert list to
              join.
            </p>
          </article>

          {/* Schools */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              School Districts — LBI Consolidated and Beach Haven
            </h2>
            <p style={{ ...body, marginBottom: 12 }}>
              Five of the six towns — Barnegat Light, Harvey Cedars, Surf City, Ship Bottom, and all
              of Long Beach Township — send children to the <b>LBI Consolidated School District</b>.
              Beach Haven is the exception: it runs its own district.
            </p>
            <p style={{ ...body, margin: 0 }}>
              For buyers and renters this is one of the few island boundaries with a lasting
              consequence, and it&apos;s worth checking against the actual parcel rather than the
              mailing address — particularly anywhere near the 12th Street line, where a Beach Haven
              address can sit in Long Beach Township.
            </p>
          </article>

          {/* Health */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 22, marginBottom: 10 }}>
              Health Department — One for the Whole Island
            </h2>
            <p style={{ ...body, margin: 0 }}>
              The <b>LBI Health Department</b> covers all six municipalities. It is the only line on
              this page that matches the island rather than cutting across it, which makes it the
              easy answer to inspections, food-service permits, and public-health questions no matter
              where on LBI you are.
            </p>
          </article>

          {/* ZIP */}
          <article className="lc" id="zip-codes">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              LBI ZIP Codes — 08008 and 08006
            </h2>
            <p style={{ ...body, marginBottom: 14 }}>
              Long Beach Island uses just two ZIP codes, and they don&apos;t line up with the towns.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={th}>ZIP</th>
                    <th style={th}>Covers</th>
                    <th style={th}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {zipCoverage.map(z => (
                    <tr key={z.zip}>
                      <td style={{ ...td, color: 'var(--ink)', fontFamily: 'var(--font-display)', fontSize: 17 }}>{z.zip}</td>
                      <td style={{ ...td, color: 'var(--ink)', fontWeight: 500 }}>{z.covers}</td>
                      <td style={td}>{z.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ ...body, marginTop: 14, marginBottom: 0 }}>
              This is why section names like Loveladies, Spray Beach and Beach Haven Terrace show up
              in mailing addresses at all — the ZIP can&apos;t distinguish them, so the section name
              does the work the postal code doesn&apos;t.
            </p>
          </article>

          {/* ZIP by place name — the lookup people actually search for, one place
              at a time ("loveladies nj zip code"), rather than island-wide. */}
          <article className="lc" id="zip-by-town">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              ZIP Code for Every LBI Town and Section
            </h2>
            <p style={{ ...body, marginBottom: 14 }}>
              Every place name that appears in a Long Beach Island mailing address, with the ZIP
              code that serves it. Only Barnegat Light and High Bar Harbor use{' '}
              <b>08006</b> — everywhere else on the island is <b>08008</b>.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <caption style={{ captionSide: 'bottom', textAlign: 'left', paddingTop: 10, fontSize: 12, color: 'var(--slate)' }}>
                  LBI ZIP codes by town and Long Beach Township section, north to south.
                </caption>
                <thead>
                  <tr>
                    <th style={th}>Place</th>
                    <th style={th}>ZIP</th>
                    <th style={th}>Municipality</th>
                  </tr>
                </thead>
                <tbody>
                  {zipByPlace.map(p => (
                    <tr key={`${p.name}-${p.municipality}`}>
                      <td style={{ ...td, color: 'var(--ink)', fontWeight: 500 }}>
                        {p.slug
                          ? <Link to={`/${p.slug}`} style={{ ...linkStyle, fontWeight: 500 }}>{p.name}</Link>
                          : p.name}
                        {p.section && (
                          <span style={{ color: 'var(--slate)', fontWeight: 400 }}> · section</span>
                        )}
                      </td>
                      <td style={{ ...td, color: 'var(--ink)', fontFamily: 'var(--font-display)', fontSize: 16, whiteSpace: 'nowrap' }}>
                        {p.zip}
                      </td>
                      <td style={td}>{p.municipality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ ...body, marginTop: 14, marginBottom: 0 }}>
              A section name is not a town. Loveladies, Brant Beach, Spray Beach, Holgate and the
              rest are all Long Beach Township — same ZIP, same police, same beach badge — even
              though the mail is addressed to the section.{' '}
              <Link to="/lbi-town-boundaries" style={linkStyle}>
                See where each section starts and ends →
              </Link>
            </p>
          </article>

          {/* Badges */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 22, marginBottom: 10 }}>
              Beach Badges — Six, and Not Interchangeable
            </h2>
            <p style={{ ...body, marginBottom: 12 }}>
              Every municipality sells its own badge and none of them honour each other. The Long
              Beach Township badge is the outlier in your favour: one badge covers all five Township
              sections, from Loveladies at the north end to Holgate at the south — the broadest
              coverage on the island. It is also worthless one block into a borough.
            </p>
            <p style={{ ...body, margin: 0 }}>
              Because the Township is non-contiguous, a Township badge holder can drive past two
              boroughs they can&apos;t use and reach a beach they can. Buy where you&apos;ll actually
              spend your beach time — and if you&apos;re near one of the split streets,{' '}
              <Link to="/lbi-town-boundaries" style={linkStyle}>check which side you&apos;re on</Link>.
            </p>
          </article>

          {/* FAQ — renders FAQPage JSON-LD too */}
          <FaqSection
            title="LBI Services FAQ"
            faqs={[
              {
                // The island-wide ZIP question is answered at the top of this page
                // now; repeating it here would split the page against itself.
                q: 'Does my ZIP code tell me which LBI town I am in?',
                a: 'No. Two ZIP codes cover six municipalities and fourteen Township sections, so 08008 alone narrows you down to "almost anywhere on Long Beach Island." Your mailing address does not settle it either — a South 3rd Street house is addressed Surf City but sits in Ship Bottom. The town line is what determines your police department, your taxes and your beach badge.',
              },
              {
                q: 'Which school district is LBI in?',
                a: 'Five of the six LBI towns — Barnegat Light, Harvey Cedars, Surf City, Ship Bottom and Long Beach Township — are served by the LBI Consolidated School District. Beach Haven runs its own separate district.',
              },
              {
                q: 'Does Barnegat Light have its own police department?',
                a: 'No. Barnegat Light is an independent borough with its own mayor and council, but it contracts policing to the Long Beach Township Police Department, which describes itself as serving both. Harvey Cedars, despite being smaller, does maintain its own force.',
              },
              {
                q: 'How many police departments are on Long Beach Island?',
                a: 'Five, covering six towns: Long Beach Township (which also polices Barnegat Light under contract), Harvey Cedars, Surf City, Ship Bottom, and Beach Haven. Dial 911 anywhere on the island and dispatch will route the call.',
              },
              {
                q: 'Does one beach badge work for all of LBI?',
                a: 'No. Each of the six municipalities sells its own badge and they are not interchangeable. The Long Beach Township badge gives the widest coverage because it works across all five non-contiguous Township sections from Loveladies to Holgate, but it is not valid inside any borough.',
              },
              {
                q: 'Who do I call about a health or food-service issue on LBI?',
                a: 'The LBI Health Department, which covers all six municipalities on the island. It is the only service boundary on LBI that matches the island itself rather than cutting across it.',
              },
            ]}
          />
        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          <div className="aside-card advisory">
            <p className="aside-title">The surprises</p>
            <ul className="aside-list">
              <li><span><strong>Barnegat Light</strong> has a mayor but no police force — LBT polices it</span></li>
              <li><span><strong>Harvey Cedars</strong> is smaller and kept its own force anyway</span></li>
              <li><span><strong>Beach Haven</strong> is the only town with its own school district</span></li>
              <li><span><strong>One ZIP</strong> covers the whole island except Barnegat Light</span></li>
            </ul>
          </div>

          <div className="aside-card">
            <p className="aside-title">Town hall &amp; alerts</p>
            <ul className="aside-list">
              {towns.map(t => (
                <li key={t.slug}>
                  <span>
                    <Link to={`/${t.slug}`} style={linkStyle}>{t.name}</Link>
                    {' — '}{t.phone}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="aside-card">
            <p className="aside-title">Go deeper</p>
            <ul className="aside-list">
              <li><Link to="/lbi-town-boundaries" style={linkStyle}>Where the town lines fall →</Link></li>
              <li><Link to="/towns" style={linkStyle}>All 6 LBI towns &amp; map →</Link></li>
              <li><Link to="/beaches" style={linkStyle}>Badge prices side by side →</Link></li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  )
}
