// ─────────────────────────────────────────────────────────────────────────────
// BREADCRUMB SCHEMA — builds a schema.org BreadcrumbList JSON-LD object from an
// ordered trail of {name, path} crumbs. Plain object in / plain object out so
// it serializes identically on the server (prerender) and the client — same
// pattern as faqSchema.ts.
// ─────────────────────────────────────────────────────────────────────────────
import { SITE_URL } from './seo'

export type Crumb = { name: string; path: string }

export function buildBreadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${c.path}`,
    })),
  }
}
