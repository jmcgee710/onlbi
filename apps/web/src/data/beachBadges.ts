// ─────────────────────────────────────────────────────────────────────────────
// BEACH BADGES — 2026 season pricing & info per town
// Source: Each town's official beach patrol / recreation pages (verified May 2026)
// ⚠️  UPDATE EACH SPRING — prices and pre-season cutoffs change year to year
// ─────────────────────────────────────────────────────────────────────────────

export interface BadgePricing {
  preseason: number          // $ — pre-season seasonal badge price
  preseasonDeadline: string  // last date to get pre-season rate
  seasonal: number           // $ — in-season seasonal badge price
  weekly: number             // $
  daily: number              // $
  senior: number | 'free'    // $ or 'free' — for 65+
  seniorType: 'annual' | 'lifetime'
  veteranDaily: 'free' | null
  veteranLifetime: 'free' | null
  activeMilitary: string     // description of benefit
  ageRequired: number        // minimum age requiring a badge
  digitalApp: boolean        // available via My Beach Mobile app
  cashOnly: boolean          // true if cash/check only on beach
  notes?: string
}

export interface TownBadgeInfo {
  townSlug: string
  townName: string
  badgeOffice: {
    location: string
    phone: string
    preseasonHours?: string
    seasonHours: string
  }
  pricing: BadgePricing
  purchaseOptions: string[]  // e.g. ['in-person', 'mail', 'app', 'on-beach']
  badgeScopeNote: string     // where the badge is valid
  sourceUrl: string
  verifiedDate: string       // last verified — update each spring
  needsVerification?: boolean // flag if data couldn't be confirmed (e.g. image-only page)
}

export const beachBadgeInfo: TownBadgeInfo[] = [
  // ── BARNEGAT LIGHT ─────────────────────────────────────────────────────────
  {
    townSlug: 'barnegat-light',
    townName: 'Barnegat Light',
    badgeOffice: {
      location: 'Beach Badge Booth (opens Easter weekend; limited spring hours; season: daily 8am–3pm, Saturdays until 6pm)',
      phone: '(609) 494-9196',
      seasonHours: 'Daily 8:00am–3:00pm; Saturdays until 6:00pm',
    },
    pricing: {
      preseason: 40,
      preseasonDeadline: 'June 5, 2026',
      seasonal: 50,
      weekly: 25,       // Saturday through Friday
      daily: 10,
      senior: 12,       // 65+ with proof of age
      seniorType: 'annual',
      veteranDaily: 'free',
      veteranLifetime: null,
      activeMilitary: 'Free daily admission for active members + dependents with valid military ID',
      ageRequired: 12,
      digitalApp: false, // ⚠️ Barnegat Light does NOT support online/app purchases as of 2026
      cashOnly: false,   // badges purchasable at Borough Hall off-season
      notes: 'Holiday badges available in gift box: $42 pre-season / $52 in-season (while supplies last). ' +
             'Mail orders available starting November — held for pick-up, not mailed. ' +
             'Senior badge orders must include proof of age copy.',
    },
    purchaseOptions: ['in-person-booth', 'mail-order', 'on-beach-from-checker'],
    badgeScopeNote: 'Valid in Barnegat Light only',
    sourceUrl: 'https://barnegatlight.org/departments/beaches-lifeguards/',
    verifiedDate: '2026-05-18',
  },

  // ── HARVEY CEDARS ──────────────────────────────────────────────────────────
  {
    townSlug: 'harvey-cedars',
    townName: 'Harvey Cedars',
    badgeOffice: {
      location: 'Sunset Park badge booth — opens June 15',
      phone: '(609) 361-6000',
      seasonHours: 'Available at badge booth starting June 15; daily/weekly available from badge checkers on beach',
    },
    pricing: {
      preseason: 40,
      preseasonDeadline: 'June 15, 2026',
      seasonal: 50,
      weekly: 20,
      daily: 7,
      senior: 12,       // 65+ with proof of age; must purchase in person
      seniorType: 'annual',
      veteranDaily: 'free',
      veteranLifetime: null,
      activeMilitary: 'Free daily admission with valid military status ID — show to any badge-checker or Borough personnel',
      ageRequired: 12,
      digitalApp: true,  // My Beach Mobile app; digital badges are non-transferable
      cashOnly: true,    // physical badges: cash or check only at booth
      notes: 'Badges required starting June 15, 2026. ' +
             'Digital badges via My Beach Mobile app (non-transferable, all sales final). ' +
             'Physical badges: cash or check only.',
    },
    purchaseOptions: ['in-person-booth', 'app-my-beach-mobile', 'on-beach-from-checker'],
    badgeScopeNote: 'Valid in Harvey Cedars only',
    sourceUrl: 'https://www.harveycedars.org/cn/webpage.cfm?tpid=15560',
    verifiedDate: '2026-05-18',
  },

  // ── SURF CITY ──────────────────────────────────────────────────────────────
  {
    townSlug: 'surf-city',
    townName: 'Surf City',
    badgeOffice: {
      location: 'Pre-season online store available; check borough site for booth location',
      phone: '(609) 494-3064',
      preseasonHours: 'Pre-season badges available online',
      seasonHours: '⚠️ Verify for 2026 season — check surfcitynj.org/beaches/',
    },
    pricing: {
      preseason: 0,     // ⚠️ price not confirmed from site — verify
      preseasonDeadline: '⚠️ Verify',
      seasonal: 0,      // ⚠️ price not confirmed from site — verify
      weekly: 0,
      daily: 0,
      senior: 0,
      seniorType: 'annual',
      veteranDaily: null,
      veteranLifetime: null,
      activeMilitary: '⚠️ Verify with borough',
      ageRequired: 12,
      digitalApp: false, // ⚠️ not confirmed
      cashOnly: false,
      notes: '⚠️ Badge prices were not retrievable from surfcitynj.org as of May 2026 — page returned no content. ' +
             'Pre-season online store: https://boroughofsurfcity.company.site/ ' +
             'Call (609) 494-3064 to confirm 2026 pricing before publishing.',
    },
    purchaseOptions: ['online-preseason', 'in-person-booth'],
    badgeScopeNote: 'Valid in Surf City only',
    sourceUrl: 'https://surfcitynj.org/beaches/',
    verifiedDate: '2026-05-18',
    needsVerification: true,
  },

  // ── SHIP BOTTOM ────────────────────────────────────────────────────────────
  {
    townSlug: 'ship-bottom',
    townName: 'Ship Bottom',
    badgeOffice: {
      location: '1621 Long Beach Boulevard, Ship Bottom — check beach patrol page for booth location',
      phone: '(609) 494-2171',
      seasonHours: '⚠️ Verify for 2026 season — check shipbottom.org/government/public-safety/beach-patrol/beach-badges/',
    },
    pricing: {
      preseason: 0,     // ⚠️ badge price page was image-only — could not extract pricing
      preseasonDeadline: '⚠️ Verify',
      seasonal: 0,
      weekly: 0,
      daily: 0,
      senior: 0,
      seniorType: 'annual',
      veteranDaily: null,
      veteranLifetime: null,
      activeMilitary: '⚠️ Verify with borough',
      ageRequired: 12,
      digitalApp: false, // ⚠️ not confirmed
      cashOnly: false,
      notes: '⚠️ Badge pricing page (shipbottom.org) displayed pricing as an image — ' +
             'data could not be extracted. Call (609) 494-2171 to confirm 2026 pricing. ' +
             'Beach Wheels & Beach Taxi available — see accessibility.ts.',
    },
    purchaseOptions: ['in-person-booth'],
    badgeScopeNote: 'Valid in Ship Bottom only',
    sourceUrl: 'https://shipbottom.org/government/public-safety/beach-patrol/beach-badges/',
    verifiedDate: '2026-05-18',
    needsVerification: true,
  },

  // ── LONG BEACH TOWNSHIP ────────────────────────────────────────────────────
  // Covers: Loveladies, North Beach, Brant Beach, Beach Haven Crest,
  //         Brighton Beach, Spray Beach, Holgate
  {
    townSlug: 'long-beach-township',
    townName: 'Long Beach Township',
    badgeOffice: {
      location: 'LBTBP (Long Beach Township Beach Patrol) — see lbtbp.com for booth locations',
      phone: '(609) 361-1000',
      seasonHours: '⚠️ Verify for 2026 season at lbtbp.com/?page_id=48',
    },
    pricing: {
      preseason: 0,     // ⚠️ lbtbp.com was not directly accessible — verify
      preseasonDeadline: '⚠️ Verify',
      seasonal: 0,
      weekly: 0,
      daily: 0,
      senior: 0,
      seniorType: 'annual',
      veteranDaily: null,
      veteranLifetime: null,
      activeMilitary: '⚠️ Verify at lbtbp.com',
      ageRequired: 12,
      digitalApp: true,  // LBT has My Beach Mobile — confirmed link on township site
      cashOnly: false,
      notes: '⚠️ lbtbp.com was not directly accessible during data pull — ' +
             'verify pricing at https://lbtbp.com/?page_id=48. ' +
             'Township covers 7+ communities; badges valid within LBT boundaries. ' +
             'Digital badges via My Beach Mobile app.',
    },
    purchaseOptions: ['in-person-booth', 'app-my-beach-mobile', 'mail-order'],
    badgeScopeNote: 'Valid within Long Beach Township boundaries (Loveladies through Holgate)',
    sourceUrl: 'https://lbtbp.com/?page_id=48',
    verifiedDate: '2026-05-18',
    needsVerification: true,
  },

  // ── BEACH HAVEN ────────────────────────────────────────────────────────────
  {
    townSlug: 'beach-haven',
    townName: 'Beach Haven',
    badgeOffice: {
      location: 'Centre St. Beach Badge Office, Beach Haven',
      phone: '(609) 492-9193',
      preseasonHours: 'Starting May 15: Friday–Monday 9:30am–3:30pm',
      seasonHours: 'Starting June 27: Daily except Wednesdays — Mon–Sat 9:30am–3:30pm, Sun 9:30am–2:30pm',
    },
    pricing: {
      preseason: 40,
      preseasonDeadline: 'May 31, 2026',
      seasonal: 50,
      weekly: 20,
      daily: 10,
      senior: 10,       // lifetime badge; 65+; with ID; in-person only
      seniorType: 'lifetime',
      veteranDaily: null,
      veteranLifetime: 'free', // Lifetime recreation badge with proper ID; in-person at badge office only
      activeMilitary: 'Free weekly wristbands for active military + immediate family with proper ID (badge office only)',
      ageRequired: 12,
      digitalApp: true,  // My Beach Mobile app — both digital and physical available
      cashOnly: false,   // office accepts cash, check, credit/debit (processing fee applies)
      notes: 'BADGES NOT REQUIRED ON WEDNESDAYS. ' +
             'Badges valid from 12th St. to Nelson Ave. only. ' +
             'Credit/debit processing fees: $3 for purchases ≤$113; 2.65% above $113. ' +
             'Cash only on the beach; office accepts cash/check/card. ' +
             'Pre-season mail order form available — must be postmarked by May 31.',
    },
    purchaseOptions: ['in-person-booth', 'on-beach-from-checker', 'mail-order', 'app-my-beach-mobile'],
    badgeScopeNote: 'Valid from 12th Street to Nelson Ave. (Beach Haven Borough) only',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
    verifiedDate: '2026-05-18',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// MY BEACH MOBILE APP — shared across multiple towns
// ─────────────────────────────────────────────────────────────────────────────
export const myBeachMobileApp = {
  name: 'My Beach Mobile',
  apple: 'https://apps.apple.com/us/app/my-beach-mobile/id1471520676',
  android: 'https://play.google.com/store/apps/details?id=com.beach.tag',
  notes: 'QR code stored on your mobile device. Non-transferable between devices. All sales final. Cannot be exchanged for physical badges.',
  towns: ['beach-haven', 'harvey-cedars', 'long-beach-township'],
}
