import { Link } from 'react-router-dom'
import {
  CONFIDENCE_LABEL,
  boundarySources,
  duplicateNames,
  informalNames,
  islandSegments,
  markerPosts,
  municipalBoundaries,
  numberingReversals,
  numberingSystems,
  villageBlocks,
  type Confidence,
} from '../data/boundaries'
import { buildBreadcrumbSchema } from '../lib/breadcrumbSchema'
import FaqSection from '../components/FaqSection'

// ─────────────────────────────────────────────────────────────────────────────
// LBI TOWN BOUNDARIES — where the municipal lines actually fall, and the block
// range for every Long Beach Township village.
//
// The whole point of this page is that it shows its work. Every claim renders
// its confidence and the source it rests on, so a reader can tell a borough
// beach code from a welcome sign. Data lives in src/data/boundaries.ts.
// ─────────────────────────────────────────────────────────────────────────────

const TONE: Record<Confidence, { bg: string; fg: string; border: string }> = {
  official: { bg: '#eaf3f0', fg: 'var(--teal-deep)', border: '#c2ddd5' },
  inferred: { bg: 'var(--sand)', fg: 'var(--ink-soft)', border: 'var(--line)' },
  local: { bg: '#fdf6e6', fg: '#8a6d1f', border: '#ecd9a7' },
  open: { bg: 'transparent', fg: 'var(--slate)', border: 'var(--line)' },
}

function ConfidenceChip({ level }: { level: Confidence }) {
  const t = TONE[level]
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 999,
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.border}`,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {CONFIDENCE_LABEL[level]}
    </span>
  )
}

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

export default function BoundariesPage() {
  const crosswalkVillages = villageBlocks.filter(v => v.crosswalk && v.crosswalk.length > 0)

  return (
    <div className="pg-wrap">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'LBI Towns', path: '/towns' },
            { name: 'Town Boundaries', path: '/lbi-town-boundaries' },
          ])),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <Link to="/towns" style={{ ...linkStyle, textDecoration: 'none' }}>← LBI Towns</Link>
          <span className="rule" />
          <span>Boundaries · Block numbers</span>
        </div>
        <h1>LBI Town <em>Boundaries</em></h1>
        <p className="pg-lede">
          Your mailing address on Long Beach Island often isn&apos;t the town you actually live in.
          A South 3rd Street house addressed &ldquo;Surf City&rdquo; sits in Ship Bottom. A 31st Street
          house can be in either town depending on which side of the street it&apos;s on. And the
          fourteen villages of Long Beach Township — Loveladies down to Holgate — run on a block
          numbering system nobody publishes in usable form. This page does.
        </p>
        <div className="pg-tabs pg-tabs-static" style={{ pointerEvents: 'none' }}>
          <div className="pg-tab active">
            <span className="tab-lbl">Municipalities</span>
            <span className="tab-val">6</span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">LBT Villages</span>
            <span className="tab-val">{villageBlocks.length}</span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">Split Streets</span>
            <span className="tab-val">2</span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">Posts &amp; Signs</span>
            <span className="tab-val">{markerPosts.length}</span>
          </div>
        </div>
      </div>

      <div className="pg-grid">

        {/* ── Main column ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* 1 — the nine segments */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              Six Towns, Nine Segments
            </h2>
            <p style={{ ...body, marginBottom: 14 }}>
              Long Beach Island has six municipalities, but driving north to south you pass through
              nine distinct stretches. That&apos;s because <b>Long Beach Township is non-contiguous</b> —
              five separate chunks wrapped around the five boroughs. Loveladies sits <em>north</em> of
              Harvey Cedars, not south of it. This one fact explains most of the confusion about
              where you are on LBI.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ ...th, width: 40 }}>#</th>
                    <th style={th}>Segment</th>
                    <th style={th}>Municipality</th>
                  </tr>
                </thead>
                <tbody>
                  {islandSegments.map((s, i) => (
                    <tr key={s.segment}>
                      <td style={{ ...td, color: 'var(--slate)' }}>{i + 1}</td>
                      <td style={{ ...td, color: 'var(--ink)', fontWeight: 500 }}>
                        {s.slug ? (
                          <Link to={`/${s.slug}`} style={linkStyle}>{s.segment}</Link>
                        ) : s.segment}
                      </td>
                      <td style={td}>{s.municipality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* 2 — where each line falls */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              Where Each Town Line Falls
            </h2>
            <p style={{ ...body, marginBottom: 18 }}>
              North to south. Each line shows what the claim rests on — a borough beach code and a
              welcome sign are not the same grade of evidence, and this page doesn&apos;t pretend
              otherwise.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 22 }}>
              {municipalBoundaries.map(b => (
                <li key={`${b.north}-${b.south}`} style={{ paddingLeft: 14, borderLeft: '2px solid var(--line)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, margin: 0 }}>
                      {b.north} <span style={{ color: 'var(--slate)' }}>↔</span> {b.south}
                    </h3>
                    <ConfidenceChip level={b.confidence} />
                  </div>
                  <p style={{ ...body, margin: '0 0 8px', color: 'var(--ink)', fontWeight: 500 }}>{b.line}</p>
                  {b.detail && <p style={{ ...body, margin: 0 }}>{b.detail}</p>}
                </li>
              ))}
            </ul>
          </article>

          {/* 3 — the Division Avenue myth */}
          <article className="lc" style={{ background: 'var(--paper)', borderLeft: '3px solid var(--teal-deep)' }}>
            <h2 className="lc-name" style={{ fontSize: 22, marginBottom: 10 }}>
              The Division Avenue Myth
            </h2>
            <p style={{ ...body, marginBottom: 12 }}>
              Ask around and someone will tell you Division Avenue is where Surf City ends and Ship
              Bottom begins. It isn&apos;t. <b>Division Avenue sits two blocks inside Surf City</b>,
              between North 1st and South 1st, and the name means exactly what it says — it&apos;s
              where the borough&apos;s street numbering divides from North to South. Nothing else
              divides there.
            </p>
            <p style={{ ...body, marginBottom: 12 }}>
              The real line is two blocks further south, running down the centerline of{' '}
              <b>South 2nd Street</b>. Division Ave and South 1st are squarely Surf City. The south
              side of South 2nd, and all of South 3rd Street, are Ship Bottom — even though the mail
              there says Surf City.
            </p>
            <p style={{ ...body, margin: 0 }}>
              It&apos;s also where the island&apos;s street numbers reverse direction for the second
              of three times, which is probably how the myth got started: something genuinely does
              change at Division Avenue. Just not the town.
            </p>
          </article>

          {/* 4 — village block ranges */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              Long Beach Township Villages by Block
            </h2>
            <p style={{ ...body, marginBottom: 14 }}>
              The fourteen sections of Long Beach Township, north to south, with the Boulevard block
              range for each. Village <em>middles</em> are solid; village <em>ends</em> are softer,
              because our main source is a beach-badge list that skips streets with no beach access.
              Where the Township&apos;s own marker posts confirm a seam, we say so.
            </p>
            <p style={{ ...body, marginBottom: 14 }}>
              <b>High Bar Harbor is a fifteenth section, not in this table.</b> It&apos;s on the bay at
              the north end, off Barnegat Light, and it&apos;s Long Beach Township despite carrying the
              borough&apos;s 08006 ZIP. No ocean beach means no badge-list entry and no block range.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={th}>Village</th>
                    <th style={th}>Blocks</th>
                    <th style={th}>Street range</th>
                    <th style={th}>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {villageBlocks.map(v => (
                    <tr key={v.name}>
                      <td style={{ ...td, color: 'var(--ink)', fontWeight: 500 }}>
                        {v.slug ? <Link to={`/${v.slug}`} style={linkStyle}>{v.name} →</Link> : v.name}
                      </td>
                      <td style={{ ...td, color: 'var(--ink)', fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>
                        {v.blocks}
                      </td>
                      <td style={td}>{v.streetRange}</td>
                      <td style={td}><ConfidenceChip level={v.confidence} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="aside-list" style={{ fontSize: 13, marginTop: 18 }}>
              {villageBlocks.filter(v => v.note).map(v => (
                <li key={v.name}><span><strong>{v.name}</strong> — {v.note}</span></li>
              ))}
            </ul>
          </article>

          {/* 5 — name ↔ number crosswalk */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              Street Name to Block Number
            </h2>
            <p style={{ ...body, marginBottom: 16 }}>
              South of 52nd Street the Township stops numbering streets and starts naming them — but
              the block numbers keep running underneath. Harrington Avenue is block 73. Mermaid Lane
              is 88; the Township prints that on its own marker post. Here is the crosswalk, village
              by village.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {crosswalkVillages.map(v => (
                <div key={v.name}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, margin: '0 0 8px', display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                    <span>
                      {v.name} <span style={{ color: 'var(--slate)', fontSize: 14 }}>· {v.blocks}</span>
                    </span>
                    {v.crosswalkConfidence && <ConfidenceChip level={v.crosswalkConfidence} />}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {v.crosswalk!.map(c => (
                      <span
                        key={c.name}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'baseline',
                          gap: 6,
                          padding: '5px 11px',
                          background: 'var(--sand)',
                          border: '1px solid var(--line)',
                          borderRadius: 999,
                          fontSize: 13,
                          color: 'var(--ink-soft)',
                        }}
                      >
                        {c.name}
                        <b style={{ color: 'var(--teal-deep)', fontFamily: 'var(--font-display)' }}>{c.block}</b>
                      </span>
                    ))}
                  </div>
                  {v.crosswalkNote && (
                    <p style={{ fontSize: 12.5, color: 'var(--slate)', lineHeight: 1.5, margin: '8px 0 0' }}>
                      {v.crosswalkNote}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="aside-card advisory" style={{ marginTop: 20 }}>
              <p className="aside-title" style={{ fontSize: 17 }}>The Dunes — held back until it wasn&apos;t</p>
              <p className="aside-body">
                This section sat unnumbered here for a long time. The badge directory gives block 121
                to Holly Banks and doesn&apos;t list MacEvoy Lane at all, while the Township&apos;s own
                post at MacEvoy reads <b>121</b> — and the directory needs eight street names to fill
                seven blocks, so one of them had to be wrong. Counting the Boulevard cross streets
                answers it: there are exactly <b>seven</b> between the MacEvoy post and the Beach
                Haven Terrace post at Ohio Avenue (128). The post wins, the directory&apos;s eighth
                name is the anomaly, and the numbers below are what&apos;s left. Starboard is that
                eighth name, and it sits on no block in this run.
              </p>
            </div>
          </article>

          {/* 6 — duplicate names */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              Street Names That Appear Twice
            </h2>
            <p style={{ ...body, marginBottom: 14 }}>
              Five street names occur in two different Long Beach Township villages, in three cases
              roughly 45 blocks apart. Type one into a phone without the block number and you can
              end up a ten-minute drive from where you meant to be.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={th}>Name</th>
                    <th style={th}>Appears at</th>
                    <th style={th}>And at</th>
                  </tr>
                </thead>
                <tbody>
                  {duplicateNames.map(d => (
                    <tr key={d.name}>
                      <td style={{ ...td, color: 'var(--ink)', fontWeight: 500 }}>{d.name}</td>
                      <td style={td}>{d.here}</td>
                      <td style={td}>{d.andHere}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* 7 — informal names */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 22, marginBottom: 10 }}>
              Names You&apos;ll See That Aren&apos;t Really Places
            </h2>
            <p style={{ ...body, marginBottom: 12 }}>
              These turn up on rental listings and realtor pages but don&apos;t appear as posted
              Township sections. They&apos;re marketing names, historic plat names, or informal
              local usage — real enough in conversation, but they won&apos;t help you work out
              whose beach badge you need.
            </p>
            <ul className="aside-list" style={{ fontSize: 14 }}>
              {informalNames.map(n => (
                <li key={n.name}><span><strong>{n.name}</strong> — {n.note}</span></li>
              ))}
            </ul>
          </article>

          {/* 8 — how the numbering works */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              How LBI Street Numbering Works
            </h2>
            <p style={{ ...body, marginBottom: 14 }}>
              There isn&apos;t one system — there are several unrelated ones, and they don&apos;t all
              run the same direction. Driving the Boulevard from the lighthouse to Holgate, the
              printed numbers change direction <b>three times</b>.
            </p>
            <ol style={{ ...body, paddingLeft: 20, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {numberingReversals.map(r => (
                <li key={r.step}><b>{r.step}</b> {r.detail}</li>
              ))}
            </ol>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={th}>Town / section</th>
                    <th style={th}>System</th>
                    <th style={th}>Driving south</th>
                  </tr>
                </thead>
                <tbody>
                  {numberingSystems.map(n => (
                    <tr key={n.area}>
                      <td style={{ ...td, color: 'var(--ink)', fontWeight: 500 }}>{n.area}</td>
                      <td style={td}>{n.system}</td>
                      <td style={{ ...td, whiteSpace: 'nowrap' }}>{n.direction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ ...body, marginTop: 16, marginBottom: 0 }}>
              <b>The collision point:</b> Beach Haven Terrace ends at Delaware Avenue, block 133. The
              next block south is <b>34th Street</b>, in Beach Haven Gardens, and from there the
              numbers count back down to 13th at the Beach Haven borough line. Two systems running in
              opposite directions meet mid-island with nothing on the ground explaining it — and the
              Township&apos;s Beach Haven Gardens marker post sits right at the seam.
            </p>
          </article>

          {/* 9 — marker posts */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 24, marginBottom: 10 }}>
              The Township&apos;s Marker Posts
            </h2>
            <p style={{ ...body, marginBottom: 14 }}>
              Long Beach Township has planted white posts along Long Beach Boulevard: section posts
              carrying the village name, and street posts carrying the street name{' '}
              <em>with its block number printed on it</em>. They&apos;re the Township&apos;s own
              answer to the question this page is trying to settle, and at four separate section
              seams they agree with the beach-badge directory — including back-to-back pairs at
              MacEvoy Lane and Virginia Avenue where one village ends and the next begins. The last
              two rows are borough welcome signs rather than Township posts.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={th}>Post reads</th>
                    <th style={th}>At</th>
                    <th style={th}>Blvd</th>
                    <th style={th}>What it establishes</th>
                  </tr>
                </thead>
                <tbody>
                  {markerPosts.map(p => (
                    <tr key={`${p.reads}-${p.blvd}`}>
                      <td style={{ ...td, color: 'var(--ink)', fontWeight: 500 }}>{p.reads}</td>
                      <td style={td}>{p.at}</td>
                      <td style={{ ...td, whiteSpace: 'nowrap' }}>
                        {p.blvdApprox ? `~${p.blvd}` : p.blvd}
                      </td>
                      <td style={td}>{p.establishes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--slate)', margin: '10px 0 0' }}>
              ~ marks a Boulevard number read off the block rather than a building.
            </p>
          </article>

          {/* 10 — method */}
          <article className="lc">
            <h2 className="lc-name" style={{ fontSize: 22, marginBottom: 10 }}>
              How We Know This
            </h2>
            <p style={{ ...body, marginBottom: 12 }}>
              Two primary sources carry most of this page. The first is the{' '}
              <b>Long Beach Township Beach Patrol street directory</b>, which lists every street
              requiring a Township badge, grouped by village, with each street&apos;s block number.
              It is the only published name-to-number crosswalk for the Township.
            </p>
            <p style={{ ...body, marginBottom: 12 }}>
              It has one known flaw, and it matters: <b>it is a badge list, not a street census</b>.
              Streets with no beach access simply aren&apos;t in it — 124th Street in North Beach,
              Shallow Shore Lane near Surf City, and MacEvoy Lane in The Dunes are all real streets
              missing from the directory. That&apos;s why the first and last entry in any
              village&apos;s list is a weak boundary marker while the interior is reliable.
            </p>
            <p style={{ ...body, marginBottom: 14 }}>
              The second source is the Township&apos;s <b>marker posts</b>, which are independent of
              the directory and confirm it at four separate village seams. Where the two disagree —
              as they do in The Dunes — we hold the claim rather than pick a side.
            </p>
            <ul className="aside-list" style={{ fontSize: 13 }}>
              {boundarySources.map(s => (
                <li key={s.name}><span><strong>{s.name}</strong> — {s.detail}</span></li>
              ))}
            </ul>
          </article>

          {/* 11 — FAQ (renders FAQPage JSON-LD too) */}
          <FaqSection
            title="LBI Boundary FAQ"
            faqs={[
              {
                q: 'What town is 31st Street in — Ship Bottom or Brant Beach?',
                a: 'Both. The municipal line runs along 31st Street rather than at either end of it: the north side is Ship Bottom, the south side is Brant Beach in Long Beach Township. Neighbors facing each other across 31st Street live in different towns, pay different taxes, and need different beach badges.',
              },
              {
                q: 'Is South 3rd Street in Surf City or Ship Bottom?',
                a: 'Ship Bottom, despite the Surf City mailing address. Surf City ends at the centerline of South 2nd Street — only the north side of S 2nd is Surf City. Everything south of that line, including all of South 3rd Street, is Ship Bottom. Ship Bottom’s own beach code describes its beaches as starting at the southern end of 3rd Street.',
              },
              {
                q: 'Is Division Avenue the Surf City / Ship Bottom border?',
                a: 'No. Division Avenue sits two blocks inside Surf City, between North 1st and South 1st Street. The name refers to where the borough’s street numbering divides from North to South, not where the towns divide. The actual line is the centerline of South 2nd Street.',
              },
              {
                q: 'Where does Beach Haven start?',
                a: 'At 12th Street. North of 12th is North Beach Haven, which is part of Long Beach Township; south of 12th is Beach Haven borough. Three sources agree: the borough defines its beaches as 12th St. to Nelson Ave., the Township badge directory ends at 13th St, and the "Welcome to Historic Beach Haven" sign stands at the corner of 12th.',
              },
              {
                q: 'Where does Barnegat Light end and Loveladies begin?',
                a: 'At Holly Drive, just south of E 30th Street. The "Welcome to Barnegat Light" sign stands at about 177 Long Beach Boulevard, and Holly Drive — the next street south — is tract 176, the northernmost Loveladies entry in the Long Beach Township badge list. The Loveladies tract numbers are the Boulevard addresses, so 176 is Township and 177 is the borough.',
              },
              {
                q: 'Is High Bar Harbor in Barnegat Light or Long Beach Township?',
                a: 'Long Beach Township. High Bar Harbor is the bayside lagoon community at the north end of the island, reached by one road off Barnegat Light, and it is the Township’s northwestern-most section. It shares Barnegat Light’s 08006 ZIP code, which is why it gets listed as part of the borough — the mail and the municipality disagree here, the same way they do on South 3rd Street.',
              },
              {
                q: 'Is Loveladies its own town?',
                a: 'No. Loveladies is a section of Long Beach Township on the north end of the island, sitting between Barnegat Light and Harvey Cedars — north of Harvey Cedars, which surprises most first-time visitors. Long Beach Township beach badges and rules apply.',
              },
              {
                q: 'Why does my LBI mailing address not match my town?',
                a: 'Because postal boundaries and municipal boundaries are drawn by different authorities and were never reconciled. Almost the entire island shares ZIP 08008, and mail routes follow delivery convenience rather than town lines. The clearest example is South 3rd Street: addressed Surf City, taxed by Ship Bottom.',
              },
              {
                q: 'How many towns are on Long Beach Island?',
                a: 'Six municipalities: Barnegat Light, Harvey Cedars, Surf City, Ship Bottom, Long Beach Township, and Beach Haven. But you pass through nine distinct stretches driving the island, because Long Beach Township is non-contiguous — five separate pieces wrapped around the five boroughs.',
              },
            ]}
          />
        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          <div className="aside-card advisory">
            <p className="aside-title">The short version</p>
            <ul className="aside-list">
              <li><span><strong>Holly Dr</strong> — Loveladies ends at 176, Barnegat Light begins at 177</span></li>
              <li><span><strong>S 2nd St</strong> — Surf City north side, Ship Bottom south side</span></li>
              <li><span><strong>31st St</strong> — Ship Bottom north side, Brant Beach south side</span></li>
              <li><span><strong>William St</strong> — Harvey Cedars ends, North Beach begins</span></li>
              <li><span><strong>12th St</strong> — Long Beach Township ends, Beach Haven begins</span></li>
              <li><span><strong>Nelson Ave</strong> — Beach Haven ends, Holgate begins</span></li>
            </ul>
          </div>

          <div className="aside-card">
            <p className="aside-title">How confident is each claim?</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(['official', 'inferred', 'local', 'open'] as Confidence[]).map(level => (
                <li key={level} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                  <ConfidenceChip level={level} />
                  <span style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.45 }}>
                    {level === 'official' && 'Stated outright by a borough code, the Township directory, or a marker post.'}
                    {level === 'inferred' && 'Deduced from an official source that doesn’t say it directly.'}
                    {level === 'local' && 'Seen on the ground — signage or physical markers.'}
                    {level === 'open' && 'Needs a parcel record or tax map to settle.'}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="aside-card">
            <p className="aside-title">Tell them apart on the ground</p>
            <ul className="aside-list">
              <li><span><strong>Street sign blades</strong> — each municipality uses its own color, font and style</span></li>
              <li><span><strong>Beach entrance signs</strong> — every street end posts whose badge is required</span></li>
              <li><span><strong>Pavement &amp; curbing</strong> — public works stops at the line</span></li>
              <li><span><strong>Parcel records</strong> — the only thing that settles a disputed line</span></li>
            </ul>
          </div>

          <div className="aside-card">
            <p className="aside-title">Go deeper</p>
            <ul className="aside-list">
              <li><Link to="/lbi-map" style={linkStyle}>Map of LBI &amp; island layout →</Link></li>
              <li><Link to="/lbi-town-services" style={linkStyle}>Police, schools &amp; ZIP codes →</Link></li>
              <li><Link to="/towns" style={linkStyle}>All 6 LBI towns →</Link></li>
              <li><Link to="/long-beach-township" style={linkStyle}>Long Beach Township sections →</Link></li>
              <li><Link to="/beaches" style={linkStyle}>Beach badges by town →</Link></li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  )
}
