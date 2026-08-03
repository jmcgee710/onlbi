import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { beachBadgeInfo } from '../data/beachBadges'

// ─────────────────────────────────────────────────────────────────────────────
// LBI TOWNS MAP — an annotated SVG of Long Beach Island, north (Barnegat Light)
// at the top to the south tip (Holgate) at the bottom.
//
// Three things drive the design:
//
//  1. IT IS AN ISLAND, NOT A BAR CHART. The silhouette is a single tapered path;
//     each town band is a plain rect drawn through a <clipPath> of that path, so
//     every segment picks up the organic coastline for free. Bands are laid out
//     roughly to scale against real section lengths (~32 units per mile), which
//     is why Holgate and the central Township run read as long as they are.
//
//  2. LABELS LIVE OUTSIDE. The island is ~54 units wide and "Harvey Cedars" is
//     not, so labels sit on the ocean side with leader lines. That is standard
//     cartographic practice for narrow features, and it means thin sections like
//     North Beach get a full label instead of being unlabelable.
//
//  3. TOUCH IS A FIRST-CLASS INPUT. The old map was hover-only, so most visitors
//     — mobile — got no feedback at all. Pointer, focus and tap all drive the
//     same `active` state, which feeds a detail panel under the map.
//
// Long Beach Township is NOT one contiguous town: its sections are interleaved
// between the boroughs (Loveladies sits NORTH of Harvey Cedars; North Beach sits
// between Harvey Cedars and Surf City; the big central patchwork sits between
// Ship Bottom and Beach Haven; Holgate is the south tip; High Bar Harbor is a
// bayside enclave off Barnegat Light). Every LBT band is tinted teal.
//
// Each band stays a real SVG <a href> — crawlable, and works with JS disabled.
// The detail panel is progressive enhancement layered on top of that.
// ─────────────────────────────────────────────────────────────────────────────

type Segment = {
  slug: string
  name: string
  sub: string
  /** Longer line shown in the detail panel. */
  blurb: string
  y0: number
  y1: number
  lbt?: boolean
  /** Badge lookup — LBT sections fall through to the township. */
  badgeSlug?: string
}

// North → south, sized against real section lengths so the map is roughly to
// scale (~32 units per mile across an 18-mile island).
const SEGMENTS: Segment[] = [
  {
    slug: 'barnegat-light', name: 'Barnegat Light', sub: 'North tip · Old Barney',
    blurb: 'The north tip, anchored by Barnegat Lighthouse and the Viking Village fishing fleet. Its own borough, and the only town on the island with its own ZIP code.',
    y0: 40, y1: 88,
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
    slug: 'ship-bottom', name: 'Ship Bottom', sub: 'Gateway · Causeway',
    blurb: 'Where the Route 72 Causeway lands — the gateway to LBI. Both its boundaries run down the middle of a street, at S 2nd and at 31st.',
    y0: 248, y1: 286,
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

// The island silhouette. One path, reused as fill, stroke and clip.
const ISLAND =
  'M 113 34 C 104 52 99 70 100 88 C 96 140 94 220 95 300 ' +
  'C 96 380 98 450 102 505 C 106 548 112 590 120 628 ' +
  'L 125 618 C 135 580 140 546 143 505 ' +
  'C 147 450 148 380 149 300 C 150 220 148 140 143 88 ' +
  'C 144 70 138 52 129 34 Z'

const badgeByTown = Object.fromEntries(beachBadgeInfo.map(b => [b.townSlug, b.pricing.daily]))

// Label anchor on the ocean side, with a leader line back to the coast.
const LABEL_X = 166
const LEADER_FROM = 150

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

  const current = SEGMENTS.find(s => s.slug === active) ?? null
  const currentBadge = current ? badgeByTown[current.badgeSlug ?? current.slug] : undefined

  return (
    <div>
      <svg
        viewBox="0 0 330 660"
        role="img"
        aria-label="Map of the towns of Long Beach Island, New Jersey, north to south: Barnegat Light (with High Bar Harbor), Loveladies, Harvey Cedars, North Beach, Surf City, Ship Bottom, Brant Beach, the central Long Beach Township sections, Beach Haven, and Holgate at the south tip. Loveladies, North Beach, Brant Beach, Holgate and High Bar Harbor are all part of Long Beach Township."
        style={{ width: '100%', maxWidth: 380, height: 'auto', display: 'block', margin: '0 auto' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Map of Long Beach Island (LBI) towns, north to south</title>

        <defs>
          <clipPath id="lbi-island-clip">
            <path d={ISLAND} />
          </clipPath>
          {/* ONE water fill across the whole canvas, not two side rects. Two
              rects left hard edges at the viewBox bounds and read as grey
              blocks. This fades to zero at both horizontal ends, and the mask
              below does the same top and bottom, so the water has no edges at
              all — it just thins out into the page. Tint is strongest near each
              shore, which is also how water actually reads on a map. */}
          <linearGradient id="lbi-water" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6B9694" stopOpacity="0" />
            <stop offset="22%" stopColor="#6B9694" stopOpacity="0.20" />
            <stop offset="44%" stopColor="#6B9694" stopOpacity="0.05" />
            <stop offset="56%" stopColor="#B8CDC8" stopOpacity="0.07" />
            <stop offset="78%" stopColor="#B8CDC8" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#B8CDC8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lbi-vfade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="7%" stopColor="#FFFFFF" />
            <stop offset="93%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <mask id="lbi-water-mask">
            <rect x={0} y={0} width={330} height={660} fill="url(#lbi-vfade)" />
          </mask>
        </defs>

        <style>{`
          .seg-hit { cursor: pointer; }
          .seg-band { transition: fill-opacity 140ms ease; }
          .seg-lbl { font-family: var(--font-display, serif); font-size: 13px; fill: var(--ink, #0F1F2E); }
          .seg-sub { font-size: 10px; fill: var(--slate, #5F7388); }
          .seg-lead { stroke: var(--line, #E3DCC9); stroke-width: 1; }
          .seg-hit:hover .seg-lbl, .seg-hit:focus-visible .seg-lbl { fill: var(--teal-deep, #486C6B); }
          .seg-hit:focus-visible { outline: none; }
          .geo-lbl { font-size: 9px; fill: var(--slate-soft, #8A9AAB); letter-spacing: 0.16em; }
          .key-lbl { font-size: 8.8px; fill: var(--slate, #5F7388); }
          .mile { font-size: 8px; fill: var(--slate-soft, #8A9AAB); }
        `}</style>

        {/* Water — Barnegat Bay west, Atlantic east, one fill, no edges */}
        <rect x={0} y={0} width={330} height={660} fill="url(#lbi-water)" mask="url(#lbi-water-mask)" />
        <text className="geo-lbl" x={318} y={330} textAnchor="middle" transform="rotate(90 318 330)">
          ATLANTIC OCEAN
        </text>
        <text className="geo-lbl" x={22} y={210} textAnchor="middle" transform="rotate(-90 22 210)">
          BARNEGAT BAY
        </text>

        {/* Mainland + Route 72 Causeway, landing in Ship Bottom */}
        <rect x={2} y={252} width={54} height={38} rx={6} fill="var(--sand, #F2EADB)" stroke="var(--line, #E3DCC9)" />
        <text x={29} y={268} textAnchor="middle" className="seg-sub">Mainland</text>
        <text x={29} y={280} textAnchor="middle" className="seg-sub">Rte 72</text>
        <line x1={56} y1={269} x2={99} y2={267} stroke="var(--teal-deep, #486C6B)" strokeWidth={2.5} strokeDasharray="5 3" />

        {/* High Bar Harbor — LBT bayside enclave off Barnegat Light */}
        <a
          href="/long-beach-township"
          className="seg-hit"
          onClick={e => go(e, 'long-beach-township')}
          onMouseEnter={() => hoverIn('long-beach-township')}
          onMouseLeave={clearIfHover}
          onFocus={() => setActive('long-beach-township')}
          onBlur={clearIfHover}
          aria-label="High Bar Harbor, part of Long Beach Township"
        >
          <rect x={14} y={52} width={70} height={28} rx={5} fill="var(--teal-deep, #486C6B)" fillOpacity={0.14} stroke="var(--line, #E3DCC9)" />
          <text x={49} y={65} textAnchor="middle" className="seg-sub">High Bar</text>
          <text x={49} y={75} textAnchor="middle" className="seg-sub">Harbor · LBT</text>
        </a>
        <line x1={84} y1={66} x2={101} y2={62} stroke="var(--teal-deep, #486C6B)" strokeWidth={1.5} strokeDasharray="3 3" />

        {/* Island body, then the town bands clipped to its outline */}
        <path d={ISLAND} fill="var(--shell, #FBF7EF)" />
        <g clipPath="url(#lbi-island-clip)">
          {SEGMENTS.map((s, i) => {
            const isActive = active === s.slug
            const base = s.lbt
              ? 'var(--teal-deep, #486C6B)'
              : i % 2 === 0
                ? 'var(--sand, #F2EADB)'
                : 'var(--sand-warm, #EDE3CF)'
            const opacity = isActive ? (s.lbt ? 0.62 : 1) : s.lbt ? 0.16 : 1
            // Bleed the end bands past the tips so the clip leaves no bare
            // slivers at the north point or down at Holgate.
            const top = i === 0 ? s.y0 - 14 : s.y0
            const bottom = i === SEGMENTS.length - 1 ? s.y1 + 14 : s.y1
            return (
              <g key={s.slug}>
                <rect
                  className="seg-band"
                  x={88} y={top} width={70} height={bottom - top}
                  fill={isActive && !s.lbt ? 'var(--seafoam, #B8CDC8)' : base}
                  fillOpacity={opacity}
                />
                {i < SEGMENTS.length - 1 && (
                  <line x1={88} y1={s.y1} x2={158} y2={s.y1} stroke="var(--line, #E3DCC9)" strokeWidth={0.8} />
                )}
              </g>
            )
          })}
        </g>
        <path d={ISLAND} fill="none" stroke="var(--teal-deep, #486C6B)" strokeOpacity={0.45} strokeWidth={1.2} />

        {/* Scale bar, tied to the island's west coast so it reads as a measure
            of the island rather than a stray rule in the bay. */}
        <line x1={84} y1={40} x2={84} y2={620} stroke="var(--slate-soft, #8A9AAB)" strokeOpacity={0.5} strokeWidth={0.8} />
        <line x1={84} y1={40} x2={99} y2={40} stroke="var(--slate-soft, #8A9AAB)" strokeOpacity={0.5} strokeWidth={0.8} />
        <line x1={84} y1={620} x2={116} y2={620} stroke="var(--slate-soft, #8A9AAB)" strokeOpacity={0.5} strokeWidth={0.8} />
        <text className="mile" x={80} y={43} textAnchor="end">0</text>
        <text className="mile" x={80} y={623} textAnchor="end">18 mi</text>

        {/* Labels on the ocean side, with leader lines back to the coast */}
        {SEGMENTS.map(s => {
          const mid = (s.y0 + s.y1) / 2
          return (
            <a
              key={s.slug}
              href={`/${s.slug}`}
              className="seg-hit"
              onClick={e => go(e, s.slug)}
              onMouseEnter={() => hoverIn(s.slug)}
              onMouseLeave={clearIfHover}
              onFocus={() => setActive(s.slug)}
              onBlur={clearIfHover}
              aria-label={`${s.name}${s.lbt ? ' (Long Beach Township)' : ''} guide`}
            >
              {/* Generous invisible hit area — covers the band and its label */}
              <rect x={88} y={s.y0} width={236} height={s.y1 - s.y0} fill="transparent" />
              <line className="seg-lead" x1={LEADER_FROM} y1={mid} x2={LABEL_X - 4} y2={mid} />
              <circle cx={LEADER_FROM} cy={mid} r={1.8} fill="var(--teal-deep, #486C6B)" fillOpacity={0.6} />
              <text className="seg-lbl" x={LABEL_X} y={mid - 1}>{s.name}</text>
              <text className="seg-sub" x={LABEL_X} y={mid + 10}>{s.sub}</text>
            </a>
          )
        })}

        {/* Legend */}
        <rect x={92} y={640} width={12} height={9} fill="var(--teal-deep, #486C6B)" fillOpacity={0.16} stroke="var(--line, #E3DCC9)" />
        <text x={109} y={648} className="key-lbl">Shaded = Long Beach Township sections</text>
      </svg>

      {/* Detail panel — progressive enhancement over the crawlable links above.
          Fixed min-height so selecting a town never shifts the page. */}
      <div
        aria-live="polite"
        style={{
          marginTop: 14,
          padding: '14px 16px',
          minHeight: 92,
          background: current ? 'var(--foam)' : 'var(--sand)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--r-xs)',
          transition: 'background 140ms ease',
        }}
      >
        {current ? (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, margin: 0, color: 'var(--ink)' }}>
                {current.name}
              </h3>
              {currentBadge !== undefined && currentBadge > 0 && (
                <span style={{ fontSize: 12, color: 'var(--slate)' }}>
                  Daily badge <b style={{ color: 'var(--teal-deep)', fontSize: 14 }}>${currentBadge}</b>
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
            what a beach badge costs. Tap again to open the full guide. The shaded bands are all one
            municipality — Long Beach Township, in five separate pieces.
          </p>
        )}
      </div>
    </div>
  )
}
