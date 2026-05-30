// ─────────────────────────────────────────────────────────────────────────────
// ACCESSIBILITY — Beach access programs per town
// Source: Each town's official website (verified May 2026)
// ⚠️  UPDATE EACH SPRING — ramp locations, chair counts, and contact info change
// ─────────────────────────────────────────────────────────────────────────────

// ── MOBI-MATS & ACCESSIBLE RAMPS ─────────────────────────────────────────────
// Street-end accesses with mobi-mat beach matting or paved/hardened ramps

export const accessibleBeaches = [

  // ── BARNEGAT LIGHT ─────────────────────────────────────────────────────────
  {
    town: 'Barnegat Light',
    townSlug: 'barnegat-light',
    beach: 'Bay Beach — 25th St. & Bayview Ave.',
    mobiMat: false,
    wheelchairLoan: true,   // Beach Wheels program — delivery & pick-up, by reservation
    hcParking: true,
    contact: '(609) 494-9196',
    notes: 'Guarded bay-side beach — great for families with young children. ' +
           'Beach Wheels available at no charge (funded by donations); reservations required. ' +
           'Beach Tram runs between 4th and 9th Street ocean beaches — free with valid badge.',
    sourceUrl: 'https://barnegatlight.org/departments/beaches-lifeguards/',
  },

  // ── HARVEY CEDARS ──────────────────────────────────────────────────────────
  {
    town: 'Harvey Cedars',
    townSlug: 'harvey-cedars',
    beach: 'East 80th Street Access',
    mobiMat: false,
    wheelchairLoan: true,   // Beach Wheel Program + UTV transport
    hcParking: false,
    contact: '(609) 361-9733',  // in-season reservations, 10am–3pm
    notes: 'Handicap access ramp at East 80th Street and East Mercer Avenue. ' +
           'Beach Wheel Program: 6 adult chairs + 1 child chair; weekly reservation; free. ' +
           'UTV transport also available for those who cannot use a beach wheelchair. ' +
           'Must be staying at a Harvey Cedars address to reserve.',
    sourceUrl: 'https://www.harveycedars.org/cn/webpage.cfm?tpid=16575',
  },
  {
    town: 'Harvey Cedars',
    townSlug: 'harvey-cedars',
    beach: 'East Mercer Avenue Access',
    mobiMat: false,
    wheelchairLoan: true,
    hcParking: false,
    contact: '(609) 361-9733',
    notes: 'Second handicap-access ramp. Same Beach Wheel/UTV program as 80th St. ' +
           'Call (609) 361-9733 (in-season, 10am–3pm) for reservations.',
    sourceUrl: 'https://www.harveycedars.org/cn/webpage.cfm?tpid=16575',
  },

  // ── SHIP BOTTOM ────────────────────────────────────────────────────────────
  {
    town: 'Ship Bottom',
    townSlug: 'ship-bottom',
    beach: '15th Street — MOBY-MAT dune walkover',
    mobiMat: true,
    wheelchairLoan: true,   // Beach Wheels — free, reservation required
    hcParking: true,
    contact: '(609) 494-9481',  // in-season; (609) 494-2171 ext. 100 off-season
    notes: 'Handicapped-accessible dune walkover with blue MOBY-MAT matting. ' +
           'Beach Wheels free with advance reservation (in-season (609) 494-9481; off-season (609) 494-2171 ext. 100). ' +
           'Beach Taxi (free) serves physically challenged visitors to beaches 3rd–31st St, Father\'s Day weekend through Labor Day.',
    sourceUrl: 'https://shipbottom.org/government/departments/parks-recreation/',
  },
  {
    town: 'Ship Bottom',
    townSlug: 'ship-bottom',
    beach: '20th Street — MOBY-MAT dune walkover',
    mobiMat: true,
    wheelchairLoan: true,
    hcParking: true,
    contact: '(609) 494-9481',
    notes: 'Second MOBY-MAT dune walkover. See the 15th Street entry for the full Beach Wheels / Beach Taxi program.',
    sourceUrl: 'https://shipbottom.org/government/departments/parks-recreation/',
  },
  {
    town: 'Ship Bottom',
    townSlug: 'ship-bottom',
    beach: 'Accessible ramps — 4th, 8th, 9th, 14th, 19th, 21st & 25th Streets',
    mobiMat: false,
    wheelchairLoan: true,
    hcParking: true,
    contact: '(609) 494-9481',
    notes: 'Hardened accessible ramps (not MOBY-MAT) at 4th, 8th, 9th, 14th, 19th, 21st, and 25th Streets. ' +
           'The blue MOBY-MAT matting is at 15th & 20th St. Beach Wheels & Beach Taxi available by reservation.',
    sourceUrl: 'https://shipbottom.org/government/departments/parks-recreation/',
  },

  // ── LONG BEACH TOWNSHIP ────────────────────────────────────────────────────
  {
    town: 'Long Beach Township',
    townSlug: 'long-beach-township',
    beach: 'Multiple accesses (township-wide)',
    mobiMat: true,
    wheelchairLoan: true,   // Beach Wheels — one of largest programs in the country (est. 1992)
    hcParking: true,
    contact: '(609) 361-1000',
    notes: 'LBT Beach Patrol runs one of the largest beach wheelchair programs in the US (since 1992). ' +
           'See lbtbp.com/beachwheels for full program details and reservations. ' +
           'Beach Gators (John Deere Gator vehicles) — 6 units — transport physically challenged visitors ' +
           'from the street-side beach entrance over the dunes to the beach. ' +
           'Covers Loveladies, North Beach, Brant Beach, Beach Haven Crest, Brighton Beach, Spray Beach, Holgate.',
    sourceUrl: 'https://www.longbeachtownship.com/accessibility/',
  },

  // ── BEACH HAVEN ────────────────────────────────────────────────────────────
  // Mobi-mat locations (mats installed seasonally by DPW, removed in September)
  {
    town: 'Beach Haven',
    townSlug: 'beach-haven',
    beach: 'Nelson Ave.',
    mobiMat: true,
    wheelchairLoan: true,
    hcParking: false,
    contact: '(609) 492-9193',
    notes: 'Mobi-mat to beach. HC parking near beach on Taylor Ave., Centre St., Engleside Ave., Amber St., Pearl St. ' +
           'Beach wheelchairs (free): in-season call the Beach Patrol office (609-492-9193, June 28–Labor Day); ' +
           'off-season call Public Works (609-492-2525, Labor Day–June 23). ' +
           'One beach wheelchair always available at Centre St. Beach Patrol Building (first-come). ' +
           'North 12th St. has enhanced access — both a ramp and a beach mat. ' +
           'Free Beach Taxi for physically challenged — picked up at address, driven to beach. ' +
           'Taxi beaches: 13th St., Taylor Ave., Centre St., Berkeley Ave., Holyoke Ave., Kentford Ave., Nelson Ave.',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
  },
  {
    town: 'Beach Haven',
    townSlug: 'beach-haven',
    beach: 'Merrivale Ave.',
    mobiMat: true,
    wheelchairLoan: false,
    hcParking: false,
    contact: '(609) 492-9193',
    notes: 'Mobi-mat access. See Nelson Ave. entry for full program details.',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
  },
  {
    town: 'Beach Haven',
    townSlug: 'beach-haven',
    beach: 'Leeward Ave.',
    mobiMat: true,
    wheelchairLoan: false,
    hcParking: false,
    contact: '(609) 492-9193',
    notes: 'Mobi-mat access.',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
  },
  {
    town: 'Beach Haven',
    townSlug: 'beach-haven',
    beach: 'Dolphin Ave.',
    mobiMat: true,
    wheelchairLoan: false,
    hcParking: false,
    contact: '(609) 492-9193',
    notes: 'Mobi-mat access.',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
  },
  {
    town: 'Beach Haven',
    townSlug: 'beach-haven',
    beach: 'Chatsworth Ave.',
    mobiMat: true,
    wheelchairLoan: false,
    hcParking: false,
    contact: '(609) 492-9193',
    notes: 'Mobi-mat access.',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
  },
  {
    town: 'Beach Haven',
    townSlug: 'beach-haven',
    beach: 'Belvoir Ave.',
    mobiMat: true,
    wheelchairLoan: false,
    hcParking: true,
    contact: '(609) 492-9193',
    notes: 'Mobi-mat access. HC parking available nearby.',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
  },
  {
    town: 'Beach Haven',
    townSlug: 'beach-haven',
    beach: '7th Street',
    mobiMat: true,
    wheelchairLoan: false,
    hcParking: false,
    contact: '(609) 492-9193',
    notes: 'Mobi-mat access.',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
  },
  {
    town: 'Beach Haven',
    townSlug: 'beach-haven',
    beach: '10th Street',
    mobiMat: true,
    wheelchairLoan: false,
    hcParking: false,
    contact: '(609) 492-9193',
    notes: 'Mobi-mat access.',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
  },
  {
    town: 'Beach Haven',
    townSlug: 'beach-haven',
    beach: '12th Street',
    mobiMat: true,
    wheelchairLoan: false,
    hcParking: false,
    contact: '(609) 492-9193',
    notes: 'Mobi-mat access. Northernmost beach in Beach Haven Borough.',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
  },
  // Dedicated handicapped beach access points in Beach Haven (not just mobi-mat):
  // 5th Street, Centre Street, and Pearl Street have full handicapped beach access

]

// ─────────────────────────────────────────────────────────────────────────────
// BEACH TAXI & TRANSPORT SERVICES
// ─────────────────────────────────────────────────────────────────────────────
export const beachTransportServices = [
  {
    town: 'Beach Haven',
    townSlug: 'beach-haven',
    name: 'Beach Haven Beach Taxi',
    type: 'taxi',
    free: true,
    description: 'Free taxi service for physically challenged individuals staying in Beach Haven (12th St. to Nelson Ave.). ' +
                 'Picked up at your address and driven onto the beach. ' +
                 'Morning pickups run ~10:20am–1:20pm; afternoon beach pickups end ~4:30pm.',
    beachDropoffs: ['13th St.', 'Taylor Ave.', 'Centre St.', 'Berkeley Ave.', 'Holyoke Ave.', 'Kentford Ave.', 'Nelson Ave.'],
    season: 'During the season (when badge checkers are working)',
    contact: '(609) 492-0111',
    moreInfo: 'https://beachhaven-nj.gov/beach-haven-beach-taxi/',
  },
  {
    town: 'Ship Bottom',
    townSlug: 'ship-bottom',
    name: 'Ship Bottom Beach Taxi',
    type: 'taxi',
    free: true,
    description: 'Free Beach Taxi for physically challenged visitors to beaches 3rd–31st Streets.',
    beachDropoffs: ['3rd St. through 31st St.'],
    season: "Father's Day weekend through Labor Day",
    contact: '(609) 494-2171',
    moreInfo: 'https://shipbottom.org/beach-wheels-beach-taxi/',
  },
  {
    town: 'Long Beach Township',
    townSlug: 'long-beach-township',
    name: 'LBT Beach Gators',
    type: 'gator',
    free: true,
    description: '6 John Deere Gator vehicles transport physically challenged individuals ' +
                 'from street-side beach entrances, over the dunes, to the beach.',
    beachDropoffs: ['Multiple LBT beach accesses — contact for details'],
    season: 'Summer season',
    contact: '(609) 361-1000',
    moreInfo: 'https://www.longbeachtownship.com/transportation/',
  },
  {
    town: 'Barnegat Light',
    townSlug: 'barnegat-light',
    name: 'Barnegat Light Beach Tram',
    type: 'tram',
    free: true,  // free with valid beach badge
    description: 'Beach Tram for patrons between 4th St. and 9th St. ' +
                 'Picks up at each street end and transports to the lifeguarded area between 9th and 10th St. ' +
                 'All passengers 12+ must have a valid beach badge.',
    beachDropoffs: ['4th St.', '5th St.', '6th St.', '7th St.', '8th St.', '9th St.'],
    season: 'Same hours as lifeguards — 10:00am–5:00pm (not operating 1pm–2pm); last pick-up ~5:00pm',
    contact: '(609) 494-9196',
    moreInfo: 'https://barnegatlight.org/departments/beaches-lifeguards/',
  },
  {
    town: 'Harvey Cedars',
    townSlug: 'harvey-cedars',
    name: 'Harvey Cedars UTV Transport',
    type: 'utv',
    free: true,
    description: 'Four-wheel-drive UTV transports physically challenged individuals to and from the beach. ' +
                 'For those unable to use a beach wheelchair.',
    beachDropoffs: ['Harvey Cedars beach accesses'],
    season: 'In-season (call for availability)',
    contact: '(609) 361-9733',  // in-season, 10am–3pm
    moreInfo: 'https://www.harveycedars.org/cn/webpage.cfm?tpid=16575',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// RESTROOMS & RINSE STATIONS
// Source: Beach Haven verified May 2026; others need field research
// ⚠️  These need on-the-ground verification for all towns
// ─────────────────────────────────────────────────────────────────────────────
export const restrooms = [
  {
    name: 'Centre St. Beach Patrol Building',
    town: 'Beach Haven',
    townSlug: 'beach-haven',
    hours: 'During season hours',
    condition: 'good',
    changing: false,
    accessible: true,
    showers: true,    // rinse station confirmed
    enclosed: true,
    note: 'Public restrooms + rinse stations at Centre St. beach entrance.',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
    verified: true,
  },
  {
    name: "Veterans Park Restrooms (Amber St.)",
    town: 'Beach Haven',
    townSlug: 'beach-haven',
    hours: 'Park hours',
    condition: 'good',
    changing: false,
    accessible: true,
    showers: false,
    enclosed: true,
    note: 'A few blocks from the beach. Also restrooms at Nelson Ave. playground.',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
    verified: true,
  },
  // ⚠️ Other towns need field verification — add as data is confirmed
]
