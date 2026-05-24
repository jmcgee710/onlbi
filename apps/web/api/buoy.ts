// Vercel Edge Function — proxies NDBC realtime2 buoy text feeds so the
// browser can read them. NDBC's www.ndbc.noaa.gov doesn't send CORS headers,
// so a direct browser fetch fails. This function does the fetch server-side
// and returns the same text body with permissive CORS + a short edge cache.
//
// Usage from the client:   fetch('/api/buoy?station=44091')
//
// Vercel auto-detects /api/*.ts files in the project root (which, given our
// Root Directory of apps/web, means apps/web/api/).

export const config = { runtime: 'edge' }

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const station = url.searchParams.get('station') ?? '44091'

  // Defensive: NDBC station IDs are alphanumeric, typically 4-5 chars.
  // Reject anything weird so we don't proxy arbitrary URLs.
  if (!/^[A-Za-z0-9]{4,7}$/.test(station)) {
    return new Response('Invalid station id', { status: 400 })
  }

  const ndbcUrl = `https://www.ndbc.noaa.gov/data/realtime2/${station}.txt`

  let ndbcRes: Response
  try {
    ndbcRes = await fetch(ndbcUrl, { headers: { 'User-Agent': 'onlbi.com' } })
  } catch (err) {
    return new Response(`NDBC fetch failed: ${String(err)}`, { status: 502 })
  }

  if (!ndbcRes.ok) {
    return new Response(`NDBC returned ${ndbcRes.status}`, { status: 502 })
  }

  const text = await ndbcRes.text()
  return new Response(text, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      // Buoys update every ~10 min; cache at the edge for 5 min to be polite.
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
