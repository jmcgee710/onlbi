import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { beachBadgeInfo } from '../data/beachBadges'
import { ISLAND_PATH, OCEAN_PATH, Causeway, westShoreX, scaleY as toY, VIEW_W, VIEW_H } from './lbiGeometry'

// ─────────────────────────────────────────────────────────────────────────────
// LBI TOWNS MAP — the same island drawing as the homepage map (lbiGeometry),
// north (Barnegat Light) at the top to the south tip (Holgate) at the bottom.
//
//  1. IT IS AN ISLAND, NOT A BAR CHART. Each town is a stretch of the island
//     silhouette (a rect clipped to the island path), laid out roughly to scale
//     against real section lengths — which is why Holgate and the central
//     Township run read as long as they are.
//
//  2. LABELS SIT ON THE BAY SIDE, just off the shore (westShoreX), so thin
//     sections like North Beach still get a full label.
//
//  3. TOUCH IS A FIRST-CLASS INPUT. Pointer, focus and tap all drive the same
//     `active` state, which feeds a detail panel under the map.
//
// Long Beach Township is NOT one contiguous town: its sections are interleaved
// between the boroughs (Loveladies sits NORTH of Harvey Cedars; North Beach sits
// between Harvey Cedars and Surf City; the big central patchwork sits between
// Ship Bottom and Beach Haven; Holgate is the south tip; High Bar Harbor is a
// bayside enclave off Barnegat Light). Every LBT stretch is striped.
//
// Each town stays a real SVG <a href> — crawlable, and works with JS disabled.
// The detail panel is progressive enhancement layered on top of that.
// ─────────────────────────────────────────────────────────────────────────────

type Segment = {
  slug: string
  name: string
  sub: string
  /** Longer line shown in the detail panel. */
  blurb: string
  /** To-scale position on a 40–620 run (~32 units per mile, 18 miles). */
  y0: number
  y1: number
  lbt?: boolean
  /** Badge lookup — LBT sections fall through to the township. */
  badgeSlug?: string
  nameY?: number // label baseline overrides, in map units
  subY?: number
}

const SEGMENTS: Segment[] = [
  {
    slug: 'barnegat-light', name: 'Barnegat Light', sub: 'North tip · Old Barney',
    blurb: 'The north tip, anchored by Barnegat Lighthouse and the Viking Village fishing fleet. Its own borough, and the only town on the island with its own ZIP code.',
    y0: 40, y1: 88, nameY: 84, subY: 98,
  },
  {
    slug: 'loveladies', name: 'Loveladies', sub: 'Long Beach Twp.',
    blurb: 'Architect-designed homes on wide lots and beaches that stay quiet in August. A Township section — and it sits north of Harvey Cedars, which surprises everyone.',
    y0: 88, y1: 136, lbt: true, badgeSlug: 'long-beach-township',
  },
  {
    slug: 'harvey-cedars', name: 'Harvey Cedars', sub: 'Quiet · big sunsets',
    blurb: 'A narrow, peaceful borough with the best sunsets on the island. Ends at William Street, where two welcome signs face opposite directions.',
    y0: 136, y1: 184,
  },
  {
    slug: 'north-beach', name: 'North Beach', sub: 'Long Beach Twp.',
    blurb: 'A short, entirely residential Township section with no commercial strip at all. Boulevard blocks 1006–1118.',
    y0: 184, y1: 206, lbt: true, badgeSlug: 'long-beach-township',
  },
  {
    slug: 'surf-city', name: 'Surf City', sub: 'Central hub',
    blurb: 'A walkable borough mid-island with shops and food along the Boulevard. Ends midway down South 2nd Street — not at Division Avenue, whatever you have been told.',
    y0: 206, y1: 248,
  },
  {
    // Name above the causeway, sub below it.
    slug: 'ship-bottom', name: 'Ship Bottom', sub: 'Gateway · Causeway',
    blurb: 'Where the Route 72 Causeway lands — the gateway to LBI. Both its boundaries run down the middle of a street, at S 2nd and at 31st.',
    y0: 248, y1: 286, nameY: 333, subY: 373,
  },
  {
    slug: 'brant-beach', name: 'Brant Beach', sub: 'Long Beach Twp. · 31–73',
    blurb: 'The largest Township section and a family-rental favourite, running from 31st Street to Harrington Avenue. Home to Bayview Park and the township offices.',
    y0: 286, y1: 350, lbt: true, badgeSlug: 'long-beach-township',
  },
  {
    slug: 'long-beach-township', name: 'Long Beach Twp.', sub: 'central sections · 74–133',
    blurb: 'The long central run — Beach Haven Crest, Brighton Beach, Peahala Park, Beach Haven Park, Haven Beach, The Dunes, the Terrace, the Gardens, Spray Beach and North Beach Haven.',
    y0: 350, y1: 510, lbt: true,
  },
  {
    slug: 'beach-haven', name: 'Beach Haven', sub: 'Walkable · lively',
    blurb: 'The Queen City — the island’s downtown, and the busiest, most walkable town on LBI. Runs from 12th Street to Nelson Avenue.',
    y0: 510, y1: 558,
  },
  {
    slug: 'holgate', name: 'Holgate', sub: 'Long Beach Twp. · south tip',
    blurb: 'The southern peninsula, ending at the Edwin B. Forsythe National Wildlife Refuge. Wide, uncrowded beaches; the refuge closes April 1 – Aug 31 for plover nesting.',
    y0: 558, y1: 620, lbt: true, badgeSlug: 'long-beach-township',
  },
]

const badgeByTown = Object.fromEntries(beachBadgeInfo.map(b => [b.townSlug, b.pricing.daily]))

const INK = '#10263A'
const OCEAN = '#2A6F97'
const BAY = '#4E7A5A'
const SAND = '#EFE3CC'
const SAND_ALT = '#F6EEDD'

export default function LbiTownsMap() {
  const navigate = useNavigate()
  const [active, setActive] = useState<string | null>(null)

  // The condition that actually matters is "can this device hover", not "is
  // this touch" — a device without hover can never see the detail panel before
  // it navigates away. Queried inside handlers only, never during render, so
  // server and client markup stay identical.
  const canHover = () =>
    typeof window === 'undefined' || window.matchMedia('(hover: hover)').matches

  // Which town a deliberate tap has armed. This CANNOT be derived from `active`:
  // mobile browsers synthesise mouseenter (and focus) on tap, so `active` is
  // already set to the tapped town by the time the click handler runs, and a
  // first tap would look identical to a second. This ref only ever moves in the
  // click handler, so it stays honest.
  const tapArmed = useRef<string | null>(null)

  const go = (e: React.MouseEvent, slug: string) => {
    // Let modified clicks (new tab) and non-primary buttons fall through to the
    // native <a>; otherwise route client-side.
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return

    // No hover: first tap reveals the town in the panel, second tap on the same
    // town opens its guide. Pointer and keyboard users navigate on the first
    // click, because hover or focus has already shown them the panel.
    if (!canHover() && tapArmed.current !== slug) {
      e.preventDefault()
      tapArmed.current = slug
      setActive(slug)
      return
    }

    e.preventDefault()
    navigate(`/${slug}`)
  }

  // Ignore synthetic mouseenter on no-hover devices so the panel is driven by
  // deliberate taps rather than by the browser's emulated pointer.
  const hoverIn = (slug: string) => {
    if (canHover()) setActive(slug)
  }

  // Only clear on pointer-out for real hover devices — without hover the
  // selection has to persist, or the panel empties before it can be read.
  const clearIfHover = () => {
    if (canHover()) setActive(null)
  }

  const handlers = (slug: string) => ({
    onClick: (e: React.MouseEvent) => go(e, slug),
    onMouseEnter: () => hoverIn(slug),
    onMouseLeave: clearIfHover,
    onFocus: () => setActive(slug),
    onBlur: clearIfHover,
  })

  const current = SEGMENTS.find(s => s.slug === active) ?? null
  const currentBadge = current ? badgeByTown[current.badgeSlug ?? current.slug] : undefined

  let boroughIndex = 0

  return (
    <div>
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
          .tm-seg:focus-visible { outline: none; }
          .tm-hl { fill: ${OCEAN}; fill-opacity: 0; transition: fill-opacity 140ms ease; }
          .tm-seg.is-active .tm-hl { fill-opacity: 0.3; }
          .tm-seg.is-active .tm-name { fill: ${OCEAN}; }
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

        {/* Town stretches of the island, each with its bay-side label */}
        {SEGMENTS.map((s, i) => {
          const fill = s.lbt ? 'url(#tm-lbt)' : boroughIndex++ % 2 === 0 ? SAND : SAND_ALT
          // Bleed the end stretches past the tips so the clip leaves no slivers.
          const top = i === 0 ? toY(s.y0) - 20 : toY(s.y0)
          const bottom = i === SEGMENTS.length - 1 ? toY(s.y1) + 20 : toY(s.y1)
          const mid = (toY(s.y0) + toY(s.y1)) / 2
          const nameY = s.nameY ?? mid - 2
          const subY = s.subY ?? nameY + 15
          return (
            <a
              key={s.slug}
              href={`/${s.slug}`}
              className={`tm-seg${active === s.slug ? ' is-active' : ''}`}
              aria-label={`${s.name}${s.lbt ? ' (Long Beach Township)' : ''} guide`}
              {...handlers(s.slug)}
            >
              {/* Generous invisible hit area across the stretch and its label */}
              <rect x="40" y={top} width="340" height={bottom - top} fill="transparent" />
              <g clipPath="url(#tm-island)">
                <rect x="150" y={top} width="220" height={bottom - top} fill={fill} />
                <rect className="tm-hl" x="150" y={top} width="220" height={bottom - top} />
                {i > 0 && <line x1="150" y1={top} x2="370" y2={top} stroke="#C9B48E" strokeWidth="1" />}
              </g>
              <text className="tm-name" x={westShoreX(nameY - 5) - 14} y={nameY} textAnchor="end">{s.name}</text>
              <text className="tm-sub" x={westShoreX(subY - 4) - 14} y={subY} textAnchor="end">{s.sub}</text>
            </a>
          )
        })}
        <path d={ISLAND_PATH} fill="none" stroke="#C9B48E" strokeWidth="1.5" pointerEvents="none" />

        {/* High Bar Harbor — LBT bayside enclave reached by one road off Barnegat Light */}
        <a
          href="/long-beach-township"
          className={`tm-seg${active === 'long-beach-township' ? ' is-active' : ''}`}
          aria-label="High Bar Harbor, part of Long Beach Township"
          {...handlers('long-beach-township')}
        >
          <line x1="296" y1="50" x2="312" y2="50" stroke="#B9AD95" strokeWidth="3" />
          <ellipse cx="284" cy="50" rx="13" ry="9" fill="url(#tm-lbt)" stroke="#C9B48E" />
          <ellipse className="tm-hl" cx="284" cy="50" rx="13" ry="9" />
          <text className="tm-sub" x="264" y="46" textAnchor="end" style={{ fontWeight: 600, fill: INK }}>High Bar Harbor</text>
          <text className="tm-sub" x="264" y="59" textAnchor="end">Long Beach Twp.</text>
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

      {/* Detail panel — progressive enhancement over the crawlable links above.
          Fixed min-height so selecting a town never shifts the page. */}
      <div
        aria-live="polite"
        style={{
          maxWidth: 560,
          margin: '14px auto 0',
          padding: '14px 16px',
          minHeight: 92,
          background: current ? 'var(--foam)' : 'var(--paper)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--r-md)',
          transition: 'background 140ms ease',
        }}
      >
        {current ? (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 20, margin: 0, color: 'var(--ink)' }}>
                {current.name}
              </h3>
              {currentBadge !== undefined && currentBadge > 0 && (
                <span style={{ fontSize: 12, color: 'var(--slate)' }}>
                  Daily badge <b style={{ color: 'var(--ocean)', fontSize: 14 }}>${currentBadge}</b>
                </span>
              )}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-soft)', margin: '6px 0 0' }}>
              {current.blurb}
            </p>
          </>
        ) : (
          <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--slate)', margin: 0 }}>
            <b style={{ color: 'var(--ink-soft)' }}>Tap or hover a town</b> to see what it&apos;s like and
            what a beach badge costs. Tap again to open the full guide. The striped stretches are all one
            municipality — Long Beach Township, in five separate pieces.
          </p>
        )}
      </div>
    </div>
  )
}
