// ─────────────────────────────────────────────────────────────────────────────
// EVENTS — Recurring seasonal LBI events, updated each spring
// These represent real annual/weekly recurring events on the island.
// Source: welcometolbi.com/events, individual venue sites
// ⚠️  UPDATE EACH SPRING — dates shift year to year
// ─────────────────────────────────────────────────────────────────────────────

export type LBIEvent = {
  title: string
  venue: string
  time: string
  cat: string
  free: boolean
  price: string
  web?: string
  recurring?: string // e.g. "Every Monday in season"
}

export const todayEvents: LBIEvent[] = [
  {
    title: 'Fantasy Island Amusement Park',
    venue: 'Beach Haven',
    time: '6 PM – 11 PM',
    cat: 'Family',
    free: false,
    price: 'Ride tickets',
    web: 'https://fantasyislandlbi.com',
    recurring: 'Nightly in season',
  },
  {
    title: 'Thundering Surf Water Park',
    venue: 'Beach Haven',
    time: '10 AM – 6 PM',
    cat: 'Family',
    free: false,
    price: 'Admission fee',
    web: 'https://thunderingsurf.com',
    recurring: 'Daily Memorial – Labor Day',
  },
  {
    title: 'Viking Village Fish Market',
    venue: 'Barnegat Light',
    time: '6 AM – 2 PM',
    cat: 'Market',
    free: true,
    price: 'Free entry',
    web: 'https://vikingvillage.net',
    recurring: 'Daily in season',
  },
  {
    title: 'Surflight Theatre',
    venue: 'Beach Haven',
    time: '8 PM',
    cat: 'Arts',
    free: false,
    price: 'Tickets from $35',
    web: 'https://surflight.org',
    recurring: 'Nightly Tue–Sun, June–Sept',
  },
  {
    title: 'Bay Breeze Park Summer Concerts',
    venue: 'Barnegat Light',
    time: '7 PM – 9 PM',
    cat: 'Music',
    free: true,
    price: 'Free',
    recurring: 'Mondays in season',
  },
  {
    title: 'Sunset Park Wednesday Concerts',
    venue: 'Harvey Cedars',
    time: '7 PM – 9 PM',
    cat: 'Music',
    free: true,
    price: 'Free',
    recurring: 'Wednesdays in season',
  },
]
