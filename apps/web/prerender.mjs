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

// The 20 sitemap URLs.
const routesToPrerender = [
  '/', '/beaches', '/towns', '/lbi-conditions', '/accessibility', '/eat', '/do', '/getting-around',
  ...towns.map(t => `/${t}`),
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
