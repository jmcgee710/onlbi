# Handoff: Today on LBI — Coastal Redesign

## Overview
A redesign of the **Today on LBI** dashboard for a Long Beach Island, NJ tourism / beach-info site. The dashboard is the user's daily check-in for beach conditions, tides, weather, bridge traffic, beach status, and what's happening on the island today.

The design direction is **clean, high-end coastal** — warm sand/shell neutrals, deep navy, sage teal, with a single coral accent. It deliberately avoids the saturated blue gradient banners and emoji-heavy treatments of the previous version in favor of an editorial, almost magazine-quality feel.

## About the Design Files
The files in this bundle are **design references created in HTML/JSX** — a working prototype showing the intended look, layout, and interactions. They are **not production code to ship directly**.

Your job is to recreate these designs in the project's existing codebase (whatever framework / styling system it uses — React + Tailwind, Next.js + CSS modules, Vue, etc.). Use the codebase's established patterns and component library; treat the HTML as a faithful spec for **what** to build, not **how** to wire it into the app.

## Fidelity
**High-fidelity.** All colors, spacing, typography, and component styling are intentional and final. Match them as closely as the target codebase's tokens allow. If a design token in the codebase is close-enough to one in this design (within a few %), use the codebase token rather than inventing a new one.

---

## Screens / Views

There is one primary screen in this handoff: **Today**.

### Layout
Two-column app shell:

- **Sidebar** — fixed left, 268px wide, sticky to viewport.
  - Brand block (logo + wordmark + tagline)
  - Two nav groups: **The Island** (Today, Beaches, Eat & Drink, Things To Do) and **Practical** (Getting Around, Parking, Accessibility, Alerts)
  - Bottom "Live · just now" status

- **Main** — flexible, 32–40px content padding.
  - Sticky topbar (breadcrumb + search + day toggle + alerts CTA)
  - 2-column content grid: `minmax(0, 1.6fr) minmax(0, 1fr)` with 28px gap
  - Left column: Hero → Happy Hour banner → Beach Day Score → Today's Tides → 5-day Forecast
  - Right column: 2×2 metrics grid → Beach Status list → Happening Today list

### Components

**Sidebar nav item**
- Padding 11px 12px, border-radius 10px
- Default: transparent bg, `--ink-soft` text
- Hover: `--sand-warm` bg
- Active (`aria-current="true"`): white bg, `--navy` text, soft card shadow
- Icon 18×18 stroke, 12px gap to label
- Optional right-side meta (e.g. "6 open") or coral dot

**Hero card**
- Background: white with subtle radial gradient overlays (seafoam top-right, sand bottom-left)
- Eyebrow: 11px uppercase, letterspaced 0.24em, teal-deep, followed by a 28px hairline
- Headline: Cormorant Garamond 64px / 400, with the word "on" in italic teal-deep
- Right side: 81° in 72px display thin, "/ 65°" muted, "Sunny · feels 84°" uppercase 13px
- Stats row at bottom: 4 columns separated by 1px hairlines, label-uppercase + value-display

**Beach Day Score card**
- "88/100" in 128px display thin, navy, with subscript "/100"
- Italic display verdict in teal-deep (28px)
- 3 bullet items with 5px dot indicators (teal default, coral for `.warn`)
- Progress bar: 6px track, linear-gradient seafoam → teal fill
- Rip status row at bottom (foam bg, teal-deep text)

**Today's Tides**
- SVG wave chart, 160px tall. Bezier curve through 4 tide points + smoothed endpoints.
- Coral dashed vertical line at "now" with filled coral dot
- Gradient stroke: teal → navy → teal across the wave
- 4 tide event cards below in a row, current one inverted (navy bg, shell text)

**5-day Forecast**
- 5 equal columns. Active day inverted to navy bg.
- Each day: uppercase DOW, icon, big display hi-temp, muted lo-temp, score chip in foam bg.

**Metrics grid (right column top)**
- 2×2 of small cards. Each: 36×36 icon tile (shell bg, teal-deep icon) + 24px display value + 11px uppercase label.

**Beach status list**
- 6 rows. Each: 8px status dot (teal/sun/coral), name, optional chip (Best Today / Rip Risk / Choppy / Wildlife), 18px display temp, arrow.
- Hover: row slides right 4px, arrow darkens.

**Happening today list**
- 4 rows. Each: 56px square time block (shell bg, display hour + uppercase am/pm), title + meta, price chip (`free` variant in foam/teal).

**Banner (Happy Hour)**
- Navy bg, shell text, coral tag pill on left, arrow on right.

### Copy used
All copy is in `app.jsx`. Keep it editorial and conversational ("A great day to be on the sand", "go now if you're going", etc.). Avoid breathless marketing voice.

---

## Interactions & Behavior

- **Sidebar nav** — clicking sets the active route. In this prototype only "Today" is implemented.
- **Forecast days** — click a day to make it active (navy fill). Hi/lo and score should update the rest of the screen in production.
- **Beach rows** — clicking opens that beach's detail page (not built here).
- **Topbar "Tomorrow" button** — toggles between today and tomorrow's forecast.
- **Alerts CTA** — opens alerts panel; the count badge shows unread.
- **Search** — global island search (autocomplete on beaches, restaurants, events).
- **Tweaks panel** — prototyping-only; do not ship.

### Animations
- Nav items: 150ms ease background/color transition
- Beach rows: 150ms ease padding-left shift on hover, arrow translate-x:2px
- Live dot: 2s ease-in-out pulse on the shadow ring
- All transitions should use `ease`, never `linear`. No bouncy springs.

### Responsive
- ≤1100px: single-column content, narrower sidebar (240px), hero h1 → 48px
- ≤760px: sidebar collapses to top, hero stacks, stats become 2×2

---

## State Management

Minimal client state. For production:
- `currentRoute` — sidebar nav selection
- `activeDay` — which forecast day is selected (drives hero + tides + metrics on day switch)
- `dayPart` — today vs tomorrow toggle
- Data fetched server-side per route — no need to bundle the dummy arrays from `app.jsx` (BEACHES, EVENTS, FORECAST, TIDES).

Real data sources (suggested):
- NOAA tide API for `TIDES`
- NWS / weather provider for `FORECAST`, water temp, UV, wind
- NJDOT cameras + traffic API for bridge wait
- Internal CMS for `EVENTS` and `BEACHES` (status, flags)

---

## Design Tokens

### Colors (default "Coastal" palette)
| Token | Hex | Role |
|---|---|---|
| `--sand` | `#F2EADB` | Neutral warm bg |
| `--sand-warm` | `#EDE3CF` | Sidebar hover |
| `--shell` | `#FBF7EF` | Page bg, sticky topbar |
| `--paper` | `#FFFFFF` | Card bg |
| `--foam` | `#E8EFEA` | Subtle teal-tinted bg |
| `--seafoam` | `#B8CDC8` | Soft teal accent |
| `--teal` | `#6B9694` | Primary teal |
| `--teal-deep` | `#486C6B` | Headings/eyebrows |
| `--navy` | `#1B3654` | Primary brand, big numbers |
| `--navy-deep` | `#102742` | Hover navy |
| `--ink` | `#0F1F2E` | Body text |
| `--ink-soft` | `#2A3F54` | Secondary text |
| `--slate` | `#5F7388` | Muted text |
| `--slate-soft` | `#8A9AAB` | Disabled / hint |
| `--line` | `#E3DCC9` | Strong divider |
| `--line-soft` | `#EDE7D6` | Soft divider |
| `--coral` | `#C45A3E` | Accent — alerts, "now" |
| `--coral-soft` | `#E8D2C5` | Coral bg |
| `--sun` | `#D4A24E` | Warning amber |
| `--moss` | `#6B8E5C` | Nature/wildlife tag |

### Typography
- **Display** — `'Cormorant Garamond'` (Google Fonts, weights 400/500/600, italic 400/500). Used for hero h1, big numbers, card titles, verdict text.
- **Body** — `'Manrope'` (Google Fonts, weights 400/500/600/700). All UI, labels, body copy.
- **Numeric** — Manrope w/ `font-variant-numeric: tabular-nums` where digits change.

Scale:
| Use | Family | Size | Weight |
|---|---|---|---|
| Hero h1 | Cormorant | 64px | 400 |
| Hero temp big | Cormorant | 72px | 300 |
| Score number | Cormorant | 128px | 300 |
| Card title | Cormorant | 22px | 500 |
| Hero stat value | Cormorant | 30px | 500 |
| Day hi-temp | Cormorant | 24px | 500 |
| Body | Manrope | 13–14px | 400–500 |
| Eyebrow / uppercase labels | Manrope | 10–11px | 600, letter-spacing 0.14–0.24em |

### Radii
- xs 6, sm 10, md 16, lg 22, xl 32

### Shadows
- card: `0 1px 0 rgba(15,31,46,0.04), 0 2px 8px rgba(15,31,46,0.04)`
- lift (hover): `0 1px 0 rgba(15,31,46,0.04), 0 8px 24px rgba(15,31,46,0.08)`
- hero: `0 30px 60px -30px rgba(15,31,46,0.25)`

### Spacing
8px base. Card padding 28px. Content padding 32–40px. Section gaps 24–28px.

---

## Assets

- `assets/logo.png` — extracted ON LBI logo (background removed, transparent PNG). Light-teal "ON", navy "LBI", red-and-white lighthouse, compass divider. Designed by user — use as-is.
- Icons are **inline SVG stroke icons** authored in `icons.jsx`. They are intentional — no icon library. Reimplement them as React components or replace with the project's existing icon set (lucide-react / heroicons / similar) matching the same shapes.

No third-party imagery is used. The design intentionally avoids stock photos.

---

## Files in this bundle

- `index.html` — entry, loads fonts and the JSX bundles
- `styles.css` — full design system as CSS custom properties + component classes
- `app.jsx` — React app, all dashboard sections and dummy data
- `icons.jsx` — SVG icon set (Wave, Sun, Cloud, Wind, Bridge, UV, Compass, Lighthouse, Umbrella, Fork, Bike, Bus, Wheelchair, Parking, Bell, Search, ArrowRight, ArrowUpRight, Calendar, Music, Fish, Anchor, Settings, Star, CloudSun, Rain)
- `tweaks-panel.jsx` — **prototyping helper, do not port.** This is the floating "Tweaks" panel used to demo palette/density variations in the prototype. Strip it from production.
- `assets/logo.png` — the logo

## Production notes

- **Drop the tweaks panel.** It is a prototyping affordance only.
- **Drop the dummy data arrays** in `app.jsx` (BEACHES, EVENTS, FORECAST, TIDES). Wire to real APIs.
- **Keep the tide chart math.** The cubic-bezier interpolation in `TideChart` is the right approach — port it as-is.
- **The "Coastal" palette is the default and primary.** "Sunset" and "Classic" alternates exist in the prototype for exploration; don't ship them unless requested.
- **Fonts must be self-hosted** or loaded from Google Fonts with `display=swap`. Don't FOUT the hero — the Cormorant headline is the design.
