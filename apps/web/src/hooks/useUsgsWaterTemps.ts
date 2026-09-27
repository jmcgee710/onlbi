import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useUsgsWaterTemps — latest water temperature (°F) from USGS continuous
// monitors in Barnegat Bay. NOAA has no bay-side temp sensor on LBI; USGS does
// at the two ends of the island:
//   01409125  Barnegat Bay at Barnegat Light
//   01409335  Little Egg Inlet near Tuckerton
// Source: waterservices.usgs.gov instantaneous values (free, no key, CORS-enabled).
// ─────────────────────────────────────────────────────────────────────────────

type UsgsIv = {
  value: {
    timeSeries: Array<{
      sourceInfo: { siteCode: Array<{ value: string }> }
      values: Array<{ value: Array<{ value: string; dateTime: string }> }>
    }>
  }
}

export function useUsgsWaterTemps(sites: string[]) {
  const [temps, setTemps] = useState<Record<string, number> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const key = sites.join(',')

  useEffect(() => {
    let cancelled = false
    const url =
      `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${key}` +
      `&parameterCd=00010&siteStatus=active`

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`USGS returned ${r.status}`)
        return r.json() as Promise<UsgsIv>
      })
      .then((data) => {
        if (cancelled) return
        const out: Record<string, number> = {}
        for (const ts of data.value.timeSeries) {
          const latest = ts.values[0]?.value.at(-1)
          const c = latest ? parseFloat(latest.value) : NaN
          // USGS uses -999999 for missing readings
          if (!Number.isNaN(c) && c > -100) out[ts.sourceInfo.siteCode[0].value] = c * 9 / 5 + 32
        }
        setTemps(out)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : String(err))
      })

    return () => {
      cancelled = true
    }
  }, [key])

  return { temps, error, loading: temps === null && error === null }
}
