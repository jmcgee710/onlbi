import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useRipCurrent — today's rip current risk for LBI from the NWS Surf Zone
// Forecast, via our /api/ripcurrent edge function. Returns null while loading or
// on error so the UI can fall back gracefully — we never invent a value.
// ─────────────────────────────────────────────────────────────────────────────

export type RipRisk = 'Low' | 'Moderate' | 'High'

export type RipCurrent = {
  risk: RipRisk
  issued: string
  source: string
}

export function useRipCurrent() {
  const [rip, setRip] = useState<RipCurrent | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch('/api/ripcurrent')
      .then((r) => {
        if (!r.ok) throw new Error(`ripcurrent returned ${r.status}`)
        return r.json()
      })
      .then((d: RipCurrent & { error?: string }) => {
        if (cancelled) return
        if (d.error) throw new Error(d.error)
        setRip({ risk: d.risk, issued: d.issued, source: d.source })
        // eslint-disable-next-line no-console
        console.log('[useRipCurrent]', d.risk, '· issued', d.issued)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const msg = err instanceof Error ? err.message : String(err)
        setError(msg)
        // eslint-disable-next-line no-console
        console.warn('[useRipCurrent] hiding rip risk:', msg)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { rip, error, loading: rip === null && error === null }
}

/** Theme color token for a given rip risk (null = neutral while loading). */
export function ripRiskColor(risk: RipRisk | null | undefined): string {
  if (risk === 'High') return 'var(--coral)'
  if (risk === 'Moderate') return 'var(--sun)'
  if (risk === 'Low') return 'var(--moss)'
  return 'var(--slate)'
}
