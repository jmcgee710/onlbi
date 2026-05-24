// ─────────────────────────────────────────────────────────────────────────────
// scoring.ts — Pure functions that turn raw conditions into UI-friendly
// scores and labels. Includes the LBI-specific "bug score" since biting
// flies (greenheads) come off the marshes whenever the wind blows west /
// offshore. The formulas are intentionally tunable — refine as the user
// base grows and you collect real signal.
// ─────────────────────────────────────────────────────────────────────────────

export type WindDirCategory = 'west' | 'east' | 'neutral'

/**
 * Classify a compass wind direction (where the wind comes FROM) relative to
 * LBI's orientation. The island runs N–S with ocean to the east and the
 * mainland marshes to the west, so:
 *   west-component → blows off the mainland → flies arrive
 *   east-component → blows off the ocean → flies blown back
 *   neutral (along-shore) → mild effect either way
 */
export function windDirCategory(dir: string): WindDirCategory {
  const d = dir.toUpperCase().trim()
  if (['W', 'WSW', 'WNW', 'SW', 'NW'].includes(d)) return 'west'
  if (['E', 'ESE', 'ENE', 'NE', 'SE'].includes(d)) return 'east'
  return 'neutral' // N, NNE, NNW, S, SSE, SSW
}

/** Parses NWS wind speed strings like "10 mph" or "10 to 15 mph" to a number. */
export function parseWindSpeed(s: string): number {
  const m = s.match(/(\d+)/)
  return m ? Number(m[1]) : 0
}

/** Greenhead-fly peak season on LBI: roughly July 4 – August 20. */
export function isGreenheadPeak(date: Date): boolean {
  const month = date.getMonth()
  const day = date.getDate()
  if (month === 6 && day >= 4) return true // July from the 4th
  if (month === 7 && day <= 20) return true // August through the 20th
  return false
}

/** Broader biting-fly season: late June through early September. */
export function isFlySeason(date: Date): boolean {
  const month = date.getMonth()
  const day = date.getDate()
  if (month === 5 && day >= 20) return true // late June
  if (month === 6 || month === 7) return true // July, August
  if (month === 8 && day <= 5) return true // early September
  return false
}

/**
 * Bug score: 0 = swarmed, 100 = none. Higher is better.
 * Outside fly season the score is essentially fixed (greenheads aren't out
 * so wind direction doesn't matter). Inside fly season, wind direction is
 * the dominant factor and the season modifier amplifies it.
 */
export function computeBugScore(
  windDir: string,
  windSpeed: number,
  date: Date,
): number {
  if (!isFlySeason(date)) {
    // Light wind anywhere can let normal flying insects hover, but no greenheads
    return windSpeed < 5 ? 80 : 95
  }

  const dirCat = windDirCategory(windDir)
  let score = dirCat === 'west' ? 25 : dirCat === 'east' ? 90 : 60

  // Strong west wind grounds them; very light wind lets them hover anywhere
  if (dirCat === 'west' && windSpeed > 18) score += 20
  if (windSpeed < 5) score -= 10

  // Seasonal severity (we're already inside fly season here)
  if (isGreenheadPeak(date)) {
    if (dirCat === 'west') score -= 20
    else if (dirCat === 'neutral') score -= 10
  } else {
    // Broader season but not peak (late June or early September)
    if (dirCat === 'west') score -= 10
  }

  return Math.max(0, Math.min(100, Math.round(score)))
}

export type BugLevel = 'None' | 'Few' | 'Some' | 'Many' | 'Heavy'

export function classifyBugLevel(score: number): BugLevel {
  if (score >= 85) return 'None'
  if (score >= 65) return 'Few'
  if (score >= 45) return 'Some'
  if (score >= 25) return 'Many'
  return 'Heavy'
}

export type IconType = 'Sun' | 'CloudSun' | 'Cloud' | 'Rain'

/**
 * Refined beach-day score (0-100). Factors precipitation, temp comfort range,
 * cloud cover, wind comfort, and bug pressure. Bonus for the canonical
 * "ideal beach day" (sunny, 78-88°F).
 */
export function computeBeachDayScore(args: {
  precipPct: number
  hi: number
  ico: IconType
  windSpeed: number
  bugScore: number
}): number {
  let s = 100
  // Softer precip penalty — 30% chance shouldn't tank the score; 100% should
  // still hurt a lot. Half-weight keeps it proportional without crashing.
  s -= args.precipPct * 0.5
  if (args.hi < 70) s -= 12
  if (args.hi < 60) s -= 18
  if (args.ico === 'Cloud') s -= 10
  if (args.ico === 'Rain') s -= 25
  if (args.windSpeed > 25) s -= 10

  // Bug penalty scales with severity — bumped up because bugs really do
  // ruin a beach day, especially during greenhead peak.
  if (args.bugScore < 25) s -= 25
  else if (args.bugScore < 45) s -= 12
  else if (args.bugScore < 65) s -= 5

  // Ideal beach day bonus
  if (args.hi >= 78 && args.hi <= 88 && args.ico === 'Sun') s += 5

  return Math.max(0, Math.min(100, Math.round(s)))
}

/**
 * Ocean-conditions penalty (0-30). Applied on top of the weather-only score
 * so that cold water + big waves correctly drag a "perfect weather day" out
 * of the Peak tier when the water isn't actually usable.
 *   - Cold water (< 70°F) → 5–15
 *   - Big waves (≥ 2.5 ft) → 3–15
 * Either input can be null (buoy offline or sensor down) — null contributes 0.
 */
export function computeOceanPenalty(
  waveHeightFt: number | null,
  seaTempF: number | null,
): number {
  let p = 0
  if (seaTempF != null) {
    if (seaTempF < 60) p += 15
    else if (seaTempF < 65) p += 10
    else if (seaTempF < 70) p += 5
  }
  if (waveHeightFt != null) {
    if (waveHeightFt >= 6) p += 15
    else if (waveHeightFt >= 4) p += 8
    else if (waveHeightFt >= 2.5) p += 3
  }
  return p
}

/** Map beach-day score to a tier label matching the bar's quartiles. */
export function scoreTier(score: number): 'Stormy' | 'Decent' | 'Great' | 'Peak' {
  if (score >= 85) return 'Peak'
  if (score >= 70) return 'Great'
  if (score >= 45) return 'Decent'
  return 'Stormy'
}

/** Plain-language verdict suitable for the score card hero line. */
export function scoreVerdict(score: number): string {
  if (score >= 90) return 'A peak day to be on the sand.'
  if (score >= 80) return 'A great day to be on the sand.'
  if (score >= 65) return 'Solid beach day — go.'
  if (score >= 45) return 'Decent — workable with the right spot.'
  if (score >= 25) return 'Tough day — bring a book.'
  return 'Storm day — stay inside.'
}

/** Plain-language wind description for hero copy. */
export function describeWind(speed: number, dir: string): string {
  // Note: callers stitch this into "{forecast} with {windCopy}." — so the
  // result needs to read naturally after "with". "calm" becomes "no wind
  // to speak of" so the sentence isn't "Sunny with calm."
  if (speed === 0) return 'no wind to speak of'
  const d = dir.toUpperCase()
  let strength: string
  if (speed < 5) strength = 'a light'
  else if (speed < 10) strength = 'a gentle'
  else if (speed < 15) strength = 'a moderate'
  else if (speed < 20) strength = 'a brisk'
  else if (speed < 25) strength = 'a strong'
  else strength = 'a howling'
  return `${strength} ${d} breeze`
}

/**
 * Plain-language bug warning suitable for hero copy.
 * Returns '' if no warning is worth surfacing.
 */
export function describeBugs(
  bugScore: number,
  _dirCat: WindDirCategory,
  date: Date,
): string {
  // Off-season: greenheads aren't out, no need to mention bugs at all
  if (!isFlySeason(date)) return ''
  if (bugScore >= 80) return 'Onshore breeze keeping greenheads away.'
  if (bugScore >= 60) return ''
  if (bugScore >= 40) return 'Pack repellent — some greenheads expected.'
  if (bugScore >= 20) return 'West wind has greenheads out — bring DEET.'
  return 'Greenhead swarm — west wind is feeding them.'
}
