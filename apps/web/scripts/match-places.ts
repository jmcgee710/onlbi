/**
 * One-time (re-runnable) matcher: resolves each business in businesses.ts to a
 * Google Place ID via Places API (New) Text Search, and writes the result to
 * src/data/placeIds.json.
 *
 * Place IDs may be cached indefinitely under Google's terms, so committing this
 * file is fine. Photo bytes are NOT stored here — the /api/biz-photo edge
 * function fetches those at request time and caches them at the edge.
 *
 * Run from apps/web:   pnpm match-places
 * Requires GOOGLE_PLACES_API_KEY in the environment or in apps/web/.env.local
 *
 * Re-runs are incremental: businesses already present in placeIds.json are
 * skipped, so you only spend API calls on new/unmatched entries.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { allBusinesses } from '../src/data/businesses.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../src/data/placeIds.json')

// Load API key from env or apps/web/.env.local (gitignored — never committed).
function apiKey(): string {
  if (process.env.GOOGLE_PLACES_API_KEY) return process.env.GOOGLE_PLACES_API_KEY
  const envPath = resolve(__dirname, '../.env.local')
  if (existsSync(envPath)) {
    const m = readFileSync(envPath, 'utf8').match(/^GOOGLE_PLACES_API_KEY\s*=\s*(.+)$/m)
    if (m) return m[1].trim().replace(/^["']|["']$/g, '')
  }
  return ''
}

type Entry = {
  placeId: string | null
  matchedName?: string
  matchedAddr?: string
  // Photo reference + credit captured at match time. Google asks that photo
  // metadata be refreshed within ~30 days, so re-run this script periodically.
  photoName?: string
  attribution?: string
}

const KEY = apiKey()
const existing: Record<string, Entry> = existsSync(OUT)
  ? JSON.parse(readFileSync(OUT, 'utf8'))
  : {}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

async function findPlaceId(name: string, _address: string | undefined, town: string): Promise<Entry> {
  // Name + town (not full street address) — the street address tends to mislead
  // Text Search into returning a different business at a nearby address.
  const textQuery = `${name}, ${town}, Long Beach Island NJ`
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.formattedAddress,places.photos',
    },
    body: JSON.stringify({
      textQuery,
      maxResultCount: 1,
      regionCode: 'US',
      // Bias to Long Beach Island so generic names resolve to the local spot.
      locationBias: {
        circle: { center: { latitude: 39.6, longitude: -74.2 }, radius: 25000 },
      },
    }),
  })
  if (!res.ok) {
    console.warn(`  ! HTTP ${res.status} for "${name}" — ${await res.text()}`)
    return { placeId: null }
  }
  const data = await res.json()
  const p = data.places?.[0]
  if (!p?.id) return { placeId: null }
  const photo = p.photos?.[0]
  return {
    placeId: p.id,
    matchedName: p.displayName?.text,
    matchedAddr: p.formattedAddress,
    photoName: photo?.name,
    attribution: photo?.authorAttributions?.[0]?.displayName,
  }
}

if (!KEY) {
  console.error('✗ GOOGLE_PLACES_API_KEY not found (set env var or apps/web/.env.local)')
  process.exitCode = 1
} else {
  let matched = 0
  let missed = 0
  let skipped = 0

  for (const b of allBusinesses) {
    const key = String(b.id)
    if (existing[key]?.placeId) { skipped++; continue }
    try {
      const entry = await findPlaceId(b.name, b.address, b.town)
      existing[key] = entry
      if (entry.placeId) {
        matched++
        console.log(`  ✓ ${b.name} → ${entry.matchedName ?? entry.placeId}`)
      } else {
        missed++
        console.log(`  ✗ ${b.name} — no match`)
      }
      // Persist after each call so an interrupted run isn't lost.
      writeFileSync(OUT, JSON.stringify(existing, null, 2))
      await sleep(120)
    } catch (err) {
      console.warn(`  ! ${b.name} — ${err instanceof Error ? err.message : err}`)
    }
  }

  console.log(`\n[match-places] matched ${matched}, missed ${missed}, skipped ${skipped} (already done)`)
  console.log(`[match-places] wrote ${OUT}`)
}
