import { useEffect, useState } from 'react'

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
  ico: 'Sun' | 'CloudSun' | 'Cloud' | 'Rain'
  wind: string // "SSW 10"
  shortForecast: string // "Sunny"
  precipPct: number // 0-100
  score: number // 0-100 crude beach-day score
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

// Crude beach-day score: starts at 100, loses points for precipitation chance
// and a bit for low temps. Refine over time as more signals come in.
function scoreDay(precipPct: number, hi: number, ico: ForecastDay['ico']): number {
  let s = 100 - precipPct
  if (hi < 70) s -= 15
  if (hi < 60) s -= 15
  if (ico === 'Cloud') s -= 5
  return Math.max(0, Math.min(100, Math.round(s)))
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

        // Pair day+night periods into days. If the first period is a night
        // period (after sunset), today only has a low temperature.
        const days: ForecastDay[] = []
        let i = 0
        let isFirstSlot = true
        while (i < periods.length && days.length < 5) {
          const p = periods[i]
          const precipPct = p.probabilityOfPrecipitation?.value ?? 0
          const ico = mapIcon(p.shortForecast)
          if (!p.isDaytime) {
            // Standalone night period (only happens for "Tonight" on the first slot)
            days.push({
              dow: isFirstSlot ? 'Tonight' : dayOfWeek(p.startTime),
              hi: p.temperature, // no day data — use night temp as best signal
              lo: p.temperature,
              ico,
              wind: windShort(p.windSpeed, p.windDirection),
              shortForecast: p.shortForecast,
              precipPct,
              score: scoreDay(precipPct, p.temperature, ico),
            })
            i++
          } else {
            const night = periods[i + 1]
            const hi = p.temperature
            const lo = night?.temperature ?? p.temperature
            days.push({
              dow: isFirstSlot ? 'Today' : dayOfWeek(p.startTime),
              hi,
              lo,
              ico,
              wind: windShort(p.windSpeed, p.windDirection),
              shortForecast: p.shortForecast,
              precipPct,
              score: scoreDay(precipPct, hi, ico),
            })
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
