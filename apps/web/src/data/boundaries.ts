// ─────────────────────────────────────────────────────────────────────────────
// LBI TOWN & VILLAGE BOUNDARIES
//
// Where the municipal lines actually fall, and the Long Beach Township village
// block ranges. Reconstructed from two primary sources:
//
//   1. LBT Beach Patrol Street Directory (lbtbp.com/street-directory) — the only
//      published street-name → block-number crosswalk for the Township, grouped
//      by village. KNOWN FLAW: it is a badge list, not a street census. Streets
//      with no beach access are absent (124th St, Shallow Shore Ln, MacEvoy Ln),
//      so the FIRST and LAST entry of a village's list are weak boundary markers
//      while the interior of each range is solid.
//   2. The Township's own white marker posts along Long Beach Boulevard, which
//      carry the village name and, on street posts, the block number.
//
// Every claim carries a `confidence`. The UI renders that rather than burying
// hedges in prose — a reader can see which lines are documented and which are
// still one tax map away from being settled.
//
// DELIBERATELY WITHHELD: the street-level crosswalk for The Dunes. The marker
// post at MacEvoy Lane reads block 121, but the badge directory (which omits
// MacEvoy entirely) assigns 121 to Holly Banks. The whole Dunes sequence may
// therefore run one block behind. The block RANGE 121–127 is corroborated by
// paired posts and is published; the per-street numbers are not.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * How well established a claim is.
 *  - official  an authority stated this in its own words
 *  - inferred  deduced from an official source that doesn't say it outright
 *  - local     on-the-ground observation, no published source yet
 *  - open      needs a parcel record or tax map to settle
 */
export type Confidence = 'official' | 'inferred' | 'local' | 'open'

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  official: 'Confirmed',
  inferred: 'Inferred from official sources',
  local: 'Local knowledge — unconfirmed',
  open: 'Not yet established',
}

// ── The nine segments, north to south ────────────────────────────────────────
// LBI is six municipalities, but Long Beach Township is non-contiguous: five
// separate chunks wrapped around the five boroughs.

export type IslandSegment = {
  segment: string
  municipality: string
  /** Slug of the guide page for this segment, when one exists. */
  slug?: string
}

export const islandSegments: IslandSegment[] = [
  { segment: 'Barnegat Light + High Bar Harbor', municipality: 'Barnegat Light Borough', slug: 'barnegat-light' },
  { segment: 'Loveladies', municipality: 'Long Beach Township', slug: 'loveladies' },
  { segment: 'Harvey Cedars', municipality: 'Harvey Cedars Borough', slug: 'harvey-cedars' },
  { segment: 'North Beach', municipality: 'Long Beach Township', slug: 'north-beach' },
  { segment: 'Surf City', municipality: 'Surf City Borough', slug: 'surf-city' },
  { segment: 'Ship Bottom', municipality: 'Ship Bottom Borough', slug: 'ship-bottom' },
  { segment: 'Brant Beach → North Beach Haven (11 named villages)', municipality: 'Long Beach Township', slug: 'brant-beach' },
  { segment: 'Beach Haven', municipality: 'Beach Haven Borough', slug: 'beach-haven' },
  { segment: 'Holgate + Beach Haven Inlet', municipality: 'Long Beach Township', slug: 'holgate' },
]

// ── Municipal boundary lines ─────────────────────────────────────────────────

export type MunicipalBoundary = {
  north: string
  south: string
  /** One-sentence statement of where the line runs. */
  line: string
  /** The longer story, where there is one — split streets, myths, landmarks. */
  detail?: string
  confidence: Confidence
  /** What the claim rests on. Rendered to the reader. */
  basis: string
}

export const municipalBoundaries: MunicipalBoundary[] = [
  {
    north: 'Barnegat Light',
    south: 'Loveladies',
    line: 'Not established at street level.',
    detail:
      "Barnegat Light's numbered grid ends around 30th Street; Loveladies uses tract numbers instead of a street grid, and its southernmost badge-list entry is 87th Street. Two unrelated numbering systems meeting, so neither set of numbers locates the line.",
    confidence: 'open',
    basis: 'Needs the Ocean County parcel record or an LBT tax map sheet.',
  },
  {
    north: 'Loveladies',
    south: 'Harvey Cedars',
    line: 'Around 87th Street — the last Loveladies badge entry, with Harvey Cedars’ northernmost guarded beach at 86th.',
    detail:
      'This is the weakest of the inferred lines. The badge directory omits streets with no beach access, so the true edge of Loveladies may sit south of 87th on a street the directory never had reason to list.',
    confidence: 'inferred',
    basis: 'LBT Beach Patrol street directory + Harvey Cedars guarded-beach list. Neither states the boundary directly.',
  },
  {
    north: 'Harvey Cedars',
    south: 'North Beach',
    line: 'At William Street. William Street is the southernmost Harvey Cedars street; 124th Street is the first North Beach street.',
    detail:
      "Two welcome signs sit at the same point on Long Beach Boulevard facing opposite directions — “Welcome to Harvey Cedars” to northbound traffic, “Welcome to North Beach” to southbound. Two municipalities independently marking the same spot is far better evidence than one sign, which can always be set back for shoulder room. Harvey Cedars’ south end runs through the 5200–5300 Boulevard blocks.",
    confidence: 'local',
    basis: 'A matched pair of welcome signs on the Boulevard. No parcel record pulled yet.',
  },
  {
    north: 'North Beach',
    south: 'Surf City',
    line: 'Between Sherwood Way and North 25th Street — the Surf City sign sits just south of Sherwood Way, around 1004 on the Boulevard.',
    detail:
      'North 25th is Surf City’s last numbered street, but Shallow Shore Lane sits between the sign and the numbered grid, so the borough appears to have a named lane or two above N 25th. Shallow Shore appears in no badge list — the third example of the directory skipping streets without beach access.',
    confidence: 'inferred',
    basis: 'The LBT badge directory ends North Beach at Sherwood Way, and the Surf City welcome sign lands on the same block. Two independent sources agreeing.',
  },
  {
    north: 'Surf City',
    south: 'Ship Bottom',
    line: 'Down the centerline of South 2nd Street — north side Surf City, south side Ship Bottom.',
    detail:
      'South 2nd is the last street in Surf City, and only its north side is. Everything below — the south side of S 2nd and all of South 3rd Street — is Ship Bottom, despite carrying Surf City mailing addresses. Ship Bottom’s beach code describes its beaches as starting at “the southern end of 3rd Street” while the addresses on that same block read “South 3rd Street, Surf City.” One physical street, called different things by the town that owns it and the mail that serves it.',
    confidence: 'local',
    basis: 'On-the-ground knowledge, corroborated by mixed municipality tagging in listing data on South 3rd Street — some records resolve to Surf City, at least one to Ship Bottom. Parcel records not yet pulled.',
  },
  {
    north: 'Ship Bottom',
    south: 'Brant Beach (Long Beach Township)',
    line: 'Along 31st Street — Ship Bottom on the north side, Brant Beach on the south.',
    detail:
      'Ship Bottom’s beach runs to “the northern side of 31st Street,” while the Township directory lists 31st Street as a Township street. Both hold at once: the line runs along the street, not at either end of it. A 31st Street house can be in either town depending on which side it sits. The Township’s 31st Street Beach Buggy Ramp at 3001 Long Beach Blvd confirms the Township side.',
    confidence: 'official',
    basis: 'Borough of Ship Bottom beach code + LBT Beach Patrol street directory, read together.',
  },
  {
    north: 'North Beach Haven (Long Beach Township)',
    south: 'Beach Haven',
    line: 'At 12th Street.',
    detail:
      'Confirmed three independent ways: the borough defines its own beaches as “12th St. to Nelson Av.”, the Township badge directory ends North Beach Haven at 13th St, and the “Welcome to Historic Beach Haven — Queen City, 1874” sign stands at the corner of 12th. Landmark anchor: Panzone’s sits at 1106 N Bay Ave — 11th Street and the Boulevard, which is named Bay Avenue through the borough — one block inside Beach Haven. At Panzone’s you are in Beach Haven; two blocks north at 13th you are in Long Beach Township, and the mail says Beach Haven either way.',
    confidence: 'official',
    basis: 'Borough of Beach Haven beach code, the LBT badge directory, and the borough welcome sign — three sources on the same line.',
  },
  {
    north: 'Beach Haven',
    south: 'Holgate (Long Beach Township)',
    line: 'At Nelson Avenue.',
    confidence: 'official',
    basis: 'Borough of Beach Haven defines its beaches as running to Nelson Avenue.',
  },
]

// ── Long Beach Township villages, north to south ─────────────────────────────

export type VillageBlocks = {
  name: string
  /** Slug of a dedicated section guide, when one exists. */
  slug?: string
  /** Block range as printed on the Boulevard, e.g. '31–73'. */
  blocks: string
  streetRange: string
  confidence: Confidence
  note?: string
  /** Street name → block number. Absent where the numbering isn't settled. */
  crosswalk?: { name: string; block: number }[]
}

export const villageBlocks: VillageBlocks[] = [
  {
    name: 'Loveladies',
    slug: 'loveladies',
    blocks: 'Tracts 1–176',
    streetRange: 'Holly Rd (176) → 87th St (1)',
    confidence: 'inferred',
    note:
      'Loveladies has no street grid — it runs on tract numbers plus private lanes, and the numbers fall as you drive south.',
  },
  {
    name: 'North Beach',
    slug: 'north-beach',
    blocks: '1006–1118',
    streetRange: 'Lagoon Dr North (1118) → Sherwood Way (1006)',
    confidence: 'inferred',
    note:
      'The badge directory abbreviates these to 118, 94, 54, 26, 22 and 6 — the same scheme with the thousand dropped. The Boulevard address at the Surf City sign, just south of Sherwood Way, is 1004. 124th Street is Township but appears in no badge list, so the north end may run past Lagoon Drive North.',
  },
  {
    name: 'Brant Beach',
    slug: 'brant-beach',
    blocks: '31–73',
    streetRange: '31st St → Harrington Ave (73)',
    confidence: 'official',
    note:
      'Starts at 31st, not 32nd — 32nd is only the first guarded stand — and runs well past 68th, which is likewise just the last guarded stand in that stretch. The south end at Harrington is confirmed by a marker post at 7299 Long Beach Blvd.',
    crosswalk: [
      { name: 'Mears', block: 53 }, { name: 'Sumner', block: 54 }, { name: 'Kirkland', block: 55 },
      { name: 'Beardsley', block: 56 }, { name: 'Selfridge', block: 57 }, { name: 'Harmony', block: 58 },
      { name: 'Kimberly', block: 59 }, { name: 'Stanton', block: 60 }, { name: 'Farragut', block: 61 },
      { name: 'Paulding', block: 62 }, { name: 'Goldsborough', block: 63 }, { name: 'DuPont', block: 64 },
      { name: 'Sigsbee', block: 65 }, { name: 'Goodrich', block: 66 }, { name: 'Brownson', block: 67 },
      { name: 'Meade', block: 68 }, { name: 'Stockton', block: 69 }, { name: 'Dayton', block: 70 },
      { name: 'Burwell', block: 71 }, { name: 'Coughlin', block: 72 }, { name: 'Harrington', block: 73 },
    ],
  },
  {
    name: 'Beach Haven Crest',
    blocks: '74–80',
    streetRange: 'Mea Ave (74) → Surf Ave (80)',
    confidence: 'official',
    note: 'Seven blocks, not the ten most listings claim.',
    crosswalk: [
      { name: 'Mea', block: 74 }, { name: 'Lavenia', block: 75 }, { name: 'Culver', block: 76 },
      { name: 'Hobart', block: 77 }, { name: 'Jeanette', block: 78 }, { name: 'Winifred', block: 79 },
      { name: 'Surf', block: 80 },
    ],
  },
  {
    name: 'Brighton Beach',
    blocks: '81–86',
    streetRange: 'Massachusetts Ave (81) → Pennsylvania Ave (86)',
    confidence: 'official',
    crosswalk: [
      { name: 'Massachusetts', block: 81 }, { name: 'Rhode Island', block: 82 }, { name: 'Connecticut', block: 83 },
      { name: 'New York', block: 84 }, { name: 'New Jersey', block: 85 }, { name: 'Pennsylvania', block: 86 },
    ],
  },
  {
    name: 'Peahala Park',
    blocks: '87–95',
    streetRange: 'Delaware Ave (87) → Seabreeze Dr (95)',
    confidence: 'official',
    note: 'A marker post at Mermaid Lane reads "88 Mermaid La" — the block number printed on the Township’s own signage.',
    crosswalk: [
      { name: 'Delaware', block: 87 }, { name: 'Mermaid', block: 88 }, { name: 'Sailboat', block: 89 },
      { name: 'Sand Dune', block: 90 }, { name: 'Ocean View', block: 91 }, { name: 'Cape Cod', block: 92 },
      { name: 'Bayberry', block: 93 }, { name: 'Mariner', block: 94 }, { name: 'Seabreeze', block: 95 },
    ],
  },
  {
    name: 'Beach Haven Park',
    blocks: '96–109',
    streetRange: 'Herbert Ave (96) → block 109',
    confidence: 'official',
    note: 'Blocks 108 and 109 carry numbers but no names in the directory.',
    crosswalk: [
      { name: 'Herbert', block: 96 }, { name: 'Jerome', block: 97 }, { name: 'Muriel', block: 98 },
      { name: 'Alabama', block: 99 }, { name: 'California', block: 100 }, { name: 'Florida', block: 101 },
      { name: 'Texas', block: 102 }, { name: 'Lillie', block: 103 }, { name: 'Kansas', block: 104 },
      { name: 'Louisiana', block: 105 }, { name: 'Nebraska', block: 106 }, { name: 'Georgia', block: 107 },
    ],
  },
  {
    name: 'Haven Beach',
    blocks: '110–120',
    streetRange: 'Virginia Ave (110) → Utah Ave (120)',
    confidence: 'official',
    note:
      'Posted at both ends: a Haven Beach post on the bay side of Virginia Ave at 10998, and another at MacEvoy Lane facing the Dunes post across the Boulevard. A single Beach Haven Terrace post also stands at Virginia Ave, beside a development wall that itself reads "Haven Beach" — the badge directory and both Haven Beach posts side with the wall, so that one post is most likely mislabeled.',
    crosswalk: [
      { name: 'Virginia', block: 110 }, { name: 'North Carolina', block: 111 }, { name: 'South Carolina', block: 112 },
      { name: 'Kentucky', block: 113 }, { name: 'Tennessee', block: 114 }, { name: 'Idaho', block: 115 },
      { name: 'Mississippi', block: 116 }, { name: 'Wyoming', block: 117 }, { name: 'Colorado', block: 118 },
      { name: 'Nevada', block: 119 }, { name: 'Utah', block: 120 },
    ],
  },
  {
    name: 'The Dunes',
    blocks: '121–127',
    streetRange: 'MacEvoy Ln (121) → Dune Ln',
    confidence: 'official',
    // Range only — see the file header. The per-street numbering is unsettled,
    // so no street inside the range carries a block number here except MacEvoy,
    // which a Township marker post states outright.
    note:
      'The block range is confirmed by a back-to-back pair of marker posts at MacEvoy Lane — Haven Beach ending, The Dunes beginning, both reading block 121. The street-level numbering inside the range is NOT settled: the badge directory omits MacEvoy entirely and assigns 121 to Holly Banks. That leaves eight street names for seven blocks, so at least one number in the directory’s Dunes sequence is wrong. We are holding all of them until another Dunes street post is photographed.',
  },
  {
    name: 'Beach Haven Terrace',
    blocks: '128–133',
    streetRange: 'Ohio Ave (128) → Delaware Ave (133)',
    confidence: 'official',
    note: 'Posted at both ends — "Beach Haven Terr" at Ohio Ave (12799) and the Gardens post at Delaware (13211).',
    crosswalk: [
      { name: 'Ohio', block: 128 }, { name: 'Indiana', block: 129 }, { name: 'New Jersey', block: 130 },
      { name: 'Pennsylvania', block: 131 }, { name: 'Maryland', block: 132 }, { name: 'Delaware', block: 133 },
    ],
  },
  {
    name: 'Beach Haven Gardens',
    blocks: '34th–27th',
    streetRange: '34th St → 27th St',
    confidence: 'official',
    note:
      'Begins exactly at the numbering flip: the marker post sits at Delaware Ave (13211), the last named block of the Terrace, and the next street south is 34th. The cut point against Spray Beach is softer — a "continued" heading falls mid-column in the directory right around 28th/27th.',
  },
  {
    name: 'Spray Beach',
    blocks: '26th–22nd',
    streetRange: '26th St → 22nd St',
    confidence: 'official',
    note: 'Marker post at 2613 Long Beach Blvd. Ends at 22nd, not 21st — the North Beach Haven post settles that.',
  },
  {
    name: 'North Beach Haven',
    blocks: '21st–13th',
    streetRange: '21st St → 13th St',
    confidence: 'official',
    note:
      'Not the 33rd–13th run most sites assume. A marker post at 2101 Long Beach Blvd reads "North Beach Haven 21 St", which pushes Spray Beach back to 22nd.',
  },
  {
    name: 'Holgate',
    slug: 'holgate',
    blocks: 'Named avenues',
    streetRange: 'Grosser Ave → Lincoln Ave',
    confidence: 'official',
    note: 'No numbered grid — Holgate runs on named avenues from the Beach Haven line at Nelson Ave to the wildlife refuge at the island’s tip.',
  },
]

// ── The Township's marker-post system ────────────────────────────────────────
// White posts along the Boulevard: section posts carry the village name, street
// posts carry the street name with its block number printed on it.

export type MarkerPost = {
  reads: string
  at: string
  /** Boulevard address the post stands at. */
  blvd: string
  establishes: string
}

export const markerPosts: MarkerPost[] = [
  { reads: 'Welcome to Brant Beach', at: 'Between Harrington and Mea', blvd: '7299', establishes: 'Brant Beach ends at Harrington (73)' },
  { reads: 'Peahala Park + "88 Mermaid La"', at: 'Mermaid Ln', blvd: '~8800', establishes: 'Mermaid is block 88, printed on the post' },
  { reads: "Sound's Edge / Beach Haven Park", at: '96th–97th', blvd: '9698', establishes: 'Beach Haven Park at blocks 96–97' },
  { reads: 'Township of Long Beach — Hideaway Bay Nature Trail', at: 'Louisiana / Nebraska', blvd: '10600', establishes: 'Louisiana 105, Nebraska 106' },
  { reads: 'Haven Beach', at: 'Virginia Ave — bay side', blvd: '10998', establishes: 'Haven Beach is a posted Township section starting at 110' },
  { reads: 'Beach Haven Park', at: 'Virginia Ave — east side, north corner', blvd: '11004', establishes: "Beach Haven Park's south end at 109" },
  { reads: 'The Dunes + "121 Mac Evoy Lane"', at: 'MacEvoy Ln', blvd: '12099', establishes: 'The Dunes starts at block 121, and 121 is MacEvoy' },
  { reads: 'Haven Beach + "121 Mac Evoy Lane"', at: 'MacEvoy Ln — east side, facing the Dunes post', blvd: '12101', establishes: 'Haven Beach ends and The Dunes begins at 121' },
  { reads: 'Beach Haven Terr', at: 'Ohio Ave', blvd: '12799', establishes: 'The Terrace starts at Ohio (128)' },
  { reads: 'Beach Haven Gdns', at: 'Delaware Ave', blvd: '13211', establishes: 'The Gardens begin right at the numbering flip' },
  { reads: 'Spray Beach', at: 'E 26th–27th', blvd: '2613', establishes: 'Spray Beach begins around 26th' },
  { reads: 'North Beach Haven + "21 St"', at: '21st St', blvd: '2101', establishes: 'North Beach Haven starts at 21st, not 20th' },
  { reads: 'Welcome to Historic Beach Haven — Queen City, 1874', at: '12th St', blvd: '271 12th St', establishes: 'The Beach Haven borough line' },
  { reads: 'LBT 31st St Beach Buggy Ramp', at: '31st St', blvd: '3001', establishes: '31st Street is Township' },
]

// ── Names that appear twice ──────────────────────────────────────────────────
// Roughly 45 blocks apart in the first three cases, in different villages. Type
// one into a phone and you can land in the wrong one.

export type DuplicateName = { name: string; here: string; andHere: string }

export const duplicateNames: DuplicateName[] = [
  { name: 'New Jersey Ave', here: 'Block 85 — Brighton Beach', andHere: 'Block 130 — Beach Haven Terrace' },
  { name: 'Pennsylvania Ave', here: 'Block 86 — Brighton Beach', andHere: 'Block 131 — Beach Haven Terrace' },
  { name: 'Delaware Ave', here: 'Block 87 — Peahala Park', andHere: 'Block 133 — Beach Haven Terrace' },
  // The Dunes entries carry no block number on purpose — see the file header.
  { name: 'Starboard', here: 'The Dunes (blocks 121–127)', andHere: 'Starboard Rd — North Beach' },
  { name: 'Marine', here: 'The Dunes (blocks 121–127)', andHere: 'Marine St — Beach Haven' },
]

// ── Names with no official standing ──────────────────────────────────────────

export const informalNames: { name: string; note: string }[] = [
  { name: 'Bay Vista', note: 'Appears on realtor sites and some township lists, but not in the street directory.' },
  { name: 'Beach Haven Heights', note: 'Used for part of the Holgate peninsula. Informal or historic — no block range of its own.' },
  { name: 'Silver Sands', note: 'A marketing or plat name; not a posted Township section.' },
  { name: 'South Beach Haven', note: 'Widely used but not an official section name.' },
  { name: 'Beach Haven Inlet', note: 'Describes the south tip below Holgate rather than a distinct village.' },
]

// ── Street numbering systems ─────────────────────────────────────────────────
// Several unrelated systems, and they don't all run the same direction.

export type NumberingSystem = {
  area: string
  system: string
  /** What the printed numbers do as you drive south. */
  direction: string
}

export const numberingSystems: NumberingSystem[] = [
  { area: 'Barnegat Light', system: 'Numbered 1st–30th; north tip named (Broadway); cross streets Central, Bayview, Ocean', direction: 'Rise' },
  { area: 'High Bar Harbor', system: 'Named lagoon streets', direction: '—' },
  { area: 'Loveladies', system: 'Tract numbers 1–176 plus private lanes; no street grid', direction: 'Fall (176 → 1)' },
  { area: 'Harvey Cedars', system: 'Numbered 86th down to 69th, then county-named avenues (Middlesex, Atlantic, Hudson, Cape May, Cumberland, Bergen), then William, James and Troast at the south end', direction: 'Fall' },
  { area: 'North Beach', system: 'No street grid. Boulevard addresses run the 1000-series; signed on the ground as numbered streets (124th, 118th) plus named lanes', direction: 'Fall' },
  { area: 'Surf City', system: 'Addressed S 3rd → S 1st, Division Ave, N 1st → N 25th — but the borough ends mid-S 2nd, so S 3rd is Ship Bottom with Surf City mail', direction: 'Fall through the N series, then rise through the S series' },
  { area: 'Ship Bottom', system: '3rd → 31st, with E/W prefixes off the Boulevard', direction: 'Rise' },
  { area: 'Long Beach Township (middle run)', system: 'Blocks 31–133; numbered streets to 52nd, then named avenues carrying block numbers', direction: 'Rise' },
  { area: 'Beach Haven Gardens → North Beach Haven', system: 'Numbering restarts at 34th', direction: 'Fall (34th → 13th)' },
  { area: 'Beach Haven', system: '12th → 1st, then named streets including Taylor, Centre, Engleside, Pearl, Belvoir, Essex, Liberty, Kentford and Nelson', direction: 'Fall' },
  { area: 'Holgate', system: 'Named avenues only', direction: '—' },
]

/**
 * The printed numbers change direction three times between the lighthouse and
 * Holgate. Reversal two happens at Division Avenue — the very street people
 * mistake for the Surf City / Ship Bottom line.
 */
export const numberingReversals: { step: string; detail: string }[] = [
  { step: 'Rising', detail: 'through Barnegat Light, 1st → 30th' },
  { step: 'Falling', detail: 'from Loveladies through Surf City’s North series — tract 176 → 1, 86th → 69th, N 25th → N 1st' },
  { step: 'Rising', detail: 'from Division Avenue on through Ship Bottom and the whole Township middle — S 1st → S 3rd, then up to block 133' },
  { step: 'Falling', detail: 'again from Beach Haven Gardens to the end of Beach Haven, 34th → 1st' },
]

// ── Sources ──────────────────────────────────────────────────────────────────

export const boundarySources: { name: string; detail: string }[] = [
  { name: 'LBT Beach Patrol Street Directory', detail: 'The village and block crosswalk — the backbone of the Township section data. A badge list, so it omits streets with no beach access.' },
  { name: 'Township of Long Beach marker posts', detail: 'The Township’s own Boulevard signage, carrying section names and block numbers.' },
  { name: 'Borough of Ship Bottom', detail: 'Beaches defined from 3rd Street to the northern side of 31st Street.' },
  { name: 'Borough of Beach Haven', detail: 'Beaches defined as 12th St. to Nelson Ave.' },
  { name: 'Borough of Surf City', detail: 'Badge zone defined as S 3rd to N 25th.' },
  { name: 'Barnegat Light Borough', detail: 'Guarded beaches 10th–30th.' },
]
