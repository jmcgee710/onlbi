// ─────────────────────────────────────────────────────────────────────────────
// SERVICE MAPS — who actually serves each LBI town.
//
// Municipality is only one of the lines drawn across this island, and no two of
// them match. Police coverage, school districts, health services, beach badges
// and ZIP codes are each drawn by a different authority, and a homeowner's real
// questions — who do I call, where do my kids go to school, whose badge do I
// need — can't be answered from the town name alone.
//
// Everything here is stated by an authority in its own words: municipal sites,
// the Long Beach Township PD ("Serving Long Beach Township and Barnegat Light"),
// and the LBT departments page. Contact details and ZIPs live in towns.ts —
// this file is only about which service boundary a town falls inside.
//
// NOTE ON SCHOOLS: this covers the elementary districts, which is what the
// sourced material establishes. Secondary schooling is not documented here and
// is deliberately left out rather than guessed at.
// ─────────────────────────────────────────────────────────────────────────────

import { villageBlocks } from './boundaries'

/** How many distinct providers each layer has, and what makes it odd. */
export type ServiceLayer = {
  layer: string
  count: string
  oddOneOut: string
}

export const serviceLayers: ServiceLayer[] = [
  {
    layer: 'Municipality',
    count: '6',
    oddOneOut: 'Long Beach Township is five separate, non-contiguous pieces wrapped around the five boroughs.',
  },
  {
    layer: 'Police',
    count: '5 departments',
    oddOneOut: 'Barnegat Light has its own mayor and council but contracts policing to Long Beach Township PD. Harvey Cedars — smaller, and wedged between two Township sections — kept its own force.',
  },
  {
    layer: 'Schools',
    count: '2 districts',
    oddOneOut: 'LBI Consolidated serves five of the six towns. Beach Haven runs its own district.',
  },
  {
    layer: 'Health department',
    count: '1',
    oddOneOut: 'The LBI Health Department is the one line on this page that covers all six towns.',
  },
  {
    layer: 'Beach badge',
    count: '6',
    oddOneOut: 'One Township badge covers all five Township sections — and is worthless one block into a borough.',
  },
  {
    layer: 'ZIP code',
    count: '2',
    oddOneOut: '08006 is Barnegat Light alone. Everything else on the island is 08008.',
  },
  {
    layer: 'Mailing address',
    count: '—',
    oddOneOut: 'Matches none of the above. A South 3rd Street house is addressed Surf City and taxed by Ship Bottom.',
  },
]

/** Per-town service coverage — the "who serves me" lookup. */
export type TownServices = {
  slug: string
  name: string
  police: string
  /** Set when the police arrangement isn't the obvious one. */
  policeNote?: string
  schoolDistrict: string
  schoolNote?: string
  healthDepartment: string
  beachBadge: string
}

const LBI_HEALTH = 'LBI Health Department'

export const townServices: TownServices[] = [
  {
    slug: 'barnegat-light',
    name: 'Barnegat Light',
    police: 'Long Beach Township Police Department',
    policeNote:
      'Barnegat Light is an independent borough with its own mayor and council, but it contracts policing to Long Beach Township. The Township PD describes itself as serving Long Beach Township and Barnegat Light, and the borough directs residents to the Township department for emergency alerts.',
    schoolDistrict: 'LBI Consolidated School District',
    healthDepartment: LBI_HEALTH,
    beachBadge: 'Barnegat Light borough badge',
  },
  {
    slug: 'harvey-cedars',
    name: 'Harvey Cedars',
    police: 'Harvey Cedars Police Department',
    policeNote:
      'The smallest town on the island to keep its own force, despite sitting wedged between two Long Beach Township sections.',
    schoolDistrict: 'LBI Consolidated School District',
    healthDepartment: LBI_HEALTH,
    beachBadge: 'Harvey Cedars borough badge',
  },
  {
    slug: 'surf-city',
    name: 'Surf City',
    police: 'Surf City Police Department',
    schoolDistrict: 'LBI Consolidated School District',
    healthDepartment: LBI_HEALTH,
    beachBadge: 'Surf City borough badge',
  },
  {
    slug: 'ship-bottom',
    name: 'Ship Bottom',
    police: 'Ship Bottom Police Department',
    schoolDistrict: 'LBI Consolidated School District',
    healthDepartment: LBI_HEALTH,
    beachBadge: 'Ship Bottom borough badge',
  },
  {
    slug: 'long-beach-township',
    name: 'Long Beach Township',
    police: 'Long Beach Township Police Department',
    policeNote:
      'Also polices Barnegat Light under contract, which makes the Township PD the largest force on the island by area covered.',
    schoolDistrict: 'LBI Consolidated School District',
    healthDepartment: LBI_HEALTH,
    beachBadge: 'Long Beach Township badge — covers all five Township sections',
  },
  {
    slug: 'beach-haven',
    name: 'Beach Haven',
    police: 'Beach Haven Police Department',
    schoolDistrict: 'Beach Haven School District',
    schoolNote:
      'The only LBI town that runs its own school district rather than joining LBI Consolidated.',
    healthDepartment: LBI_HEALTH,
    beachBadge: 'Beach Haven borough badge',
  },
]

/** ZIP coverage — two codes for the whole island, and they don't follow towns. */
export const zipCoverage: { zip: string; covers: string; note: string }[] = [
  {
    zip: '08006',
    covers: 'Barnegat Light only',
    note: 'The north tip of the island, including High Bar Harbor — which is Long Beach Township, not Barnegat Light, but shares the borough’s ZIP.',
  },
  {
    zip: '08008',
    covers: 'Everything else on Long Beach Island',
    note: 'Harvey Cedars, Surf City, Ship Bottom, Beach Haven, and every Long Beach Township section from Loveladies to Holgate — Loveladies, Brant Beach, Spray Beach and the rest all share this one code.',
  },
]

// ── ZIP code by place name ───────────────────────────────────────────────────
// People don't search "LBI ZIP codes", they search "loveladies nj zip code" and
// "brant beach nj zip code" — one place name at a time. The two-row coverage
// table above answers the island question but never puts those place names next
// to a number, so this table does: every name that appears in an LBI mailing
// address, with the code that actually serves it.
//
// The ZIP is DERIVED, not typed per row: the island has exactly two codes, and
// the rule for which is which is the same rule stated in zipCoverage above.
// Adding a village to boundaries.ts adds a row here automatically.

export type ZipPlace = {
  name: string
  /** The municipality the place actually sits in — often not what the mail says. */
  municipality: string
  zip: string
  /** Route to a guide for this place, when one exists. */
  slug?: string
  /** Set for places that are a section of a township rather than a municipality. */
  section?: boolean
}

/** The only two places on the island outside 08008. */
const ZIP_08006 = new Set(['Barnegat Light', 'High Bar Harbor'])

const zipFor = (name: string): string => (ZIP_08006.has(name) ? '08006' : '08008')

const LBT = 'Long Beach Township'

/** The six municipalities, north to south. */
const municipalityZips: ZipPlace[] = [
  { name: 'Barnegat Light', municipality: 'Barnegat Light Borough', slug: 'barnegat-light' },
  { name: 'Harvey Cedars', municipality: 'Harvey Cedars Borough', slug: 'harvey-cedars' },
  { name: 'Surf City', municipality: 'Surf City Borough', slug: 'surf-city' },
  { name: 'Ship Bottom', municipality: 'Ship Bottom Borough', slug: 'ship-bottom' },
  { name: LBT, municipality: 'Long Beach Township', slug: 'long-beach-township' },
  { name: 'Beach Haven', municipality: 'Beach Haven Borough', slug: 'beach-haven' },
].map(p => ({ ...p, zip: zipFor(p.name) }))

/**
 * Every Long Beach Township section, north to south, from the same source the
 * boundary page uses. High Bar Harbor is appended by hand because it is reached
 * by a spur off the Boulevard rather than being one of the stretches you drive
 * through, so it carries no block range and has no row in villageBlocks.
 */
const sectionZips: ZipPlace[] = [
  ...villageBlocks.map(v => ({
    name: v.name,
    municipality: LBT,
    zip: zipFor(v.name),
    slug: v.slug,
    section: true,
  })),
  { name: 'High Bar Harbor', municipality: LBT, zip: zipFor('High Bar Harbor'), section: true },
]

/** Municipalities first, then every Township section — the "what's my ZIP" lookup. */
export const zipByPlace: ZipPlace[] = [...municipalityZips, ...sectionZips]
