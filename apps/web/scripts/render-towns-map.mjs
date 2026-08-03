// Renders the LBI towns map SVG (from the prerendered /lbi-map HTML) to
// public/lbi-towns-map.png — the indexable image + og:image for /lbi-map and
// /towns. Sourced from /lbi-map because that page carries the ImageObject
// schema for this file.
//
// MUST be re-run whenever LbiTownsMap.tsx changes, or the social card and
// Google Images result silently keep showing the previous design:
//   pnpm --filter web build && node scripts/render-towns-map.mjs
// VIEWBOX and CSS_VARS below both have to track the component.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbs = p => path.resolve(__dirname, '..', p)

// Must match the viewBox on the <svg> in LbiTownsMap.tsx.
const W = 330
const H = 660

// CSS variables the SVG references — keep in sync with src/index.css.
// Longer names must resolve too: the regex below only matches a var name when
// the next character is ',' or ')', so --sand never swallows --sand-warm.
const CSS_VARS = {
  '--sand': '#F2EADB',
  '--sand-warm': '#EDE3CF',
  '--shell': '#FBF7EF',
  '--paper': '#FFFFFF',
  '--foam': '#E8EFEA',
  '--seafoam': '#B8CDC8',
  '--teal': '#6B9694',
  '--teal-deep': '#486C6B',
  '--ink': '#0F1F2E',
  '--ink-soft': '#2A3F54',
  '--slate': '#5F7388',
  '--slate-soft': '#8A9AAB',
  '--line': '#E3DCC9',
  '--font-display': 'Georgia, serif',
}

const html = fs.readFileSync(toAbs('dist/lbi-map/index.html'), 'utf-8')
const match = html.match(new RegExp(`<svg viewBox="0 0 ${W} ${H}"[\\s\\S]*?</svg>`))
if (!match) {
  console.error(
    `[towns-map] no <svg viewBox="0 0 ${W} ${H}"> in dist/lbi-map/index.html.\n` +
    '           Either the build is stale, or LbiTownsMap.tsx changed its viewBox\n' +
    '           and W/H in this script need updating to match.'
  )
  process.exit(1)
}

let svg = match[0]
for (const [name, value] of Object.entries(CSS_VARS)) {
  svg = svg.replaceAll(new RegExp(`var\\(${name}(?:,[^)]*)?\\)`, 'g'), value)
}
// Any var() left over means CSS_VARS is missing an entry — that would render as
// a black fill rather than failing, so catch it here instead of shipping it.
const leftover = [...new Set(svg.match(/var\(--[\w-]+/g) ?? [])]
if (leftover.length) {
  console.error(`[towns-map] unresolved CSS variables: ${leftover.join(', ')}`)
  console.error('           add them to CSS_VARS (values live in src/index.css)')
  process.exit(1)
}

// Solid background so the PNG isn't transparent (og:image renders on any surface).
svg = svg.replace(
  /(<svg[^>]*>)/,
  `$1<rect x="0" y="0" width="${W}" height="${H}" fill="#FBF7EF"/>`
)

const scale = 3
await sharp(Buffer.from(svg), { density: 72 * scale })
  .resize(W * scale, H * scale)
  .png()
  .toFile(toAbs('public/lbi-towns-map.png'))

console.log(`[towns-map] public/lbi-towns-map.png written (${W * scale}×${H * scale})`)
