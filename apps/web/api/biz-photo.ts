// Vercel Edge Function — returns a Google Places photo for a business.
//
//   <img src="/api/biz-photo?id=101">
//
// Flow: business id → photo reference (from committed placeIds.json, captured
// by scripts/match-places.ts) → Place Photo media → streamed image. The API key
// stays server-side; the image is cached at the edge for 30 days so Google is
// hit only on cache misses (keeps usage well within the free tier and avoids
// storing photo bytes ourselves, per Google's terms).

import placeIds from '../src/data/placeIds.json'

export const config = { runtime: 'edge' }

type Entry = { placeId: string | null; photoName?: string }
const PLACES = placeIds as Record<string, Entry>

export default async function handler(req: Request): Promise<Response> {
  const id = new URL(req.url).searchParams.get('id') ?? ''
  if (!/^\d+$/.test(id)) return new Response('Bad id', { status: 400 })

  const key = process.env.GOOGLE_PLACES_API_KEY
  if (!key) return new Response('Not configured', { status: 503 })

  const photoName = PLACES[id]?.photoName
  if (!photoName) return new Response('No photo', { status: 404 })

  try {
    // Fetch the actual image (follows Google's redirect to the CDN).
    const photoRes = await fetch(
      `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=400&key=${key}`,
    )
    if (!photoRes.ok || !photoRes.body) return new Response('Photo failed', { status: 502 })

    return new Response(photoRes.body, {
      status: 200,
      headers: {
        'Content-Type': photoRes.headers.get('Content-Type') ?? 'image/jpeg',
        'Access-Control-Allow-Origin': '*',
        // Cache 30 days at the edge; refresh in the background.
        'Cache-Control': 'public, s-maxage=2592000, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    return new Response(`Error: ${String(err)}`, { status: 502 })
  }
}
