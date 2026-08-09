import { Link } from 'react-router-dom'
import { islandSegments } from '../data/boundaries'
import { SITE_URL } from '../lib/seo'
import { buildBreadcrumbSchema } from '../lib/breadcrumbSchema'
import LbiTownsMap from '../components/LbiTownsMap'
import FaqSection from '../components/FaqSection'

// ─────────────────────────────────────────────────────────────────────────────
// LBI MAP — a map-first page for pure "lbi map" / "map of long beach island"
// intent, which /towns was ranking for but not serving (it answers "which town
// suits my trip", a different question).
//
// Deliberately NOT a second town list: this page is orientation — where the
// island is, how it's laid out, what anchors each end, and where the causeway
// lands. Town comparison stays on /towns; boundary detail stays on
// /lbi-town-boundaries. Each links to the others rather than restating them.
// ─────────────────────────────────────────────────────────────────────────────

const body: React.CSSProperties = { fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)' }
const linkStyle: React.CSSProperties = { color: 'var(--teal-deep)', textDecoration: 'none', fontWeight: 600 }

export default function MapPage() {
  // The map image is a real indexable file — this is the page it belongs to.
  // It is now picking up image-search impressions, so the name, the caption and
  // the anchor text below all say "LBI town map" in the words people type.
  const mapImageData = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: `${SITE_URL}/lbi-towns-map.png`,
    url: `${SITE_URL}/lbi-map`,
    name: 'LBI Town Map — Map of Long Beach Island, NJ Towns',
    caption: 'LBI town map: all six Long Beach Island towns north to south, Barnegat Light to Holgate.',
    representativeOfPage: true,
    description:
      'LBI town map. Map of Long Beach Island, New Jersey showing all six towns north to south — Barnegat Light, Harvey Cedars, Surf City, Ship Bottom, Long Beach Township and Beach Haven — with the non-contiguous Long Beach Township sections shaded and the Route 72 Causeway landing at Ship Bottom.',
  }

  return (
    <div className="pg-wrap">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mapImageData) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'LBI Towns', path: '/towns' },
            { name: 'LBI Map', path: '/lbi-map' },
          ])),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <Link to="/towns" style={linkStyle}>← LBI Towns</Link>
          <span className="rule" />
          <span>Map · 18 miles · north to south</span>
        </div>
        {/* H1 leads with the literal query — "lbi map" — rather than inverting it. */}
        <h1>LBI <em>Map</em></h1>
        <p className="pg-lede">
          A map of Long Beach Island, NJ and all six LBI towns, north to south. The island is a
          narrow barrier island on the New Jersey shore, about <b>18 miles</b> long and in places
          only a few blocks wide — you can see Barnegat Bay and the Atlantic from the same street.
          It sits in Ocean County, and there is exactly one road on: the Route 72 Causeway, which
          lands you in Ship Bottom, roughly in the middle.
        </p>
      </div>

      <div className="pg-grid">

        {/* ── Main column ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* The map itself, first thing on the page */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 6 }}>
              Map of Long Beach Island Towns
            </h2>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 16 }}>
              North is at the top. Tap any town to open its guide. The shaded bands are all{' '}
              <b>Long Beach Township</b> — it isn&apos;t one continuous town but five separate
              pieces woven between the boroughs, which is why Loveladies appears north of Harvey
              Cedars and High Bar Harbor hangs off the bay side at the top.
            </p>
            <LbiTownsMap />
            {/* The PNG render of this map is picking up image-search impressions
                on its own. Linking it from the page it belongs to, with the
                phrase people search, gives the file real page context instead of
                only an og:image reference. */}
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 14, marginBottom: 0 }}>
              <a
                href="/lbi-towns-map.png"
                style={linkStyle}
                download="lbi-towns-map.png"
              >
                Download the LBI town map (PNG) →
              </a>{' '}
              Printable map of Long Beach Island towns, north to south.
            </p>
          </article>

          {/* Orientation — how to read the island */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              How the Island Is Laid Out
            </h2>
            <p style={{ ...body, marginBottom: 14 }}>
              LBI runs roughly north–south, so almost everything is described by how far up or down
              the island it sits. One road — <b>Long Beach Boulevard</b> — runs nearly its whole
              length, changing name to Bay Avenue through Beach Haven, and nearly every address on
              the island is a turn off it. Three landmarks are all you need to orient yourself:
            </p>
            <ul className="aside-list" style={{ fontSize: 14 }}>
              <li><span><strong>North tip — Barnegat Lighthouse.</strong> &ldquo;Old Barney&rdquo; stands at the very top of the island in Barnegat Light, overlooking Barnegat Inlet.</span></li>
              <li><span><strong>Middle — the Route 72 Causeway.</strong> The only road on or off, landing in Ship Bottom. Everything is measured as north or south of this point.</span></li>
              <li><span><strong>South tip — the Forsythe refuge.</strong> Below Beach Haven, Holgate narrows to a peninsula ending in the Edwin B. Forsythe National Wildlife Refuge, closed April 1 – August 31 for piping plover nesting.</span></li>
            </ul>
            <p style={{ ...body, marginTop: 14, marginBottom: 0 }}>
              The ocean is always east, the bay always west. If the sun is rising over the water
              you&apos;re on the ocean side; sunsets belong to the bay.
            </p>
          </article>

          {/* The nine segments — the thing a map can't show at a glance */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              Six Towns, Nine Stretches
            </h2>
            <p style={{ ...body, marginBottom: 14 }}>
              A map of LBI labelled by municipality is misleading, because Long Beach Township is
              five separate chunks rather than one. Driving the Boulevard end to end you actually
              pass through nine distinct stretches:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '2px solid var(--line)', color: 'var(--ink)', width: 40 }}>#</th>
                    <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '2px solid var(--line)', color: 'var(--ink)' }}>Stretch</th>
                    <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '2px solid var(--line)', color: 'var(--ink)' }}>Municipality</th>
                  </tr>
                </thead>
                <tbody>
                  {islandSegments.map((s, i) => (
                    <tr key={s.segment}>
                      <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--line)', color: 'var(--slate)' }}>{i + 1}</td>
                      <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--line)', color: 'var(--ink)', fontWeight: 500 }}>
                        {s.slug ? <Link to={`/${s.slug}`} style={linkStyle}>{s.segment}</Link> : s.segment}
                      </td>
                      <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--line)', color: 'var(--ink-soft)' }}>{s.municipality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ ...body, marginTop: 14, marginBottom: 0 }}>
              Want the actual street where each line falls?{' '}
              <Link to="/lbi-town-boundaries" style={linkStyle}>See the boundary guide →</Link>
            </p>
          </article>

          {/* Getting there */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 22, marginBottom: 10 }}>
              Getting to Long Beach Island
            </h2>
            <p style={{ ...body, marginBottom: 12 }}>
              There is one way on and one way off by car: <b>Route 72 east</b> from Manahawkin,
              across the Causeway, arriving in Ship Bottom. From there you turn left for the north
              end — Surf City, Harvey Cedars, Loveladies, Barnegat Light — or right for the south —
              Brant Beach, the Township sections, Beach Haven and Holgate.
            </p>
            <p style={{ ...body, margin: 0 }}>
              Because everything funnels through that single bridge, summer Saturday mornings
              inbound and afternoons outbound are the island&apos;s pinch point.{' '}
              <Link to="/getting-around" style={linkStyle}>Causeway traffic, parking and the LBI Shuttle →</Link>
            </p>
          </article>

          {/* FAQ — renders FAQPage JSON-LD too */}
          <FaqSection
            title="LBI Map FAQ"
            faqs={[
              {
                q: 'Where is Long Beach Island on a map of New Jersey?',
                a: 'Long Beach Island sits off the southern New Jersey coast in Ocean County, roughly halfway between Atlantic City and Toms River. It is a barrier island separated from the mainland by Barnegat Bay, reached only by the Route 72 Causeway from Manahawkin, which lands at Ship Bottom.',
              },
              {
                // "How long is Long Beach Island" is answered once, at the top of
                // /towns — the stronger page. Asking it here as well would put two
                // of this site's own pages in front of the same query.
                q: 'How long does it take to drive the length of LBI?',
                a: 'Roughly 35 to 40 minutes end to end in summer traffic, and about 25 off-season. There is one road for almost the whole 18 miles — Long Beach Boulevard, which becomes Bay Avenue through Beach Haven — so there is no way around a backup, and the stretch through Ship Bottom near the Causeway is the reliable pinch point.',
              },
              {
                q: 'What are the towns on LBI in order from north to south?',
                a: 'Barnegat Light, Loveladies, Harvey Cedars, North Beach, Surf City, Ship Bottom, then the long Long Beach Township run through Brant Beach to North Beach Haven, then Beach Haven, and finally Holgate at the south tip. Loveladies, North Beach and Holgate are all sections of Long Beach Township rather than separate towns.',
              },
              {
                q: 'How do you get onto Long Beach Island?',
                a: 'By the Route 72 Causeway from Manahawkin — the only road onto the island. It brings you in at Ship Bottom, near the middle, where you turn north or south along Long Beach Boulevard.',
              },
              {
                q: 'Is Long Beach Township one town on the map?',
                a: 'No, and this is the most common map mistake. Long Beach Township is non-contiguous: five separate pieces wrapped around the five boroughs. Loveladies sits north of Harvey Cedars, North Beach sits between Harvey Cedars and Surf City, the largest run stretches from Brant Beach to North Beach Haven, Holgate is the south tip, and High Bar Harbor is a bayside enclave at the north end.',
              },
            ]}
          />
        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          <div className="aside-card">
            <p className="aside-title">Island at a glance</p>
            <div className="aside-mini">
              <div>
                <div className="st-lbl">Length</div>
                <div className="st-val" style={{ fontSize: 20, marginTop: 4 }}>~18 mi</div>
              </div>
              <div>
                <div className="st-lbl">Towns</div>
                <div className="st-val" style={{ fontSize: 20, marginTop: 4 }}>6</div>
              </div>
              <div>
                <div className="st-lbl">County</div>
                <div className="st-val" style={{ fontSize: 15, marginTop: 4 }}>Ocean</div>
              </div>
              <div>
                <div className="st-lbl">Road on</div>
                <div className="st-val" style={{ fontSize: 15, marginTop: 4 }}>Route 72</div>
              </div>
            </div>
          </div>

          <div className="aside-card advisory">
            <p className="aside-title">Reading the map</p>
            <p className="aside-body">
              Shaded bands are Long Beach Township sections — one municipality in five separate
              pieces. A Township beach badge works in every shaded band and nowhere else.
            </p>
          </div>

          <div className="aside-card">
            <p className="aside-title">Go deeper</p>
            <ul className="aside-list">
              <li><Link to="/towns" style={linkStyle}>Compare all 6 towns →</Link></li>
              <li><Link to="/lbi-town-boundaries" style={linkStyle}>Where the town lines fall →</Link></li>
              <li><Link to="/lbi-town-services" style={linkStyle}>Police, schools &amp; ZIP codes →</Link></li>
              <li><Link to="/getting-around" style={linkStyle}>Causeway traffic &amp; parking →</Link></li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  )
}
