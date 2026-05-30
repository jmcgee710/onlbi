// Vercel Edge Function — today's rip current risk for Long Beach Island.
//
// Source: NWS Mount Holly (PHI) Surf Zone Forecast (product code SRF) via the
// free, keyless api.weather.gov. LBI sits in the "Coastal Ocean" zone (NJZ026).
// We fetch + parse server-side so the client gets a tiny JSON contract, and we
// cache at the edge (the SRF only refreshes ~twice a day).
//
// Usage from the client:   fetch('/api/ripcurrent')  ->  { risk, issued, source }

export const config = { runtime: 'edge' }

type Risk = 'Low' | 'Moderate' | 'High'

// NWS asks API users to identify themselves via User-Agent.
const UA = { 'User-Agent': '(onlbi.com, jmcgeetellem@gmail.com)' }

function json(body: unknown, status = 200, sMaxAge = 0): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': sMaxAge
        ? `public, s-maxage=${sMaxAge}, stale-while-revalidate=${sMaxAge * 2}`
        : 'no-store',
    },
  })
}

function parseRisk(text: string): Risk | null {
  // The SRF groups several coastal zones. LBI is the "Coastal Ocean" zone
  // (NJZ026). Scope to that block if we can find it; otherwise fall back to the
  // first risk line (the NJ coastal zones almost always share the same daily
  // risk). The line looks like: "Rip Current Risk............Moderate."
  let scope = text
  const z = text.search(/NJZ026|Coastal Ocean/i)
  if (z !== -1) {
    const end = text.indexOf('$$', z)
    scope = text.slice(z, end === -1 ? z + 1500 : end)
  }
  const m = scope.match(/Rip Current Risk\.*\s*(Low|Moderate|High)/i)
  if (!m) return null
  const v = m[1].toLowerCase()
  return (v[0].toUpperCase() + v.slice(1)) as Risk
}

export default async function handler(): Promise<Response> {
  try {
    // 1. Find the latest SRF product issued by Mount Holly (PHI).
    const listRes = await fetch(
      'https://api.weather.gov/products/types/SRF/locations/PHI',
      { headers: { ...UA, Accept: 'application/ld+json' } },
    )
    if (!listRes.ok) return json({ error: `NWS list ${listRes.status}` }, 502)
    const list = (await listRes.json()) as {
      '@graph'?: Array<{ '@id': string; issuanceTime: string }>
    }
    const latest = list['@graph']?.[0]
    if (!latest) return json({ error: 'No SRF products available' }, 502)

    // 2. Fetch the product text and parse today's rip current risk.
    const prodRes = await fetch(latest['@id'], {
      headers: { ...UA, Accept: 'application/ld+json' },
    })
    if (!prodRes.ok) return json({ error: `NWS product ${prodRes.status}` }, 502)
    const prod = (await prodRes.json()) as { productText?: string }
    const risk = parseRisk(prod.productText ?? '')
    if (!risk) return json({ error: 'Could not parse rip current risk' }, 502)

    return json(
      {
        risk,
        issued: latest.issuanceTime,
        zone: 'NJZ026',
        source: 'NWS Mount Holly Surf Zone Forecast',
      },
      200,
      3600, // cache 1h at the edge; serve stale up to 2h while revalidating
    )
  } catch (err) {
    return json({ error: String(err) }, 502)
  }
}
