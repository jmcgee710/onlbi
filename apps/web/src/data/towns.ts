// ─────────────────────────────────────────────────────────────────────────────
// TOWNS — Official municipality info for each LBI borough/township
// Source: Each town's official website (verified May 2026)
// Update each spring — check contact info, hours, and social links
// ─────────────────────────────────────────────────────────────────────────────

export interface Town {
  slug: string
  name: string
  address: string
  phone: string
  email?: string
  hallHours: string
  website: string
  facebook?: string
  instagram?: string
  youtube?: string
  emergencyAlerts: string   // Nixle or equivalent sign-up URL
  sourceUrl: string         // Page this data was pulled from
  notes?: string
}

export const towns: Town[] = [
  // ── BARNEGAT LIGHT ─────────────────────────────────────────────────────────
  {
    slug: 'barnegat-light',
    name: 'Barnegat Light',
    address: '10 East 7th Street, P.O. Box 576, Barnegat Light, NJ 08006',
    phone: '(609) 494-9196',
    hallHours: 'Monday–Friday 8:00am–3:30pm',
    website: 'https://barnegatlight.org',
    emergencyAlerts: 'http://local.nixle.com/long-beach-township-police-department/',
    sourceUrl: 'https://barnegatlight.org/',
    notes: 'Northernmost borough on LBI. Home of Barnegat Lighthouse State Park.',
  },

  // ── HARVEY CEDARS ──────────────────────────────────────────────────────────
  {
    slug: 'harvey-cedars',
    name: 'Harvey Cedars',
    address: '7606 Long Beach Boulevard, P.O. Box 3185, Harvey Cedars, NJ 08008',
    phone: '(609) 361-6000',
    hallHours: 'Monday–Friday 8:30am–4:00pm',
    website: 'https://www.harveycedars.org',
    facebook: 'https://www.facebook.com/harveycedarsactivitycommittee/',
    instagram: 'https://www.instagram.com/harveycedarsactivitycommittee/',
    emergencyAlerts: 'http://local.nixle.com/harvey-cedars-police-department/',
    sourceUrl: 'https://www.harveycedars.org/',
    notes: 'Has a live beach webcam. Monthly newsletter: Harvey Cedars Community Currents.',
  },

  // ── SURF CITY ──────────────────────────────────────────────────────────────
  {
    slug: 'surf-city',
    name: 'Surf City',
    address: '813 Long Beach Boulevard, Surf City, NJ 08008',
    phone: '(609) 494-3064',
    email: 'frontdesk@surfcitynj.org',
    hallHours: 'Contact for hours', // not listed on site as of May 2026
    website: 'https://surfcitynj.org',
    facebook: 'https://www.facebook.com/SurfCityBorough/',
    emergencyAlerts: 'https://local.nixle.com/register/',
    sourceUrl: 'https://surfcitynj.org/',
    notes: 'Rated "Very Best Town to Retire in NJ." Annual townwide yard sales May 16 & Aug 15.',
  },

  // ── SHIP BOTTOM ────────────────────────────────────────────────────────────
  {
    slug: 'ship-bottom',
    name: 'Ship Bottom',
    address: '1621 Long Beach Boulevard, Ship Bottom, NJ 08008',
    phone: '(609) 494-2171',
    hallHours: 'Monday–Friday 9:00am–4:30pm',
    website: 'https://shipbottom.org',
    facebook: 'https://www.facebook.com/Borough-of-Ship-Bottom-521020848069179/',
    emergencyAlerts: 'https://local.nixle.com/register/',
    sourceUrl: 'https://shipbottom.org/',
    notes: 'Annual Summer Concert Series. Has a business directory on the municipal site.',
  },

  // ── LONG BEACH TOWNSHIP ────────────────────────────────────────────────────
  // Covers: Loveladies, North Beach, Brant Beach, Beach Haven Crest,
  //         Brighton Beach, Spray Beach, Holgate
  {
    slug: 'long-beach-township',
    name: 'Long Beach Township',
    address: '6805 Long Beach Boulevard, Brant Beach, NJ 08008',
    phone: '(609) 361-1000',
    email: 'concierge@longbeachtownship.com',
    hallHours: 'Contact for hours',
    website: 'https://www.longbeachtownship.com',
    facebook: 'https://www.facebook.com/longbeachtownship/',
    instagram: 'https://www.instagram.com/longbeachtownship/',
    youtube: 'https://www.youtube.com/user/longbeachtownship',
    emergencyAlerts: 'https://local.nixle.com/long-beach-township-police-department',
    sourceUrl: 'https://www.longbeachtownship.com/',
    notes: 'Largest municipality — covers Loveladies through Holgate. ' +
           'Firepit Fridays at 68th St beach (summer). Has live traffic cameras.',
  },

  // ── BEACH HAVEN ────────────────────────────────────────────────────────────
  {
    slug: 'beach-haven',
    name: 'Beach Haven',
    address: '300 Engleside Avenue, Beach Haven, NJ 08008',
    phone: '(609) 492-0111',
    hallHours: 'Monday–Friday 9:00am–4:00pm',
    website: 'https://beachhaven-nj.gov',
    facebook: 'https://www.facebook.com/visitbeachhaven',
    instagram: 'https://www.instagram.com/visitbeachhaven/',
    youtube: 'https://www.youtube.com/user/OfficialBeachHaven',
    emergencyAlerts: 'https://local.nixle.com/register/',
    sourceUrl: 'https://beachhaven-nj.gov/',
    notes: 'Southernmost incorporated borough. Has a boat ramp, pickleball courts, ' +
           'tennis courts, and public library. Green bike lane lines throughout town for safety.',
  },
]
