import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useBuoy — fetch the latest observation from an NDBC buoy.
// Source: https://www.ndbc.noaa.gov/data/realtime2/{station}.txt
//   - Free, no API key, plain text, CORS-enabled
//   - Updated every ~10 min when the buoy is up
//   - Returns most-recent reading first
// Buoy 44091 ("Barnegat") is the closest offshore buoy to LBI.
// ─────────────────────────────────────────────────────────────────────────────

export type BuoyReading = {
  waveHeightFt: number | null
  wavePeriodSec: number | null
  waveDir: string | null // compass like "SE"
  waveDirDeg: number | null
  waterTempF: number | null
  windSpeedMph: number | null
  windDir: string | null
  windDirDeg: number | null
  observedAt: Date
}

const COMPASS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const

function degToCompass(deg: number | null): string | null {
  if (deg === null || Number.isNaN(deg)) return null
  return COMPASS[Math.round(deg / 22.5) % 16] ?? null
}

/** NDBC missing-data sentinel is "MM"; parse helper returns null for that. */
function num(token: string | undefined): number | null {
  if (!token || token === 'MM') return null
  const n = parseFloat(token)
  return Number.isNaN(n) ? null : n
}

function parseBuoyText(text: string): BuoyReading | null {
  // Skip comment header lines (start with #); the first remaining line is
  // the most recent observation.
  const dataLines = text.split('\n').filter((l) => l.trim() && !l.startsWith('#'))
  if (dataLines.length === 0) return null
  const tokens = dataLines[0].trim().split(/\s+/)
  // Header order (realtime2): YY MM DD hh mm WDIR WSPD GST WVHT DPD APD MWD PRES ATMP WTMP DEWP VIS PTDY TIDE
  const [yy, mo, dd, hh, mi, wdir, wspd, , wvht, dpd, , mwd, , , wtmp] = tokens

  const waveHeightM = num(wvht)
  const wtmpC = num(wtmp)
  const wspdMs = num(wspd)
  const wdirDeg = num(wdir)
  const mwdDeg = num(mwd)

  return {
    waveHeightFt: waveHeightM !== null ? waveHeightM * 3.28084 : null,
    wavePeriodSec: num(dpd),
    waveDir: degToCompass(mwdDeg),
    waveDirDeg: mwdDeg,
    waterTempF: wtmpC !== null ? wtmpC * (9 / 5) + 32 : null,
    windSpeedMph: wspdMs !== null ? wspdMs * 2.23694 : null,
    windDir: degToCompass(wdirDeg),
    windDirDeg: wdirDeg,
    observedAt: new Date(
      Date.UTC(
        Number(yy),
        Number(mo) - 1,
        Number(dd),
        Number(hh),
        Number(mi),
      ),
    ),
  }
}

export function useBuoy(station: string) {
  const [reading, setReading] = useState<BuoyReading | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const url = `https://www.ndbc.noaa.gov/data/realtime2/${station}.txt`

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`NDBC ${station} returned ${r.status}`)
        return r.text()
      })
      .then((text) => {
        if (cancelled) return
        const parsed = parseBuoyText(text)
        if (!parsed) throw new Error('No buoy observations in response')
        setReading(parsed)
        // eslint-disable-next-line no-console
        console.log(`[useBuoy ${station}] reading at`, parsed.observedAt, parsed)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const msg = err instanceof Error ? err.message : String(err)
        setError(msg)
        // eslint-disable-next-line no-console
        console.warn(`[useBuoy ${station}] falling back / hiding:`, msg)
      })

    return () => {
      cancelled = true
    }
  }, [station])

  return { reading, error, loading: reading === null && error === null }
}
