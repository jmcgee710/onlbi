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
  cta?: string // optional link cue shown under the price, e.g. "View calendar ↗"
  // Season window for THIS year, as ISO 'YYYY-MM-DD'. Leave blank ('') if
  // unknown — the card just won't show a season badge. seasonCloses is
  // optional (omit/blank for venues that stay open year-round).
  // ⚠️  Fill these in each spring alongside the rest of this list.
  seasonOpens?: string
  seasonCloses?: string
}

export const todayEvents: LBIEvent[] = [
  {
    title: 'Fantasy Island Amusement Park',
    venue: 'Beach Haven',
    time: '5 PM – 9 PM',
    cat: 'Family',
    free: false,
    price: 'Varies',
    web: 'https://fantasyislandlbi.com',
    recurring: 'Rides Fri–Sun now · full season daily from Jun 12',
    // PRE-SEASON now: rides Fri/Sat/Sun 5–9pm, arcade daily noon–7pm.
    // FULL SEASON from Fri Jun 12 (Guest Appreciation Day — $15 unlimited
    //   rides): arcade daily noon–midnight, rides 4–11pm. Last ride day Sat
    //   Oct 3. → On Jun 12, set time → '4 PM – 11 PM' and
    //   recurring → 'Daily · arcade noon–midnight'.
    // Season badge intentionally left off — the recurring line already states
    //   the schedule. Set seasonOpens/seasonCloses to re-enable it.
    seasonOpens: '',
    seasonCloses: '',
  },
  {
    title: 'Thundering Surf Water Park',
    venue: 'Beach Haven',
    time: '', // hours not posted yet for the season
    cat: 'Family',
    free: false,
    price: 'Varies',
    web: 'https://thunderingsurf.com',
    recurring: '',
    seasonOpens: '2026-06-13',
    seasonCloses: '',
  },
  {
    title: 'Surflight Theatre',
    venue: 'Beach Haven',
    time: 'Show times & dates vary',
    cat: 'Arts',
    free: false,
    price: '$14–$49.50',
    web: 'https://surflight.org/calendar',
    cta: 'View calendar ↗',
    seasonOpens: '',
    seasonCloses: '',
  },
  {
    title: 'Bay Breeze Park Summer Concerts',
    venue: 'Barnegat Light',
    time: '7 PM – 9 PM',
    cat: 'Music',
    free: true,
    price: 'Free',
    recurring: 'Mondays in season',
    seasonOpens: '',
    seasonCloses: '',
  },
  {
    title: 'Sunset Park Wednesday Concerts',
    venue: 'Harvey Cedars',
    time: '7 PM – 9 PM',
    cat: 'Music',
    free: true,
    price: 'Free',
    recurring: 'Wednesdays in season',
    seasonOpens: '',
    seasonCloses: '',
  },
]
