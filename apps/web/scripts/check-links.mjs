// Link checker — run after `pnpm build`:
//   node scripts/check-links.mjs              internal links only
//   node scripts/check-links.mjs --external   also request every external URL
//
// Crawls the site through the real router (dist-server render), starting from
// every prerendered route plus internal paths written literally in src/, and
// follows each internal <a href>. A link is broken if its page renders the 404
// (NotFoundPage marks itself with data-not-found).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { render } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href)
const checkExternal = process.argv.includes('--external')

// Seeds: the sitemap routes + literal internal paths in source (catches links
// that only render client-side, e.g. inside tabs).
const sitemap = fs.readFileSync(path.join(root, 'dist/sitemap.xml'), 'utf8')
const seeds = new Set([...sitemap.matchAll(/<loc>https:\/\/onlongbeachisland\.com(\/[^<]*)<\/loc>/g)].map((m) => m[1]))
const srcRef = new Map() // path -> source file that mentions it
function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name)
    if (f.isDirectory()) walk(p)
    else if (/\.(tsx?|jsx?)$/.test(f.name)) {
      const txt = fs.readFileSync(p, 'utf8')
      for (const m of txt.matchAll(/(?:\bto=|\bhref=|navigate\()\{?\s*["'`](\/[a-z0-9\-/]*)["'`]/gi)) {
        seeds.add(m[1])
        if (!srcRef.has(m[1])) srcRef.set(m[1], path.relative(root, p))
      }
    }
  }
}
walk(path.join(root, 'src'))

const normalize = (href) => {
  const p = href.split('#')[0].split('?')[0]
  return p.length > 1 ? p.replace(/\/$/, '') : p
}
const isAsset = (p) => p.startsWith('/api/') || /\.[a-z0-9]{2,5}$/i.test(p)

const seen = new Map() // path -> 'ok' | 'broken'
const linkedFrom = new Map() // path -> first page linking it
const external = new Map() // url -> first page linking it
const queue = [...seeds]

while (queue.length) {
  const route = queue.shift()
  if (seen.has(route) || isAsset(route)) continue
  let html
  try {
    html = render(route)
  } catch (err) {
    seen.set(route, `render error: ${err?.message ?? err}`)
    continue
  }
  seen.set(route, html.includes('data-not-found') ? 'broken' : 'ok')
  if (html.includes('data-not-found')) continue
  for (const m of html.matchAll(/<a\b[^>]*?\shref="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, '&')
    if (href.startsWith('/') && !href.startsWith('//')) {
      const p = normalize(href)
      if (!linkedFrom.has(p)) linkedFrom.set(p, route)
      if (!seen.has(p)) queue.push(p)
    } else if (/^https?:\/\//.test(href) && !external.has(href)) {
      external.set(href, route)
    }
  }
}

const broken = [...seen].filter(([, s]) => s !== 'ok')
console.log(`Internal: ${seen.size} paths checked, ${broken.length} broken`)
for (const [p, s] of broken) {
  console.log(`  ✗ ${p}  (${s}) — linked from ${linkedFrom.get(p) ?? srcRef.get(p) ?? 'seed'}`)
}

let extBad = []
if (checkExternal) {
  const urls = [...external.keys()]
  const results = []
  let i = 0
  async function worker() {
    while (i < urls.length) {
      const url = urls[i++]
      let status
      try {
        const res = await fetch(url, {
          method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000),
          headers: { 'user-agent': 'Mozilla/5.0 (link check; onlongbeachisland.com)' },
        })
        status = res.status
        res.body?.cancel()
      } catch (err) {
        status = err?.name === 'TimeoutError' ? 'timeout' : (err?.cause?.code ?? err?.message ?? 'error')
      }
      results.push([url, status])
    }
  }
  await Promise.all(Array.from({ length: 10 }, worker))
  extBad = results.filter(([, s]) => typeof s !== 'number' || s >= 400)
  console.log(`External: ${urls.length} URLs checked, ${extBad.length} failed or blocked`)
  for (const [u, s] of extBad.sort()) console.log(`  ✗ ${s}  ${u}  — on ${external.get(u)}`)
} else {
  console.log(`External: ${external.size} URLs found (run with --external to request them)`)
}

process.exitCode = broken.length ? 1 : 0
