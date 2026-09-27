// Renders the LBI towns map SVG (from the prerendered /lbi-map HTML) to
// public/lbi-towns-map.png — the indexable image + og:image for /lbi-map and
// /towns. Sourced from /lbi-map because that page carries the ImageObject
// schema for this file.
//
// MUST be re-run whenever LbiTownsMap.tsx or lbiGeometry.tsx changes, or the
// social card and Google Images result silently keep showing the previous design:
//   pnpm --filter web build && node scripts/render-towns-map.mjs
// W/H and CSS_VARS below both have to track the component.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbs = p => path.resolve(__dirname, '..', p)

// Must match VIEW_W / VIEW_H in lbiGeometry.tsx.
const W = 520
const H = 900

// CSS variables the SVG references — keep in sync with src/index.css. The map
// uses literal colors today, so this is a safety net for future edits.
// Longer names must resolve too: the regex below only matches a var name when
// the next character is ',' or ')', so --sand never swallows --sand-warm.
const CSS_VARS = {
  '--sand': '#EDE6D8',
  '--sand-warm': '#EAE2D2',
  '--shell': '#F5F1EA',
  '--paper': '#FFFDF9',
  '--foam': '#E4EEF4',
  '--teal-deep': '#2A6F97',
  '--ocean': '#2A6F97',
  '--ink': '#10263A',
  '--ink-soft': '#3C4B58',
  '--slate': '#5A6570',
  '--line': '#E4DCCD',
  '--font-display': 'Georgia, serif',
}

const html = fs.readFileSync(toAbs('dist/lbi-map/index.html'), 'utf-8')
const match = html.match(/<svg class="towns-map"[\s\S]*?<\/svg>/)
if (!match) {
  console.error(
    '[towns-map] no <svg class="towns-map"> in dist/lbi-map/index.html.\n' +
    '           Either the build is stale, or LbiTownsMap.tsx changed its class.'
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

// The map paints its own water background; give sharp explicit pixel dimensions.
svg = svg.replace(/<svg class="towns-map"/, `<svg width="${W}" height="${H}" class="towns-map"`)

const scale = 2
await sharp(Buffer.from(svg), { density: 72 * scale })
  .resize(W * scale, H * scale)
  .png()
  .toFile(toAbs('public/lbi-towns-map.png'))

console.log(`[towns-map] public/lbi-towns-map.png written (${W * scale}×${H * scale})`)
