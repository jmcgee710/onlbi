import { useEffect, useState } from 'react'

/**
 * Returns the current Date, re-rendering every `intervalMs` (default 60s).
 * Use for live-updating UI like clocks or "time-of-day" markers.
 */
export function useNow(intervalMs = 60_000): Date {
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return now
}
