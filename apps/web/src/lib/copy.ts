// ─────────────────────────────────────────────────────────────────────────────
// copy.ts — Human-friendly text helpers for the hero strip.
// Keeps the templated copy free of clinical NWS jargon and gives the tide
// callout a "how soon" component so it reads naturally.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Map clinical NWS shortForecast strings to friendlier copy.
 * NWS uses a small set of canonical strings (~30) — match exactly first,
 * then by substring, then fall back to a casefolded version.
 */
const FORECAST_MAP: Record<string, string> = {
  Sunny: 'Sunny',
  'Mostly Sunny': 'Mostly sunny',
  'Partly Sunny': 'Mix of sun and clouds',
  'Mostly Clear': 'Mostly clear',
  Clear: 'Clear skies',
  'Partly Cloudy': 'Partly cloudy',
  'Mostly Cloudy': 'Mostly cloudy',
  Cloudy: 'Overcast',
  'Slight Chance Showers': 'Chance of a passing shower',
  'Slight Chance Showers And Thunderstorms': 'Chance of a passing storm',
  'Chance Showers': 'Scattered showers possible',
  'Chance Showers And Thunderstorms': 'Scattered storms possible',
  'Showers Likely': 'Showers likely',
  'Showers And Thunderstorms Likely': 'Storms likely',
  Rain: 'Rainy',
  'Light Rain': 'Light rain',
  'Heavy Rain': 'Heavy rain',
  Showers: 'Showers',
  'Showers And Thunderstorms': 'Showers and storms',
  Thunderstorms: 'Thunderstorms',
  'Patchy Fog': 'Foggy patches',
  Fog: 'Foggy',
  Windy: 'Windy',
  Hot: 'Hot one',
  Breezy: 'Breezy',
}

export function friendlyShortForecast(nws: string): string {
  if (!nws) return 'Clear'
  if (FORECAST_MAP[nws]) return FORECAST_MAP[nws]
  // Substring match (NWS sometimes concatenates: "Mostly Sunny then Slight Chance Showers")
  for (const [k, v] of Object.entries(FORECAST_MAP)) {
    if (nws.includes(k)) return v
  }
  // Last resort: sentence-case the source string
  return nws.charAt(0).toUpperCase() + nws.slice(1).toLowerCase()
}

/**
 * Format the tide-event time relative to the current moment.
 *   < 60 min away  → "in 35 minutes"
 *   < 3 hr away    → "at 4:22 PM (1h 35m away)"
 *   anything else  → "at 4:22 PM"
 * If the event time has already passed today, assumes tomorrow (since NOAA
 * predictions are per-day this is how the "wrap" reads naturally).
 */
export function tideContext(eventTime: string, now: Date): string {
  const m = eventTime.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!m) return `at ${eventTime}`
  let h = Number(m[1])
  const min = Number(m[2])
  const isPM = m[3].toUpperCase() === 'PM'
  if (isPM && h !== 12) h += 12
  if (!isPM && h === 12) h = 0

  const eventMin = h * 60 + min
  const nowMin = now.getHours() * 60 + now.getMinutes()
  let delta = eventMin - nowMin
  if (delta < 0) delta += 24 * 60

  if (delta < 60) {
    return `in ${delta} minute${delta === 1 ? '' : 's'}`
  }
  if (delta < 180) {
    const hrs = Math.floor(delta / 60)
    const mins = delta % 60
    const offset = mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`
    return `at ${eventTime} (${offset} away)`
  }
  return `at ${eventTime}`
}

/**
 * Season status for a "Happening today" venue, computed against `now`.
 *   before seasonOpens          → { kind: 'upcoming', label: 'Opens Jun 21' }
 *   open, with a close date      → { kind: 'open',     label: 'Open · through Sep 7' }
 *   open, no close date          → { kind: 'open',     label: 'Open for the season' }
 *   after seasonCloses           → { kind: 'closed',   label: 'Closed for the season' }
 * Returns null when no open date is set, so the card simply omits the badge.
 * ISO dates are parsed as LOCAL midnight to avoid UTC off-by-one shifts.
 */
export type SeasonStatus = { kind: 'upcoming' | 'open' | 'closed'; label: string }

function parseLocalDate(iso: string): Date | null {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return null
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
}

function fmtMonthDay(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function seasonStatus(
  seasonOpens: string | undefined,
  seasonCloses: string | undefined,
  now: Date,
): SeasonStatus | null {
  const opens = seasonOpens ? parseLocalDate(seasonOpens) : null
  if (!opens) return null
  const closes = seasonCloses ? parseLocalDate(seasonCloses) : null

  // Compare on calendar day, not time of day.
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (today < opens) return { kind: 'upcoming', label: `Opens ${fmtMonthDay(opens)}` }
  if (closes && today > closes) return { kind: 'closed', label: 'Closed for the season' }
  if (closes) return { kind: 'open', label: `Open · through ${fmtMonthDay(closes)}` }
  return { kind: 'open', label: 'Open for the season' }
}
