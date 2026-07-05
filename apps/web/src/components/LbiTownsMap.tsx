import { useNavigate } from 'react-router-dom'

// ─────────────────────────────────────────────────────────────────────────────
// LBI TOWNS MAP — a hand-built SVG of Long Beach Island as a tall barrier-island
// strip, north (Barnegat Light) at the top to the south tip (Holgate) at the
// bottom. Each band is a clickable region linking to a municipality guide.
//
// Long Beach Township is NOT one contiguous town — its sections are interleaved
// between the boroughs (Loveladies sits NORTH of Harvey Cedars; North Beach sits
// between Harvey Cedars and Surf City; the big central patchwork sits between
// Ship Bottom and Beach Haven; Holgate is the south tip; and High Bar Harbor is
// a bayside enclave off Barnegat Light). Every LBT band is shaded teal and links
// to /long-beach-township so the patchwork reads honestly.
//
// Each band is a real SVG <a href> (crawlable + works without JS), with an
// onClick that hands navigation to React Router for client-side routing.
// ─────────────────────────────────────────────────────────────────────────────

type Band = {
  slug: string
  name: string
  sub?: string
  y0: number
  y1: number
  lbt?: boolean
}

// North → south, geographically ordered. LBT sections are interleaved with the
// boroughs rather than grouped, because that is how the island actually runs.
const BANDS: Band[] = [
  { slug: 'barnegat-light', name: 'Barnegat Light', sub: 'North tip · Old Barney', y0: 24, y1: 86 },
  { slug: 'long-beach-township', name: 'Loveladies', sub: 'Long Beach Twp.', y0: 86, y1: 128, lbt: true },
  { slug: 'harvey-cedars', name: 'Harvey Cedars', sub: 'Quiet · sunsets', y0: 128, y1: 186 },
  { slug: 'long-beach-township', name: 'North Beach', sub: 'Long Beach Twp.', y0: 186, y1: 214, lbt: true },
  { slug: 'surf-city', name: 'Surf City', sub: 'Central hub', y0: 214, y1: 272 },
  { slug: 'ship-bottom', name: 'Ship Bottom', sub: 'Gateway · Causeway', y0: 272, y1: 320 },
  { slug: 'long-beach-township', name: 'Long Beach Twp.', sub: 'Brant Beach · central', y0: 320, y1: 452, lbt: true },
  { slug: 'beach-haven', name: 'Beach Haven', sub: 'Walkable · lively', y0: 452, y1: 528 },
]

const X0 = 116
const X1 = 184

// Teal tint for Long Beach Township sections; boroughs alternate sand/paper.
const LBT_FILL = 'var(--teal-deep)'
const LBT_OPACITY = 0.16

export default function LbiTownsMap() {
  const navigate = useNavigate()

  const go = (e: React.MouseEvent, slug: string) => {
    // Let modified clicks (new tab) and non-primary buttons fall through to the
    // native <a>; otherwise route client-side.
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    navigate(`/${slug}`)
  }

  return (
    <svg
      viewBox="0 0 300 636"
      role="img"
      aria-label="Map of the towns of Long Beach Island, New Jersey, north to south: Barnegat Light (with High Bar Harbor), Loveladies, Harvey Cedars, North Beach, Surf City, Ship Bottom, the central Long Beach Township sections, Beach Haven, and Holgate at the south tip. Loveladies, North Beach, Holgate and High Bar Harbor are all part of Long Beach Township."
      style={{ width: '100%', maxWidth: 300, height: 'auto', display: 'block', margin: '0 auto' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Map of Long Beach Island (LBI) towns, north to south</title>

      <style>{`
        .twn-seg rect, .twn-seg path { transition: fill-opacity 120ms ease, fill 120ms ease; }
        .twn-seg:hover rect, .twn-seg:hover path { fill: var(--teal-deep); fill-opacity: 1; }
        .twn-seg:hover text { fill: #fff; }
        .twn-seg { cursor: pointer; }
        .twn-lbl { font-family: var(--font-display, serif); font-size: 13px; fill: var(--ink, #123); }
        .twn-sub { font-size: 8.5px; fill: var(--ink-soft, #567); }
        .twn-geo { font-size: 9px; fill: var(--ink-soft, #789); letter-spacing: 0.14em; }
        .twn-key { font-size: 9px; fill: var(--ink-soft, #567); }
      `}</style>

      {/* Ocean (east) & Bay (west) context labels */}
      <text className="twn-geo" x={266} y={300} textAnchor="middle" transform="rotate(90 266 300)">
        ATLANTIC OCEAN
      </text>
      <text className="twn-geo" x={16} y={175} textAnchor="middle" transform="rotate(-90 16 175)">
        BARNEGAT BAY
      </text>

      {/* High Bar Harbor — LBT bayside enclave reached by one road off Barnegat Light */}
      <a
        href="/long-beach-township"
        className="twn-seg"
        onClick={e => go(e, 'long-beach-township')}
        aria-label="High Bar Harbor, part of Long Beach Township"
      >
        <rect x={40} y={34} width={62} height={30} rx={4} fill={LBT_FILL} fillOpacity={LBT_OPACITY} stroke="var(--line, #d8cfbe)" />
        <text x={71} y={47} textAnchor="middle" className="twn-sub">High Bar</text>
        <text x={71} y={57} textAnchor="middle" className="twn-sub">Harbor · LBT</text>
      </a>
      <line x1={102} y1={49} x2={X0} y2={52} stroke="var(--teal-deep, #2b7a78)" strokeWidth={2} strokeDasharray="3 3" />

      {/* Mainland + Route 72 Causeway into Ship Bottom */}
      <rect x={4} y={276} width={44} height={40} rx={5} fill="var(--sand, #efe7d8)" stroke="var(--line, #d8cfbe)" />
      <text x={26} y={293} textAnchor="middle" className="twn-sub">Mainland</text>
      <text x={26} y={305} textAnchor="middle" className="twn-sub">Rte 72</text>
      <line x1={48} y1={296} x2={X0} y2={296} stroke="var(--teal-deep, #2b7a78)" strokeWidth={3} strokeDasharray="4 3" />

      {/* Town bands */}
      {BANDS.map((b, i) => {
        const mid = (b.y0 + b.y1) / 2
        const thin = b.y1 - b.y0 < 34
        const fill = b.lbt ? LBT_FILL : i % 2 === 0 ? 'var(--sand, #efe7d8)' : 'var(--paper, #f7f2e8)'
        const fillOpacity = b.lbt ? LBT_OPACITY : 1
        return (
          <a
            key={`${b.slug}-${b.y0}`}
            href={`/${b.slug}`}
            className="twn-seg"
            onClick={e => go(e, b.slug)}
            aria-label={`${b.name}${b.lbt ? ' (Long Beach Township)' : ''} guide`}
          >
            <rect x={X0} y={b.y0} width={X1 - X0} height={b.y1 - b.y0} fill={fill} fillOpacity={fillOpacity} stroke="var(--line, #d8cfbe)" />
            {thin ? (
              <text x={150} y={mid + 3} textAnchor="middle" className="twn-lbl" style={{ fontSize: 11 }}>{b.name}</text>
            ) : (
              <>
                <text x={150} y={mid - 2} textAnchor="middle" className="twn-lbl">{b.name}</text>
                {b.sub && <text x={150} y={mid + 12} textAnchor="middle" className="twn-sub">{b.sub}</text>}
              </>
            )}
          </a>
        )
      })}

      {/* Holgate south tip — part of Long Beach Township, tapered to a point */}
      <a
        href="/long-beach-township"
        className="twn-seg"
        onClick={e => go(e, 'long-beach-township')}
        aria-label="Holgate, part of Long Beach Township"
      >
        <path d={`M${X0} 528 L${X1} 528 L155 600 L145 600 Z`} fill={LBT_FILL} fillOpacity={LBT_OPACITY} stroke="var(--line, #d8cfbe)" />
        <text x={150} y={552} textAnchor="middle" className="twn-sub">Holgate · LBT</text>
      </a>

      {/* Legend — the shaded sections are all one municipality */}
      <rect x={116} y={616} width={14} height={10} fill={LBT_FILL} fillOpacity={LBT_OPACITY} stroke="var(--line, #d8cfbe)" />
      <text x={135} y={625} className="twn-key">Shaded = Long Beach Township (one town, many sections)</text>
    </svg>
  )
}
