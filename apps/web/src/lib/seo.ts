import { townGuides } from '../data/townGuides'

export const SITE_URL = 'https://onlongbeachisland.com'
const OG_IMAGE = `${SITE_URL}/logo-light.png`

export type PageSeo = { title: string; description: string }

// Static per-page titles/descriptions — unique and keyword-targeted per route.
const STATIC_SEO: Record<string, PageSeo> = {
  '/': {
    title: 'On LBI — Long Beach Island Beach Guide',
    description:
      'Your live guide to Long Beach Island, NJ — beach badge prices, tides and surf conditions, parking, wheelchair-accessible beaches, restaurants, and things to do in every LBI town.',
  },
  '/beaches': {
    title: 'LBI Beach Badges & Conditions — Prices, Lifeguards, Rules | On LBI',
    description:
      'Compare 2026 beach badge prices, lifeguard hours, and beach rules for all six Long Beach Island towns, plus live beach conditions.',
  },
  '/towns': {
    title: 'LBI Town Map & Guide — All 6 Long Beach Island Towns Compared | On LBI',
    description:
      'Map and guide to all six Long Beach Island towns — Barnegat Light, Harvey Cedars, Surf City, Ship Bottom, Long Beach Township, and Beach Haven. See where each sits and which is right for your trip.',
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
  const { title, description } = getPageSeo(pathname)
  const path = normalize(pathname)
  const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ].join('\n    ')
}
