import { useEffect, useState } from 'react'

/**
 * The current Date, but only once the component has mounted in the browser.
 * Returns `null` during the server render and the hydration pass.
 *
 * Why this exists: every route on this site is prerendered to static HTML at
 * build time (see prerender.mjs). Any `new Date()` evaluated during render is
 * therefore frozen into the HTML file and served — to crawlers, and to every
 * visitor before hydration — until the next deploy. A "Today · <date>" chip
 * built that way silently goes stale, and a stale HTML copy pinned in a CDN
 * stays wrong indefinitely.
 *
 * Anything user-visible that claims to be "today" must be filled in on the
 * client. Use `useNow` instead for values that are only used in computation
 * (chart positions, score inputs), where the build-time seed is harmless
 * because it is corrected on the first tick after hydration.
 */
export function useClientDate(intervalMs = 60_000): Date | null {
  const [date, setDate] = useState<Date | null>(null)

  useEffect(() => {
    setDate(new Date())
    const id = setInterval(() => setDate(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return date
}

/** "Monday, August 3" — the long date format used in the top bars and hero. */
export function formatLongDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}
