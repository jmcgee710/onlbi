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

// A named section/neighborhood within a municipality. `position` gives both the
// relative placement and, for Long Beach Township sections, the Boulevard block
// range. Those block ranges come from src/data/boundaries.ts — reconstructed
// from the LBT Beach Patrol street directory and the Township's own marker
// posts. Claims that aren't settled are marked as such there rather than being
// stated flatly here; see /lbi-town-boundaries for the sourcing.
export type Neighborhood = {
  name: string
  position: string
  blurb: string
  /** Slug of a dedicated section guide page, when one exists (e.g. 'holgate'). */
  slug?: string
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
  /** Set when this guide covers a SECTION of a larger municipality (LBT).
   *  Badge/lifeguard/town-hall lookups fall through to the parent's data. */
  partOf?: { slug: string; name: string }
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
        title: 'Where Beach Haven begins — 12th Street',
        body:
          "The borough's northern line is 12th Street, and it's the best-documented boundary on the island: the borough defines its own beaches as running from 12th Street to Nelson Avenue, the Long Beach Township badge directory ends at 13th Street, and the \"Welcome to Historic Beach Haven — Queen City, 1874\" sign stands at the corner of 12th. An easy way to hold onto it: Panzone's sits at 1106 N Bay Ave — 11th Street and the Boulevard, which is named Bay Avenue through the borough — one block inside Beach Haven. At Panzone's you're in Beach Haven. Two blocks north at 13th you're in Long Beach Township. The mail says Beach Haven either way.",
      },
      {
        title: 'Beach Haven vs. the "Beach Haven" sections',
        body:
          "One quirk that trips up first-time visitors: Beach Haven borough is its own municipality, but several nearby sections — Beach Haven Terrace, Beach Haven Park, Beach Haven Crest, Beach Haven Gardens, and North Beach Haven — are actually part of Long Beach Township, not Beach Haven borough. They sit north of the borough along the central island, starting at 13th Street. If your rental address is one of those, you'll buy Long Beach Township beach badges, not Beach Haven ones.",
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
      {
        q: 'What is there to do in Beach Haven at night?',
        a: "More than anywhere else on LBI. Fantasy Island's rides and arcade run into the evening in summer, Surflight Theatre stages professional musicals, Show Place Ice Cream Parlour puts on its singing-server show, and the bar scene centers on Buckalew's and the bayfront restaurants around Schooner's Wharf.",
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
        title: 'Where Ship Bottom Begins and Ends',
        body:
          "Both of Ship Bottom's boundaries run down the middle of a street, which is unusual and catches people out. At the north end the line is the centerline of South 2nd Street — the north side is Surf City, the south side is Ship Bottom. That means all of South 3rd Street is Ship Bottom despite carrying a Surf City mailing address, which is why the borough describes its own beaches as starting at the southern end of 3rd Street. At the south end the same thing happens at 31st Street: Ship Bottom on the north side, Brant Beach in Long Beach Township on the south. Neighbors facing each other across either street live in different towns, pay different taxes, and need different beach badges.",
      },
      {
        title: 'Where to Eat in Ship Bottom',
        body:
          "Ship Bottom punches above its weight on food. Ship Bottom Shellfish for raw bar and lobster rolls, Raimondo's for classic red-sauce Italian (BYOB), Dune 18 for upscale-casual dining, Speakeasy Pizzeria for some of the best pizza on the island, Bageleddi's for chewy bagels (50+ years), Ship Bottom Ice Cream Co. for homemade ice cream and Italian ice, and The Local Market & Kitchen for specialty coffee and grab-and-go.",
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
        title: 'Division Avenue Is Not the Ship Bottom Line',
        body:
          "A persistent local myth says Surf City ends at Division Avenue. It doesn't. Division Avenue sits two blocks inside the borough, between North 1st and South 1st Street, and the name means what it says — it's where the borough's street numbering divides from North to South. The real boundary is two blocks further south, running down the centerline of South 2nd Street: only the north side of S 2nd is Surf City. Everything below that, including all of South 3rd Street, is Ship Bottom, even though the mail there still says Surf City. At the other end of town, North 25th is the last numbered street, though a named lane or two sits above it before the North Beach line near Sherwood Way.",
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
        title: 'Where Harvey Cedars Ends',
        body:
          "Harvey Cedars runs from around 86th Street in the north down through its county-named avenues — Middlesex, Atlantic, Hudson, Cape May, Cumberland, Bergen — to William, James and Troast at the south end. William Street is the last Harvey Cedars street; 124th Street, immediately south, is North Beach and therefore Long Beach Township. You can see the line from the car: two welcome signs stand at the same point on the Boulevard facing opposite directions, one for each town. The borough's south end runs through the 5200–5300 Boulevard blocks.",
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
      {
        title: 'Where Barnegat Light Ends',
        body:
          "The north end needs no explaining: the borough runs out of island at Barnegat Inlet, inside Barnegat Lighthouse State Park. The south end is the least settled boundary on LBI, and we would rather say so than guess. Barnegat Light's numbered grid runs 1st Street up to around 30th, with guarded beaches from 10th to 30th. South of that the next section is Loveladies, which belongs to Long Beach Township and doesn't use a street grid at all — it runs on tract numbers 1 to 176, counting down as you drive south, and its southernmost beach-badge entry is 87th Street. Two unrelated numbering systems meeting head-on means neither set of numbers locates the line, and there is no welcome sign pair here of the kind that marks the Harvey Cedars boundary. An Ocean County parcel record or a township tax map sheet would settle it; until one is pulled, we publish it as unresolved. What is certain is the practical part: once you are past the grid you are in Long Beach Township, on a township beach badge, and the ZIP changes from 08006 to 08008.",
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
        title: 'Where Long Beach Township Begins and Ends',
        body:
          "It begins and ends more than once. Long Beach Township is non-contiguous — five separate pieces wrapped around the five boroughs — so driving the island north to south you enter and leave it repeatedly: Loveladies, then North Beach, then the long middle run from Brant Beach down to North Beach Haven, then Holgate at the tip. Four of its lines are pinned. At 31st Street the township meets Ship Bottom along the centerline of the street rather than at either end of it, so the north side of 31st is Ship Bottom and the south side is Brant Beach — neighbors facing each other need different badges. At William Street the Harvey Cedars grid stops and 124th Street begins North Beach, marked by two welcome signs standing at the same point on the Boulevard facing opposite directions. At 12th Street North Beach Haven ends and Beach Haven borough begins, confirmed three ways over. At Nelson Avenue Beach Haven ends again and Holgate runs south to the wildlife refuge. Two lines are softer: the North Beach edge against Surf City sits somewhere between Sherwood Way and North 25th Street, and the Loveladies edge against Harvey Cedars is inferred from a badge list around 87th Street. The Barnegat Light line is not established at street level at all. Every one of these, with what the claim rests on, is laid out on the LBI town boundaries page.",
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
        position: 'Northwest bayside — named lagoon streets, reached by one road off Barnegat Light',
        blurb:
          "A secluded lagoon community on the bay at the island's north end, connected to the rest of LBI by one two-lane road. Built around a network of canals in the 1950s, nearly every home is on the water — a quiet, exclusive boater's enclave.",
      },
      {
        name: 'Loveladies',
        slug: 'loveladies',
        position: 'North end — between Barnegat Light and Harvey Cedars, tracts 1–176',
        blurb:
          'The most upscale stretch of LBI: large, architect-designed homes on wide lots with beaches that are nearly empty on weekdays. Home to the LBI Foundation of the Arts & Sciences. Almost entirely residential by design.',
      },
      {
        name: 'North Beach',
        slug: 'north-beach',
        position: 'North-central — Harvey Cedars to Surf City, Boulevard blocks 1006–1118',
        blurb:
          'A tiny, quiet residential strip with no commercial district at all. The appeal is exactly that — a calm beach week away from the boulevard noise.',
      },
      {
        name: 'Brant Beach',
        slug: 'brant-beach',
        position: 'Central — blocks 31–73, from 31st Street to Harrington Avenue',
        blurb:
          "The largest section of Long Beach Township and a family-rental favorite. Wide beaches, easy parking, the Long Beach Boulevard bike path, and Bayview Park's bayside swimming, courts, dog park, and summer concerts. It starts at 31st Street — a street split down the middle with Ship Bottom — and runs all the way to Harrington Avenue.",
      },
      {
        name: 'Beach Haven Crest',
        position: 'Central — blocks 74–80, Mea Avenue to Surf Avenue',
        blurb:
          'A compact section of seven blocks — Mea, Lavenia, Culver, Hobart, Jeanette, Winifred and Surf. Quiet and residential, with an easy walk or bike to central-island shops and food.',
      },
      {
        name: 'Brighton Beach',
        position: 'Central — blocks 81–86, Massachusetts Avenue to Pennsylvania Avenue',
        blurb: 'A small residential pocket on the central island — six state-named blocks of single-family rentals and second homes.',
      },
      {
        name: 'Peahala Park',
        position: 'Central — blocks 87–95, Delaware Avenue to Seabreeze Drive',
        blurb: 'A quiet mid-island section of family homes, a short hop from the boulevard. The Township marker post at Mermaid Lane prints its block number right on it: 88.',
      },
      {
        name: 'Beach Haven Park',
        position: 'Central-south — blocks 96–109, Herbert Avenue south',
        blurb: 'A residential section of the township — part of Long Beach Township, not Beach Haven borough, despite the name.',
      },
      {
        name: 'Haven Beach',
        position: 'Central-south — blocks 110–120, Virginia Avenue to Utah Avenue',
        blurb: 'A low-key residential section of state-named blocks, posted at both ends by Township marker posts — one at Virginia Avenue, one facing The Dunes across MacEvoy Lane.',
      },
      {
        name: 'The Dunes',
        position: 'Central-south — blocks 121–127, MacEvoy Lane to Dune Lane',
        blurb: 'A short, quiet residential stretch named for its protected dune line. It begins at MacEvoy Lane, where two Township marker posts stand on facing corners — Haven Beach ending, The Dunes beginning, both reading block 121.',
      },
      {
        name: 'Beach Haven Terrace',
        position: 'South-central — blocks 128–133, Ohio Avenue to Delaware Avenue',
        blurb:
          'A walkable residential section with a handful of local shops and eateries along the boulevard. Long Beach Township, not Beach Haven borough. Marker posts sit at both ends of it.',
      },
      {
        name: 'Beach Haven Gardens',
        position: 'South-central — 34th Street down to 27th Street',
        blurb: "A residential section of family homes a few blocks from the ocean. It begins exactly where the island's street numbering flips: the block north of it is Delaware Avenue (133), and the next street south is 34th, counting back down from there.",
      },
      {
        name: 'Spray Beach',
        position: 'South — 26th Street down to 22nd Street',
        blurb: 'A quiet oceanside section long associated with the Spray Beach hotel and yacht club area. Its Township marker post stands at 2613 Long Beach Boulevard.',
      },
      {
        name: 'North Beach Haven',
        position: 'South — 21st Street down to 13th Street',
        blurb:
          "The southernmost of the central-island township sections, bordering Beach Haven borough at 12th Street. Family homes within an easy walk of Beach Haven proper. Note the range: it starts at 21st, not the 33rd most sites claim — the Township's own marker post at 2101 Long Beach Boulevard settles it.",
      },
      {
        name: 'Holgate, Beach Haven Heights & Beach Haven Inlet',
        slug: 'holgate',
        position: 'South tip — from Nelson Avenue to the refuge, named avenues only',
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

  // ─────────────────────────────────────────────────────────────────────────
  // LONG BEACH TOWNSHIP SECTION GUIDES — dedicated pages for the sections
  // people actually search for. Each carries partOf so badge/lifeguard/town
  // data falls through to Long Beach Township. Block ranges and boundary
  // streets come from src/data/boundaries.ts and are surfaced in full on
  // /lbi-town-boundaries, where each claim carries its source and confidence.
  // ─────────────────────────────────────────────────────────────────────────

  // ── HOLGATE ────────────────────────────────────────────────────────────────
  {
    slug: 'holgate',
    name: 'Holgate',
    shortName: 'Holgate',
    h1: "Holgate, NJ — LBI's Wild Southern Tip",
    eyebrow: 'Holgate · Long Beach Twp. · South Tip',
    metaTitle: "Holgate NJ Guide — LBI's Quiet Southern Tip, Beaches & Wildlife Refuge",
    metaDescription:
      'Holgate is the southern tip of Long Beach Island — quiet, wide beaches, the Forsythe Wildlife Refuge, free and paid parking, LBT beach badges, and where to eat.',
    partOf: { slug: 'long-beach-township', name: 'Long Beach Township' },
    intro:
      "Holgate is the southernmost section of Long Beach Island — the quiet peninsula that begins where Beach Haven borough ends and runs down to Beach Haven Inlet at the island's tip. It's part of Long Beach Township, not Beach Haven, and it trades the south end's crowds for wide beaches, a slower pace, and a genuinely wild finish: the last two miles of the island are a national wildlife refuge.",
    sections: [
      {
        title: 'Where Holgate is (and what it is)',
        body:
          "Holgate starts at Nelson Avenue, the southern boundary of Beach Haven borough, and runs south to Beach Haven Inlet. Although most Holgate addresses read \"Beach Haven, NJ 08008,\" the section belongs to Long Beach Township — a distinction that matters for beach badges, parking rules, and municipal services. From downtown Beach Haven it's a five-minute drive south on Long Beach Boulevard, which makes Holgate popular with families who want Beach Haven's restaurants and amusements close by without staying in the middle of them.",
      },
      {
        title: 'Beaches in Holgate',
        body:
          "Holgate's ocean beaches are wide and noticeably less crowded than Beach Haven's, guarded in season at designated streets. Because Holgate is Long Beach Township, the LBT beach badge applies here — one badge covers every township section from Loveladies down to Holgate, one of the best-value badges on the island. The surf near the inlet can run stronger than mid-island; swim at guarded beaches.",
      },
      {
        title: 'Edwin B. Forsythe National Wildlife Refuge',
        body:
          "The southern end of Holgate is the Holgate Unit of the Edwin B. Forsythe National Wildlife Refuge — an undeveloped stretch of beach, dune, and tidal marsh running to Beach Haven Inlet. It's one of New Jersey's most important nesting grounds for piping plovers, so the refuge closes every year from April 1 through August 31. From September through March it reopens for birding, shell-hunting, and surf fishing, and walking to the island's very tip is one of the great off-season LBI experiences.",
      },
      {
        title: 'Parking in Holgate',
        body:
          "Street parking in Holgate is free, with Long Beach Township's seasonal side-of-street rules in effect (no parking on easterly/southerly sides 9am Wednesday through 9am Sunday, May 1 – September 30). At the southern end, near the refuge entrance, the township operates a pay lot — the easiest option for refuge walkers and surf fishermen in the open season.",
      },
      {
        title: 'Where to Eat in Holgate',
        body:
          "Holgate keeps it simple. Bowker's South Beach Deli & Grill is the local staple for breakfast sandwiches, bagels, and cheesesteaks. For everything else, downtown Beach Haven's restaurant row — the densest dining scene on LBI — is five minutes north.",
      },
    ],
    faqs: [
      {
        q: 'Is Holgate part of Beach Haven?',
        a: 'No. Holgate is a section of Long Beach Township, even though its mailing addresses say "Beach Haven, NJ 08008." Beach Haven borough ends at Nelson Avenue; everything south of that line is Holgate. That means Long Beach Township beach badges and parking rules apply, not Beach Haven\'s.',
      },
      {
        q: 'Can you walk to the southern tip of LBI at Holgate?',
        a: 'Yes, from September 1 through March 31, when the Holgate Unit of the Forsythe National Wildlife Refuge is open — the walk to Beach Haven Inlet crosses undeveloped refuge beach. The refuge is closed April 1 through August 31 to protect nesting piping plovers.',
      },
      {
        q: 'What beach badge do I need in Holgate?',
        a: "A Long Beach Township badge — Holgate is a township section, so the LBT badge applies, and the same badge also covers every other township section from Brant Beach up to Loveladies.",
      },
    ],
    bestFor:
      "Families who want Beach Haven's amenities a short drive away without the crowds, surf fishermen, birders, and anyone drawn to the quietest, wildest end of the island.",
    related: [
      { slug: 'long-beach-township', name: 'Long Beach Township' },
      { slug: 'beach-haven', name: 'Beach Haven' },
    ],
  },

  // ── LOVELADIES ─────────────────────────────────────────────────────────────
  {
    slug: 'loveladies',
    name: 'Loveladies',
    shortName: 'Loveladies',
    h1: "Loveladies, NJ — LBI's Most Exclusive Stretch",
    eyebrow: 'Loveladies · Long Beach Twp. · North End',
    // SNIPPET TEST (see the traffic notes in the boundaries reference): the old
    // pair sold atmosphere while the queries wanted facts — `loveladies nj zip
    // code` alone ranked at position 8.8 with zero clicks. This version leads
    // with the answerable ones and carries both "LBI" and "Long Beach Island",
    // since abbreviated queries convert ~3x worse when the page never uses the
    // literal string. Change the snippet and nothing else, then measure.
    metaTitle: 'Loveladies NJ (LBI) — Where It Is, ZIP Code & Beach Badges',
    metaDescription:
      "Loveladies is a section of Long Beach Township on the north end of Long Beach Island, between Barnegat Light and Harvey Cedars — ZIP 08008, LBT beach badges, quiet wide-lot beaches, and the LBI Foundation of the Arts & Sciences.",
    partOf: { slug: 'long-beach-township', name: 'Long Beach Township' },
    intro:
      "Loveladies is the most exclusive stretch of Long Beach Island — a section of Long Beach Township on the island's north end, between Barnegat Light and Harvey Cedars. It's known for large architect-designed homes on wide lots, beaches that stay quiet even in August, and an almost total absence of commercial development. That last part is by design, and it's exactly why people love it.",
    sections: [
      {
        title: 'Where Loveladies is',
        body:
          "Loveladies sits on the north end of LBI, south of Barnegat Light and — counterintuitively — north of Harvey Cedars. Many first-time visitors assume the townships run in neat blocks, but Long Beach Township is a patchwork: Loveladies is one of its northern pieces, wedged between two independent boroughs. It's about ten minutes from the Causeway, up Long Beach Boulevard.",
      },
      {
        title: 'Loveladies has no street grid',
        body:
          "Unlike most of the island, Loveladies isn't laid out on numbered streets. It runs on tract numbers — roughly 1 to 176 — plus a set of private lanes, and the numbers fall as you drive south. Holly Road sits near the top of the range; the southernmost tract in the Township's badge list is 87th Street, which is about where Harvey Cedars begins. That southern line is our best reading rather than a documented fact: the badge list only names streets with beach access, so the true edge could sit a little south of 87th on a street that never needed to appear. The Barnegat Light line to the north is genuinely unsettled — the borough's numbered grid and the Loveladies tract system are unrelated schemes, so neither set of numbers locates it.",
      },
      {
        title: 'Beaches in Loveladies',
        body:
          "Loveladies' beaches are among the quietest on the island — wide, backed by high dunes, and served by mostly private walkways with public access points along the boulevard. Long Beach Township badges apply here, and lifeguards cover designated beaches in season. On a weekday morning you can have a stretch of Atlantic practically to yourself.",
      },
      {
        title: 'The LBI Foundation of the Arts & Sciences',
        body:
          "The Long Beach Island Foundation of the Arts and Sciences — the island's cultural anchor — sits on the bay side of Loveladies. Founded in 1948, it runs year-round classes, exhibitions, lectures, and summer programs for kids, and its campus of studios and galleries is open to visitors. If Loveladies has a \"downtown,\" this is it.",
      },
      {
        title: 'Why is it called Loveladies?',
        body:
          "The name comes from Thomas Lovelady, a hunter from Waretown who kept a shack and shooting blinds on a small island in the bay here in the 1800s. When the U.S. Life-Saving Service opened Station #114 nearby in the 1870s, it took the name Lovelady's Island Station, and the name stuck to the surrounding shore. The area was briefly renamed Long Beach Park in the World War II era, but the old name won out — it's been officially Loveladies again since the 1950s.",
      },
      {
        title: 'Around Loveladies',
        body:
          "There are almost no businesses in Loveladies — no restaurant strip, no shops — and residents like it that way. For food and supplies, Barnegat Light's restaurants and Viking Village are a few minutes north, and Harvey Cedars' small dining cluster is just south. The bay side is calm and shallow, good for paddleboarding and kayaking.",
      },
    ],
    faqs: [
      {
        q: 'Why is it called Loveladies?',
        a: "It's named for Thomas Lovelady, a Waretown waterfowl hunter who kept a gunning shack on a small bay island here in the 1800s. The U.S. Life-Saving Station built nearby in the 1870s was named Lovelady's Island Station, and the name spread to the whole section.",
      },
      {
        q: 'Is Loveladies its own town?',
        a: 'No — Loveladies is a section of Long Beach Township, not an independent borough. It sits between Barnegat Light and Harvey Cedars on the north end of LBI, and Long Beach Township beach badges and rules apply.',
      },
      {
        q: 'What is the ZIP code for Loveladies, NJ?',
        a: 'Loveladies uses ZIP code 08008, the same as almost all of Long Beach Island. Only Barnegat Light has its own ZIP code, 08006. Mailing addresses in Loveladies are typically written as Long Beach Township or Loveladies, NJ 08008.',
      },
      {
        q: 'Are there restaurants or shops in Loveladies?',
        a: "Almost none — Loveladies is deliberately residential. The nearest dining is in Barnegat Light a few minutes north (Mustache Bill's, Kubel's, Viking Village) or Harvey Cedars just south (Black-Eyed Susans, Harvey Cedars Shellfish Co.).",
      },
    ],
    bestFor:
      'Travelers who want maximum quiet and privacy, architecture lovers, artists drawn to the LBI Foundation, and renters trading walkability for wide-open beaches.',
    related: [
      { slug: 'long-beach-township', name: 'Long Beach Township' },
      { slug: 'barnegat-light', name: 'Barnegat Light' },
      { slug: 'harvey-cedars', name: 'Harvey Cedars' },
    ],
  },

  // ── NORTH BEACH ────────────────────────────────────────────────────────────
  {
    slug: 'north-beach',
    name: 'North Beach',
    shortName: 'North Beach',
    h1: "North Beach, NJ — LBI's Quietest Residential Stretch",
    eyebrow: 'North Beach · Long Beach Twp. · North-Central',
    metaTitle: "North Beach NJ Guide — LBI's Quiet Residential Stretch",
    metaDescription:
      'North Beach is a small residential section of Long Beach Township between Harvey Cedars and Surf City — quiet beaches, no commercial strip, LBT beach badges.',
    partOf: { slug: 'long-beach-township', name: 'Long Beach Township' },
    intro:
      "North Beach is a short, entirely residential section of Long Beach Township tucked between Harvey Cedars and Surf City on the north-central stretch of Long Beach Island. There's no commercial district at all — no shops, no restaurants — and that's precisely its appeal: a calm beach week with the boulevard noise turned all the way down.",
    sections: [
      {
        title: 'Where North Beach is',
        body:
          "North Beach occupies a narrow run of the island between Harvey Cedars to the north and Surf City to the south. Like Loveladies and Holgate, it's a section of Long Beach Township rather than its own borough — one of the pieces of the township's patchwork woven between LBI's independent towns. Everything is a few minutes away: Surf City's shops and food to the south, Harvey Cedars' Sunset Park to the north.",
      },
      {
        title: 'Where North Beach starts and stops',
        body:
          "The northern line is William Street: William is the last Harvey Cedars street, and 124th Street, immediately south of it, is the first North Beach street. Two welcome signs stand at that same point on the Boulevard facing opposite directions, one placed by each town. At the southern end, North Beach gives way to Surf City just below Sherwood Way, around 1004 on the Boulevard, where the Surf City welcome sign sits. North Beach has no street grid of its own — Boulevard addresses run a 1000-series from roughly 1006 at the south end to 1118 at the north, and what you see signed on the ground is a mix of numbered streets like 124th and 118th and named lanes such as Barbay, Roxie, Bay Shore, Windward and Sherwood.",
      },
      {
        title: 'Beaches in North Beach',
        body:
          "The beaches here are quiet and uncrowded, used almost exclusively by the surrounding homes and their renters. Long Beach Township badges apply — the same badge that covers Brant Beach, Loveladies, and Holgate — and designated beaches are guarded in season. The dune line is tall and well-vegetated, so most access is by walkways at the street ends.",
      },
      {
        title: 'Staying in North Beach',
        body:
          "North Beach is a rental-house section: oceanside and bayside homes, many of them large, with nothing commercial in between. Renters here plan on driving or biking for everything — Surf City's boulevard strip is the closest stop for coffee, groceries, and dinner, and the island-long bike route along Long Beach Boulevard passes right through.",
      },
    ],
    faqs: [
      {
        q: 'Is North Beach a town?',
        a: "No — North Beach is a residential section of Long Beach Township, located between Harvey Cedars and Surf City. It has no municipal government of its own; Long Beach Township badges, parking rules, and services apply.",
      },
      {
        q: 'Where do you eat or shop near North Beach?',
        a: "North Beach itself has no businesses. Surf City, immediately south, has the closest restaurants, coffee, and groceries along Long Beach Boulevard; Harvey Cedars' dining cluster is just north.",
      },
    ],
    bestFor:
      'Renters who want the quietest possible beach week, families who prefer house-and-beach routines over boardwalk energy, and anyone happy to drive five minutes for dinner.',
    related: [
      { slug: 'long-beach-township', name: 'Long Beach Township' },
      { slug: 'harvey-cedars', name: 'Harvey Cedars' },
      { slug: 'surf-city', name: 'Surf City' },
    ],
  },

  // ── BRANT BEACH ────────────────────────────────────────────────────────────
  {
    slug: 'brant-beach',
    name: 'Brant Beach',
    shortName: 'Brant Beach',
    h1: 'Brant Beach, NJ — Family Base Camp on LBI',
    eyebrow: 'Brant Beach · Long Beach Twp. · Central',
    metaTitle: 'Brant Beach NJ Guide — Family Beaches & Bayview Park on LBI',
    metaDescription:
      "Brant Beach is Long Beach Township's largest section — wide family beaches, Bayview Park's bayside swimming and courts, the boulevard bike path, parking, and dining.",
    partOf: { slug: 'long-beach-township', name: 'Long Beach Township' },
    intro:
      "Brant Beach is the largest section of Long Beach Township and one of LBI's favorite family rental areas. It sits on the central island just south of Ship Bottom — close enough to the Causeway for easy arrivals, far enough south for a neighborhood feel — with wide ocean beaches on one side and Bayview Park's calm bayside swimming on the other.",
    sections: [
      {
        title: 'Where Brant Beach is',
        body:
          "Brant Beach begins just south of Ship Bottom and runs down the central island — the northern anchor of Long Beach Township's big central patchwork of sections. The township's municipal offices sit here on Long Beach Boulevard, which makes Brant Beach the township's de facto hub. It's a section of Long Beach Township, not an independent borough, so LBT badges and parking rules apply.",
      },
      {
        title: 'Beaches in Brant Beach',
        body:
          "Brant Beach's ocean beaches are wide, family-oriented, and guarded in season, with access at the numbered streets. The Long Beach Township badge applies — one badge covers every township section from Loveladies to Holgate, the broadest coverage of any badge on the island. Street parking near the beach is generally easier to find here than in Beach Haven or Ship Bottom.",
      },
      {
        title: 'Bayview Park',
        body:
          "Bayview Park, around 68th Street on the bay side, is Brant Beach's signature amenity and one of the best family spots on LBI: a guarded bayside swimming area with shallow, calm water for young kids, plus a playground, basketball, volleyball, pickleball, a dedicated dog park, and free summer concerts. The township also hosts summer events here — it's the kind of place a family can burn a whole non-beach afternoon.",
      },
      {
        title: 'Getting around Brant Beach',
        body:
          "The bike path along Long Beach Boulevard runs the length of Brant Beach and is one of the best ways to move around the central island — bike to Ship Bottom's shops and food in minutes, or cruise south through the township sections. The free LBI Shuttle also serves the boulevard in season.",
      },
      {
        title: 'Brant Beach block by block',
        body:
          "Brant Beach covers Boulevard blocks 31 through 73 — from 31st Street down to Harrington Avenue — which makes it by far the largest Long Beach Township section. Two things surprise people. First, it starts at 31st, not 32nd; 32nd is simply the first guarded beach stand. And 31st Street is a split street, with Ship Bottom on the north side and Brant Beach on the south. Second, it runs well past 68th Street, all the way to Harrington, where a Township marker post at 7299 Long Beach Boulevard marks the seam with Beach Haven Crest. South of 52nd the numbered streets give way to named avenues, but the block numbers keep running underneath — Mears is 53, Farragut is 61, Meade is 68, Harrington is 73.",
      },
      {
        title: 'Where to Eat in Brant Beach',
        body:
          "Daddy O's Restaurant & Hotel anchors Brant Beach dining with a modern bar-restaurant scene. Jersey Girl Grill covers casual American mid-island, and Blue Water Cafe is a short hop south in Haven Beach. For a bigger restaurant crawl, Ship Bottom's food strip is minutes north and Beach Haven's restaurant row is a ten-minute drive south.",
      },
    ],
    faqs: [
      {
        q: 'Is Brant Beach its own town?',
        a: 'No — Brant Beach is the largest section of Long Beach Township, on the central island just south of Ship Bottom. Long Beach Township badges, parking rules, and services apply, and the township municipal offices are located in Brant Beach.',
      },
      {
        q: 'What beach badge do I need in Brant Beach?',
        a: 'A Long Beach Township badge. It covers Brant Beach and every other township section — Loveladies, North Beach, the central sections, and Holgate — which makes it the broadest-coverage badge on LBI.',
      },
      {
        q: 'Does Brant Beach have a bay beach?',
        a: 'Yes — Bayview Park, around 68th Street on the bay side, has a guarded bayside swimming area with shallow, calm water, plus a playground, courts, a dog park, and free summer concerts.',
      },
    ],
    bestFor:
      'Families with young kids (calm bay swimming plus ocean beaches), renters who want a central location with easy parking, and anyone who plans to bike the island.',
    related: [
      { slug: 'long-beach-township', name: 'Long Beach Township' },
      { slug: 'ship-bottom', name: 'Ship Bottom' },
    ],
  },
]

export function findTownGuide(slug: string): TownGuide | undefined {
  return townGuides.find(t => t.slug === slug)
}
