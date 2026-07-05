// ─────────────────────────────────────────────────────────────────────────────
// TOWN GUIDES — SEO-optimized long-form content for each LBI town.
// Each town has its own route (e.g. /beach-haven). Factual references
// (restaurants, businesses, attractions) are cross-checked against
// businesses.ts and corrected where the original draft was wrong.
// ─────────────────────────────────────────────────────────────────────────────

export type TownSection = {
  title: string
  body: string
  bullets?: string[]
}

// A named section/neighborhood within a municipality. Boundaries on LBI are
// described by relative position (which sections it sits between) rather than
// exact street numbers — precise street cutoffs are not publicly documented,
// so we deliberately avoid inventing them.
export type Neighborhood = {
  name: string
  position: string
  blurb: string
}

export type TownGuide = {
  slug: string
  name: string
  shortName: string
  h1: string
  eyebrow: string
  metaTitle: string
  metaDescription: string
  intro: string
  sections: TownSection[]
  neighborhoods?: Neighborhood[]
  faqs?: { q: string; a: string }[]
  bestFor: string
  related: { slug: string; name: string }[]
}

export const townGuides: TownGuide[] = [
  // ── BEACH HAVEN ────────────────────────────────────────────────────────────
  {
    slug: 'beach-haven',
    name: 'Beach Haven',
    shortName: 'Beach Haven',
    h1: 'Beach Haven, NJ — The Heart of Long Beach Island',
    eyebrow: 'Beach Haven · South End · LBI',
    metaTitle: 'Beach Haven NJ Guide: Beaches, Parking, Restaurants & Things to Do',
    metaDescription: "Your complete guide to Beach Haven on Long Beach Island — beach badges, parking tips, top restaurants, Fantasy Island, and family-friendly attractions.",
    intro:
      "Beach Haven is the busiest, most walkable town on Long Beach Island and the south end's main destination for families, foodies, and anyone who wants a little nightlife with their beach day. If it's your first trip to LBI, Beach Haven is usually where you want to be — it's the closest thing the island has to a downtown, and almost every classic LBI experience is within a few blocks of the ocean.",
    sections: [
      {
        title: 'Beaches in Beach Haven',
        body:
          "Beach Haven runs from 12th Street south to Nelson Avenue, with public beach access at almost every numbered street and named avenue along the way. The beaches here are wide, lifeguarded in season, and tend to be the most populated on the island — expect a lively crowd in July and August. Beach badges are required from mid-June through Labor Day, sold daily, weekly, and seasonal. Badges are NOT required on Wednesdays. Buy online in advance through the Borough of Beach Haven for the best price.",
      },
      {
        title: 'Parking in Beach Haven',
        body:
          "Public parking in Beach Haven is free — no meters — but the closest streets to the beach fill by 10 AM in peak season. Free street parking is available a few blocks inland. Plan to arrive early or use the LBI Shuttle. No vehicle (including trailers) may park in a Borough lot for more than 48 hours within a 7-day period.",
      },
      {
        title: 'Things to Do in Beach Haven',
        body: '',
        bullets: [
          "Fantasy Island Amusement Park — classic family rides, an arcade, and games open evenings in summer.",
          "Thundering Surf Waterpark — water slides, a lazy river, and adventure mini-golf next door.",
          "Bay Village & Schooner's Wharf — original LBI shopping districts with boutiques, ice cream, candy, and bayfront seafood.",
          "Surflight Theatre — professional summer-stock musicals; a long-running LBI tradition since 1950.",
          "Show Place Ice Cream Parlour — interactive theatrical ice cream parlour where servers sing.",
          "Parasailing, jet ski rentals, bay tours — book on the bayfront docks along Centre Street and West Avenue.",
        ],
      },
      {
        title: 'Beach Haven Public Dock & Wharf',
        body:
          "Beach Haven's bayfront is its second waterfront. The public docks and the historic Schooner's Wharf / Bay Village area sit along the bay on the west side of town, roughly around Centre Street and 9th Street, and this is where you'll find the bay tour boats, parasail and jet-ski operators, and small-boat access. Kids crab off the bulkheads with a chicken-neck and a drop line all summer, and it's the calmest place in town to watch the sun set over Barnegat Bay. There's no single grand \"wharf\" building — it's a walkable district of bayfront shops, docks, and eateries rather than one pier.",
      },
      {
        title: 'Parks in Beach Haven',
        body:
          "Beach Haven packs a lot of public space into a small borough. Veterans Bicentennial Park (Bicentennial Park) on the bayfront hosts summer events and gives you open lawn and bay views; the borough also maintains a boat ramp, pickleball and tennis courts, playgrounds, and a public library. Green bike-lane striping runs through town, so a beach cruiser is the easiest way to move between the ocean beaches, the bayfront parks, and the food.",
      },
      {
        title: 'Where to Eat in Beach Haven',
        body:
          "Beach Haven has the densest restaurant scene on LBI. Classic picks include Black Whale Bar & Fish House for bayfront drinks, The Gables Historic Inn for fine dining in a Victorian setting, Buckalew's for casual pub fare, The Chicken or the Egg (CHEGG) for famous late-night breakfast, Parker's Garage & Oyster Saloon for elevated seafood, Stefano's for BYOB Italian, and Country Kettle Chowda for award-winning clam chowder in Bay Village. Reservations are essential on summer weekends.",
      },
      {
        title: 'Landmarks & the "Beach Haven boardwalk"',
        body:
          "First-timers often search for the \"Beach Haven boardwalk\" — but LBI famously has no traditional oceanfront boardwalk like Seaside or Wildwood. The closest thing is the walkable bayfront at Schooner's Wharf and Bay Village, where a plank walkway threads between shops and the docks. On the ocean side you simply walk on and off the sand at the numbered-street access points. The town's signature landmark is The Gables, a restored 1892 Victorian inn and restaurant on Centre Street, and the whole historic district around it is a National Register neighborhood worth a stroll.",
      },
      {
        title: 'Beach Haven Inlet & the Holgate boundary',
        body:
          "Beach Haven borough ends at Nelson Avenue on its south side. Everything below that — the long, narrow peninsula running down to Beach Haven Inlet and the Edwin B. Forsythe National Wildlife Refuge at the island's very tip — is Holgate, which is part of Long Beach Township, not Beach Haven borough. The refuge end is closed April 1 through August 31 for piping plover nesting. So when a map or listing says \"Beach Haven Inlet,\" it's pointing at the southern tip past Holgate, a short drive south of downtown Beach Haven.",
      },
      {
        title: 'Beach Haven vs. the "Beach Haven" sections',
        body:
          "One quirk that trips up first-time visitors: Beach Haven borough is its own municipality, but several nearby sections — Beach Haven Terrace, Beach Haven Park, Beach Haven Crest, Beach Haven Gardens, and North Beach Haven — are actually part of Long Beach Township, not Beach Haven borough. They sit north of the borough along the central island. If your rental address is one of those, you'll buy Long Beach Township beach badges, not Beach Haven ones.",
      },
    ],
    faqs: [
      {
        q: 'Does Beach Haven have a boardwalk?',
        a: "Not a traditional oceanfront boardwalk — LBI doesn't have one like Seaside or Wildwood. The closest thing in Beach Haven is the walkable bayfront plank walkway at Schooner's Wharf and Bay Village, lined with shops and docks. Ocean beaches are reached directly from the numbered-street access points.",
      },
      {
        q: 'Where can I park in Beach Haven?',
        a: 'Public parking in Beach Haven is free with no meters, but the streets closest to the beach fill by 10 AM in peak season. Free street parking is available a few blocks inland, and the LBI Shuttle can save you the hunt. No vehicle may stay in a Borough lot more than 48 hours within any 7-day period.',
      },
      {
        q: 'Is there a water park in Beach Haven?',
        a: 'Yes. Thundering Surf Waterpark has water slides and a lazy river, with adventure mini-golf next door, and Fantasy Island Amusement Park is right beside it — the two together are the center of family activity in Beach Haven.',
      },
      {
        q: 'Where is the Beach Haven public dock?',
        a: "The public docks sit on the bay side of town around the Schooner's Wharf and Bay Village area, near Centre Street and 9th Street. It's where the bay tour boats, parasail and jet-ski operators launch, and a popular spot for crabbing off the bulkheads and watching the sunset over Barnegat Bay.",
      },
    ],
    bestFor: "Families with kids, first-time LBI visitors, groups who want walkable food and nightlife, and anyone who values activity over solitude.",
    related: [
      { slug: 'long-beach-township', name: 'Long Beach Township' },
      { slug: 'ship-bottom', name: 'Ship Bottom' },
    ],
  },

  // ── SHIP BOTTOM ────────────────────────────────────────────────────────────
  {
    slug: 'ship-bottom',
    name: 'Ship Bottom',
    shortName: 'Ship Bottom',
    h1: 'Ship Bottom, NJ — The Gateway to LBI',
    eyebrow: 'Ship Bottom · Central · LBI',
    metaTitle: 'Ship Bottom NJ Guide: Gateway to LBI — Beaches, Shopping & Dining',
    metaDescription: 'Ship Bottom is the gateway to Long Beach Island. Find beach access, parking, Ron Jon Surf Shop, restaurants, and family attractions in this complete guide.',
    intro:
      "Ship Bottom is the first town you hit when you cross the Causeway Bridge onto Long Beach Island, which is why it's nicknamed the \"Gateway to LBI.\" It's central, easy to get around, and home to some of the island's most recognized shops and restaurants. If you want to be within a short drive of both ends of the island, Ship Bottom is the smartest base.",
    sections: [
      {
        title: 'Beaches in Ship Bottom',
        body:
          "Ship Bottom's beaches run from 4th Street north to 30th Street, with lifeguarded access at most numbered streets in summer. The beaches are wide, clean, and slightly less crowded than Beach Haven's because there's less foot traffic from a downtown core. Beach badges are required Memorial Day through Labor Day and can be purchased at the borough hall or online through the Borough of Ship Bottom.",
      },
      {
        title: 'Parking in Ship Bottom',
        body:
          "Parking is generally easier in Ship Bottom than in Beach Haven. Free street parking is available on most side streets, though the blocks closest to the ocean fill up by mid-morning. There are also metered spaces along Long Beach Boulevard near the shopping district. Be mindful of resident-only zones in the height of summer.",
      },
      {
        title: 'Things to Do in Ship Bottom',
        body: '',
        bullets: [
          "Ron Jon Surf Shop — the iconic LBI surf shop on the boulevard, open since 1961.",
          "Hartland Golf and Arcade — a family classic; voted #1 mini golf on LBI.",
          "Causeway shopping district — surf shops, boutiques, and beachwear stores.",
          "Robert W. Nissen Park — bayside boat ramp, playground, boardwalk, summer concerts.",
          "Bayfront fishing & paddleboarding — quick access from the western side of the boulevard.",
        ],
      },
      {
        title: 'Where to Eat in Ship Bottom',
        body:
          "Ship Bottom punches above its weight on food. Ship Bottom Shellfish for raw bar and lobster rolls, Raimondo's for classic red-sauce Italian (BYOB), Dune 18 for upscale-casual dining, Speakeasy Pizzeria for some of the best pizza on the island, Bageleddi's for chewy bagels (50+ years), Country Kettle Fudge for the obligatory LBI sweet stop, and The Local Market & Kitchen for specialty coffee and grab-and-go.",
      },
    ],
    bestFor: "Day-trippers, central-island lovers, surfers, and families who want quick access to the boulevard's shopping and food without Beach Haven's crowds.",
    related: [
      { slug: 'surf-city', name: 'Surf City' },
      { slug: 'beach-haven', name: 'Beach Haven' },
    ],
  },

  // ── SURF CITY ──────────────────────────────────────────────────────────────
  {
    slug: 'surf-city',
    name: 'Surf City',
    shortName: 'Surf City',
    h1: "Surf City, NJ — LBI's Central Hub",
    eyebrow: 'Surf City · Central · LBI',
    metaTitle: 'Surf City NJ Guide: Beaches, Restaurants & The LBI Boulevard',
    metaDescription: "Surf City is LBI's bustling middle hub. Discover beaches, parking, top restaurants, and what makes this central Long Beach Island town a vacation favorite.",
    intro:
      "Surf City sits in the geographic middle of Long Beach Island and was, in fact, the island's first true resort town — settled by whalers in the 1600s and one of the earliest stops for summer travelers in the 1800s. Today it's a busy, family-oriented stretch of Long Beach Boulevard packed with shops, ice cream stands, and some of the best casual restaurants on the island.",
    sections: [
      {
        title: 'Beaches in Surf City',
        body:
          "Surf City's beaches run from Division Street north to 25th Street. They're known for being clean, well-maintained, and slightly less crowded than Beach Haven's. The dunes here are protected and tall, giving the beach a more natural feel. Beach badges are required in season and can be bought through the Borough of Surf City — daily and weekly options are easy to find at the borough hall.",
      },
      {
        title: 'Parking in Surf City',
        body:
          "Surf City offers mostly free street parking on residential side streets, with two-hour limits posted in some areas near the boulevard. Arrive before 10 AM in peak season for spots closest to the beach. The LBI Shuttle stops in Surf City and can save you the parking hunt entirely.",
      },
      {
        title: 'Things to Do in Surf City',
        body: '',
        bullets: [
          "Long Beach Boulevard shopping — Surf City's main strip is one of LBI's best for walking, browsing, and grabbing a bite.",
          "Surf City 5 & 10 — a classic dime-store experience that's been an LBI institution for decades.",
          "How You Brewin' — local coffee roaster and meeting spot.",
          "Surf City Yacht Club — sailing races and regattas you can watch from the bay.",
          "Zachariae Recreational Area — municipal park with playground, tennis, pickleball, and basketball courts.",
        ],
      },
      {
        title: 'Where to Eat in Surf City',
        body:
          "Scojo's is the casual local favorite for breakfast and lunch. Wally's is the family-owned diner-style spot serving breakfast, lunch, and dinner daily for 50+ years. Surf City Hotel is the longstanding bar-and-grill anchor of the boulevard with a Clam Bar and Sushi Bar. Joey's Pizza & Pasta and Surf City Pizza are the family pizza go-tos. Country Kettle Fudge's sister shop Country Kettle Chowda is in Beach Haven, but The Big Dipper has been serving Richman's hand-dipped ice cream since 1970. Panzone's Pizza is a Jersey Shore staple — same family since 1980.",
      },
    ],
    bestFor: "Visitors who want a central island location, families who like walkable downtowns, and anyone who prefers a relaxed pace over Beach Haven's full-throttle energy.",
    related: [
      { slug: 'ship-bottom', name: 'Ship Bottom' },
      { slug: 'harvey-cedars', name: 'Harvey Cedars' },
    ],
  },

  // ── HARVEY CEDARS ──────────────────────────────────────────────────────────
  {
    slug: 'harvey-cedars',
    name: 'Harvey Cedars',
    shortName: 'Harvey Cedars',
    h1: "Harvey Cedars, NJ — LBI's Quiet Northern Escape",
    eyebrow: 'Harvey Cedars · North · LBI',
    metaTitle: 'Harvey Cedars NJ Guide: Quiet Beaches & Sunset Park on LBI',
    metaDescription: "Harvey Cedars is Long Beach Island's tranquil northern escape. Find beach access, Sunset Park, dining, and a quieter alternative to LBI's busy southern towns.",
    intro:
      "Harvey Cedars is one of the narrowest and most peaceful stretches of Long Beach Island. At its narrowest point you can see both the ocean and Barnegat Bay from the same block. If your idea of a beach vacation involves fewer crowds, wider open dunes, and sunsets that stop you in your tracks, this is your town.",
    sections: [
      {
        title: 'Beaches in Harvey Cedars',
        body:
          "Harvey Cedars' beaches are well-protected, well-maintained, and noticeably less crowded than the southern towns. The dunes are some of the largest on the island, the result of major beach replenishment over the past decade. Beach badges are required Memorial Day through Labor Day, sold through the Borough of Harvey Cedars.",
      },
      {
        title: 'Parking in Harvey Cedars',
        body:
          "Most parking in Harvey Cedars is free street parking on side streets. There are no meters. Spots near the beach fill up by late morning on summer weekends but are generally easier to find than in Beach Haven or Ship Bottom.",
      },
      {
        title: 'Things to Do in Harvey Cedars',
        body: '',
        bullets: [
          "Sunset Park — the best spot on the island to watch the sun set over Barnegat Bay; free weekly summer concerts on Wednesday evenings.",
          "Harvey Cedars Bible Conference — a long-running Christian retreat and conference center that brings visitors year-round.",
          "Bayfront paddleboarding & kayaking — the bay side here is calm and shallow, ideal for beginners.",
          "Annual Harvey Cedars Arts Festival at Sunset Park — local artisans and food vendors.",
          "Harvey Cedars Ice Cream Parlour — one of the oldest businesses on LBI, established in the 1920s.",
        ],
      },
      {
        title: 'Where to Eat in Harvey Cedars',
        body:
          "Black-Eyed Susans is the chef-driven anchor — seasonal BYOB menu, intimate setting, consistently top-rated by locals. Azzurri Italian Cucina is the contemporary BYOB spot for handmade pastas and wood-fired pizza. Harvey Cedars Shellfish Co. is the classic no-frills raw bar that opens at 4 PM with picnic tables. Neptune Market is the mid-island go-to for a quick deli lunch. Most Harvey Cedars dining happens in a small walkable cluster, which makes it easy to wander.",
      },
    ],
    bestFor: "Couples, retirees, families with younger kids, and anyone prioritizing quiet, sunsets, and lower-key beach days over nightlife.",
    related: [
      { slug: 'barnegat-light', name: 'Barnegat Light' },
      { slug: 'surf-city', name: 'Surf City' },
    ],
  },

  // ── BARNEGAT LIGHT ─────────────────────────────────────────────────────────
  {
    slug: 'barnegat-light',
    name: 'Barnegat Light',
    shortName: 'Barnegat Light',
    h1: "Barnegat Light, NJ — LBI's Northern Tip",
    eyebrow: 'Barnegat Light · North Tip · LBI',
    metaTitle: 'Barnegat Light NJ Guide: Lighthouse, Viking Village & Quiet Beaches',
    metaDescription: "Barnegat Light sits at LBI's northern tip — home to Old Barney lighthouse, Viking Village fishing port, and the island's widest, quietest beaches.",
    intro:
      "Barnegat Light is the small, scenic town at the very northern tip of Long Beach Island. It's anchored by \"Old Barney\" — the 172-foot lighthouse that's the island's most recognizable landmark — and by Viking Village, LBI's working commercial fishing port. The beaches here are the widest on the island, the pace is the slowest, and the seafood is the freshest you'll find.",
    sections: [
      {
        title: 'Barnegat Lighthouse (Old Barney)',
        body:
          "\"Old Barney\" is the 172-foot red-and-white lighthouse at the northern tip of LBI and the island's most recognizable landmark. First lit in 1859 and designed by George Meade (later the Union general at Gettysburg), it guided ships past the treacherous Barnegat Inlet shoals for nearly a century. Today it's the centerpiece of Barnegat Lighthouse State Park: you can climb all 217 steps to the watch gallery for a sweeping view of the inlet, the bay, and the Atlantic. The park also has a short interpretive trail through one of the last bits of maritime forest on the island, plus inlet-front benches that are a favorite for sunrise. There's a modest admission to climb; the grounds are free. Arrive early on summer weekends — the lot fills by mid-morning.",
      },
      {
        title: 'Beaches in Barnegat Light',
        body:
          "Barnegat Light's beaches are notably wide thanks to natural sand accretion at the inlet. The northern end opens into Barnegat Lighthouse State Park, where the beach meets the inlet jetty — a favorite for fishermen and sunrise walkers. Beach badges are required in season for the borough beaches; the state park beach has its own access rules. There's also a guarded Bay Beach at 25th Street & Bayview Ave., great for young children.",
      },
      {
        title: 'Parking in Barnegat Light',
        body:
          "Free street parking is common throughout Barnegat Light, with a paid lot at Barnegat Lighthouse State Park. Arrive early on summer weekends — the lighthouse lot fills by mid-morning.",
      },
      {
        title: 'Things to Do in Barnegat Light',
        body: '',
        bullets: [
          "Barnegat Lighthouse State Park — climb all 217 steps to the top of Old Barney for the best view on the island.",
          "Viking Village — working fishing docks, dockside seafood markets, art galleries, and weekly summer artisan markets.",
          "Beach Tram — runs the 4th–9th Street ocean beaches in season, free with a beach badge.",
          "Inlet jetty fishing — bluefish, fluke, and striped bass for surf casters in season.",
          "Bay Breeze Park — Monday evening free summer concerts.",
        ],
      },
      {
        title: 'Where to Eat in Barnegat Light',
        body:
          "Mustache Bill's Diner is a James Beard–recognized classic American diner — go early for breakfast. Kubel's is the legendary cash-only BYOB bar and restaurant, an LBI tradition since 1927 famous for crab cakes. Viking Fresh Off the Hook serves the freshest seafood on the island because the boats unload feet from the kitchen. Daymark Bar & Restaurant offers chic American fare in a casual coastal environment. Inlet Deli at the north tip is the spot for sandwiches.",
      },
      {
        title: 'High Bar Harbor',
        body:
          "Just west of Barnegat Light, reached by a single two-lane road, is High Bar Harbor — a secluded bayside lagoon community. Despite sharing Barnegat Light's gateway, it's technically part of Long Beach Township, not the borough. Nearly every home sits on the bay or a canal, making it one of the island's most boater-friendly enclaves.",
      },
    ],
    bestFor: "Travelers who want the quietest, most scenic corner of LBI. Fishermen. Sunrise people. Anyone willing to drive a little farther for fewer crowds.",
    related: [
      { slug: 'harvey-cedars', name: 'Harvey Cedars' },
      { slug: 'long-beach-township', name: 'Long Beach Township' },
    ],
  },

  // ── LONG BEACH TOWNSHIP ────────────────────────────────────────────────────
  {
    slug: 'long-beach-township',
    name: 'Long Beach Township',
    shortName: 'LBT',
    h1: "Long Beach Township, NJ — The Island's Patchwork",
    eyebrow: 'Long Beach Township · 7+ communities · LBI',
    metaTitle: 'Long Beach Township NJ Guide: Holgate, Brant Beach, Loveladies & More',
    metaDescription: 'Long Beach Township spans 18 miles of LBI and includes Holgate, Brant Beach, Loveladies, and North Beach. Find beaches, parking, and dining in each section.',
    intro:
      "Long Beach Township is the largest municipality on LBI, but it's unusual: it's not one contiguous town. Instead, it's a string of distinct communities stitched together up and down the island — Holgate at the southern tip, Brant Beach in the middle, Loveladies and North Beach on the northern end. Each section has its own personality, so where you stay in Long Beach Township really matters.",
    sections: [
      {
        title: 'Loveladies (North End)',
        body:
          "The most upscale section of LBI. Large modern homes, wide lots, and beaches that are nearly empty on weekdays. The Long Beach Island Foundation of the Arts & Sciences sits in Loveladies and hosts year-round classes, exhibits, and summer lectures. Few commercial businesses — by design.",
      },
      {
        title: 'North Beach (North-Central)',
        body:
          "A tiny, quiet residential strip between Harvey Cedars and Surf City. Almost entirely homes — no commercial district — which is the appeal. Renters here want a quiet beach week without the boulevard noise.",
      },
      {
        title: 'Brant Beach (Central)',
        body:
          "The largest section of Long Beach Township and a family rental favorite. Brant Beach has wide beaches, easy parking, and is home to Bayview Park — a popular bayside swimming area with a playground, basketball, volleyball, pickleball, a dedicated dog park, and free summer concerts. Daddy O's Restaurant & Hotel anchors the dining scene, with Blue Water Cafe a short hop south in Haven Beach. The bike path on Long Beach Boulevard runs the length of Brant Beach and is one of the best ways to get around.",
      },
      {
        title: 'Holgate (South End)',
        body:
          "The southernmost point of LBI, ending at the Edwin B. Forsythe National Wildlife Refuge. Quieter than Beach Haven, with wide, less-crowded beaches and access to the protected refuge for birding and shell-hunting (closed April 1 – August 31 for piping plover nesting). Bowker's South Beach Deli & Grill is the local favorite for breakfast, bagels, and cheesesteaks. Great for families who want Beach Haven's amenities a short drive away without being in the middle of them.",
      },
      {
        title: 'Beach Badges & Parking',
        body:
          "Long Beach Township operates a single beach badge that covers all of its sections — from Holgate to Loveladies. This is one of the best deals on LBI because a single badge unlocks the most beach access of any town. Buy through the Township of Long Beach. Parking varies by section but is generally free street parking; arrive early in peak season.",
      },
      {
        title: 'Where to Eat in Long Beach Township',
        body:
          "Howard's Seafood Restaurant in the Beach Haven Gardens section is an LBI institution since 1950, famous for the Original French Fried Lobster. Jersey Girl Grill is the casual mid-island American spot. The Beach House in Beach Haven Terrace serves seafood, steaks, and pasta. Bowker's in Holgate is the south-end staple. Bayview Park yacht club and Brant Beach Yacht Club host members-only dining; check schedules for summer events.",
      },
    ],
    neighborhoods: [
      {
        name: 'High Bar Harbor',
        position: 'Northwest bayside — reached by a single road off Barnegat Light',
        blurb:
          "A secluded lagoon community on the bay at the island's north end, connected to the rest of LBI by one two-lane road. Built around a network of canals in the 1950s, nearly every home is on the water — a quiet, exclusive boater's enclave.",
      },
      {
        name: 'Loveladies',
        position: 'North end — between Barnegat Light and Harvey Cedars',
        blurb:
          'The most upscale stretch of LBI: large, architect-designed homes on wide lots with beaches that are nearly empty on weekdays. Home to the LBI Foundation of the Arts & Sciences. Almost entirely residential by design.',
      },
      {
        name: 'North Beach',
        position: 'North-central — between Harvey Cedars and Surf City',
        blurb:
          'A tiny, quiet residential strip with no commercial district at all. The appeal is exactly that — a calm beach week away from the boulevard noise.',
      },
      {
        name: 'Brant Beach',
        position: 'Central — just south of Ship Bottom',
        blurb:
          "The largest section of Long Beach Township and a family-rental favorite. Wide beaches, easy parking, the Long Beach Boulevard bike path, and Bayview Park's bayside swimming, courts, dog park, and summer concerts.",
      },
      {
        name: 'Beach Haven Crest',
        position: 'Central — between Brant Beach and Brighton Beach',
        blurb:
          'A compact section of roughly ten blocks. Quiet and residential, with an easy walk or bike to central-island shops and food.',
      },
      {
        name: 'Brighton Beach',
        position: 'Central — between Beach Haven Crest and Peahala Park',
        blurb: 'A small residential pocket on the central island — mostly single-family rentals and second homes.',
      },
      {
        name: 'Peahala Park',
        position: 'Central — between Brighton Beach and Beach Haven Park',
        blurb: 'A quiet mid-island section of family homes, a short hop from the boulevard.',
      },
      {
        name: 'Beach Haven Park',
        position: 'Central-south — between Peahala Park and Haven Beach',
        blurb: 'A residential section of the township — part of Long Beach Township, not Beach Haven borough.',
      },
      {
        name: 'Haven Beach',
        position: 'Central-south — between Beach Haven Park and The Dunes',
        blurb: 'A small, low-key residential section on the ocean side of the central island.',
      },
      {
        name: 'The Dunes',
        position: 'Central-south — between Haven Beach and Beach Haven Terrace',
        blurb: 'A short, quiet residential stretch named for its protected dune line.',
      },
      {
        name: 'Beach Haven Terrace',
        position: 'South-central — between The Dunes and Beach Haven Gardens',
        blurb:
          'A walkable residential section with a handful of local shops and eateries along the boulevard. Long Beach Township, not Beach Haven borough.',
      },
      {
        name: 'Beach Haven Gardens',
        position: 'South-central — between Beach Haven Terrace and Spray Beach',
        blurb: 'A residential section of family homes a few blocks from the ocean.',
      },
      {
        name: 'Spray Beach',
        position: 'South — between Beach Haven Gardens and North Beach Haven',
        blurb: 'A quiet oceanside section long associated with the Spray Beach hotel and yacht club area.',
      },
      {
        name: 'North Beach Haven',
        position: 'South — between Spray Beach and Beach Haven borough',
        blurb:
          'The southernmost of the central-island township sections, bordering Beach Haven borough. Family homes within an easy walk of Beach Haven proper.',
      },
      {
        name: 'Holgate, Beach Haven Heights & Beach Haven Inlet',
        position: 'South tip — the peninsula south of Beach Haven borough',
        blurb:
          "The township's southern peninsula runs from Beach Haven borough down to the Edwin B. Forsythe National Wildlife Refuge at the island's tip. Wide, uncrowded beaches; the refuge end is closed April 1 – Aug 31 for piping plover nesting.",
      },
    ],
    bestFor: "Renters who want flexibility — you can choose your vibe by choosing your section. Holgate for quiet south-end, Brant Beach for family rentals, Loveladies for luxury and calm.",
    related: [
      { slug: 'beach-haven', name: 'Beach Haven' },
      { slug: 'barnegat-light', name: 'Barnegat Light' },
    ],
  },
]

export function findTownGuide(slug: string): TownGuide | undefined {
  return townGuides.find(t => t.slug === slug)
}
