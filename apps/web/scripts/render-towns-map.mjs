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

// CSS variables the SVG references — keep in sync with src/index.css.
const CSS_VARS = {
  '--sand': '#F2EADB',
  '--paper': '#FFFFFF',
  '--teal-deep': '#486C6B',
  '--ink': '#0F1F2E',
  '--ink-soft': '#2A3F54',
  '--slate': '#5F7388',
  '--line': '#E3DCC9',
  '--font-display': 'Georgia, serif',
}

const html = fs.readFileSync(toAbs('dist/towns/index.html'), 'utf-8')
const match = html.match(/<svg viewBox="0 0 300 636"[\s\S]*?<\/svg>/)
if (!match) {
  console.error('[towns-map] could not find the towns-map SVG in dist/towns/index.html — build first')
  process.exit(1)
}

let svg = match[0]
for (const [name, value] of Object.entries(CSS_VARS)) {
  svg = svg.replaceAll(new RegExp(`var\\(${name}(?:,[^)]*)?\\)`, 'g'), value)
}
// Solid background so the PNG isn't transparent (og:image renders on any surface).
svg = svg.replace(
  /(<svg[^>]*>)/,
  '$1<rect x="0" y="0" width="300" height="636" fill="#FBF7EF"/>'
)

const scale = 3
await sharp(Buffer.from(svg), { density: 72 * scale })
  .resize(300 * scale, 636 * scale)
  .png()
  .toFile(toAbs('public/lbi-towns-map.png'))

console.log('[towns-map] public/lbi-towns-map.png written')
