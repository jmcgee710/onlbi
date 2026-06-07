// LBI Business Directory
// Source: welcometolbi.com (LBI Chamber of Commerce), lbilocals.com, direct business sites
// Last updated: May 2026

export type Business = {
  id: number
  name: string
  cat: BusinessCategory
  subcat: string
  town: string
  address?: string
  phone?: string
  web?: string
  note?: string
}

export type BusinessCategory =
  | 'Dining'
  | 'Shopping'
  | 'Water Sports & Rentals'
  | 'Entertainment'
  | 'Nightlife'
  | 'Lodging'
  | 'Services'

// ─────────────────────────────────────────────
// DINING
// ─────────────────────────────────────────────
export const dining: Business[] = [
  // Restaurants & Seafood
  {
    id: 101, name: "Kubel's", cat: 'Dining', subcat: 'Seafood',
    town: 'Barnegat Light', address: '1 Broadway, Barnegat Light, NJ 08006',
    phone: '(609) 494-8844', web: 'https://www.kubels.com',
    note: 'Cash only, BYOB, legendary crab cakes. An LBI tradition since 1927.',
  },
  {
    id: 102, name: 'Black Whale Bar & Fish House', cat: 'Dining', subcat: 'Bar & Grill',
    town: 'Beach Haven', address: '100 N Pennsylvania Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-0369', web: 'https://www.blackwhalebar.com',
    note: 'Best fish tacos on the island. Nautical-themed locals favorite.',
  },
  {
    id: 103, name: "Daddy O's Restaurant & Hotel", cat: 'Dining', subcat: 'Upscale',
    town: 'Brant Beach', address: '4401 Long Beach Blvd, Brant Beach, NJ 08008',
    phone: '(609) 494-1300', web: 'https://www.daddyohotel.com',
    note: 'Farm-to-table dining, amazing cocktails. Reservations highly recommended.',
  },
  {
    id: 104, name: 'The Chicken or the Egg (CHEGG)', cat: 'Dining', subcat: 'Breakfast',
    town: 'Beach Haven', address: '207 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-3695', web: 'https://www.cheggrestaurant.com',
    note: 'Best breakfast spot on the island. Get there early — waits are long in summer.',
  },
  {
    id: 105, name: "Buckalew's Restaurant & Bar", cat: 'Dining', subcat: 'Sports Bar',
    town: 'Beach Haven', address: '101 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-1065', web: 'https://www.buckalews.com',
    note: 'Great deck, lively atmosphere. Popular happy hour spot.',
  },
  {
    id: 106, name: 'Harvey Cedars Shellfish Co.', cat: 'Dining', subcat: 'Raw Bar',
    town: 'Harvey Cedars', address: '7904 Long Beach Blvd, Harvey Cedars, NJ 08008',
    phone: '(609) 494-7112', web: 'https://www.harveycedarsshellfish.com',
    note: 'Raw bar perfection. Picnic tables, no-frills, opens at 4 PM.',
  },
  {
    id: 107, name: "Stefano's", cat: 'Dining', subcat: 'Italian',
    town: 'Long Beach Township', address: '1814 Long Beach Blvd, North Beach Haven, NJ 08008',
    phone: '(609) 492-1100', web: 'https://stefanoslbi.com',
    note: 'BYOB Italian, reservations strongly advised. Consistently rated top on the island.',
  },
  {
    id: 108, name: "Scojo's", cat: 'Dining', subcat: 'Casual',
    town: 'Surf City', address: '307 N Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-8661', web: 'https://scojosnj.com',
    note: 'Great wraps and sandwiches. Casual lunch spot.',
  },
  {
    id: 109, name: "Roberto's Dolce Vita", cat: 'Dining', subcat: 'Seafood / Italian',
    town: 'Beach Haven Terrace', address: '12907 Long Beach Blvd, Beach Haven Terrace, NJ 08008',
    phone: '(609) 492-1001', web: 'https://robertoslbi.com',
    note: 'Italian seafood in a relaxed setting.',
  },
  {
    id: 110, name: 'Viking Fresh Off the Hook', cat: 'Dining', subcat: 'Seafood',
    town: 'Barnegat Light', address: '1905 Bayview Ave, Barnegat Light, NJ 08006',
    phone: '(609) 361-8900',
    note: 'Fresh seafood right at Viking Village docks.',
  },
  {
    id: 111, name: 'Tucker\'s Tavern', cat: 'Dining', subcat: 'Seafood / Bar',
    town: 'Beach Haven', address: '101 S West Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-2300', web: 'https://tuckerstavern-lbi.com',
    note: 'Local tavern with solid seafood and a friendly vibe.',
  },
  {
    id: 112, name: 'Jersey Girl Grill', cat: 'Dining', subcat: 'Casual',
    town: 'Long Beach Township', address: '11101 Long Beach Blvd, Long Beach Twp, NJ 08008',
    phone: '(609) 492-1313', web: 'https://jerseygirllbi.com',
    note: 'Casual American grill in the mid-island area.',
  },
  {
    id: 113, name: 'Dune 18', cat: 'Dining', subcat: 'Seafood / Restaurant',
    town: 'Ship Bottom', address: '1916 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-3354', web: 'https://dune18.com',
    note: 'Upscale-casual dining in Ship Bottom.',
  },
  {
    id: 114, name: "Panzone's Pizza", cat: 'Dining', subcat: 'Pizza',
    town: 'Surf City', address: '2117 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-1114', web: 'https://panzones.com',
    note: 'LBI institution since 1980. Pizza, pasta, wings, and award-winning clam chowder. Seasonal.',
  },
  {
    id: 115, name: 'Burger 25', cat: 'Dining', subcat: 'Burgers / Ice Cream',
    town: 'Ship Bottom', address: '1915 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 879-2525',
    note: 'Build-your-own burgers and hand-spun shakes.',
  },
  // Delis (eat-in spots stay in dining)
  {
    id: 121, name: 'Inlet Deli', cat: 'Dining', subcat: 'Deli',
    town: 'Barnegat Light', address: '33 W 4th St, Barnegat Light, NJ 08006',
    phone: '(609) 494-3049', web: 'https://inletdeli.com',
    note: 'Great sandwiches and deli staples. North-end spot near Old Barney.',
  },
  {
    id: 122, name: "Fratello's Market & Eatery", cat: 'Dining', subcat: 'Deli / Italian',
    town: 'Long Beach Township', address: '2613 Long Beach Blvd, Spray Beach, NJ 08008',
    phone: '(609) 661-7291', web: 'http://fratellosmarketlbi.com',
    note: 'Italian market feel with fresh prepared foods.',
  },
  {
    id: 124, name: 'Spice It Up', cat: 'Dining', subcat: 'Deli',
    town: 'Beach Haven', address: '830 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 207-9906', web: 'https://spiceituplbi.com',
    note: 'Gourmet deli in Bay Village with creative lunch options.',
  },
  // Coffee & Treats
  {
    id: 130, name: 'How You Brewin Coffee House', cat: 'Dining', subcat: 'Coffee',
    town: 'Surf City', address: '8 N Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-2003',
    note: 'Cozy local coffee shop. Also has a location in Barnegat Light.',
  },
  {
    id: 131, name: 'How You Brewin Coffee Bar', cat: 'Dining', subcat: 'Coffee',
    town: 'Barnegat Light', address: '14 W 19th St, Barnegat Light, NJ 08006',
    phone: '(609) 494-2003',
    note: 'North-end coffee bar at the top of the island.',
  },
  {
    id: 132, name: 'Beach Haven Coffee Roasters', cat: 'Dining', subcat: 'Coffee',
    town: 'Beach Haven', address: '325 9th Street, Beach Haven, NJ 08008',
    phone: '(609) 492-4500',
    note: 'Craft roasted coffee and light breakfast. Local favorite.',
  },
  {
    id: 133, name: "Poppy's Ice Cream Parlour", cat: 'Dining', subcat: 'Ice Cream',
    town: 'Barnegat Light', address: '607 Broadway, Barnegat Light, NJ 08006',
    phone: '(609) 361-2663',
    note: 'Classic ice cream parlour on the north end.',
  },
  {
    id: 134, name: 'Ship Bottom Ice Cream Co.', cat: 'Dining', subcat: 'Ice Cream',
    town: 'Ship Bottom', address: '1801 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 342-0892', web: 'https://shipbottomicecream.com',
    note: 'Homemade ice cream, Italian ice, milkshakes, and cakes.',
  },
  {
    id: 135, name: 'Skipper Dipper', cat: 'Dining', subcat: 'Ice Cream',
    town: 'Long Beach Township', address: '9305 Long Beach Blvd, Beach Haven Park, NJ 08008',
    phone: '(609) 494-3733', web: 'https://www.skipperdipper.com',
    note: 'LBI institution since 1978. Famous for their creative ice cream flavors.',
  },
  {
    id: 136, name: 'Country Kettle Fudge', cat: 'Dining', subcat: 'Candy / Fudge',
    town: 'Beach Haven', address: '830 N Bay Ave Suite 11, Beach Haven, NJ 08008',
    phone: '(609) 492-2800',
    note: 'Hand-crafted fudge and candy. A must-stop in Bay Village.',
  },
  // Italian & Upscale — Round 2 additions
  {
    id: 137, name: "Raimondo's", cat: 'Dining', subcat: 'Italian',
    town: 'Ship Bottom', address: '1101 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-5391', web: 'https://www.raimondoslbi.com',
    note: 'Classic red-sauce Italian in a fine dining setting. BYOB. Seasonal.',
  },
  {
    id: 138, name: 'Azzurri Italian Cucina', cat: 'Dining', subcat: 'Italian',
    town: 'Harvey Cedars', address: '8001 Long Beach Blvd, Harvey Cedars, NJ 08008',
    phone: '(609) 479-1014', web: 'https://azzurrilbi.com',
    note: 'Contemporary BYOB Italian — handmade pastas, wood-fired pizza, curated wines. Great for date nights.',
  },
  {
    id: 139, name: 'Isola Italian Trattoria', cat: 'Dining', subcat: 'Italian',
    town: 'Long Beach Township', address: '1901 Long Beach Blvd, North Beach Haven, NJ 08008',
    phone: '(609) 496-5321', web: 'https://isolalbi.com',
    note: 'PERMANENTLY CLOSED (confirmed 2026). Was an authentic Northern Italian BYOB in North Beach Haven.',
  },
  {
    id: 140, name: 'Daymark Bar & Restaurant', cat: 'Dining', subcat: 'Bar / American',
    town: 'Barnegat Light', address: '404 Broadway, Barnegat Light, NJ 08006',
    phone: '(609) 494-2100', web: 'http://daymarklbi.com',
    note: 'Chic American fare in a casual coastal environment with full bar. North-end gem.',
  },
  {
    id: 141, name: "Black-Eyed Susans", cat: 'Dining', subcat: 'Upscale / BYOB',
    town: 'Harvey Cedars', address: '7908 Long Beach Blvd, Harvey Cedars, NJ 08008',
    phone: '(609) 494-4990', web: 'http://www.blackeyedsusanslbi.com',
    note: 'Seasonal, chef-driven menu in an intimate BYOB setting. Highly rated by locals.',
  },
  {
    id: 142, name: "Baker's Porthole Cafe", cat: 'Dining', subcat: 'Casual / American',
    town: 'Ship Bottom', address: '1620 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-4242',
    note: 'Relaxed cafe with solid American eats in Ship Bottom.',
  },
  {
    id: 143, name: 'The Arlington', cat: 'Dining', subcat: 'Bar & Grill',
    town: 'Ship Bottom', address: '1302 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-8848', web: 'https://arlingtonlbi.com',
    note: 'Local bar and grill staple in Ship Bottom.',
  },
  {
    id: 144, name: "Uncle Will's Pancake House", cat: 'Dining', subcat: 'Breakfast',
    town: 'Beach Haven', address: '3 S Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-2514', web: 'https://www.unclewills.com',
    note: 'Beloved breakfast destination with eclectic pig-themed décor. Pancakes, omelets, and French toast.',
  },
  {
    id: 145, name: 'The Gables Historic Inn & Restaurant', cat: 'Dining', subcat: 'Upscale / Fine Dining',
    town: 'Beach Haven', address: '212 Centre St, Beach Haven, NJ 08008',
    phone: '(609) 492-3553', web: 'https://www.gableslbi.com',
    note: 'Victorian inn with acclaimed dining. 3-course prix-fixe menu. Romantic, old-world LBI charm.',
  },
  // Bagels & Breakfast — Round 3 additions
  {
    id: 147, name: "Bageleddi's", cat: 'Dining', subcat: 'Bagels / Breakfast',
    town: 'Ship Bottom', address: '1815 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-4761', web: 'https://www.bageleddis.com',
    note: 'Family-owned and operated for over 50 years. Softest, chewiest bagels on the island. Open 7 AM–12:30 PM daily.',
  },
  {
    id: 148, name: 'The Bagel Shack', cat: 'Dining', subcat: 'Bagels / Breakfast',
    town: 'Beach Haven', address: '306 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-5552', web: 'https://thebagelshacklbi.com',
    note: 'Open year-round. Famous pork roll, egg & cheese on a bagel. Unmissable hot-pink building in Beach Haven.',
  },
  {
    id: 149, name: 'Bagels & Beyond', cat: 'Dining', subcat: 'Bagels / Breakfast',
    town: 'Surf City', address: '1616 Long Beach Blvd, Surf City, NJ 08008',
    web: 'https://bagelsandbeyond.net',
    note: 'Multiple LBI locations. Must-stop for fresh bagels and breakfast sandwiches.',
  },
  {
    id: 201, name: 'Bagels & Beyond', cat: 'Dining', subcat: 'Bagels / Breakfast',
    town: 'Brant Beach', address: '4008 Long Beach Blvd, Brant Beach, NJ 08008',
    phone: '(609) 494-4400', web: 'https://bagelsandbeyond.net',
    note: 'Brant Beach location. Fresh bagels, breakfast sandwiches, and coffee.',
  },
  {
    id: 150, name: "Wally's", cat: 'Dining', subcat: 'Breakfast / American',
    town: 'Surf City', address: '712 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-1667', web: 'https://www.wallyslbi.com',
    note: 'Family-owned Surf City landmark for 50+ years. One of the few spots serving breakfast, lunch, and dinner daily. Gluten-free and vegan options.',
  },
  {
    id: 151, name: 'LBI Table', cat: 'Dining', subcat: 'Breakfast / Brunch',
    town: 'Ship Bottom', address: '502 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 207-6773', web: 'https://lbitable.com',
    note: 'Popular breakfast and brunch. Fresh, locally-sourced menu with seasonal specials.',
  },
  {
    id: 152, name: 'Dock & Claw Clam Bar', cat: 'Dining', subcat: 'Raw Bar / Seafood',
    town: 'Beach Haven', address: '506 Centre St, Beach Haven, NJ 08008',
    phone: '(609) 342-0863', web: 'https://dockandclaw.com',
    note: 'BYOB raw bar and seafood shack opened 2022. Clams, oysters, lobster rolls on the bay. Hidden gem with a great dock vibe.',
  },
  {
    id: 153, name: "Howard's Seafood Restaurant", cat: 'Dining', subcat: 'Seafood',
    town: 'Long Beach Township', address: '13500 Baltic Ave, Beach Haven Gardens, NJ 08008',
    phone: '(609) 492-2319', web: 'https://howardsrestaurant.com',
    note: 'LBI institution since 1950. Famous for the Original French Fried Lobster and award-winning chowder. A must-stop for seafood lovers.',
  },
  {
    id: 154, name: 'The Beach House', cat: 'Dining', subcat: 'Seafood / American',
    town: 'Beach Haven Terrace', address: '13015 Long Beach Blvd, Beach Haven Terrace, NJ 08008',
    phone: '(609) 492-1997', web: 'https://www.thebeachhouselbi.com',
    note: 'Full-service restaurant serving seafood, steaks, pastas, and more. Local favorite with a relaxed shore vibe.',
  },
  {
    id: 155, name: 'Baked on the Beach', cat: 'Dining', subcat: 'Bakery',
    town: 'Surf City', address: '2101 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 361-3200', web: 'https://www.bakedonlbi.com',
    note: 'Made-from-scratch baked goods — cakes, cookies, pastries, and coffee. Open seasonally.',
  },
  {
    id: 156, name: 'The Corner Bakery', cat: 'Dining', subcat: 'Bakery',
    town: 'Surf City', address: '1700 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 207-6300', web: 'https://www.cornerbakerylbi.com',
    note: 'Custom cakes, pastries, and coffee from Yellow Dog Roasters. Open Fri–Sun. A little gem tucked into Surf City.',
  },
  {
    id: 157, name: "Ferrara's Island Bakery", cat: 'Dining', subcat: 'Bakery',
    town: 'Ship Bottom', address: '2900 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-1919',
    note: 'Classic Italian bakery on LBI. Breads, pastries, and baked goods made fresh daily.',
  },
  {
    id: 158, name: 'Crust & Crumb Bakery', cat: 'Dining', subcat: 'Bakery',
    town: 'Beach Haven', address: '830 N Bay Ave, Beach Haven, NJ 08008',
    note: 'Family-run bakery in Bay Village since 1987. Fresh pastries, cakes, and baked treats. A Beach Haven staple for summer vacationers.',
  },
  {
    id: 159, name: "Parker's Garage & Oyster Saloon", cat: 'Dining', subcat: 'Seafood / Oyster Bar',
    town: 'Beach Haven', address: '116 Northwest Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-1066', web: 'https://www.parkersgaragelbi.com',
    note: "Tide Table Group. Elevated seafood, raw bar, and shared plates in a converted garage on the bay. Seasonal and BYOB.",
  },
  {
    id: 160, name: 'Mud City Crab House', cat: 'Dining', subcat: 'Crab House / Seafood',
    town: 'Manahawkin', address: '1185 E Bay Ave, Manahawkin, NJ 08050',
    phone: '(609) 713-0451', web: 'https://www.mudcitycrabhouse.com',
    note: "Tide Table Group. Mainland bayside — jumbo lump crab cakes, blue crabs, outdoor dining under string lights. Pre-LBI must-stop. Mud Shuttle runs to/from LBI.",
  },
  {
    id: 161, name: 'BLVD Pizza', cat: 'Dining', subcat: 'Pizza',
    town: 'Surf City', address: '1503 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-5623', web: 'https://www.blvdpizzalbi.com',
    note: 'Gourmet pies and slices on the LBI strip. Solid go-to for pizza on the island.',
  },
  {
    id: 162, name: 'The Boatyard', cat: 'Dining', subcat: 'Bar & Grill / Marina',
    town: 'Manahawkin', address: '2200 E Bay Ave, Stafford Township, NJ 08050',
    phone: '(609) 494-1371', web: 'https://theboatyardnj.com',
    note: 'Waterfront bar and grill just off the LBI causeway. Casual food, craft beer, boat rentals. Dog-friendly. Great pre- or post-island stop.',
  },
  {
    id: 163, name: 'Custard Hut & Pizza', cat: 'Dining', subcat: 'Ice Cream / Pizza',
    town: 'Brant Beach', address: '6403 Long Beach Blvd, Brant Beach, NJ 08008',
    phone: '(609) 361-0900',
    note: 'LBI summertime staple since the 1950s. Soft serve custard, sundaes, and pizza. Open late — midnight daily.',
  },
  {
    id: 164, name: 'Playa Bowls', cat: 'Dining', subcat: 'Açaí Bowls / Smoothies',
    town: 'Beach Haven', address: '610 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 467-5818', web: 'https://playabowls.com/location/beach-haven',
    note: 'Fresh açaí bowls, pitaya bowls, smoothies, and juices. Beach Haven location.',
  },
  {
    id: 165, name: 'Playa Bowls', cat: 'Dining', subcat: 'Açaí Bowls / Smoothies',
    town: 'Surf City', address: '518 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 342-1908', web: 'https://playabowls.com/location/surf-city',
    note: 'Fresh açaí bowls, pitaya bowls, smoothies, and juices. Surf City location.',
  },
  {
    id: 166, name: 'Ship Bottom Shellfish', cat: 'Dining', subcat: 'Seafood Market / Restaurant',
    town: 'Ship Bottom', address: '1721 S Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-0088', web: 'https://www.shipbottomshellfish.com',
    note: 'Tide Table Group. Family-owned seafood market, takeout, and sit-down restaurant. Fresh local shellfish, crab, and fish daily.',
  },
  {
    id: 167, name: 'The Old Causeway Steak & Oyster House', cat: 'Dining', subcat: 'Steak / Seafood',
    town: 'Manahawkin', address: '1201 E Bay Ave, Manahawkin, NJ 08050',
    phone: '(609) 488-1327', web: 'https://www.oldcauseway.com',
    note: 'Tide Table Group. Upscale steaks and oysters on the mainland bayside. Classic LBI pre-dinner destination. Free Mud Shuttle to/from the island.',
  },
  {
    id: 168, name: "Ellis' Chicken & Crab Cakes", cat: 'Dining', subcat: 'Casual / Seafood',
    town: 'Beach Haven', address: '208 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 342-1100', web: 'https://www.ellislbi.com',
    note: "Tide Table Group's newest spot. Parker's famous fried chicken meets Mud City's jumbo lump crab cakes. Thu–Sun 11:30 AM–9 PM.",
  },
  {
    id: 169, name: "Bird & Betty's", cat: 'Dining', subcat: 'Seafood / Pizza / Bar',
    town: 'Beach Haven', address: '529 Dock Rd, Beach Haven, NJ 08008',
    phone: '(609) 492-3000', web: 'https://www.birdandbettys.com',
    note: 'Tide Table Group. Waterfront spot on the bay with wood-fired pizza, fresh seafood, cocktails, and live music. Laid-back and fun.',
  },
  {
    id: 170, name: "Parker's Pearl Oyster Co-op", cat: 'Dining', subcat: 'Oyster Co-op',
    town: 'Beach Haven', address: '116 Northwest Ave, Beach Haven, NJ 08008',
    web: 'https://www.parkersgaragelbi.com/oyster-coop/',
    note: "Within Parker's Garage. House-farmed oysters — retail and raw bar counter. Part of Tide Table Group's ocean-friendly mission.",
  },
  // Round 4 additions — May 2026
  {
    id: 171, name: "Jack's NYC Bagels & Deli", cat: 'Dining', subcat: 'Bagels / Breakfast',
    town: 'Long Beach Township', address: '1211 Long Beach Blvd, North Beach Haven, NJ 08008',
    phone: '(609) 492-7114', web: 'https://jacksnycbagels.com',
    note: 'New York-style water bagels, breakfast sandwiches, and deli on LBI.',
  },
  {
    id: 172, name: "Dunkin'", cat: 'Dining', subcat: 'Coffee / Breakfast',
    town: 'Ship Bottom', address: '330 W 8th St, Ship Bottom, NJ 08008',
    web: 'https://www.dunkindonuts.com',
    note: "The island's only Dunkin' — coffee, donuts, and breakfast sandwiches. Near the Ship Bottom causeway.",
  },
  {
    id: 173, name: "Rita's Italian Ice", cat: 'Dining', subcat: 'Italian Ice / Custard',
    town: 'Surf City', address: '1801 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 207-6494', web: 'https://www.ritasice.com',
    note: 'Classic Jersey Shore Rita\'s — Italian ice, frozen custard, and Gelati. Seasonal.',
  },
  {
    id: 174, name: "Speakeasy Pizzeria & Restaurant", cat: 'Dining', subcat: 'Pizza / Italian',
    town: 'Ship Bottom', address: '1318 Long Beach Blvd, Ship Bottom, NJ 08008',
    web: 'https://speakeasypizzeria.com',
    note: 'Consistently rated one of LBI\'s best pizzerias. Full Italian menu, dine-in and takeout.',
  },
  {
    id: 175, name: "Panzone's Pizza", cat: 'Dining', subcat: 'Pizza',
    town: 'Beach Haven', address: '1106 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-5103', web: 'https://panzones.com',
    note: 'South-end LBI institution since 1980. Pizza, pasta, seafood, wings, and award-winning clam chowder.',
  },
  {
    id: 198, name: 'Bay Village Pizza', cat: 'Dining', subcat: 'Pizza',
    town: 'Beach Haven', address: '830 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-4484',
    note: 'Slice shop inside Bay Village — convenient stop between boutiques and the bay.',
  },
  {
    id: 199, name: 'Station 117', cat: 'Dining', subcat: 'Bar & Grill',
    town: 'Beach Haven', address: '117 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-0117', web: 'https://www.station117.com',
    note: 'Sister spot to Buckalew\'s on the same corner. Full bar and grill with a lively Beach Haven crowd.',
  },
  {
    id: 200, name: 'The Local Market & Kitchen', cat: 'Dining', subcat: 'Cafe / Market',
    town: 'Ship Bottom', address: '604 Central Ave, Ship Bottom, NJ 08008',
    phone: '(609) 342-0061', web: 'http://www.localmarketlbi.com',
    note: 'Specialty coffee, gourmet grab-and-go, baked goods, and prepared foods. Mon–Sat 7am–5pm, Sun 7am–4pm.',
  },
  {
    id: 197, name: 'Munchies', cat: 'Dining', subcat: 'Snacks / Casual',
    town: 'Surf City', address: '1409 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 661-7380',
    note: 'Italian hot dogs, cheesesteaks, breakfast sandwiches, burgers, and desserts. Wed–Sun daytime.',
  },
  // Round 5 — May 2026 sweep
  {
    id: 176, name: "Mustache Bill's Diner", cat: 'Dining', subcat: 'Diner / Breakfast',
    town: 'Barnegat Light', address: '704 Broadway, Barnegat Light, NJ 08006',
    phone: '(609) 494-0155', web: 'https://mustachebills.com',
    note: 'LBI legend since the 1950s — featured on Diners, Drive-Ins & Dives. Fri–Sun seasonal. Lines form early.',
  },
  {
    id: 177, name: 'Blue Water Cafe', cat: 'Dining', subcat: 'Seafood / BYOB',
    town: 'Long Beach Township', address: '11205 Long Beach Blvd, Haven Beach, NJ 08008',
    phone: '(609) 207-1300', web: 'https://bluewatercafelbi.com',
    note: 'BYOB seafood and American cuisine from the owners of Stefano\'s. Generous portions, loyal following.',
  },
  {
    id: 178, name: "Joey's Pizza & Pasta", cat: 'Dining', subcat: 'Pizza / Italian',
    town: 'Ship Bottom', address: '2201 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 361-5000', web: 'https://joeyspizzapasta.com',
    note: 'Popular Ship Bottom pizza and pasta. Dine-in and takeout.',
  },
  {
    id: 179, name: 'Surf City Pizza', cat: 'Dining', subcat: 'Pizza / Italian',
    town: 'Surf City', address: '1017 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 361-7500', web: 'https://surfcitypizza.com',
    note: 'Open year-round. Well-reviewed pizzeria and casual Italian in mid-island Surf City.',
  },
  {
    id: 180, name: 'La Bamba Mexican Kitchen', cat: 'Dining', subcat: 'Mexican',
    town: 'Brant Beach', address: '3200 Long Beach Blvd, Brant Beach, NJ 08008',
    phone: '(609) 342-1775', web: 'https://labambalbi.com',
    note: "LBI's go-to Mexican restaurant. Two island locations — loyal local following.",
  },
  {
    id: 181, name: 'La Bamba Mexican Kitchen', cat: 'Dining', subcat: 'Mexican',
    town: 'Beach Haven', address: '122 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 342-0815', web: 'https://labambalbi.com',
    note: 'Beach Haven location of the island\'s favorite Mexican kitchen. Participates in the annual Chowderfest.',
  },
  {
    id: 182, name: 'Crêperie de la Mer', cat: 'Dining', subcat: 'French Café / Crêpes',
    town: 'Beach Haven', address: '210 N Beach Ave, Beach Haven, NJ 08008',
    phone: '(609) 709-1119', web: 'https://creperiedelamerlbi.com',
    note: 'Charming French crêperie in the Beach Haven historic district. Authentic crêpes and pastries.',
  },
  {
    id: 183, name: 'Cool Beans Coffee', cat: 'Dining', subcat: 'Coffee',
    town: 'Beach Haven', address: '830 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-8090', web: 'https://coolbeanslbi.com',
    note: 'Beloved gourmet coffee shop in Bay Village since 1993. A Beach Haven morning staple.',
  },
  {
    id: 184, name: 'Country Kettle Chowda', cat: 'Dining', subcat: 'Seafood / Chowder',
    town: 'Beach Haven', address: '830 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-2858', web: 'https://countrykettlechowda.com',
    note: 'Award-winning clam chowder in Bay Village since the 1970s. A must-stop on any LBI chowder trail.',
  },
  {
    id: 185, name: 'Harvey Cedars Ice Cream Parlour', cat: 'Dining', subcat: 'Ice Cream',
    town: 'Harvey Cedars', address: '8007 Long Beach Blvd, Harvey Cedars, NJ 08008',
    phone: '(609) 361-6103', web: 'https://harveycedarsicecream.com',
    note: 'One of the oldest businesses on LBI — family ice cream parlour established in the 1920s.',
  },
  {
    id: 186, name: 'The Big Dipper', cat: 'Dining', subcat: 'Ice Cream',
    town: 'Surf City', address: '1501 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-4155', web: 'https://bigdipperlbi.com',
    note: "Serving Richman's hand-dipped ice cream since 1970. A multigenerational Surf City tradition.",
  },
  {
    id: 187, name: 'Show Place Ice Cream Parlour', cat: 'Dining', subcat: 'Ice Cream / Theater',
    town: 'Beach Haven', address: '200 Centre St, Beach Haven, NJ 08008',
    phone: '(609) 492-9477',
    note: 'Interactive theatrical ice cream parlour since 1975. Servers perform singing telegrams — a one-of-a-kind LBI experience.',
  },
  {
    id: 188, name: 'The Windmill', cat: 'Dining', subcat: 'Belgian Waffles / Ice Cream',
    town: 'Beach Haven', address: '830 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-3219',
    note: 'Original Bay Village establishment since 1965. Belgian waffles and hand-dipped ice cream.',
  },
  {
    id: 189, name: 'Lighthouse Restaurant & Grill', cat: 'Dining', subcat: 'Deli / Grill',
    town: 'Surf City', address: '1718 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 207-6167', web: 'https://lighthouserestaurantgrill.com',
    note: 'Popular breakfast and lunch deli-grill. Open 7 days in-season.',
  },
  {
    id: 190, name: "Agnello's Market", cat: 'Shopping', subcat: 'Market / Deli',
    town: 'Barnegat Light', address: '1801 Central Ave, Barnegat Light, NJ 08006',
    phone: '(609) 207-6491', web: 'https://agnellos.com',
    note: 'Local market and sandwich shop at the north tip of the island.',
  },
  {
    id: 191, name: "Agnello's Cafe", cat: 'Dining', subcat: 'Cafe / Deli',
    town: 'Harvey Cedars', address: '6332 Long Beach Blvd, Harvey Cedars, NJ 08008',
    phone: '(609) 207-6336', web: 'https://agnellos.com',
    note: 'Harvey Cedars cafe location — coffee, sandwiches, and market items.',
  },
  {
    id: 192, name: 'Blue Claw Seafood Market', cat: 'Shopping', subcat: 'Seafood Market',
    town: 'Surf City', address: '1103 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 361-0050', web: 'https://blueclawlbi.com',
    note: 'Well-regarded fresh seafood market in Surf City.',
  },
  {
    id: 193, name: 'Boulevard Clams', cat: 'Dining', subcat: 'Clam Bar / Seafood Market',
    town: 'Surf City', address: '2006 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-9494', web: 'https://boulevardclams.net',
    note: 'Longtime local seafood market and casual clam restaurant. In-season daily.',
  },
  {
    id: 194, name: 'Engleside Inn Restaurant', cat: 'Dining', subcat: 'Fine Dining / Hotel',
    town: 'Beach Haven', address: '30 Engleside Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-1251', web: 'https://engleside.com',
    note: 'Fine dining and sushi at one of LBI\'s most established hotels. Dinner nightly in-season.',
  },
  {
    id: 195, name: 'Gazebo Grill & Sushi Bar', cat: 'Dining', subcat: 'Grill / Sushi',
    town: 'Beach Haven', address: '325 9th St, Beach Haven, NJ 08008',
    phone: '(609) 492-5811', web: 'https://gazebogrilllbi.com',
    note: "Bayside counter-service grill at Schooner's Wharf — burgers, wraps, sushi, outdoor seating. Seasonal.",
  },
  {
    id: 202, name: "Bowker's South Beach Deli & Grill", cat: 'Dining', subcat: 'Deli / Grill',
    town: 'Long Beach Township', address: '5404 Long Beach Blvd, Holgate, NJ 08008',
    phone: '(609) 492-0242', web: 'https://bowkersgratefuldeli.com',
    note: 'Southernmost spot on LBI in Holgate. Breakfast, bagels, cheesesteaks, crumb cake, and smoothies. Classic laid-back beach-end vibe.',
  },
  {
    id: 203, name: "Barry's Do Me a Flavor", cat: 'Dining', subcat: 'Ice Cream / Restaurant',
    town: 'Beach Haven', address: '309 Centre St, Beach Haven, NJ 08008',
    phone: '(609) 492-8259', web: 'https://barrysdomeaflavor.com',
    note: 'LBI institution since 1987. 24 flavors of Arctic ice cream plus a full menu — cheesesteaks, fish tacos, burgers, and seafood.',
  },
  {
    id: 196, name: 'Holiday Snack Bar', cat: 'Dining', subcat: 'Diner / Pie',
    town: 'Beach Haven', address: '401 Centre St, Beach Haven, NJ 08008',
    phone: '(609) 492-4544', web: 'https://holidaysnackbar.com',
    note: "Open every summer since the 1950s. Famous for their pies — People Magazine's Best Pie in NJ, 2019. A quirky LBI classic.",
  },
  {
    id: 204, name: 'Terrace Tavern', cat: 'Dining', subcat: 'Bar / Seafood',
    town: 'Long Beach Township', address: '13201 Long Beach Blvd, Beach Haven Terrace, NJ 08008',
    phone: '(609) 492-9751', web: 'https://terracetavernlbi.com',
    note: 'Popular bar-and-grill with an outdoor deck, live music on weekends, and a solid seafood menu. Also listed under Bars & Nightlife.',
  },
  {
    id: 205, name: 'Delaware Avenue Oyster House & Bar', cat: 'Dining', subcat: 'Oyster Bar',
    town: 'Long Beach Township', address: '13211 Long Beach Blvd, Long Beach Twp, NJ 08008',
    phone: '(609) 492-3352',
    note: 'Raw bar, oysters, craft cocktails, and a lively scene in the Beach Haven Terrace area. Also listed under Bars & Nightlife.',
  },
  {
    id: 206, name: "Black-Eyed Susans", cat: 'Dining', subcat: 'Upscale / New American',
    town: 'Harvey Cedars', address: '7908 Long Beach Blvd, Harvey Cedars, NJ 08008',
    phone: '(609) 494-4990', web: 'https://www.blackeyedsusanslbi.com',
    note: 'Beach-casual upscale spot from chefs Ashley Pellagrino & Christopher Sanchez — rotating artisan pizzas, house-made pastas, and fresh seafood. Reservations recommended.',
  },
  {
    id: 207, name: 'Tucker\'s Tavern', cat: 'Dining', subcat: 'Gastropub / Seafood',
    town: 'Beach Haven', address: '101 S West Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-2300', web: 'https://www.tuckerstavern-lbi.com',
    note: 'Fearless Restaurants gastropub — creative hearty food, local seafood, and a raw bar. $1 oysters at happy hour. Rooftop Buoy Bar upstairs (see Nightlife).',
  },
  {
    id: 208, name: 'Dock & Claw Clam Bar', cat: 'Dining', subcat: 'Clam Bar / Seafood',
    town: 'Beach Haven', address: '506 Centre St, Beach Haven, NJ 08008',
    phone: '(609) 342-0863', web: 'https://dockandclaw.com',
    note: 'Newer Beach Haven clam bar — raw bar, steamers, and a casual outdoor scene.',
  },
  {
    id: 209, name: "Russo's Italian Restaurant", cat: 'Dining', subcat: 'Italian',
    town: 'Ship Bottom', address: '1415 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 342-1506', web: 'https://russoslbi.com',
    note: 'Small family-owned Italian in the center of the island — everything made in small batches. Also scoops house ice cream.',
  },
  {
    id: 210, name: 'Flour Child', cat: 'Dining', subcat: 'Pizza',
    town: 'Long Beach Township', address: '8201 Long Beach Blvd, Brant Beach, NJ 08008',
    phone: '(609) 991-3777', web: 'https://flourchildlbi.com',
    note: 'Handcrafted brick-oven pizza in the Brant Beach area. Casual, order online or call ahead. 4.9 stars on Google.',
  },
]

// ─────────────────────────────────────────────
// SHOPPING
// ─────────────────────────────────────────────
export const shopping: Business[] = [
  // Surf & Sport
  {
    id: 201, name: 'Ron Jon Surf Shop', cat: 'Shopping', subcat: 'Surf / Apparel',
    town: 'Ship Bottom', address: '801 Central Ave, Ship Bottom, NJ 08008',
    phone: '(609) 494-8844', web: 'https://www.ronjonsurfshop.com',
    note: 'The original Ron Jon, open since 1961. 8,100 sq ft beach icon.',
  },
  {
    id: 202, name: 'Wave Hog Surf Shop', cat: 'Shopping', subcat: 'Surf Shop',
    town: 'Ship Bottom', address: '620 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-1040', web: 'https://www.wavehogsurfshop.com',
    note: 'Core surf shop by surfers for surfers, on LBI since 2005.',
  },
  {
    id: 203, name: "South End Surf 'N Paddle", cat: 'Shopping', subcat: 'Surf / Water Rentals',
    town: 'Beach Haven', address: '118 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-8823',
    note: 'Surf shop and paddleboard rentals on the south end.',
  },
  {
    id: 204, name: 'Acme Beach and Bike', cat: 'Shopping', subcat: 'Bike / Surf / Rentals',
    town: 'Long Beach Township', address: '17 E 84th New York Ave, Long Beach Twp, NJ 08008',
    phone: '(609) 492-5150',
    note: 'Bike rentals, surf gear, and water sport rentals.',
  },
  // Apparel & Gifts
  {
    id: 210, name: 'Surf City 5&10 Inc.', cat: 'Shopping', subcat: 'Gift / General',
    town: 'Surf City', address: '411 N Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-1872',
    note: 'Classic dime store with beach gifts, toys, and novelties. A throwback.',
  },
  {
    id: 211, name: 'Making Waves', cat: 'Shopping', subcat: 'Apparel / Jewelry',
    town: 'Beach Haven', address: '325 9th St Unit 9, Beach Haven, NJ 08008',
    phone: '(609) 492-9150', web: 'https://shopmakingwaves.com',
    note: 'Women\'s apparel, jewelry, and coastal accessories.',
  },
  {
    id: 212, name: 'The Mod Hatter', cat: 'Shopping', subcat: 'Gift / Jewelry',
    town: 'Beach Haven', address: '391 11th Street, Beach Haven, NJ 08008',
    phone: '(609) 492-0999', web: 'https://themodhatter.com',
    note: 'Eclectic gifts, jewelry, and hats.',
  },
  {
    id: 213, name: "B&B Department Stores North", cat: 'Shopping', subcat: 'Department Store',
    town: 'Beach Haven', address: '835 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-3050',
    note: 'Full-service beach department store. Apparel, beach gear, and more.',
  },
  {
    id: 214, name: "Chick's LBI Shop", cat: 'Shopping', subcat: 'Apparel / Printing',
    town: 'Beach Haven', address: '857 Seagull Lane, Beach Haven, NJ 08008',
    phone: '(609) 492-1171', web: 'https://chickslbi.wordpress.com',
    note: 'Custom printing and LBI apparel. Great for group shirts and souvenirs.',
  },
  {
    id: 215, name: 'Little Bungalow', cat: 'Shopping', subcat: 'Apparel / Home Decor',
    town: 'Surf City', address: '1700 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-1802', web: 'https://shoplittlebungalow.com',
    note: 'Boho-coastal women\'s fashion and home decor.',
  },
  {
    id: 216, name: 'Society Beach', cat: 'Shopping', subcat: 'Apparel',
    town: 'Surf City', address: '2106 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 467-5444', web: 'https://societybeachlbi.com',
    note: 'Women\'s beach apparel and resort wear.',
  },
  // Home Decor
  {
    id: 220, name: 'Oskar Huber Furniture & Design', cat: 'Shopping', subcat: 'Furniture / Design',
    town: 'Ship Bottom', address: '101 W 8th Street, Ship Bottom, NJ 08008',
    phone: '(609) 494-8127', web: 'https://www.oskarhuber.com',
    note: 'Upscale furniture and interior design. LBI\'s premier home furnishings store.',
  },
  {
    id: 221, name: 'k+co Living', cat: 'Shopping', subcat: 'Home Decor / Design',
    town: 'Beach Haven', address: '110 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(973) 220-2171',
    note: 'Contemporary coastal home decor and interior design services.',
  },
  {
    id: 222, name: 'The Spotted Whale', cat: 'Shopping', subcat: 'Home Decor',
    town: 'Beach Haven', address: '500 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 467-7407',
    note: 'Coastal-inspired home decor and gifts. Also has a Barnegat Light location.',
  },
  {
    id: 223, name: 'Barnegat Light Garden and Gift', cat: 'Shopping', subcat: 'Gift / Garden',
    town: 'Barnegat Light', address: '802 Central Ave, Barnegat Light, NJ 08006',
    phone: '(609) 709-5227',
    note: 'Garden supplies, gifts, and home accents on the north end.',
  },
  {
    id: 224, name: 'The Seawife', cat: 'Shopping', subcat: 'Antiques / Home Decor',
    town: 'Barnegat Light', address: '1901 Bayview Ave, Barnegat Light, NJ 08006',
    phone: '(609) 361-8039', web: 'https://theseawife.com',
    note: 'Antiques and curated coastal decor at Viking Village.',
  },
  // Pharmacy
  {
    id: 230, name: "Kapler's Pharmacy", cat: 'Shopping', subcat: 'Pharmacy',
    town: 'Beach Haven', address: '1 S Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-9221', web: 'https://kaplersrx.com',
    note: 'Independent local pharmacy. Island pharmacy staple.',
  },
  {
    id: 231, name: 'Farias Surf & Sport', cat: 'Shopping', subcat: 'Surf / Sport',
    town: 'Beach Haven', address: '823 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-0200', web: 'https://fariassurf.com',
    note: 'Family-owned surf shop since 1969. Six LBI locations — surfboards, swimwear, bikes, kids gear.',
  },
  {
    id: 253, name: 'Farias Surf & Sport', cat: 'Shopping', subcat: 'Surf / Sport',
    town: 'Ship Bottom', address: '2800 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-7368', web: 'https://fariassurf.com',
    note: 'Farias flagship Ship Bottom store. Surfboards, swimwear, bikes, and beach gear.',
  },
  {
    id: 254, name: 'B&B Department Stores South', cat: 'Shopping', subcat: 'Department Store',
    town: 'Ship Bottom', address: '901 Central Ave, Ship Bottom, NJ 08008',
    phone: '(609) 361-0760', web: 'https://bnbdepartmentstore.com',
    note: 'South island location of the LBI beach department store staple. Apparel, beach gear, and accessories.',
  },
  {
    id: 255, name: "Ben & Jerry's", cat: 'Shopping', subcat: 'Ice Cream',
    town: 'Beach Haven', address: '600 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-6300', web: 'https://www.benjerry.com/beachhaven',
    note: 'The one and only Ben & Jerry\'s on LBI. All the classics plus seasonal flavors.',
  },
  {
    id: 256, name: 'The Cheese Shoppe', cat: 'Shopping', subcat: 'Specialty Food / Cheese',
    town: 'Surf City', address: '1800 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-4630', web: 'https://lbicheese.com',
    note: 'Artisan cheese shop and specialty foods. Open year-round, daily 10am–6pm.',
  },
  {
    id: 257, name: 'The Cheese Shoppe', cat: 'Shopping', subcat: 'Specialty Food / Cheese',
    town: 'Beach Haven', address: '615 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 833-4230', web: 'https://lbicheese.com',
    note: 'Beach Haven location of the LBI artisan cheese shop. Opened 2024 — call ahead to confirm seasonal hours.',
  },
  // Liquor Stores — Round 3 additions
  {
    id: 232, name: "Lang's Liquor", cat: 'Shopping', subcat: 'Liquor Store',
    town: 'Ship Bottom', address: '2401 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-6182', web: 'https://www.langsliquors.com',
    note: 'Serving LBI since 1950. Wine, spirits, beer, and tobacco. Local delivery available. Called a "one stop shop" by regulars.',
  },
  {
    id: 233, name: "Rommel's Liquor Store", cat: 'Shopping', subcat: 'Liquor Store',
    town: 'Beach Haven', address: '201 S Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-6101',
    note: 'Convenient Beach Haven liquor store. South end staple for wine, beer, and spirits.',
  },
  {
    id: 234, name: 'Neptune Wines & Liquors', cat: 'Shopping', subcat: 'Liquor Store',
    town: 'Harvey Cedars', address: '8006 Long Beach Blvd, Harvey Cedars, NJ 08008',
    phone: '(609) 698-7800', web: 'https://www.neptunewinesliquors.com',
    note: 'Mid-island bottle shop. Wine, liquor, beer, mixers, ice, and cigars. Offers delivery throughout LBI.',
  },
  {
    id: 235, name: 'The Keepers Liquor', cat: 'Shopping', subcat: 'Liquor Store',
    town: 'Barnegat Light', address: '608 Broadway, Barnegat Light, NJ 08006',
    phone: '(609) 494-2489', web: 'https://thekeepersliquor.com',
    note: 'North-end liquor store near Old Barney lighthouse. In business 36+ years. Open until 10 PM on weekends.',
  },
  {
    id: 236, name: 'Island Shop', cat: 'Shopping', subcat: 'Clothing / Boutique',
    town: 'Brant Beach', address: '4205 Long Beach Blvd, Brant Beach, NJ 08008',
    phone: '(609) 494-2120', web: 'https://www.islandshoplbi.com',
    note: "LBI's go-to for shore ladies apparel for over 80 years. Casual beachwear, resort wear, and accessories. Near Daddy O's.",
  },
  {
    id: 237, name: 'Coconuts', cat: 'Shopping', subcat: 'Souvenir / Gifts',
    town: 'Beach Haven', address: '325 9th St, Beach Haven, NJ 08008',
    phone: '(609) 492-3711', web: 'https://shopcoconuts.com',
    note: 'LBI-branded beach apparel, sweatshirts, tees, hats, and gifts. Open Memorial Day through Columbus Day.',
  },
  {
    id: 238, name: 'Wawa', cat: 'Shopping', subcat: 'Convenience Store',
    town: 'Long Beach Township', address: '13115 Long Beach Blvd, Beach Haven Terrace, NJ 08008',
    phone: '(609) 492-1960',
    note: 'Open 24/7. Full Wawa with hoagies, coffee, gas, and all the essentials. Mid-island location.',
  },
  {
    id: 239, name: 'Wawa', cat: 'Shopping', subcat: 'Convenience Store',
    town: 'Ship Bottom', address: '902 Central Ave, Ship Bottom, NJ 08008',
    note: 'Open 24/7. Ship Bottom Wawa — fuel, hoagies, coffee, and snacks near the causeway.',
  },
  {
    id: 240, name: "Okie's Butcher Shop", cat: 'Shopping', subcat: 'Butcher / Deli',
    town: 'Surf City', address: '2107 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-5577', web: 'https://okiesbutchershop.com',
    note: 'Full-service butcher shop and deli. Quality meats, custom sandwiches, and catering. Open Mon–Sat 7 AM–6 PM.',
  },
  {
    id: 243, name: '7-Eleven', cat: 'Shopping', subcat: 'Convenience Store',
    town: 'Beach Haven', address: '1001 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-3501', web: 'https://www.7-eleven.com',
    note: 'Open 24/7. Snacks, drinks, coffee, and essentials. Beach Haven location.',
  },
  {
    id: 241, name: 'Stutz Candies', cat: 'Shopping', subcat: 'Candy / Gifts',
    town: 'Long Beach Township', address: '8701 Long Beach Blvd, Brighton Beach, NJ 08008',
    phone: '(609) 494-5303', web: 'https://www.stutzcandy.com',
    note: "LBI's beloved candy shop since 1938. Homemade chocolates, fudge, nonpareils, and nut confections. A shore tradition.",
  },
  // Round 5 additions
  {
    id: 244, name: 'Wink Boutique', cat: 'Shopping', subcat: 'Apparel / Boutique',
    town: 'Surf City', address: '1913 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 361-9300', web: 'https://winkboutiques.com',
    note: "Popular women's clothing, jewelry, and accessories boutique on LBI since 2003. Carries Free People, Z Supply, and similar brands.",
  },
  {
    id: 245, name: 'The Good Life Gift Boutique', cat: 'Shopping', subcat: 'Gift / Boutique',
    town: 'Surf City', address: '2200 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-0200', web: 'https://thegoodlifeboutique.com',
    note: "Lifestyle boutique with women's clothing, jewelry, baby gifts, and home décor — including LBI-customized gifts.",
  },
  {
    id: 246, name: 'Gifted by the Sea', cat: 'Shopping', subcat: 'Gift / Jewelry',
    town: 'Long Beach Township', address: '6115 Long Beach Blvd, Brant Beach, NJ 08008',
    phone: '(609) 342-0219', web: 'https://giftedbythesea.com',
    note: 'Coastal gift and jewelry shop carrying Pandora, Vera Bradley, Lilly Pulitzer, and unique LBI items.',
  },
  {
    id: 247, name: 'Song of the Sea', cat: 'Shopping', subcat: 'Gift / Home Decor',
    town: 'Beach Haven', address: '830 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-6326', web: 'https://songofthesealbi.com',
    note: 'Unique coastal gift and home décor shop inside Bay Village.',
  },
  {
    id: 248, name: 'Haymarket Hobbies & Toys', cat: 'Shopping', subcat: 'Hobby / Toys',
    town: 'Ship Bottom', address: '2120 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-7228', web: 'https://haymarketlbi.com',
    note: 'Beloved hobby, toy, game, and puzzle shop since 1976. A rainy-day family staple on LBI.',
  },
  {
    id: 249, name: 'Kitty Hawk Kites', cat: 'Shopping', subcat: 'Kites / Outdoor Toys',
    town: 'Barnegat Light', address: '701 Broadway, Barnegat Light, NJ 08006',
    phone: '(609) 342-0956', web: 'https://kittyhawk.com',
    note: 'Kite and outdoor toy shop near Old Barney lighthouse — a perfect fit for the island breeze.',
  },
  {
    id: 250, name: 'Island Surf & Sail', cat: 'Shopping', subcat: 'Surf / Sail / Kayak',
    town: 'Brant Beach', address: '3304 Long Beach Blvd, Brant Beach, NJ 08008',
    phone: '(609) 494-5553', web: 'https://islandsurf-sail.com',
    note: 'Full-service surf, kayak, and sailing shop in Brant Beach. One block from the ocean.',
  },
  {
    id: 251, name: "Fisherman's Headquarters", cat: 'Shopping', subcat: 'Bait & Tackle',
    town: 'Ship Bottom', address: '280 W 9th St, Ship Bottom, NJ 08008',
    phone: '(609) 494-5739', web: 'https://fishermansheadquarters.com',
    note: 'Premier bait, tackle, and fishing gear shop open year-round since the 1960s. Just over the causeway.',
  },
  // Markets & Grocery (moved from dining)
  {
    id: 120, name: "Murphy's Fresh Markets", cat: 'Shopping', subcat: 'Market / Grocery',
    town: 'Beach Haven', address: '9 S Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-5100',
    note: 'Local fresh market. Island staple for grab-and-go, fresh seafood, and groceries.',
  },
  {
    id: 123, name: 'Neptune Market', cat: 'Shopping', subcat: 'Market / Grocery',
    town: 'Harvey Cedars', address: '8014 Long Beach Blvd, Harvey Cedars, NJ 08008',
    phone: '(267) 625-1966',
    note: 'Mid-island market and deli with lunch counter.',
  },
  {
    id: 125, name: 'Acme Markets', cat: 'Shopping', subcat: 'Grocery',
    town: 'Beach Haven Park', address: '9600 Long Beach Blvd, Beach Haven Park, NJ 08008',
    phone: '(609) 492-0510', web: 'https://www.acmemarkets.com',
    note: 'Full-service grocery store with in-store pharmacy. Largest grocery on the island.',
  },
  {
    id: 252, name: 'Tuckerton Lumber', cat: 'Shopping', subcat: 'Hardware / Lumber',
    town: 'Surf City', address: '200 N Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-2111', web: 'https://tlcnj.com',
    note: 'Independent hardware, lumber, and Benjamin Moore paint dealer on LBI. Mon–Fri 7am–4pm, Sat 7am–3pm.',
  },
]

// ─────────────────────────────────────────────
// WATER SPORTS & RENTALS
// ─────────────────────────────────────────────
export const waterSports: Business[] = [
  {
    id: 301, name: 'Beach Haven Watersports', cat: 'Water Sports & Rentals', subcat: 'Multi-Sport Rentals',
    town: 'Beach Haven Gardens', address: '2702 Long Beach Blvd, Beach Haven Gardens, NJ 08008',
    phone: '(609) 492-7500', web: 'https://www.beachhavenwatersports.com',
    note: 'Pontoon boats, kayaks, SUPs, and Sea-Doos. Walk-ins welcome.',
  },
  {
    id: 302, name: "Starky's Ship Bottom Marine Center", cat: 'Water Sports & Rentals', subcat: 'Multi-Sport Rentals',
    town: 'Ship Bottom', address: 'Ship Bottom, NJ 08008',
    phone: '(609) 494-5252', web: 'https://www.starkyslbiwatercraftrentals.com',
    note: 'Pontoon boats, waverunners, SUPs, kayaks. One mile south of causeway.',
  },
  {
    id: 303, name: 'Holgate H2O Sports', cat: 'Water Sports & Rentals', subcat: 'Multi-Sport Rentals',
    town: 'Holgate', address: 'Holgate, Long Beach Twp, NJ 08008',
    web: 'https://www.holgateh2osports.com',
    note: 'Kayaks, jet skis, pontoon boats, and skiff rentals on the south end.',
  },
  {
    id: 304, name: 'Sandy Avocado Surf', cat: 'Water Sports & Rentals', subcat: 'Surf Lessons',
    town: 'Beach Haven', address: 'Taylor Ave Beach, Beach Haven, NJ 08008',
    phone: '(615) 513-4885',
    note: 'Surf lessons for all levels including kids. Lessons on the beach.',
  },
  {
    id: 305, name: "South End Surf 'N Paddle", cat: 'Water Sports & Rentals', subcat: 'Surf / SUP',
    town: 'Beach Haven', address: '118 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-8823',
    note: 'Surfboard and paddleboard rentals. Surf instruction available.',
  },
  {
    id: 306, name: 'Historic Viking Village', cat: 'Water Sports & Rentals', subcat: 'Fishing / Marina',
    town: 'Barnegat Light', address: 'Bayview Ave, Barnegat Light, NJ 08006',
    phone: '(609) 494-0113', web: 'https://www.vikingvillage.net',
    note: 'Working fishing village. Head boat fishing, bait & tackle, fresh seafood market.',
  },
  {
    id: 307, name: 'Freedom Boat Club', cat: 'Water Sports & Rentals', subcat: 'Boat Club',
    town: 'Beach Haven', address: '525 2nd Street, Beach Haven, NJ 08008',
    phone: '(609) 289-4391', web: 'https://www.freedomboatclub.com',
    note: 'Membership-based boat club. Access to multiple vessels, no ownership hassle.',
  },
  {
    id: 308, name: 'Acme Beach and Bike', cat: 'Water Sports & Rentals', subcat: 'Bike / Water Rentals',
    town: 'Long Beach Township', address: '17 E 84th New York Ave, Long Beach Twp, NJ 08008',
    phone: '(609) 492-5150',
    note: 'Bike and water sports rentals including kayaks and SUPs.',
  },
  {
    id: 309, name: 'LBI Surfing School & Bike Rentals', cat: 'Water Sports & Rentals', subcat: 'Surf Lessons / Rentals',
    town: 'Surf City', address: 'Surf City, NJ 08008',
    web: 'https://lbisurfing.com',
    note: 'Expert surf instruction plus rentals of bikes, surfboards, paddleboards, and kayaks.',
  },
  {
    id: 310, name: 'Surf City Bait and Tackle', cat: 'Water Sports & Rentals', subcat: 'Bait & Tackle',
    town: 'Surf City', address: 'Surf City, NJ 08008',
    note: "LBI's oldest continuously operating bait and tackle shop since 1947. Rod and crab equipment rentals plus free weekly fishing lessons in summer.",
  },
  {
    id: 311, name: "Jingles Bait & Tackle", cat: 'Water Sports & Rentals', subcat: 'Bait & Tackle / Boat Rentals',
    town: 'Beach Haven', address: '1214 Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-2795', web: 'http://www.jinglesbaitandtackle.com',
    note: 'Bait, tackle, and small boat rentals on the bay side of Beach Haven.',
  },
  {
    id: 312, name: 'Surf Buggy Bike Shop', cat: 'Water Sports & Rentals', subcat: 'Bike Rentals',
    town: 'Surf City', address: '1414 N Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 361-3611', web: 'https://www.surfbuggylbi.com',
    note: "LBI's premier bike rental and sales shop. Cruisers, kids bikes, tandems, and more. Year-round rentals available.",
  },
  {
    id: 313, name: 'Shore Brake Cyclery', cat: 'Water Sports & Rentals', subcat: 'Bike Shop / Rentals',
    town: 'Long Beach Township', address: '3801 Long Beach Blvd, Brant Beach, NJ 08008',
    phone: '(609) 342-0480', web: 'https://www.shorebrakecyclery.com',
    note: 'Full-service local bike shop — sales, rentals, and repair. Authorized Trek dealer. Voted best on LBI by NJ Monthly.',
  },
  {
    id: 314, name: 'The Boardwalk of LBI', cat: 'Water Sports & Rentals', subcat: 'Bike Rentals',
    town: 'Beach Haven', phone: '(609) 492-3298', web: 'https://www.theboardwalklbi.com',
    note: 'Bike rentals in Beach Haven. Cruisers and beach bikes by the hour or day.',
  },
]

// ─────────────────────────────────────────────
// NIGHTLIFE
// ─────────────────────────────────────────────
export const nightlife: Business[] = [
  {
    id: 701, name: "Joe Pop's Shore Bar + Restaurant", cat: 'Nightlife', subcat: 'Bar / Live Music',
    town: 'Ship Bottom', address: '2002 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-0558', web: 'https://joepops.com',
    note: 'Live music every day, outdoor tiki bar, DJ nights. Open until 2 AM. The nightlife anchor of Ship Bottom.',
  },
  {
    id: 702, name: 'Terrace Tavern', cat: 'Nightlife', subcat: 'Bar / Seafood',
    town: 'Long Beach Township', address: '13201 Long Beach Blvd, Beach Haven Terrace, NJ 08008',
    phone: '(609) 492-9751', web: 'https://terracetavernlbi.com',
    note: 'Popular Beach Haven bar with outdoor deck, live music on weekends, and a solid seafood menu.',
  },
  {
    id: 703, name: 'Ship Bottom Brewery', cat: 'Nightlife', subcat: 'Brewery / Bar',
    town: 'Beach Haven', address: '830 N Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 207-6331', web: 'https://shipbottombrewery.com',
    note: 'Craft brewery with ~10 beers brewed on-site. Big taproom overlooks Bay Village square. Casual and lively.',
  },
  {
    id: 704, name: 'The Gateway Restaurant & Lounge', cat: 'Nightlife', subcat: 'Bar / Live Music',
    town: 'Ship Bottom', address: '227 W 8th St, Ship Bottom, NJ 08008',
    web: 'https://www.thegatewaylbi.com',
    note: "Family-owned since 1940. Open year-round. Live entertainment, comfortable lounge, and a well-attended bar. A true LBI institution.",
  },
  {
    id: 705, name: "Kubel's Bar & Grill", cat: 'Nightlife', subcat: 'Bar / Seafood',
    town: 'Barnegat Light', address: '28 W 7th St, Barnegat Light, NJ 08006',
    phone: '(609) 494-8592',
    note: 'Sister bar to the famous Kubel\'s restaurant. Casual bar vibe on the north end with late-night hours.',
  },
  {
    id: 706, name: 'Delaware Avenue Oyster House & Bar', cat: 'Nightlife', subcat: 'Oyster Bar',
    town: 'Long Beach Township', address: '13211 Long Beach Blvd, Long Beach Twp, NJ 08008',
    phone: '(609) 492-3352',
    note: 'Raw bar, craft cocktails, and a lively bar scene in the Beach Haven Terrace area.',
  },
  {
    id: 707, name: 'The WooHoo', cat: 'Nightlife', subcat: 'Ice Cream / Event Venue',
    town: 'Surf City', address: '1909 Long Beach Blvd Unit 5, Surf City, NJ 08008',
    phone: '(609) 342-0252',
    note: 'Ice cream and event space that doubles as a nightlife venue — parties, weddings, and late-night desserts.',
  },
  {
    id: 708, name: "Nardi's Tavern", cat: 'Nightlife', subcat: 'Bar / Tavern',
    town: 'Long Beach Township', address: '11801 Long Beach Blvd, Long Beach Twp, NJ 08008',
    web: 'http://www.nardistavern.com',
    note: "Longtime local dive bar. Hosts LBI's top cover bands. Runs the Pink Party Bus courtesy shuttle home after shows.",
  },
  {
    id: 715, name: 'LBI Distilling Company', cat: 'Nightlife', subcat: 'Distillery / Tasting Room',
    town: 'Long Beach Township', address: '1305 Long Beach Blvd, North Beach Haven, NJ 08008',
    phone: '(609) 661-7154', web: 'https://lbidistillingcompany.com',
    note: "The only craft distillery on Long Beach Island — spirits made on-site, tasting bar open Fri 5–9pm, Sat–Sun 12–9pm.",
  },
  // Bars — Round 3 additions
  {
    id: 709, name: 'Hudson House Bar', cat: 'Nightlife', subcat: 'Bar / Pub',
    town: 'Long Beach Township', address: '19 E 13th St, North Beach Haven, NJ 08008',
    note: 'Affectionately known as "The Hud." Hidden gem hole-in-the-wall pub with an expansive cocktail menu. Lively any night of the week.',
  },
  {
    id: 710, name: 'The Marlin & Triton', cat: 'Nightlife', subcat: 'Bar / Club',
    town: 'Beach Haven', address: '2 S Bay Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-7700', web: 'http://themarlinlbi.com',
    note: 'Downtown Beach Haven nightlife hub. Happy hour 3–6 PM, rotating craft drafts from micro-breweries. Best DJs on the island, themed parties and Teen Nights.',
  },
  {
    id: 711, name: 'Northside Bar & Grille', cat: 'Nightlife', subcat: 'Bar & Grill',
    town: 'Surf City', address: '1500 Long Beach Blvd, Surf City, NJ 08008',
    web: 'https://www.northsidelbi.com',
    note: 'Surf City sports bar with burgers, wings, and seafood. Nine HD TVs, full bar, and live acoustic music. Welcoming year-round crowd.',
  },
  {
    id: 712, name: 'Spray Beach Oceanfront Hotel & Bar', cat: 'Nightlife', subcat: 'Hotel Bar / Live Music',
    town: 'Long Beach Township', address: '200 E 24th St, Spray Beach, NJ 08008',
    web: 'https://spraybeachhotel.com',
    note: 'Oceanfront hotel with a standout bar scene. World-famous Bloody Marys, nightly live music, and a tiki bar pool party vibe. Great happy hour.',
  },
  {
    id: 713, name: 'The Sea Shell Resort & Beach Club', cat: 'Nightlife', subcat: 'Resort Bar / Nightclub',
    town: 'Beach Haven', address: '10 S Atlantic Ave, Beach Haven, NJ 08008',
    web: 'https://theseashellresort.com',
    note: 'Hottest daytime and nighttime spot on LBI. Oceanfront tiki bar, pool parties with live bands, and a full nightclub. Home of some of the best Shore DJs.',
  },
  {
    id: 714, name: "Tucker's Buoy Bar", cat: 'Nightlife', subcat: 'Rooftop Bar',
    town: 'Beach Haven', address: '101 S West Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-2300',
    note: "Rooftop bar above Tucker's Tavern. One of the few rooftop spots on LBI with sweeping bay views. Great sunset drinks and a lively crowd.",
  },
]

// ─────────────────────────────────────────────
// ENTERTAINMENT
// ─────────────────────────────────────────────
export const entertainment: Business[] = [
  // Amusements
  {
    id: 401, name: 'Fantasy Island Amusement Park', cat: 'Entertainment', subcat: 'Amusement Park',
    town: 'Beach Haven', address: '320 W 7th St, Beach Haven, NJ 08008',
    phone: '(609) 492-4000', web: 'https://www.fantasyislandfun.com',
    note: 'Classic LBI amusement park with rides, arcades, and mini golf. Family favorite.',
  },
  {
    id: 402, name: 'Thundering Surf Water Park', cat: 'Entertainment', subcat: 'Water Park',
    town: 'Beach Haven', address: '300 Taylor Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-0869', web: 'https://www.thunderingsurf.com',
    note: 'Water slides, lazy river, and splash zones. Great for families.',
  },
  // Mini Golf
  {
    id: 410, name: 'Hartland Golf and Arcade', cat: 'Entertainment', subcat: 'Mini Golf / Arcade',
    town: 'Ship Bottom', address: '2800 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-7776', web: 'https://www.hartlandgolfandarcade.com',
    note: 'Voted #1 mini golf on LBI. Full arcade on site.',
  },
  {
    id: 411, name: "Mr. Tee's Putt & Play", cat: 'Entertainment', subcat: 'Mini Golf',
    town: 'Beach Haven', address: '226 Engleside Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-8689', web: 'https://www.mrteeslbi.com',
    note: 'Two 18-hole courses in Beach Haven. Great for all ages.',
  },
  {
    id: 412, name: 'Flamingo Miniature Golf', cat: 'Entertainment', subcat: 'Mini Golf',
    town: 'Ship Bottom', address: '5th Street & Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 361-1874',
    note: 'Classic beachside mini golf.',
  },
  {
    id: 413, name: 'Sand Trap Miniature Golf', cat: 'Entertainment', subcat: 'Mini Golf',
    town: 'Ship Bottom', address: '23rd & Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 494-3185',
    note: 'Well-kept 18-hole course in Ship Bottom.',
  },
  // Museums & Culture
  {
    id: 420, name: 'New Jersey Maritime Museum', cat: 'Entertainment', subcat: 'Museum',
    town: 'Beach Haven', address: '528 Dock Rd, Beach Haven, NJ 08008',
    phone: '(609) 492-0202', web: 'https://www.njmaritimemuseum.org',
    note: 'Fascinating maritime history exhibits. Shipwreck artifacts and local maritime lore.',
  },
  {
    id: 421, name: 'LBI Historical Museum', cat: 'Entertainment', subcat: 'Museum',
    town: 'Beach Haven', address: '9 S Beach Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-0700',
    note: 'Local history and exhibits on LBI\'s past. Worth a rainy-day visit.',
  },
  {
    id: 422, name: 'Viking Shows at Viking Village', cat: 'Entertainment', subcat: 'Arts / Entertainment',
    town: 'Barnegat Light', address: '1901 Bayview Ave, Barnegat Light, NJ 08006',
    phone: '(609) 361-8039',
    note: 'Art galleries, live events, and cultural shows at the historic Viking Village.',
  },
  {
    id: 423, name: 'Ocean County Library — LBI Branch', cat: 'Entertainment', subcat: 'Library',
    town: 'Ship Bottom', address: '217 S Central Ave, Ship Bottom, NJ 08008',
    phone: '(609) 494-2480', web: 'https://www.theoceancountylibrary.org',
    note: 'Full-service public library. Events, children\'s programming, and free Wi-Fi.',
  },
  // Marinas & Yacht Clubs
  {
    id: 430, name: 'Surf City Yacht Club', cat: 'Entertainment', subcat: 'Marina / Yacht Club',
    town: 'Surf City', address: 'N 9th Street, Surf City, NJ 08008',
    phone: '(609) 494-1532',
    note: 'Active sailing and racing community. Memberships and events.',
  },
  {
    id: 431, name: 'Brant Beach Yacht Club', cat: 'Entertainment', subcat: 'Marina / Yacht Club',
    town: 'Brant Beach', address: '6106 Bayview Ave, Brant Beach, NJ 08008',
    phone: '(609) 494-4485',
    note: 'Bay-front yacht club with sailing, racing, and social events.',
  },
  {
    id: 432, name: 'Little Egg Harbor Yacht Club', cat: 'Entertainment', subcat: 'Marina / Yacht Club',
    town: 'Beach Haven', address: '401 Berkeley Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-2529',
    note: 'Established yacht club on the south end. Sailing instruction available.',
  },
  // Fitness & Recreation
  {
    id: 440, name: 'St. Francis Community Center', cat: 'Entertainment', subcat: 'Fitness / Recreation',
    town: 'Brant Beach', address: '4700 Long Beach Blvd, Brant Beach, NJ 08008',
    phone: '(609) 494-8861',
    note: 'Fitness center, pool, kids programs, and community events. Open to all.',
  },
  {
    id: 441, name: 'Bayview Park', cat: 'Entertainment', subcat: 'Park / Recreation',
    town: 'Long Beach Township', address: '6805 Long Beach Blvd, Brant Beach, NJ 08008',
    phone: '(609) 361-1000', web: 'https://www.longbeachtownship.com/parks-recreation/',
    note: 'LBT flagship park — guarded bay beach, playground, basketball, volleyball, pickleball, kayak rentals, dog park, free concerts.',
  },
  {
    id: 462, name: 'Long Beach Township Tennis & Pickleball Courts', cat: 'Entertainment', subcat: 'Park / Sports Courts',
    town: 'Long Beach Township', address: 'Township-wide — Holgate (West & W Osborn Ave), 68th St, North Beach & Loveladies',
    web: 'https://www.longbeachtownship.com/parks-recreation/',
    note: 'Tennis & pickleball courts on the north, mid, and south ends, plus bocce and basketball at the 68th St municipal complex. A recreation badge is required for court use May 23 – Sept 7.',
  },
  {
    id: 463, name: 'Beach Haven Terrace Bay Beach', cat: 'Entertainment', subcat: 'Bay Beach / Recreation',
    town: 'Long Beach Township', address: 'New Jersey Ave & 131st St, Beach Haven Terrace, NJ 08008',
    web: 'https://www.longbeachtownship.com/parks-recreation/',
    note: "LBT's second bayside beach (along with Bayview Park) — calm, shallow bay water on the central island.",
  },
  {
    id: 464, name: 'High Bar Harbor Dog Park', cat: 'Entertainment', subcat: 'Dog Park',
    town: 'Long Beach Township', address: 'Arnold Blvd & Butler Blvd, High Bar Harbor, NJ 08006',
    web: 'https://www.longbeachtownship.com/parks-recreation/',
    note: 'Fenced dog park in the secluded High Bar Harbor section. A kayak/paddleboard launch is nearby at Arnold Blvd & Sunset Blvd.',
  },
  {
    id: 465, name: 'Hideaway Nature Trail & Kayak Launches', cat: 'Entertainment', subcat: 'Nature Trail / Kayak',
    town: 'Long Beach Township', address: 'W 105th St, Long Beach Township, NJ 08008',
    web: 'https://www.longbeachtownship.com/parks-recreation/',
    note: 'Bayside walking trail with kayak and paddleboard launches (Hideaway Bay at W 105th St, plus 93rd St near the Acme). Part of LBT\'s land-and-water trail network.',
  },
  // Parks & Nature — May 2026
  {
    id: 444, name: 'Barnegat Lighthouse State Park', cat: 'Entertainment', subcat: 'State Park / Nature',
    town: 'Barnegat Light', address: '208 Broadway, Barnegat Light, NJ 08006',
    phone: '(609) 494-2016', web: 'https://dep.nj.gov/parksandforests/state-park/barnegat-lighthouse-state-park/',
    note: '32-acre state park with "Old Barney" lighthouse (172 steps, panoramic views). Walking trails, fishing jetty, picnic shelters, maritime forest. Free to enter; fee to climb.',
  },
  {
    id: 445, name: 'Bay Breeze Park', cat: 'Entertainment', subcat: 'Park / Recreation',
    town: 'Barnegat Light', address: '20 W 6th St, Barnegat Light, NJ 08006',
    web: 'https://barnegatlight.org/gallery/parks-and-recreation/',
    note: 'Bayside municipal park with pavilion. Free summer concerts every Monday evening.',
  },
  {
    id: 446, name: 'Barnegat Light Dog Park', cat: 'Entertainment', subcat: 'Dog Park',
    town: 'Barnegat Light', address: '15 W 10th St, Barnegat Light, NJ 08006',
    web: 'https://barnegatlight.org/departments/recreation-department/',
    note: 'Fenced off-leash dog park. Paw Pass required — $30/yr or $15/wk non-residents. Open Apr–Oct. Proof of rabies vaccination required.',
  },
  {
    id: 466, name: 'Barnegat Light Skate Park', cat: 'Entertainment', subcat: 'Skate Park',
    town: 'Barnegat Light', address: 'W 10th St, Barnegat Light, NJ 08006',
    web: 'https://barnegatlight.org/departments/recreation-department/',
    note: 'Skateboard and inline-skate park, open 9am–dusk. Helmet, knee pads, and elbow pads required.',
  },
  {
    id: 467, name: 'Barnegat Light Tennis & Pickleball Courts', cat: 'Entertainment', subcat: 'Park / Sports Courts',
    town: 'Barnegat Light', address: 'W 11th St, Barnegat Light, NJ 08006',
    web: 'https://barnegatlight.org/departments/recreation-department/',
    note: 'Public tennis courts by the Beach Badge Booth (beach badge or hourly fee), open 8am–6pm daily in season. Pickleball courts require a pass — free for Barnegat Light homeowners, paid for non-homeowners.',
  },
  {
    id: 447, name: 'Sunset Park', cat: 'Entertainment', subcat: 'Park / Recreation',
    town: 'Harvey Cedars', address: 'W Salem Ave at 75th St, Harvey Cedars, NJ 08008',
    phone: '(609) 361-9733', web: 'https://www.harveycedars.org/',
    note: 'Main bayside park (9+ acres) — playground, tennis, pickleball, basketball, fishing dock, kayak/SUP launch, restrooms. Free Wednesday evening concerts. Annual Arts Festival.',
  },
  {
    id: 448, name: 'Zachariae Recreational Area', cat: 'Entertainment', subcat: 'Park / Recreation',
    town: 'Surf City', address: 'S 1st St & Barnegat Ave, Surf City, NJ 08008',
    web: 'https://surfcitynj.org/',
    note: 'Municipal rec area with playground, tennis, pickleball, and basketball courts.',
  },
  {
    id: 449, name: 'Division St Bay Beach & Boat Ramp', cat: 'Entertainment', subcat: 'Bay Beach / Boat Ramp',
    town: 'Surf City', address: 'Division St at the Bay, Surf City, NJ 08008',
    web: 'https://surfcitynj.org/beaches/',
    note: 'Public boat ramp with floating dock. Adjacent 16th St Bay Beach has lifeguards, pavilion, shallow swimming. Daily $20 launch fee.',
  },
  {
    id: 468, name: 'Earl G. & Inez Batts Recreation Complex', cat: 'Entertainment', subcat: 'Park / Recreation',
    town: 'Surf City', address: 'By the Surf City Community Center & Athletic Complex, Surf City, NJ 08008',
    web: 'https://surfcity.recdesk.com/Community/Facility',
    note: 'New ~45-acre recreation complex (Phase 1): skatepark, inclusive playground, two sand volleyball courts, picnic shelter, restrooms, parking, and walking paths.',
  },
  {
    id: 450, name: 'Robert W. Nissen Park', cat: 'Entertainment', subcat: 'Park / Recreation',
    town: 'Ship Bottom', address: '10th–12th St at the Bay, Ship Bottom, NJ 08008',
    phone: '(609) 290-0782', web: 'https://shipbottom.org/government/departments/parks-recreation/',
    note: 'Bayside park with boat ramp, jet ski launch, playground, boardwalk, pavilion, bike path, and restrooms. Summer concerts on-site.',
  },
  {
    id: 451, name: 'Sunset Point Park', cat: 'Entertainment', subcat: 'Park / Recreation',
    town: 'Ship Bottom', address: '13th–16th St at the Bay, Ship Bottom, NJ 08008',
    web: 'https://shipbottom.org/government/departments/parks-recreation/',
    note: 'Bay beach with shallow swimming, lifeguards in season, playground, restrooms, and gazebo.',
  },
  {
    id: 458, name: 'John J. Guld Jr. Recreation & Ball Field', cat: 'Entertainment', subcat: 'Park / Sports Courts',
    town: 'Ship Bottom', address: 'W 5th & 6th St at Barnegat Ave, Ship Bottom, NJ 08008',
    web: 'https://shipbottom.org/government/departments/parks-recreation/',
    note: 'Ship Bottom\'s main recreation field — tennis courts, bocce ball, shuffleboard, horseshoes, and a baseball field.',
  },
  {
    id: 459, name: '4th Street Remembrance Park', cat: 'Entertainment', subcat: 'Park / Recreation',
    town: 'Ship Bottom', address: '4th St, Ship Bottom, NJ 08008',
    web: 'https://shipbottom.org/government/departments/parks-recreation/',
    note: 'Quiet bayside park with a scenic bay walk, gardens, and parking.',
  },
  {
    id: 460, name: 'Bayside Fishing & Crabbing Pier (25th St)', cat: 'Entertainment', subcat: 'Fishing Pier / Park',
    town: 'Ship Bottom', address: '25th St at the Bay, Ship Bottom, NJ 08008',
    web: 'https://shipbottom.org/government/departments/parks-recreation/',
    note: 'Boardwalk, pavilion, and benches with a dedicated crabbing area and fishing pier. A favorite sunset spot.',
  },
  {
    id: 461, name: 'Bayside Pocket Parks (5th & 20th St)', cat: 'Entertainment', subcat: 'Park / Recreation',
    town: 'Ship Bottom', address: '5th St & 20th St at the Bay, Ship Bottom, NJ 08008',
    web: 'https://shipbottom.org/government/departments/parks-recreation/',
    note: 'Small bayfront pocket parks with gazebos and benches — quiet spots for sunset views over Barnegat Bay.',
  },
  {
    id: 452, name: 'Veterans Bicentennial Park', cat: 'Entertainment', subcat: 'Park / Recreation',
    town: 'Beach Haven', address: 'Engleside Ave & Amber St, Beach Haven, NJ 08008',
    web: 'https://beachhaven-nj.gov/venue/veterans-park/',
    note: '4.7-acre park in the heart of Beach Haven. Tennis, summer concerts, flea markets, food festivals, and art shows.',
  },
  {
    id: 453, name: 'Nelson Avenue Park', cat: 'Entertainment', subcat: 'Park / Recreation',
    town: 'Beach Haven', address: 'Nelson Ave, Beach Haven, NJ 08008',
    web: 'https://beachhaven-nj.gov/departments/recreation/municipal-playgrounds/',
    note: "LBI's premier pickleball center — 6 courts. Also playground and restrooms.",
  },
  {
    id: 454, name: 'Taylor Avenue Bayfront Park', cat: 'Entertainment', subcat: 'Park / Recreation',
    town: 'Beach Haven', address: 'Taylor Ave & Bay Ave, Beach Haven, NJ 08008',
    web: 'https://beachhaven-nj.gov/departments/recreation/municipal-playgrounds/',
    note: 'Bayside park with playground, three pavilions, restrooms, and bay beach. Great for young swimmers. Free entry.',
  },
  {
    id: 455, name: 'Beach Haven Dog Beach', cat: 'Entertainment', subcat: 'Dog Park',
    town: 'Beach Haven', address: 'Taylor Ave at the Bay, Beach Haven, NJ 08008',
    phone: '(609) 492-0111', web: 'https://beachhaven-nj.gov/departments/recreation/beach-information/',
    note: 'Off-leash dog bay beach — Sept 16 through May 14 only. Shallow water, great for swimming dogs. Free.',
  },
  {
    id: 456, name: 'Beach Haven Boat Ramp', cat: 'Entertainment', subcat: 'Bay Beach / Boat Ramp',
    town: 'Beach Haven', address: '9th St & Boat Ramp Dr, Beach Haven, NJ 08008',
    web: 'https://beachhaven-nj.gov/departments/recreation/municipal-ramp/',
    note: 'Southernmost public boat ramp on LBI. Passes required June 15–Sept 15. Free kayak/paddleboard launch from Pearl Street floating dock.',
  },
  {
    id: 457, name: 'Holgate Wildlife Refuge', cat: 'Entertainment', subcat: 'Nature Reserve / Wildlife',
    town: 'Long Beach Township', address: 'End of Long Beach Blvd, Holgate, NJ 08008',
    phone: '(609) 652-1665', web: 'https://www.fws.gov/refuge/edwin-b-forsythe',
    note: '400+ acres of undeveloped barrier beach, dunes, and salt marsh at LBI\'s southern tip. Piping plover nesting habitat — closed Apr 1–Aug 31. Birdwatching, hiking, beach driving (4WD permit req). No dogs.',
  },
  {
    id: 443, name: 'Surflight Theatre', cat: 'Entertainment', subcat: 'Theater / Arts',
    town: 'Beach Haven', address: '201 Engleside Ave, Beach Haven, NJ 08008',
    phone: '(609) 492-9477', web: 'https://surflight.org',
    note: 'Professional summer stock theatre on LBI since 1950. A National Historic Register landmark — Broadway-caliber productions all season.',
  },
  {
    id: 442, name: 'Loveladies Harbor Organization', cat: 'Entertainment', subcat: 'Non-Profit / Community',
    town: 'Long Beach Township', address: 'Loveladies, Long Beach Twp, NJ 08008',
    phone: '(732) 773-6578',
    note: 'Community organization for the Loveladies neighborhood area.',
  },
]

// ─────────────────────────────────────────────
// LODGING
// ─────────────────────────────────────────────
export const lodging: Business[] = [
  {
    id: 501, name: 'Hotel LBI', cat: 'Lodging', subcat: 'Boutique Hotel',
    town: 'Ship Bottom', address: '350 W 8th Street, Ship Bottom, NJ 08008',
    phone: '(609) 467-8000', web: 'https://www.hotellbi.com',
    note: 'Premier boutique hotel. Home of the Salt Kitchen & Bar. Rated 9.4 by guests.',
  },
  {
    id: 502, name: "Daddy O's Restaurant & Hotel", cat: 'Lodging', subcat: 'Boutique Hotel',
    town: 'Brant Beach', address: '4401 Long Beach Blvd, Brant Beach, NJ 08008',
    phone: '(609) 494-1300', web: 'https://www.daddyohotel.com',
    note: 'Stylish boutique hotel with acclaimed restaurant. Mid-island location.',
  },
  {
    id: 503, name: 'Surf City Hotel', cat: 'Lodging', subcat: 'Hotel',
    town: 'Surf City', address: '800 N Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-7281', web: 'https://www.surfcityhotel.com',
    note: 'Historic LBI hotel with full restaurant and lively bar scene.',
  },
  {
    id: 504, name: 'Drifting Sands Oceanfront Hotel', cat: 'Lodging', subcat: 'Oceanfront Motel',
    town: 'Ship Bottom', address: 'E 9th Street, Ship Bottom, NJ 08008',
    phone: '(609) 494-1123',
    note: 'Budget-friendly oceanfront motel. Steps from the beach.',
  },
  {
    id: 505, name: "Hurley's at Holgate Motel", cat: 'Lodging', subcat: 'Motel',
    town: 'Long Beach Township', address: '4804 S Long Beach Blvd, Holgate, NJ 08008',
    phone: '(609) 492-2266',
    note: 'Quiet south-end motel near the Holgate wildlife refuge.',
  },
  {
    id: 506, name: 'The Sand Castle Bed & Breakfast', cat: 'Lodging', subcat: 'Bed & Breakfast',
    town: 'Barnegat Light', address: '710 Bayview Ave, Barnegat Light, NJ 08006',
    phone: '(609) 494-6555',
    note: 'Charming B&B on the north end near the lighthouse. Breakfast included.',
  },
  {
    id: 507, name: 'The Beach Club at Pearl Street', cat: 'Lodging', subcat: 'Hotel',
    town: 'Beach Haven', address: '310 S Atlantic Ave, Beach Haven, NJ 08008',
    phone: '(609) 709-5051',
    note: 'Beachside lodging in the heart of Beach Haven.',
  },
  {
    id: 508, name: 'Coral Seas Oceanfront Motel', cat: 'Lodging', subcat: 'Oceanfront Motel',
    town: 'Beach Haven', address: 'Beach Haven, NJ 08008',
    web: 'https://coralseasmotel.com',
    note: 'Family-friendly 50-room oceanfront motel directly on the beach.',
  },
  {
    id: 509, name: 'North Shore Inn', cat: 'Lodging', subcat: 'Inn',
    town: 'Barnegat Light', address: '806 Central Ave, Barnegat Light, NJ 08006',
    phone: '(609) 494-5001',
    note: 'Comfortable inn steps from Old Barney lighthouse.',
  },
  {
    id: 510, name: 'The Boulevard Hotel', cat: 'Lodging', subcat: 'Boutique Hotel',
    town: 'Long Beach Township', address: '13401 Long Beach Blvd, Beach Haven Gardens, NJ 08008',
    phone: '(609) 492-1235', web: 'https://theboulevardhotelnj.com',
    note: 'Renovated boutique hotel in Beach Haven Gardens, steps from the beach (formerly the Mariner Inn).',
  },
  {
    id: 511, name: 'Sea Horse Motel', cat: 'Lodging', subcat: 'Motel',
    town: 'Brant Beach', address: '43rd & Long Beach Blvd, Brant Beach, NJ 08008',
    phone: '(609) 494-5392',
    note: 'Affordable motel in the Brant Beach area.',
  },
  {
    id: 512, name: 'Spray Beach Oceanfront Hotel', cat: 'Lodging', subcat: 'Oceanfront Hotel',
    town: 'Long Beach Township', address: '200 E 24th St, Spray Beach, NJ 08008',
    web: 'https://spraybeachhotel.com',
    note: 'Oceanfront hotel in Beach Haven. Famous for nightly live music and tiki bar. World-class Bloody Mary.',
  },
  {
    id: 513, name: 'The Sea Shell Resort & Beach Club', cat: 'Lodging', subcat: 'Resort',
    town: 'Beach Haven', address: '10 S Atlantic Ave, Beach Haven, NJ 08008',
    web: 'https://theseashellresort.com',
    note: 'Full resort with oceanfront rooms, pool, tiki bar, and on-site nightclub. One of LBI\'s largest entertainment destinations.',
  },
]

// ─────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────
export const services: Business[] = [
  // Real Estate
  {
    id: 601, name: 'Freeman & Company Real Estate', cat: 'Services', subcat: 'Real Estate',
    town: 'Harvey Cedars', address: '7601 Long Beach Blvd, Harvey Cedars, NJ 08008',
    phone: '(609) 900-3534', web: 'https://www.freemanrealestate.com',
    note: 'Full-service real estate agency covering all of LBI.',
  },
  {
    id: 602, name: 'Berkshire Hathaway HomeServices Zack Shore Realtors', cat: 'Services', subcat: 'Real Estate',
    town: 'Long Beach Township', address: '2900 S Long Beach Blvd, Long Beach Twp, NJ 08008',
    phone: '(609) 492-7277', web: 'https://www.zackshore.com',
    note: 'Premier real estate brokerage on LBI with decades of experience.',
  },
  {
    id: 603, name: 'Mancini Realty Company, Inc.', cat: 'Services', subcat: 'Real Estate',
    town: 'Brant Beach', address: 'S 32nd Street, Brant Beach, NJ 08008',
    phone: '(609) 492-2256',
    note: 'Long-established independent realty firm on LBI.',
  },
  {
    id: 604, name: 'The Van Dyk Group LBI', cat: 'Services', subcat: 'Real Estate / Insurance',
    town: 'Long Beach Township', address: 'Long Beach Blvd, Long Beach Twp, NJ 08008',
    phone: '(609) 492-1511',
    note: 'Real estate and financial services for the LBI market.',
  },
  {
    id: 605, name: 'Vacation Rentals LBI (VRLBI)', cat: 'Services', subcat: 'Property Management',
    town: 'Ship Bottom', address: '518 Central Ave, Ship Bottom, NJ 08008',
    phone: '(609) 848-8831', web: 'https://www.vrlbi.com',
    note: 'Full-service vacation rental and property management company.',
  },
  // Marine & Boat Services
  {
    id: 610, name: 'MarineMax Brant Beach Marina', cat: 'Services', subcat: 'Marina / Boat Service',
    town: 'Brant Beach', address: 'Brant Beach, NJ 08008',
    web: 'https://www.marinemax.com/marinas/brant-beach',
    note: 'Full-service marina with boat sales, service, and slips.',
  },
  // Construction & Home
  {
    id: 620, name: 'HMG Construction', cat: 'Services', subcat: 'Construction',
    town: 'Ship Bottom', address: '519 Central Ave, Ship Bottom, NJ 08008',
    phone: '(609) 991-8808',
    note: 'Local construction company specializing in LBI shore homes.',
  },
  {
    id: 621, name: 'HMG Plumbing LLC', cat: 'Services', subcat: 'Plumbing / HVAC',
    town: 'Ship Bottom', address: '519 Central Ave, Ship Bottom, NJ 08008',
    phone: '(609) 991-9929',
    note: 'Plumbing, heating, and air conditioning services for LBI properties.',
  },
  // Pet & Concierge
  {
    id: 630, name: 'Sandy Paws Dog Sitting, LLC', cat: 'Services', subcat: 'Pet Services',
    town: 'Brant Beach', address: '17 E 34th Street, Brant Beach, NJ 08008',
    phone: '(609) 494-5554',
    note: 'Dog sitting and pet care services for LBI vacationers.',
  },
  {
    id: 631, name: 'Relax Concierge LBI', cat: 'Services', subcat: 'Concierge / Rentals',
    town: 'Ship Bottom', address: '2421 Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 601-5077',
    note: 'Linen, crib, beach gear rentals and concierge services for vacation rentals.',
  },
  {
    id: 632, name: 'Luggers', cat: 'Services', subcat: 'Moving / Delivery',
    town: 'LBI', phone: '(609) 934-3194',
    note: 'Local moving, delivery, and hauling service.',
  },
  // Publication & Media
  {
    id: 640, name: 'The SandPaper', cat: 'Services', subcat: 'Local Publication',
    town: 'Surf City', address: '1816 Long Beach Blvd, Surf City, NJ 08008',
    phone: '(609) 494-5900', web: 'https://www.thesandpaper.net',
    note: 'LBI\'s local weekly newspaper since 1976. Best source for island news and events.',
  },
  // Medical & Wellness
  {
    id: 641, name: 'Meridian Urgent Care LBI', cat: 'Services', subcat: 'Urgent Care',
    town: 'Ship Bottom', address: '901 S Long Beach Blvd, Ship Bottom, NJ 08008',
    phone: '(609) 361-2677',
    note: 'Walk-in urgent care on the island. Mon–Fri 8 AM–6 PM, Sat 8 AM–4 PM. No appointment needed.',
  },
  {
    id: 643, name: 'Brennan Fuel', cat: 'Services', subcat: 'Gas / Fuel',
    town: 'Ship Bottom', address: '237 W 8th St, Ship Bottom, NJ 08008',
    note: 'Gas station and fuel service. Ship Bottom location near the causeway.',
  },
  {
    id: 644, name: 'Brennan Fuel', cat: 'Services', subcat: 'Gas / Fuel',
    town: 'Long Beach Township', address: '13601 Long Beach Blvd, Beach Haven Gardens, NJ 08008',
    note: 'Gas station and fuel service. Mid-island location.',
  },
  {
    id: 642, name: 'Island Wellness Center & Yoga', cat: 'Services', subcat: 'Spa / Yoga',
    town: 'Beach Haven', address: 'Beach Haven, NJ 08008',
    web: 'https://iwc.massagetherapy.com',
    note: 'Massage therapy, Watsu, reiki, beach yoga, and body-mind counseling. A true wellness retreat on LBI.',
  },
]

// ─────────────────────────────────────────────
// ALL BUSINESSES (combined export)
// ─────────────────────────────────────────────
export const allBusinesses: Business[] = [
  ...dining,
  ...shopping,
  ...waterSports,
  ...nightlife,
  ...entertainment,
  ...lodging,
  ...services,
]

// Category metadata for UI use
export const businessCategoryMeta: Record<BusinessCategory, { color: string; description: string }> = {
  'Dining':               { color: '#e76f51', description: 'Restaurants, cafes, delis, groceries & sweet treats' },
  'Shopping':             { color: '#2a9d8f', description: 'Surf shops, boutiques, gifts, home decor & pharmacies' },
  'Water Sports & Rentals': { color: '#0077b6', description: 'Boat rentals, surf lessons, kayaks & fishing charters' },
  'Nightlife':            { color: '#6b21a8', description: 'Bars, breweries, live music venues & late-night spots' },
  'Entertainment':        { color: '#7c3aed', description: 'Amusement parks, mini golf, museums, marinas & more' },
  'Lodging':              { color: '#f4a261', description: 'Hotels, motels, bed & breakfasts, and inns' },
  'Services':             { color: '#457b9d', description: 'Real estate, marine services, pet care & local essentials' },
}

// All towns on LBI for filtering
export const lbiTowns = [
  'Barnegat Light',
  'Harvey Cedars',
  'Surf City',
  'Ship Bottom',
  'Brant Beach',
  'Beach Haven Gardens',
  'Beach Haven Terrace',
  'Beach Haven Park',
  'Long Beach Township',
  'Beach Haven',
  'Holgate',
] as const

export type LBITown = (typeof lbiTowns)[number]
