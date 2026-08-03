// Static prerender: renders each sitemap route to HTML and writes
// dist/<route>/index.html so crawlers get real content in the initial response.
// Runs after the client build (dist/) and the SSR build (dist-server/).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbs = p => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbs('dist/index.html'), 'utf-8')
const { render, getHead } = await import(pathToFileURL(toAbs('dist-server/entry-server.js')).href)

const towns = [
  'beach-haven', 'ship-bottom', 'surf-city',
  'harvey-cedars', 'barnegat-light', 'long-beach-township',
]

// LBT section guides — top-level pages only (no /beaches/:town data for these).
const sections = ['holgate', 'loveladies', 'north-beach', 'brant-beach']

// The 25 sitemap URLs.
const routesToPrerender = [
  '/', '/beaches', '/towns', '/lbi-town-boundaries', '/lbi-conditions',
  '/accessibility', '/eat', '/do', '/getting-around',
  ...towns.map(t => `/${t}`),
  ...sections.map(s => `/${s}`),
  ...towns.map(t => `/beaches/${t}`),
]

for (const marker of ['<div id="root"></div>', '<!--app-head-->']) {
  if (!template.includes(marker)) {
    console.error(`[prerender] could not find ${marker} in dist/index.html`)
    process.exit(1)
  }
}

// SPA fallback shell (empty #root) for routes we intentionally don't prerender
// (404s, stub pages). Default head = homepage SEO; the client Layout updates
// title/description on mount for the actual route. Keeps hydration clean.
fs.writeFileSync(
  toAbs('dist/200.html'),
  template.replace('<!--app-head-->', getHead('/')),
)

let ok = 0
for (const route of routesToPrerender) {
  try {
    const appHtml = render(route)
    const html = template
      .replace('<!--app-head-->', getHead(route))
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    const filePath = route === '/' ? 'dist/index.html' : `dist${route}/index.html`
    fs.mkdirSync(path.dirname(toAbs(filePath)), { recursive: true })
    fs.writeFileSync(toAbs(filePath), html)
    ok++
    console.log('  ✓', route)
  } catch (err) {
    console.error('  ✗', route, '—', err?.message ?? err)
    process.exitCode = 1
  }
}

console.log(`\n[prerender] ${ok}/${routesToPrerender.length} routes written`)

// ── Sitemap — generated from routesToPrerender so it can never drift from the
// actual prerendered routes (replaces the old hand-maintained public/sitemap.xml).
const SITE_URL = 'https://onlongbeachisland.com'
const lastmod = new Date().toISOString().slice(0, 10)
const routeMeta = route => {
  if (route === '/') return { changefreq: 'daily', priority: '1.0' }
  if (route === '/lbi-conditions') return { changefreq: 'daily', priority: '0.9' }
  if (route === '/towns') return { changefreq: 'weekly', priority: '0.9' }
  if (route === '/lbi-town-boundaries') return { changefreq: 'monthly', priority: '0.8' }
  if (route.startsWith('/beaches/')) return { changefreq: 'weekly', priority: '0.7' }
  return { changefreq: 'weekly', priority: '0.8' }
}
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routesToPrerender.map(route => {
    const { changefreq, priority } = routeMeta(route)
    const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n')
  }),
  '</urlset>',
  '',
].join('\n')
fs.writeFileSync(toAbs('dist/sitemap.xml'), sitemap)
console.log(`[sitemap] dist/sitemap.xml written with ${routesToPrerender.length} URLs`)
