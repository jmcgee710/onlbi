import { useEffect, useState } from 'react'
import {
  computeBeachDayScore,
  computeBugScore,
  parseWindSpeed,
  type IconType,
} from '../lib/scoring'

// ─────────────────────────────────────────────────────────────────────────────
// useWeather — fetch a 5-day forecast from the National Weather Service.
// Source: api.weather.gov (free, no API key, CORS-enabled, public domain)
//
// NWS uses a two-step lookup:
//   1. /points/{lat},{lon}         → returns the gridpoint forecast URL
//   2. that forecast URL           → returns 14 periods (7 day/night pairs)
//
// We pair day+night periods into "days" with high/low temps for the UI.
// ─────────────────────────────────────────────────────────────────────────────

export type ForecastDay = {
  dow: string // "Today", "Sun", "Mon", ...
  hi: number // °F
  lo: number // °F
  ico: IconType
  wind: string // "SSW 10" display string
  windDir: string // "SSW"
  windSpeed: number // mph, parsed
  shortForecast: string // "Sunny"
  precipPct: number // 0-100
  bugScore: number // 0-100, higher = fewer bugs
  score: number // 0-100 beach-day score (already factors bugs)
}

export type CurrentConditions = {
  temp: number
  shortForecast: string
  windDir: string
  windSpeed: string // "10 mph"
  icon: string // NWS icon URL
}

type NwsPeriod = {
  name: string
  startTime: string
  isDaytime: boolean
  temperature: number
  temperatureUnit: string
  windSpeed: string
  windDirection: string
  icon: string
  shortForecast: string
  probabilityOfPrecipitation?: { value: number | null }
}

function mapIcon(short: string): ForecastDay['ico'] {
  const s = short.toLowerCase()
  if (
    s.includes('rain') ||
    s.includes('shower') ||
    s.includes('storm') ||
    s.includes('drizzle') ||
    s.includes('snow')
  )
    return 'Rain'
  if (s.includes('partly') || s.includes('mostly sunny') || s.includes('mostly clear'))
    return 'CloudSun'
  if (s.includes('cloud') || s.includes('overcast') || s.includes('fog')) return 'Cloud'
  return 'Sun'
}

function dayOfWeek(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'short' })
}

function windShort(windSpeed: string, windDir: string): string {
  // "10 mph" or "10 to 15 mph" → "SSW 10"
  const num = windSpeed.split(' ')[0]
  return `${windDir} ${num}`
}

export function useWeather(lat: number, lon: number) {
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null)
  const [current, setCurrent] = useState<CurrentConditions | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        // Round coordinates per NWS guidance (improves caching at their CDN)
        const lat4 = lat.toFixed(4)
        const lon4 = lon.toFixed(4)
        const pointsRes = await fetch(`https://api.weather.gov/points/${lat4},${lon4}`)
        if (!pointsRes.ok) throw new Error(`NWS /points returned ${pointsRes.status}`)
        const pointsData = (await pointsRes.json()) as {
          properties: { forecast: string }
        }

        const fcRes = await fetch(pointsData.properties.forecast)
        if (!fcRes.ok) throw new Error(`NWS forecast returned ${fcRes.status}`)
        const fcData = (await fcRes.json()) as {
          properties: { periods: NwsPeriod[] }
        }

        if (cancelled) return

        const periods = fcData.properties.periods
        const first = periods[0]
        setCurrent({
          temp: first.temperature,
          shortForecast: first.shortForecast,
          windDir: first.windDirection,
          windSpeed: first.windSpeed,
          icon: first.icon,
        })

        // Build one ForecastDay record per period (or pair of periods).
        // Helper keeps this loop readable; it computes bug score + beach
        // score for the day from wind, temp, precip, and the date.
        const buildDay = (
          dow: string,
          dayP: NwsPeriod,
          night?: NwsPeriod,
        ): ForecastDay => {
          const ico = mapIcon(dayP.shortForecast)
          const hi = dayP.temperature
          const lo = night?.temperature ?? dayP.temperature
          const precipPct = dayP.probabilityOfPrecipitation?.value ?? 0
          const windSpeed = parseWindSpeed(dayP.windSpeed)
          const date = new Date(dayP.startTime)
          const bugScore = computeBugScore(dayP.windDirection, windSpeed, date)
          const score = computeBeachDayScore({
            precipPct,
            hi,
            ico,
            windSpeed,
            bugScore,
          })
          return {
            dow,
            hi,
            lo,
            ico,
            wind: windShort(dayP.windSpeed, dayP.windDirection),
            windDir: dayP.windDirection,
            windSpeed,
            shortForecast: dayP.shortForecast,
            precipPct,
            bugScore,
            score,
          }
        }

        // Pair day+night periods. The first slot may be a standalone "Tonight".
        const days: ForecastDay[] = []
        let i = 0
        let isFirstSlot = true
        while (i < periods.length && days.length < 5) {
          const p = periods[i]
          if (!p.isDaytime) {
            // Standalone night period (only on the first slot when it's evening)
            const dow = isFirstSlot ? 'Tonight' : dayOfWeek(p.startTime)
            days.push(buildDay(dow, p))
            i++
          } else {
            const night = periods[i + 1]
            const dow = isFirstSlot ? 'Today' : dayOfWeek(p.startTime)
            days.push(buildDay(dow, p, night))
            i += 2
          }
          isFirstSlot = false
        }

        setForecast(days)
        // eslint-disable-next-line no-console
        console.log('[useWeather] live NWS forecast loaded:', days)
      } catch (err: unknown) {
        if (cancelled) return
        const msg = err instanceof Error ? err.message : String(err)
        setError(msg)
        // eslint-disable-next-line no-console
        console.warn('[useWeather] falling back to mock:', msg)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [lat, lon])

  return { forecast, current, error, loading: forecast === null && error === null }
}
