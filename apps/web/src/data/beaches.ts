// ─────────────────────────────────────────────────────────────────────────────
// BEACHES — Lifeguard info, beach rules, and town-level beach data
// Source: Each town's official website (verified May 2026)
// ⚠️  UPDATE EACH SPRING — lifeguard season dates, dog rules, and badge dates change
// ─────────────────────────────────────────────────────────────────────────────

// ── LIFEGUARD SEASONS PER TOWN ────────────────────────────────────────────────

export const lifeguardInfo = [
  {
    townSlug: 'barnegat-light',
    town: 'Barnegat Light',
    seasonStart: 'Mid-June 2026',
    seasonEnd: 'Labor Day',
    hours: '10:00am–5:00pm daily',
    currentStatus: 'Off duty until June 2026',  // ⚠️ update once season starts
    safetyNote: 'DO NOT swim at unguarded beaches.',
    guardedBeaches: [
      'Ocean beach accesses with flags (4th–9th St. area serviced by Beach Tram)',
      'Bay Beach at 25th St. & Bayview Ave. (guarded, great for young children)',
    ],
    conditionsUrl: 'https://safebeachday.com/',  // select NJ → Ocean County → Barnegat Light
    juniorLifeguardProgram: true,
    juniorRegistrationUrl: 'https://drive.google.com/file/d/1m7W7WeIsyTWlLyeQKiDuQmm_Gdzw4Fub/view?usp=drive_link',
    contact: 'blbp27@gmail.com (Captain John Schulze)',
    sourceUrl: 'https://barnegatlight.org/departments/beaches-lifeguards/',
  },
  {
    townSlug: 'harvey-cedars',
    town: 'Harvey Cedars',
    seasonStart: 'June 15, 2026',
    seasonEnd: 'Labor Day',
    hours: '10:00am–5:00pm daily',
    currentStatus: 'Pre-season — full lifeguard coverage begins June 15, 2026',
    safetyNote: 'Check safebeachday.com for daily conditions.',
    guardedBeaches: ['86th St', '83rd St', '80th St', '76th St', '73rd St', '69th St', 'Middlesex Ave', 'Atlantic Ave', 'Hudson Ave', 'Cape May Ave', '5417 Blvd', 'Bergen Ave', 'Bay Beach at W 75th St'],
    conditionsUrl: 'https://safebeachday.com/',
    juniorLifeguardProgram: false,  // ⚠️ verify
    contact: '(609) 361-6000',
    sourceUrl: 'https://www.harveycedars.org/cn/webpage.cfm?tpid=14966',
  },
  {
    townSlug: 'surf-city',
    town: 'Surf City',
    seasonStart: 'June 14, 2026',
    seasonEnd: 'Labor Day',
    hours: '10:00am–5:00pm daily',
    currentStatus: 'Pre-season — lifeguards begin June 14, 2026',
    safetyNote: 'Check safebeachday.com for daily conditions.',
    guardedBeaches: ['S 2nd St', 'Division St', 'N 2nd St', '4th St', '6th St', '8th St', '10th St', '12th St', '14th St', '16th St', '18th St', '20th St', '22nd St', '24th St'],
    conditionsUrl: 'https://safebeachday.com/',
    juniorLifeguardProgram: false,  // ⚠️ verify
    contact: '(609) 494-3064',
    sourceUrl: 'https://surfcitynj.org/',
  },
  {
    townSlug: 'ship-bottom',
    town: 'Ship Bottom',
    seasonStart: 'Weekends from Memorial Day weekend; daily from the Saturday before Father\'s Day',
    seasonEnd: 'September 30 (limited after Labor Day)',
    hours: '10:00am–6:00pm daily',
    currentStatus: 'Pre-season — weekend guards begin Memorial Day weekend',
    safetyNote: 'After Labor Day, only 7th, 15th & 20th St beaches are guarded (through Sept 30). Check safebeachday.com for daily conditions.',
    guardedBeaches: ['3rd St', '7th St', '15th St', '20th St', '23rd St', '26th St', '30th St', 'Bay'],
    conditionsUrl: 'https://safebeachday.com/',
    juniorLifeguardProgram: false,  // ⚠️ verify
    contact: '(609) 494-2171',
    sourceUrl: 'https://shipbottom.org/government/public-safety/beach-patrol/',
  },
  {
    townSlug: 'long-beach-township',
    town: 'Long Beach Township',
    seasonStart: 'June 20, 2026',
    seasonEnd: 'September 7, 2026',
    hours: '10:00am–5:00pm daily',
    currentStatus: 'Pre-season — badge/guard season begins June 20, 2026',
    safetyNote: 'Guarded beaches span all LBT sections (Loveladies through Holgate). Check safebeachday.com for daily conditions.',
    guardedBeaches: ['Multiple guarded streets across all LBT sections — Loveladies through Holgate; see lbtbp.com'],
    conditionsUrl: 'https://safebeachday.com/',
    juniorLifeguardProgram: false,  // ⚠️ verify
    contact: '(609) 361-1000',
    sourceUrl: 'https://lbtbp.com/',
  },
  {
    townSlug: 'beach-haven',
    town: 'Beach Haven',
    seasonStart: 'When badge checkers start (typically mid-June)',
    seasonEnd: 'Labor Day (September 20)',
    hours: '10:00am–5:00pm (during season)',
    currentStatus: 'No lifeguards on duty (as of May 2026)',
    safetyNote: 'IT IS DANGEROUS TO SWIM WITHOUT LIFEGUARDS.',
    guardedBeaches: [
      '12th Street',
      'Taylor Ave.',
      '5th Street',
      '2nd Street',
      'Centre Street',
      'Engleside Ave.',
      'Pearl Street',
      'Belvoir Ave.',
      'Essex Ave.',
      'Liberty Ave.',
      'Kentford Ave.',
    ],
    conditionsUrl: 'https://safebeachday.com/',
    juniorLifeguardProgram: false,  // ⚠️ verify
    contact: '(609) 492-0111',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
  },
]

// ── BEACH RULES PER TOWN ──────────────────────────────────────────────────────
// Beach Haven is the most thoroughly documented — others need field research.

export const beachRules = [
  {
    townSlug: 'beach-haven',
    town: 'Beach Haven',
    rules: {
      dogs: {
        allowed: true,
        seasonalRestriction: 'Permitted September 16 – May 14 ONLY. Leash required at all times.',
        dogBeach: 'Small dog beach at bay on Taylor Avenue (year-round).',
      },
      smoking: { allowed: false, note: 'No smoking of any kind on Beach Haven beaches.' },
      alcohol: { allowed: false, note: 'No alcoholic beverages or open containers permitted.' },
      tents: {
        allowed: false,
        note: 'Tents not allowed. Only 7ft umbrellas (with anchor) and 4x4ft baby pop-ups permitted. Do not block beach entrances or lifeguard stands.',
      },
      surfing: {
        allowed: true,
        note: 'Permitted 10am–5pm in designated areas (black/white quartered flags) when lifeguards are on duty.',
      },
      drones: {
        allowed: true,
        note: 'Drone and kite flying permitted before 10am and after 5pm only. Banned from dune area at all times.',
      },
      fishing: { allowed: true, note: 'Permitted 50 yards outside designated bathing/surfing areas.' },
      kayaks: { allowed: true, note: 'Permitted 50 yards outside designated areas. PFDs required for all occupants.' },
      volleyball: { note: 'Public volleyball court between 3rd and 4th Street.' },
      horseback: { allowed: false, note: 'Horseback riding prohibited at all times on beach, sand, or dune area.' },
      dunes: { note: 'ILLEGAL to walk on or disturb any dune area in Beach Haven.' },
      ballPlaying: { note: 'Prohibited 10am–5pm between lifeguard flags (4th Sat. in June – Labor Day). Banned from dunes at all times.' },
    },
    additionalNotes: 'All persons on beach must obey directions of lifeguards and police immediately. ' +
                     'Swimming prohibited during storm, high wind, or dangerous currents. ' +
                     'Beach buggy permits: register with Beach Haven PD at (609) 492-0111 x101.',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
    verified: true,
  },
  {
    townSlug: 'barnegat-light',
    town: 'Barnegat Light',
    rules: {
      dogs: {
        allowed: true,
        seasonalRestriction: 'Permitted during allowed times, but NOT on beach April 15 – September 30. Must be on leash at all times.',
      },
      smoking: { allowed: false, note: '⚠️ Verify' },
      alcohol: { allowed: false, note: '⚠️ Verify' },
      tents: { allowed: null, note: '⚠️ Verify' },
      surfing: { allowed: null, note: '⚠️ Verify' },
      drones: { allowed: null, note: '⚠️ Verify' },
    },
    additionalNotes: '⚠️ Full beach rules need research — check borough code at barnegatlight.org',
    sourceUrl: 'https://barnegatlight.org/departments/beaches-lifeguards/',
    verified: false,
  },
  // ⚠️ Harvey Cedars, Surf City, Ship Bottom, LBT — beach rules need field research
]

// ── QUICK REFERENCE — for app beach listing cards ─────────────────────────────
// This replaces the old placeholder beach array.
// Real badge prices are in beachBadges.ts; this is display-layer data only.

export const beaches = [
  {
    townSlug: 'barnegat-light',
    name: 'Barnegat Light',
    town: 'Barnegat Light',
    badgeRequired: true,
    badgeAgeMin: 12,
    lifeguarded: true,   // in-season; guards off duty until mid-June
    lifeguardHours: '10am–5pm (mid-June–Labor Day)',
    beachTram: true,     // 4th–9th St. ocean beach tram
    bayBeach: true,      // Bay Beach at 25th St. — guarded, family-friendly
    dogRules: 'No dogs April 15–Sept 30',
    highlight: '🏛️ Barnegat Lighthouse State Park',
  },
  {
    townSlug: 'harvey-cedars',
    name: 'Harvey Cedars',
    town: 'Harvey Cedars',
    badgeRequired: true,
    badgeAgeMin: 12,
    lifeguarded: true,
    lifeguardHours: '10am–5pm daily (from June 15)',
    beachTram: false,
    bayBeach: false,
    dogRules: '⚠️ Verify',
    highlight: '🎥 Live beach webcam available',
  },
  {
    townSlug: 'surf-city',
    name: 'Surf City',
    town: 'Surf City',
    badgeRequired: true,
    badgeAgeMin: 12,
    lifeguarded: true,
    lifeguardHours: '10am–5pm daily (from June 14)',
    beachTram: false,
    bayBeach: false,
    dogRules: '⚠️ Verify',
    highlight: '🏄 Popular surf spot',
  },
  {
    townSlug: 'ship-bottom',
    name: 'Ship Bottom',
    town: 'Ship Bottom',
    badgeRequired: true,
    badgeAgeMin: 12,
    lifeguarded: true,
    lifeguardHours: '10am–6pm daily',
    beachTram: false,
    bayBeach: false,
    dogRules: '⚠️ Verify',
    highlight: '♿ Beach Wheels & Beach Taxi available',
  },
  {
    townSlug: 'long-beach-township',
    name: 'Long Beach Township',
    town: 'Long Beach Township',
    badgeRequired: true,
    badgeAgeMin: 12,
    lifeguarded: true,
    lifeguardHours: '10am–5pm daily (from June 20)',
    beachTram: false,
    bayBeach: false,
    dogRules: '⚠️ Verify',
    highlight: '♿ One of NJ\'s largest beach wheelchair programs (since 1992)',
  },
  {
    townSlug: 'beach-haven',
    name: 'Beach Haven',
    town: 'Beach Haven',
    badgeRequired: true,
    badgeAgeMin: 12,
    lifeguarded: true,
    lifeguardHours: '10am–5pm (season)',
    beachTram: false,
    bayBeach: false,
    dogRules: 'Allowed Sept 16–May 14 only; dog beach at Taylor Ave. bay year-round',
    highlight: '🎡 Fantasy Island amusement park nearby; no badges on Wednesdays',
    noFreeDay: 'Wednesday — badges not required',
    mobiMatStreets: ['Nelson Ave.', 'Merrivale Ave.', 'Leeward Ave.', 'Dolphin Ave.', 'Chatsworth Ave.', 'Belvoir Ave.', '7th St.', '10th St.', '12th St.'],
  },
]
