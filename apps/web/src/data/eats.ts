export const restaurants = [
  { name: "Kubel's",                  town: 'Barnegat Light', cat: 'Seafood',    wait: '20 min', rating: 4.7, price: '$$',  open: true,  note: 'Cash only, BYOB, legendary crab cakes',       icon: '🦀' },
  { name: 'Black Whale',              town: 'Beach Haven',    cat: 'Bar & Grill', wait: '35 min', rating: 4.5, price: '$$',  open: true,  note: 'Best fish tacos on the island',                icon: '🐋' },
  { name: 'Daddy O',                  town: 'Beach Haven',    cat: 'Upscale',    wait: '45 min', rating: 4.8, price: '$$$', open: true,  note: 'Farm-to-table, amazing cocktails',              icon: '🍽️' },
  { name: 'The Chicken or the Egg',   town: 'Beach Haven',    cat: 'Breakfast',  wait: '25 min', rating: 4.6, price: '$',   open: true,  note: 'Best breakfast spot, get there early',          icon: '🍳' },
  { name: "Buckalew's",               town: 'Beach Haven',    cat: 'Sports Bar', wait: '15 min', rating: 4.3, price: '$$',  open: true,  note: 'Great deck, lively atmosphere',                icon: '🍺' },
  { name: "Stefano's",                town: 'Beach Haven',    cat: 'Italian',    wait: '50 min', rating: 4.7, price: '$$$', open: true,  note: 'BYOB Italian, reservations strongly advised',  icon: '🍝' },
  { name: 'Harvey Cedars Shellfish',  town: 'Harvey Cedars',  cat: 'Raw Bar',    wait: '10 min', rating: 4.9, price: '$$',  open: false, note: 'Opens 4 PM · Raw bar perfection',              icon: '🦪' },
  { name: "Scojo's",                  town: 'Surf City',      cat: 'Casual',     wait: '20 min', rating: 4.4, price: '$',   open: true,  note: 'Great wraps and sandwiches',                   icon: '🌯' },
]

export const happyHours = [
  {
    id: 1, name: "Buckalew's Restaurant & Bar", town: 'Beach Haven', emoji: '🍺',
    hours: '4 PM – 6 PM', status: 'active', closesIn: 'Ends in 38 min', opensIn: null,
    deals: ['$2 off all drafts', '$5 house cocktails', '$1 oysters (limit 12)', 'Half-price apps'],
    tags: ['Drafts', 'Cocktails', 'Oysters', 'Food'], vibe: 'Lively bar, outdoor deck', price: '$$',
    tip: '🦪 Oysters go fast — get there by 4:15',
  },
  {
    id: 2, name: 'Daddy O Hotel & Bar', town: 'Beach Haven', emoji: '🍹',
    hours: '5 PM – 7 PM', status: 'active', closesIn: 'Ends in 1h 22min', opensIn: null,
    deals: ['$6 craft cocktails', '$4 house wine', '$5 local drafts', '$8 flatbreads'],
    tags: ['Cocktails', 'Wine', 'Food', 'Daily'], vibe: 'Chic boutique hotel bar, rooftop views', price: '$$$',
    tip: '💡 Rooftop fills up — grab a spot early on weekends',
  },
  {
    id: 3, name: 'Blue Water Bar & Grill', town: 'Surf City', emoji: '🌊',
    hours: '3 PM – 5 PM', status: 'upcoming', closesIn: null, opensIn: 'Opens in 1h 10min',
    deals: ['$3 domestic bottles', '$5 frozen drinks', '$6 margaritas', 'Shrimp cocktail $8'],
    tags: ['Beer', 'Frozen Drinks', 'Seafood'], vibe: 'Casual waterfront, bay views', price: '$$',
    tip: '🌅 Best bay sunset views on the island during HH',
  },
  {
    id: 4, name: 'The Bayview Bistro', town: 'Ship Bottom', emoji: '🥂',
    hours: '4:30 PM – 6:30 PM', status: 'upcoming', closesIn: null, opensIn: 'Opens in 1h 45min',
    deals: ['$7 signature sangria', '$5 draft beer', 'Half-off charcuterie board', '$9 lobster bisque'],
    tags: ['Wine', 'Cocktails', 'Food', 'Weekends'], vibe: 'Upscale casual, bay-side patio', price: '$$$',
    tip: '🧀 The charcuterie board is massive — great to share',
  },
  {
    id: 5, name: 'Harvey Cedars Shellfish Co.', town: 'Harvey Cedars', emoji: '🦞',
    hours: '4 PM – 6 PM', status: 'upcoming', closesIn: null, opensIn: 'Opens in 38 min',
    deals: ['$1.50 littleneck clams', '$2 oysters on the half shell', '$5 local craft beer', '$6 white wine'],
    tags: ['Seafood', 'Beer', 'Wine', 'Weekends'], vibe: 'Raw bar paradise, no-frills picnic tables', price: '$$',
    tip: '🐚 Best raw bar on the island, hands down',
  },
  {
    id: 6, name: 'Black Whale Bar & Fish House', town: 'Beach Haven', emoji: '🐋',
    hours: '3 PM – 6 PM', status: 'closed', closesIn: null, opensIn: 'Opens tomorrow 3 PM',
    deals: ['$3 off all cocktails', '$5 wine', '$4 domestic beer', '$10 fish tacos'],
    tags: ['Cocktails', 'Beer', 'Food', 'Daily'], vibe: "Nautical-themed, locals' favorite", price: '$$',
    tip: '🌮 Fish tacos are the move every time',
  },
  {
    id: 7, name: "Kubel's Too", town: 'Barnegat Light', emoji: '🦀',
    hours: '4 PM – 6 PM', status: 'upcoming', closesIn: null, opensIn: 'Opens in 1h 38min',
    deals: ['$4 domestic drafts', '$6 frozen drinks', 'Buy-one-get-one appetizers', '$5 house wine'],
    tags: ['Beer', 'Frozen Drinks', 'Food', 'Daily'], vibe: 'Casual neighborhood bar, North end', price: '$',
    tip: '🦀 Best spot on the north end — worth the drive up',
  },
  {
    id: 8, name: 'The Terrace Tavern', town: 'Beach Haven', emoji: '🎸',
    hours: '5 PM – 7 PM', status: 'upcoming', closesIn: null, opensIn: 'Opens in 2h 05min',
    deals: ['$3 well drinks', '$4 drafts', '$5 house wine', '$7 appetizer specials'],
    tags: ['Beer', 'Cocktails', 'Live Music', 'Weekends'], vibe: 'Dive-ish with live music on weekends', price: '$',
    tip: '🎸 Live music starts at 6 PM on Fridays and Saturdays',
  },
]
