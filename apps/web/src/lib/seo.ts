import { townGuides } from '../data/townGuides'

export const SITE_URL = 'https://onlongbeachisland.com'
const OG_IMAGE = `${SITE_URL}/logo-light.png`

export type PageSeo = { title: string; description: string; ogImage?: string }

// Static per-page titles/descriptions — unique and keyword-targeted per route.
const STATIC_SEO: Record<string, PageSeo> = {
  '/': {
    title: 'Long Beach Island, NJ — Towns, Beaches, Conditions & Local Guide | On LBI',
    description:
      'The local guide to Long Beach Island, NJ — all 6 LBI towns, live ocean temperature and tides, 2026 beach badge prices, parking, restaurants, and things to do.',
  },
  '/beaches': {
    title: 'LBI Beach Badges & Conditions — Prices, Lifeguards, Rules | On LBI',
    description:
      'Compare 2026 beach badge prices, lifeguard hours, and beach rules for all six Long Beach Island towns, plus live beach conditions.',
  },
  '/towns': {
    title: 'LBI Towns & Map — All 6 Towns of Long Beach Island, NJ (North to South)',
    description:
      'The 6 LBI towns in order from north to south — Barnegat Light to Holgate — with a map of Long Beach Island, 2026 beach badge prices, and which town fits your trip.',
    ogImage: '/lbi-towns-map.png',
  },
  '/lbi-map': {
    title: 'Map of LBI — Long Beach Island NJ Towns Map, North to South',
    description:
      'A map of Long Beach Island, NJ showing all 6 LBI towns north to south from Barnegat Light to Holgate, where the Route 72 Causeway lands, and why Long Beach Township appears in five separate pieces.',
    ogImage: '/lbi-towns-map.png',
  },
  '/lbi-town-services': {
    title: 'LBI Police, Schools & ZIP Codes — Who Serves Each Long Beach Island Town',
    description:
      'Which police department, school district, ZIP code and beach badge covers each LBI town. Barnegat Light is policed by Long Beach Township, Beach Haven runs its own school district, and 08008 covers everything except the north tip.',
  },
  '/lbi-town-boundaries': {
    title: 'LBI Town Boundaries — Which Long Beach Island Town Is My Street In?',
    description:
      'Where every LBI town line actually falls, street by street — the split streets at S 2nd and 31st, the Division Avenue myth, and the block range for all 14 Long Beach Township villages from Loveladies to Holgate.',
    ogImage: '/lbi-towns-map.png',
  },
  '/lbi-conditions': {
    title: 'LBI Ocean Temperature, Tides & Live Beach Conditions Today | On LBI',
    description:
      'Live Long Beach Island ocean temperature, high and low tide times from Barnegat Light through Holgate, surf, UV, rip-current risk, and beach cameras — plus how LBI tides and back-bay flooding work.',
  },
  '/accessibility': {
    title: 'Wheelchair-Accessible Beaches on LBI — Mobi-Mats & Beach Wheelchairs | On LBI',
    description:
      'Accessible beach access points, Mobi-Mat locations, free beach wheelchairs, and accessible restrooms across Long Beach Island, NJ.',
  },
  '/eat': {
    title: 'Where to Eat on LBI — 100+ Long Beach Island Restaurants | On LBI',
    description:
      'Restaurants, seafood, breakfast, bars, and BYOB spots across Long Beach Island, NJ — organized by town and category.',
  },
  '/do': {
    title: 'Things to Do on LBI — Water Sports, Activities & Entertainment | On LBI',
    description:
      'Water sports, boat and kayak rentals, mini golf, Fantasy Island, and family activities across Long Beach Island, NJ.',
  },
  '/getting-around': {
    title: 'Getting Around LBI — Shuttle, Parking & Causeway Traffic | On LBI',
    description:
      'LBI Beach Shuttle routes, Route 72 causeway traffic tips, parking rules by town, and live beach cameras for Long Beach Island.',
  },
}

function normalize(pathname: string): string {
  if (pathname === '/' || pathname === '') return '/'
  return pathname.replace(/\/+$/, '')
}

/** Title + description for any route — single source of truth for client + prerender. */
export function getPageSeo(pathname: string): PageSeo {
  const path = normalize(pathname)

  if (STATIC_SEO[path]) return STATIC_SEO[path]

  // Top-level town guide: /beach-haven, /surf-city, …
  const guide = townGuides.find(g => g.slug === path.slice(1))
  if (guide) return { title: guide.metaTitle, description: guide.metaDescription }

  // Town beach detail: /beaches/:town
  const m = path.match(/^\/beaches\/([^/]+)$/)
  if (m) {
    const g = townGuides.find(x => x.slug === m[1])
    if (g) {
      return {
        title: `${g.name} Beach Badges, Lifeguards & Rules | On LBI`,
        description: `${g.name} beach badge prices, lifeguard hours, beach rules, dog rules, and accessibility on Long Beach Island, NJ.`,
      }
    }
  }

  return STATIC_SEO['/']
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Full per-page <head> SEO block injected at prerender time (server-only output). */
export function buildHeadTags(pathname: string): string {
  const { title, description, ogImage } = getPageSeo(pathname)
  const path = normalize(pathname)
  const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
  const image = ogImage ? `${SITE_URL}${ogImage}` : OG_IMAGE
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join('\n    ')
}
