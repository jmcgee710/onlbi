import { useNavigate } from 'react-router-dom'
import { ISLAND_PATH, OCEAN_PATH, Causeway, westShoreX, VIEW_W, VIEW_H } from './lbiGeometry'

// ─────────────────────────────────────────────────────────────────────────────
// LBI TOWNS MAP — the same island drawing as the homepage map, with each town
// as a clickable stretch of the island, north (Barnegat Light) to the south
// tip (Holgate). Labels sit on the bay side, just off the shore.
//
// Long Beach Township is NOT one contiguous town — its sections are interleaved
// between the boroughs (Loveladies sits NORTH of Harvey Cedars; North Beach sits
// between Harvey Cedars and Surf City; the big central patchwork sits between
// Ship Bottom and Beach Haven; Holgate is the south tip; and High Bar Harbor is
// a bayside enclave off Barnegat Light). Every LBT stretch is striped so the
// patchwork reads honestly. Boundaries are relative, not surveyed street lines.
//
// Each town is a real SVG <a href> (crawlable + works without JS), with an
// onClick that hands navigation to React Router for client-side routing.
// ─────────────────────────────────────────────────────────────────────────────

type Band = {
  slug: string
  name: string
  sub?: string
  y0: number
  y1: number
  lbt?: boolean
  nameY?: number // label baseline override (default: band middle)
  subY?: number
}

// North → south, geographically ordered.
const BANDS: Band[] = [
  { slug: 'barnegat-light', name: 'Barnegat Light', sub: 'North tip · Old Barney', y0: 20, y1: 125, nameY: 98 },
  { slug: 'loveladies', name: 'Loveladies', sub: 'Long Beach Twp.', y0: 125, y1: 198, lbt: true },
  { slug: 'harvey-cedars', name: 'Harvey Cedars', sub: 'Quiet · sunsets', y0: 198, y1: 268 },
  { slug: 'north-beach', name: 'North Beach · LBT', y0: 268, y1: 300, lbt: true },
  { slug: 'surf-city', name: 'Surf City', sub: 'Central hub', y0: 300, y1: 385 },
  // Name above the causeway, sub below it.
  { slug: 'ship-bottom', name: 'Ship Bottom', sub: 'Gateway · causeway', y0: 385, y1: 442, nameY: 396, subY: 440 },
  { slug: 'brant-beach', name: 'Brant Beach', sub: 'Long Beach Twp.', y0: 442, y1: 535, lbt: true },
  { slug: 'long-beach-township', name: 'Long Beach Twp.', sub: 'Central sections', y0: 535, y1: 633, lbt: true },
  { slug: 'beach-haven', name: 'Beach Haven', sub: 'Walkable · lively', y0: 633, y1: 728 },
  { slug: 'holgate', name: 'Holgate', sub: 'Long Beach Twp. · south tip', y0: 728, y1: 880, lbt: true, nameY: 792 },
]

const INK = '#10263A'
const OCEAN = '#2A6F97'
const BAY = '#4E7A5A'
const SAND = '#EFE3CC'
const SAND_ALT = '#F6EEDD'

export default function LbiTownsMap() {
  const navigate = useNavigate()

  const go = (e: React.MouseEvent, slug: string) => {
    // Let modified clicks (new tab) and non-primary buttons fall through to the
    // native <a>; otherwise route client-side.
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    navigate(`/${slug}`)
  }

  let boroughIndex = 0

  return (
    <svg
      className="towns-map"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label="Map of the towns of Long Beach Island, New Jersey, north to south: Barnegat Light (with High Bar Harbor), Loveladies, Harvey Cedars, North Beach, Surf City, Ship Bottom, Brant Beach, the central Long Beach Township sections, Beach Haven, and Holgate at the south tip. Loveladies, North Beach, Brant Beach, Holgate and High Bar Harbor are all part of Long Beach Township."
      style={{ width: '100%', maxWidth: 560, height: 'auto', display: 'block', margin: '0 auto', borderRadius: 18 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Map of Long Beach Island (LBI) towns, north to south</title>
      <defs>
        <clipPath id="tm-island"><path d={ISLAND_PATH} /></clipPath>
        <pattern id="tm-lbt" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill={SAND} />
          <line x1="0" y1="0" x2="0" y2="8" stroke={BAY} strokeWidth="3" strokeOpacity="0.35" />
        </pattern>
      </defs>
      <style>{`
        .tm-seg { cursor: pointer; }
        .tm-seg .tm-hl { fill: ${OCEAN}; fill-opacity: 0; transition: fill-opacity 120ms ease; }
        .tm-seg:hover .tm-hl, .tm-seg:focus-visible .tm-hl { fill-opacity: 0.3; }
        .tm-seg:hover .tm-name, .tm-seg:focus-visible .tm-name { fill: ${OCEAN}; }
        .tm-name { font-family: Fraunces, Georgia, serif; font-size: 17px; fill: ${INK}; }
        .tm-sub { font-family: 'Instrument Sans', system-ui, sans-serif; font-size: 11.5px; fill: #5A6570; }
        .tm-geo { font-family: 'Instrument Sans', system-ui, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 2px; }
      `}</style>

      {/* Water + causeway */}
      <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="#E3EBDF" />
      <path d={OCEAN_PATH} fill="#DCE8F0" />
      <Causeway />
      <text className="tm-geo" x="440" y="40" fill={OCEAN} textAnchor="middle">ATLANTIC</text>
      <text className="tm-geo" x="440" y="55" fill={OCEAN} textAnchor="middle">OCEAN</text>
      <text className="tm-geo" x="40" y="40" fill={BAY}>BARNEGAT BAY</text>
      <g fontFamily="'Instrument Sans', sans-serif" fontSize="10" fontStyle="italic" fill="#5A6570">
        <text x="345" y="18">Barnegat Inlet</text>
        <text x="236" y="894">Little Egg Inlet</text>
      </g>

      {/* Town stretches of the island */}
      {BANDS.map((b) => {
        const fill = b.lbt ? 'url(#tm-lbt)' : boroughIndex++ % 2 === 0 ? SAND : SAND_ALT
        const mid = (b.y0 + b.y1) / 2
        const nameY = b.nameY ?? (b.sub ? mid - 2 : mid + 5)
        const subY = b.subY ?? nameY + 15
        const labelX = westShoreX(nameY - 5) - 14
        return (
          <a
            key={b.slug}
            href={`/${b.slug}`}
            className="tm-seg"
            onClick={(e) => go(e, b.slug)}
            aria-label={`${b.name.replace(' · LBT', '')}${b.lbt ? ' (Long Beach Township)' : ''} guide`}
          >
            <g clipPath="url(#tm-island)">
              <rect x="150" y={b.y0} width="220" height={b.y1 - b.y0} fill={fill} />
              <rect className="tm-hl" x="150" y={b.y0} width="220" height={b.y1 - b.y0} />
              <line x1="150" y1={b.y0} x2="370" y2={b.y0} stroke="#C9B48E" strokeWidth="1" />
            </g>
            <text className="tm-name" x={labelX} y={nameY} textAnchor="end">{b.name}</text>
            {b.sub && <text className="tm-sub" x={westShoreX(subY - 4) - 14} y={subY} textAnchor="end">{b.sub}</text>}
          </a>
        )
      })}
      <path d={ISLAND_PATH} fill="none" stroke="#C9B48E" strokeWidth="1.5" pointerEvents="none" />

      {/* High Bar Harbor — LBT bayside enclave reached by one road off Barnegat Light */}
      <a
        href="/long-beach-township"
        className="tm-seg"
        onClick={(e) => go(e, 'long-beach-township')}
        aria-label="High Bar Harbor, part of Long Beach Township"
      >
        <line x1="296" y1="58" x2="309" y2="58" stroke="#B9AD95" strokeWidth="3" />
        <ellipse cx="284" cy="58" rx="13" ry="9" fill="url(#tm-lbt)" stroke="#C9B48E" />
        <ellipse className="tm-hl" cx="284" cy="58" rx="13" ry="9" />
        <text className="tm-sub" x="264" y="54" textAnchor="end" style={{ fontWeight: 600, fill: INK }}>High Bar Harbor</text>
        <text className="tm-sub" x="264" y="68" textAnchor="end">Long Beach Twp.</text>
      </a>

      {/* Legend */}
      <g fontFamily="'Instrument Sans', sans-serif" fontSize="11" fill={INK}>
        <rect x="340" y="806" width="168" height="82" rx="10" fill="#FFFDF9" stroke="#D9CFBC" />
        <rect x="354" y="820" width="16" height="12" rx="2" fill={SAND} stroke="#C9B48E" />
        <text x="378" y="830">Borough</text>
        <rect x="354" y="840" width="16" height="12" rx="2" fill="url(#tm-lbt)" stroke="#C9B48E" />
        <text x="378" y="850">Long Beach Township</text>
        <line x1="354" y1="868" x2="370" y2="868" stroke="#B9AD95" strokeWidth="6" />
        <text x="378" y="872">Rt 72 causeway</text>
      </g>
    </svg>
  )
}
