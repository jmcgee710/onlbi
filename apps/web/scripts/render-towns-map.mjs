// Renders the LBI towns map SVG (from the prerendered /towns HTML) to
// public/lbi-towns-map.png — the indexable image + og:image for /towns.
// Run after `pnpm build` whenever LbiTownsMap.tsx changes:
//   node scripts/render-towns-map.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbs = p => path.resolve(__dirname, '..', p)

// CSS variables the SVG might reference — keep in sync with src/index.css.
// (The current map uses literal colors, so this is a safety net.)
const CSS_VARS = {
  '--sand': '#EDE6D8',
  '--paper': '#FFFDF9',
  '--teal-deep': '#2A6F97',
  '--ink': '#10263A',
  '--ink-soft': '#3C4B58',
  '--slate': '#5A6570',
  '--line': '#E4DCCD',
  '--font-display': 'Georgia, serif',
}

const html = fs.readFileSync(toAbs('dist/towns/index.html'), 'utf-8')
const match = html.match(/<svg class="towns-map"[\s\S]*?<\/svg>/)
if (!match) {
  console.error('[towns-map] could not find the towns-map SVG in dist/towns/index.html — build first')
  process.exit(1)
}

let svg = match[0]
for (const [name, value] of Object.entries(CSS_VARS)) {
  svg = svg.replaceAll(new RegExp(`var\\(${name}(?:,[^)]*)?\\)`, 'g'), value)
}
// The map paints its own water background; give sharp explicit pixel dimensions.
svg = svg.replace(/<svg class="towns-map"/, '<svg width="520" height="900" class="towns-map"')

const scale = 2
await sharp(Buffer.from(svg), { density: 72 * scale })
  .resize(520 * scale, 900 * scale)
  .png()
  .toFile(toAbs('public/lbi-towns-map.png'))

console.log('[towns-map] public/lbi-towns-map.png written')
