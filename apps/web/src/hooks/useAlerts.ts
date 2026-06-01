import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useAlerts — fetch active watches/warnings/advisories from the National
// Weather Service for a lat/long point.
// Source: api.weather.gov/alerts/active (free, no API key, CORS-enabled,
// public domain). Same provider we already use for the forecast.
//
// An empty result is the COMMON, GOOD case ("no active alerts for LBI"). We
// surface that explicitly rather than inventing reassuring statuses.
// ─────────────────────────────────────────────────────────────────────────────

export type AlertSeverity = 'critical' | 'warning' | 'info'

export type LiveAlert = {
  id: string
  severity: AlertSeverity
  cat: string // short category label, e.g. "Weather", "Marine"
  title: string // NWS event name, e.g. "Rip Current Statement"
  body: string // headline/description, trimmed for the card
  instruction?: string // NWS "what to do" text, when present
  area: string // areaDesc
  sender: string // e.g. "NWS Mount Holly NJ"
  time: string // human "X min ago" / "in 2 hrs" relative to onset
  expiresLabel?: string // "Until 8:00 PM" when an end time is known
  active: boolean // false once the alert's end/expiry has passed
}

type NwsAlertProps = {
  event: string
  severity: 'Extreme' | 'Severe' | 'Moderate' | 'Minor' | 'Unknown'
  headline?: string
  description?: string
  instruction?: string | null
  onset?: string | null
  effective?: string | null
  expires?: string | null
  ends?: string | null
  areaDesc?: string
  senderName?: string
  category?: string
  messageType?: string
}

type NwsAlertFeature = {
  id: string
  properties: NwsAlertProps
}

// NWS severity → our three display buckets.
function mapSeverity(s: NwsAlertProps['severity']): AlertSeverity {
  if (s === 'Extreme' || s === 'Severe') return 'critical'
  if (s === 'Moderate') return 'warning'
  return 'info' // Minor / Unknown
}

// A short category chip from the NWS event name.
function categoryOf(event: string): string {
  const e = event.toLowerCase()
  if (e.includes('rip current') || e.includes('surf') || e.includes('beach')) return 'Beach Conditions'
  if (e.includes('marine') || e.includes('small craft') || e.includes('coastal') || e.includes('flood'))
    return 'Marine / Coastal'
  if (e.includes('heat')) return 'Heat'
  return 'Weather'
}

// Relative "8 min ago" / "in 2 hrs" from a reference time to now.
function relativeTime(iso: string | null | undefined, now: Date): string {
  if (!iso) return ''
  const t = new Date(iso).getTime()
  const diffMin = Math.round((now.getTime() - t) / 60000)
  const future = diffMin < 0
  const m = Math.abs(diffMin)
  let phrase: string
  if (m < 1) phrase = 'just now'
  else if (m < 60) phrase = `${m} min`
  else if (m < 60 * 24) {
    const h = Math.round(m / 60)
    phrase = `${h} hr${h === 1 ? '' : 's'}`
  } else {
    const d = Math.round(m / (60 * 24))
    phrase = `${d} day${d === 1 ? '' : 's'}`
  }
  if (phrase === 'just now') return phrase
  return future ? `in ${phrase}` : `${phrase} ago`
}

function timeUntilLabel(iso: string | null | undefined): string | undefined {
  if (!iso) return undefined
  const d = new Date(iso)
  const t = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `Until ${t}`
}

// Trim NWS description (often very long, with hard line breaks) to a usable
// card blurb. Prefer the headline; fall back to the first chunk of description.
function cardBody(p: NwsAlertProps): string {
  if (p.headline && p.headline.length <= 200) return p.headline
  const desc = (p.description || '').replace(/\s*\n\s*/g, ' ').trim()
  if (desc) return desc.length > 240 ? desc.slice(0, 237).trimEnd() + '…' : desc
  return p.headline || p.event
}

export function useAlerts(lat: number, lon: number) {
  const [alerts, setAlerts] = useState<LiveAlert[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const lat4 = lat.toFixed(4)
        const lon4 = lon.toFixed(4)
        const res = await fetch(
          `https://api.weather.gov/alerts/active?point=${lat4},${lon4}`,
          { headers: { Accept: 'application/geo+json' } },
        )
        if (!res.ok) throw new Error(`NWS /alerts returned ${res.status}`)
        const data = (await res.json()) as { features: NwsAlertFeature[] }
        if (cancelled) return

        const now = new Date()
        const mapped: LiveAlert[] = data.features.map((f) => {
          const p = f.properties
          const endIso = p.ends || p.expires || null
          const active = endIso ? new Date(endIso).getTime() > now.getTime() : true
          return {
            id: f.id,
            severity: mapSeverity(p.severity),
            cat: categoryOf(p.event),
            title: p.event,
            body: cardBody(p),
            instruction: p.instruction || undefined,
            area: p.areaDesc || 'Long Beach Island',
            sender: p.senderName || 'National Weather Service',
            time: relativeTime(p.onset || p.effective, now),
            expiresLabel: timeUntilLabel(endIso),
            active,
          }
        })

        // Most severe first, then soonest to expire.
        const rank: Record<AlertSeverity, number> = { critical: 0, warning: 1, info: 2 }
        mapped.sort((a, b) => rank[a.severity] - rank[b.severity])

        setAlerts(mapped)
      } catch (err: unknown) {
        if (cancelled) return
        const msg = err instanceof Error ? err.message : String(err)
        setError(msg)
        // eslint-disable-next-line no-console
        console.warn('[useAlerts] failed to load NWS alerts:', msg)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [lat, lon])

  return { alerts, error, loading: alerts === null && error === null }
}
