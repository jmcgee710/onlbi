// ─────────────────────────────────────────────────────────────────────────────
// GETTING AROUND — Transportation, parking, and causeway info
// Source: Town websites + LBI Shuttle (verified May 2026)
// ⚠️  UPDATE EACH SPRING — shuttle routes, fares, and parking rules change
// ─────────────────────────────────────────────────────────────────────────────

// ── LBI SHUTTLE ──────────────────────────────────────────────────────────────
// The LBI Shuttle runs the full 18-mile length of the island.
// Operated in coordination with Long Beach Township.
// GTFS feed availability still unconfirmed — keep static schedule until a feed is found.

export const shuttleInfo = {
  name: 'LBI Shuttle',
  description: 'Free trolley-style service running all 18 miles of Long Beach Island along the Boulevard. ' +
               'Designated stops throughout the island — can also wave down the trolley. Track live at lbishuttle.com.',
  operatedBy: 'Long Beach Township (in coordination with island municipalities)',
  coverageNotes: 'Covers from Barnegat Light (north) to Beach Haven (south)',
  fare: 'Free — no cost to ride',
  tracker: 'https://www.lbishuttle.com/',
  phone: '(609) 342-2111',
  moreInfo: 'https://www.longbeachtownship.com/lbi-shuttle/',
  barnegatlightInfo: 'https://barnegatlight.org/lbi-shuttle/',
  verificationNeeded: false,
  verificationNote: 'Verified May 2026: free service; full daily run June 29–Sept 7 (~8am–10/11pm); ' +
                    'weekends-only in shoulder season (late May/early June and September into early October). Track live at lbishuttle.com.',
}

// 2026 schedule (verified May 2026). Frequencies vary through the day — track live at lbishuttle.com.
export const shuttleRoutes = [
  {
    route: 'Island Route',
    description: 'Full north-south island run — Barnegat Light to Beach Haven and back',
    stops: [
      'Barnegat Light',
      'Harvey Cedars',
      'North Beach',
      'Surf City',
      'Ship Bottom',
      'Brant Beach',
      'Beach Haven Crest',
      'Brighton Beach',
      'Spray Beach',
      'Beach Haven',
    ],
    freq: 'Frequent all summer — track live at lbishuttle.com',
    firstRun: '8:00am',
    lastRun: '10:00–11:00pm (peak season)',
    fare: 'Free',
    season: 'Weekends from Memorial Day weekend; daily June 29–Sept 7; weekends again into early October',
  },
]

// ── BARNEGAT LIGHT BEACH TRAM ─────────────────────────────────────────────────
// Town-specific transport — separate from LBI Shuttle; see accessibility.ts
// Tram runs 4th–9th St. ocean beaches; hours mirror lifeguard hours; free with badge

// ── CAUSEWAY / ROUTE 72 ───────────────────────────────────────────────────────
export const causewayInfo = {
  name: 'Route 72 Manahawkin Bay Bridges',
  description: 'The main causeway connecting the mainland (Manahawkin) to LBI via Ship Bottom.',
  liveTrafficFeed: 'NJ511 — filter to Route 72 Manahawkin Bay Bridges',
  nj511url: 'https://www.511nj.org/',
  peakCongesteTimes: 'Fridays 2pm–8pm (inbound) and Sundays 2pm–7pm (outbound) Memorial Day–Labor Day',
  bridgeProjectInfo: 'https://www.state.nj.us/transportation/commuter/roads/rte72manahawkinbaybridges/',
  lbtTrafficCameras: 'http://lbtpublic.packetalk.net:5350/IVC/views/1-live-view.htm',
  notes: 'Only road on/off the island. Real-time NJ511 feed should be the source for the Causeway widget. ' +
         'Ship Bottom also has a flood advisory sensor: http://hudson.dl.stevens-tech.edu/sfas/d/index.shtml?station=U226',
}

// Placeholder — replace with live NJ511 data once Edge Function is built
export const trafficStatus = {
  causeway: { status: 'unknown', wait: '—', updated: '—' },
  rt72: '⚠️ Connect to NJ511 Edge Function for live data',
}

// ── PARKING ───────────────────────────────────────────────────────────────────
// No real-time parking sensors exist on LBI — this data is static/manual.
// ⚠️  Review and update each spring before season.

export const parkingInfo = [
  {
    townSlug: 'beach-haven',
    town: 'Beach Haven',
    overview: 'Public parking in Beach Haven is FREE. ' +
              'No vehicle (including trailers) may park in a Borough lot for more than 48 hours total within a 7-day period.',
    parkingStreets: ['Taylor Ave.', 'Centre St.', 'Engleside Ave.', 'Amber St.', 'Coral St.', 'Pearl St.', 'Marine St.'],
    hcParkingStreets: ['Taylor Ave.', 'Centre St.', 'Engleside Ave.', 'Amber St.', 'Pearl St.'],
    notes: 'Additional lot half-block south of Nelson Ave. on ocean side. Street parking available on all streets.',
    cost: 'Free',
    sourceUrl: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
    verified: true,
  },
  {
    townSlug: 'barnegat-light',
    town: 'Barnegat Light',
    overview: 'Free street parking throughout the borough. The Barnegat Lighthouse State Park lot is also FREE.',
    parkingStreets: ['Street parking borough-wide', 'Barnegat Lighthouse State Park lot (free)'],
    hcParkingStreets: ['Barnegat Lighthouse State Park — accessible HC spaces'],
    notes: 'The state park lot is the largest in the borough and free to park, but fills by mid-morning on summer weekends. Climbing Old Barney costs $3/person (ages 6–11 $1, under 6 free), Memorial Day–Labor Day.',
    cost: 'Free (street + State Park lot)',
    sourceUrl: 'https://dep.nj.gov/parksandforests/state-park/barnegat-lighthouse-state-park/',
    verified: true,
  },
  {
    townSlug: 'harvey-cedars',
    town: 'Harvey Cedars',
    overview: 'Free street parking on the east-west streets that end at the beach, plus the Sunset Park lot (W Salem Ave) and a lot at the public works yard (Salem & Passaic Aves).',
    parkingStreets: ['East-west streets ending at the beach', 'Sunset Park lot (W Salem Ave)', 'Public works yard lot (Salem & Passaic)'],
    hcParkingStreets: ['Sunset Park lot (W Salem Ave)'],
    notes: 'No meters. Some streets carry posted time limits or no-parking hours under borough ordinance — watch signage. Beachfront spots fill by late morning on summer weekends.',
    cost: 'Free',
    sourceUrl: 'https://www.harveycedars.org/',
    verified: true,
  },
  {
    townSlug: 'surf-city',
    town: 'Surf City',
    overview: 'Free street parking on most side streets that end at the beach. Arrive before ~10am in peak season, or use the LBI Shuttle (it stops in Surf City).',
    parkingStreets: ['Side streets ending at the beach'],
    hcParkingStreets: [],
    notes: 'Mostly free street parking. A few areas near Long Beach Blvd carry posted time limits — watch signage. Borough Hall: 9th St & Long Beach Blvd. Metered-zone specifics not published online; confirm with the borough.',
    cost: 'Free street parking (some posted time limits near the Boulevard)',
    sourceUrl: 'https://surfcitynj.org/',
    verified: false,
  },
  {
    townSlug: 'ship-bottom',
    town: 'Ship Bottom',
    overview: 'Free parking, but ocean-side blocks are time-limited: parking on the ocean side of the streets is limited to 1 hour (exceptions are posted). Bay-side streets allow all-day parking.',
    parkingStreets: ['Bay-side streets (all-day)', 'Ocean-side streets (1-hour limit unless posted otherwise)'],
    hcParkingStreets: [],
    notes: 'No meters, but watch the 1-hour ocean-side limit (exceptions are signed). The municipal lot between 16th & 17th St is for Post Office / Borough business only (2-hour max). Bayside parks (Nissen, Sunset Point) have lots.',
    cost: 'Free (1-hour limit on ocean-side streets)',
    sourceUrl: 'https://shipbottom.org/government/public-safety/police-department/beach-regulations/',
    verified: true,
  },
  {
    townSlug: 'long-beach-township',
    town: 'Long Beach Township',
    overview: 'Free street parking on most secondary streets, plus the Bayview Park lot in Brant Beach and a pay-to-park lot in Holgate. Watch the alternate-side cleaning rule below.',
    parkingStreets: ['Secondary (side) streets', 'Bayview Park lot (Brant Beach)', 'Holgate pay lot'],
    hcParkingStreets: [],
    notes: 'May 1–Sept 30, parking is PROHIBITED from 9am Wed to 9am Sun on the easterly side of north-south streets and the southerly side of east-west streets (Brant Beach from 31st St south through Beach Haven Terrace at Ohio Ave) for street cleaning. Watch signage. One LBT badge covers all sections.',
    cost: 'Free street parking; Holgate lot is paid',
    sourceUrl: 'https://ecode360.com/10304950',
    verified: true,
  },
]

// Placeholder lot-level data for the Parking tab. No live sensors exist on LBI;
// real data will come from parkingInfo above + future field research.
// TODO: replace with real lot list and remove fake avail/cap values.
export const parkingLots = [
  { loc: 'Beach Haven — Centre St. Lot', avail: 18, cap: 60 },
  { loc: 'Beach Haven — Taylor Ave.',    avail: 4,  cap: 40 },
  { loc: 'Barnegat Lighthouse State Park', avail: 22, cap: 80 },
  { loc: 'Ship Bottom — 9th St.',        avail: 0,  cap: 30 },
  { loc: 'Surf City — N. 1st St.',       avail: 12, cap: 35 },
]

// ── TRAFFIC CAMERAS ───────────────────────────────────────────────────────────
// All 5 LBT cams live on the same view page — clicking any opens the LBT
// traffic-camera live view.
const LBT_CAM_URL = 'http://lbtpublic.packetalk.net:5350/IVC/views/1-live-view.htm'

export const cameras = [
  {
    name: '38th St — Northbound',
    location: 'Long Beach Blvd, Brant Beach',
    desc: 'Traffic cam facing north on the Boulevard',
    url: LBT_CAM_URL,
    status: 'live',
  },
  {
    name: '38th St — Southbound',
    location: 'Long Beach Blvd, Brant Beach',
    desc: 'Traffic cam facing south on the Boulevard',
    url: LBT_CAM_URL,
    status: 'live',
  },
  {
    name: '28th St — Northbound',
    location: 'Long Beach Blvd, Ship Bottom',
    desc: 'Traffic cam facing north on the Boulevard',
    url: LBT_CAM_URL,
    status: 'live',
  },
  {
    name: '28th St — Southbound',
    location: 'Long Beach Blvd, Ship Bottom',
    desc: 'Traffic cam facing south on the Boulevard',
    url: LBT_CAM_URL,
    status: 'live',
  },
  {
    name: 'Holgate Beach Cam',
    location: 'Holgate, Long Beach Township',
    desc: 'Beach cam at the southern tip of LBI',
    url: LBT_CAM_URL,
    status: 'live',
  },
]

// ── BIKING ────────────────────────────────────────────────────────────────────
export const bikingInfo = {
  beachHaven: {
    notes: 'Beach Haven has painted green bike lanes throughout town. ' +
           'Green lines alert drivers that the lane is for bikers only.',
    sourceUrl: 'https://beachhaven-nj.gov/',
  },
  islandWide: {
    notes: 'No single continuous island-wide bike path. Brant Beach has a dedicated bike path along Long Beach Blvd, and Beach Haven has green-painted bike lanes; elsewhere cyclists use the Boulevard\'s wide shoulder. The island runs ~18 miles north–south — flat and straight, good for cruising.',
    chamberUrl: 'https://welcometolbi.com',
  },
}
