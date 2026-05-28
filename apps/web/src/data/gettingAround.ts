// ─────────────────────────────────────────────────────────────────────────────
// GETTING AROUND — Transportation, parking, and causeway info
// Source: Town websites + LBI Shuttle (verified May 2026)
// ⚠️  UPDATE EACH SPRING — shuttle routes, fares, and parking rules change
// ─────────────────────────────────────────────────────────────────────────────

// ── LBI SHUTTLE ──────────────────────────────────────────────────────────────
// The LBI Shuttle runs the full 18-mile length of the island.
// Operated in coordination with Long Beach Township.
// ⚠️  Verify current season schedule and fare at: https://www.longbeachtownship.com/lbi-shuttle/
// ⚠️  Check for GTFS feed availability before building live route display.

export const shuttleInfo = {
  name: 'LBI Shuttle',
  description: 'Trolley-style service running all 18 miles of Long Beach Island. ' +
               'Designated stops throughout the island — can also wave down the trolley.',
  operatedBy: 'Long Beach Township (in coordination with island municipalities)',
  coverageNotes: 'Covers from Barnegat Light (north) to Beach Haven (south)',
  moreInfo: 'https://www.longbeachtownship.com/lbi-shuttle/',
  barnegatlightInfo: 'https://barnegatlight.org/lbi-shuttle/',
  // ⚠️ The following are placeholders — verify actual 2026 schedule before publishing
  verificationNeeded: true,
  verificationNote: 'The LBI Shuttle page at barnegatlight.org returned no content in May 2026. ' +
                    'Verify schedule, stops, fare, and hours at longbeachtownship.com/lbi-shuttle/ before launch.',
}

// ⚠️ Route data below is placeholder — replace with real 2026 schedule once verified
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
    freq: '⚠️ Verify for 2026',
    firstRun: '⚠️ Verify',
    lastRun: '⚠️ Verify',
    fare: '⚠️ Verify at longbeachtownship.com/lbi-shuttle/',
    season: 'Memorial Day weekend through Labor Day (⚠️ verify exact dates)',
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
    overview: 'Street parking throughout borough. State park lot at Barnegat Lighthouse State Park (fee).',
    parkingStreets: ['Street parking island-wide'],
    hcParkingStreets: ['Barnegat Lighthouse State Park — accessible HC spaces'],
    notes: 'State park lot is largest in borough. ⚠️ Verify state park parking fees each spring.',
    cost: 'Street parking free; State Park lot may have fee',
    sourceUrl: 'https://barnegatlight.org/',
    verified: false,
  },
  {
    townSlug: 'harvey-cedars',
    town: 'Harvey Cedars',
    overview: '⚠️ Verify parking details at harveycedars.org',
    parkingStreets: ['Street parking'],
    hcParkingStreets: [],
    notes: '⚠️ No detailed parking page found on harveycedars.org — needs field research.',
    cost: '⚠️ Verify',
    sourceUrl: 'https://www.harveycedars.org/',
    verified: false,
  },
  {
    townSlug: 'surf-city',
    town: 'Surf City',
    overview: '⚠️ Verify parking details at surfcitynj.org',
    parkingStreets: ['Street parking'],
    hcParkingStreets: [],
    notes: '⚠️ Needs field research.',
    cost: '⚠️ Verify',
    sourceUrl: 'https://surfcitynj.org/',
    verified: false,
  },
  {
    townSlug: 'ship-bottom',
    town: 'Ship Bottom',
    overview: '⚠️ Verify parking details at shipbottom.org',
    parkingStreets: ['Street parking'],
    hcParkingStreets: [],
    notes: '⚠️ Needs field research.',
    cost: '⚠️ Verify',
    sourceUrl: 'https://shipbottom.org/',
    verified: false,
  },
  {
    townSlug: 'long-beach-township',
    town: 'Long Beach Township',
    overview: '⚠️ Verify parking details at longbeachtownship.com',
    parkingStreets: ['Street parking throughout'],
    hcParkingStreets: [],
    notes: 'Township covers a large area. Parking details likely vary by neighborhood. ⚠️ Needs field research per community.',
    cost: '⚠️ Verify',
    sourceUrl: 'https://www.longbeachtownship.com/',
    verified: false,
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
    notes: '⚠️ Full island bike path/route map needs research — check each town and LBI Chamber.',
    chamberUrl: 'https://welcometolbi.com',
  },
}
