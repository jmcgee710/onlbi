# On LBI — Website Update Plan
**Based on:** Google Search Console export, July 2, 2026 (last 3 months)
**Goal:** Capture the July 4th traffic wave and convert accelerating impressions into clicks

---

## Data Snapshot

| Metric | Value | Trend |
|---|---|---|
| Total impressions (3 mo) | 1,771 | Accelerating — 112/160/142/149 in final 4 days of June |
| Total clicks | 20 | Clustered late June |
| Avg CTR | ~1.1% | Zero-click drag on /towns |
| Avg position (late June) | 7.5–10 | Improved from high teens in early June |
| Mobile share | 68% of impressions | Mobile ranks better (8.4) than desktop (22.6) |

---

## Priority 1 — Expand `/beach-haven` (Highest Leverage)

**Why:** 171 impressions at position 22.6 — heavy search intent, weak rank. Google is already surfacing this page for long-tail queries it doesn't fully answer.

**Queries to target (all appearing in GSC now):**

- `beach haven public dock` (13 impr, pos 36) — biggest single long-tail
- `beach haven things to do` / `beach haven activities`
- `beach haven parking`
- `beach haven wharf` / `bay village lbi` / `long beach island bay village`
- `the gables beach haven nj`
- `beach haven nj water park` / `water park beach haven`
- `beach haven parasail`
- `the boardwalk beach haven` / `beach haven nj boardwalk`
- `veterans park beach haven`
- `beach haven inlet`

**Sections to add:**

- [ ] **Public Dock & Wharf** — location, access, what's there (Bay Village adjacent), fishing/crabbing notes
- [ ] **Parking Guide** — where to park, permit/meter rules, free spots, link to `/lbi-parking` if it exists
- [ ] **Things to Do** — structured list: Fantasy Island, Thundering Surf (water park), parasailing, Bay Village shops, Surflight Theatre
- [ ] **Parks** — Veterans Park, bayfront access points
- [ ] **Landmarks** — The Gables, boardwalk/baywalk clarification (people search "boardwalk" — address it directly since LBI famously doesn't have a traditional one)
- [ ] **Beach Haven Inlet / Holgate boundary** — quick geography section

**On-page SEO:**

- [ ] H2s should literally contain query phrasing: "Things to Do in Beach Haven", "Beach Haven Parking", "Beach Haven Public Dock"
- [ ] Update title tag: include "Things to Do, Parking & Guide" style modifiers
- [ ] Add FAQ schema (JSON-LD) for questions like "Does Beach Haven have a boardwalk?"

---

## Priority 2 — Make `/lbi-conditions` Rank for Utility Queries

**Why:** Dozens of live-data queries are surfacing (water temp, tides, surf) but the page sits at position 28.8 with only 75 impressions. Google isn't connecting these queries to the page yet.

**Query clusters appearing in GSC:**

| Cluster | Example queries |
|---|---|
| Water temp | `lbi water temp`, `ocean temp lbi`, `lbi nj water temperature`, `water temperature long beach island` |
| Tides | `when is low tide lbi`, `high tide lbi`, `lbi tide chart today`, `tide schedule lbi nj` |
| Surf | `long beach island surf forecast`, `surf report lbi`, `surfline long beach island`, `lbi waves` |
| Weather | `lbi weather`, `long beach island weather 10 day` |
| Cams | `long beach island live cameras` |

**Actions:**

- [ ] **Crawlable text for every metric.** Each widget needs an HTML heading + descriptive sentence, e.g. `<h2>LBI Water Temperature Today</h2>` — not just a JS-rendered number. Verify in pre-rendered output.
- [ ] **Title tag:** "LBI Conditions Today — Water Temp, Tides, Surf Report & Weather"
- [ ] **Add a tide section with "today" language** — "high tide today", "low tide today" phrasing appears repeatedly
- [ ] **Consider splitting or anchor-linking:** `/lbi-conditions#tides`, `#water-temp`, `#surf` so Google can deep-link intent
- [ ] **Internal links:** every town page links to conditions ("Check today's Beach Haven water temperature →")
- [ ] Evaluate dedicated pages later if impressions justify: `/lbi-tide-chart`, `/lbi-water-temperature`

---

## Priority 3 — Improve `/towns` CTR

**Why:** 1,439 impressions (81% of site total) at position ~10 but only 1.1% CTR. Zero-click SERP features are eating clicks — sharpen the snippet.

**Actions:**

- [ ] **Title tag rework:** lead with completeness + a hook, e.g. "All 18 Long Beach Island Towns, Explained (Map + Local Guide)"
- [ ] **Meta description:** promise something the SERP snippet can't give — comparisons, local knowledge, "which town is right for your trip"
- [ ] **Map intent:** `lbi map of towns` / `map of long beach island nj towns` appears repeatedly — make sure a visual map is prominent and referenced in the title/meta
- [ ] **Add ItemList schema** for the 18 municipalities
- [ ] Answer "towns *near* LBI" queries (Manahawkin, Tuckerton, Barnegat) in a short section — currently ranking 12–19 on those with no dedicated content

---

## Priority 4 — Quick Wins & Housekeeping

- [ ] **Barnegat Lighthouse** ranks position 2 on 1 impression — ensure Barnegat Light town page has a real lighthouse section to grow this
- [ ] **"What is LBI" / "what county is LBI in" / "how long is LBI"** — add a short FAQ block (homepage or /towns): county (Ocean), length (18 miles), meaning of LBI. Cheap featured-snippet targets.
- [ ] **Zip code / area code queries** appearing — add per-town quick-facts (zip, area code) to town pages
- [ ] **Mobile-first check:** 68% of impressions are mobile and mobile ranks 14 spots better than desktop — test all changes on a phone before shipping
- [ ] Re-submit updated pages in GSC (URL Inspection → Request Indexing) after deploying

---

## Sequencing Before July 4th

1. **Today/tomorrow:** Beach Haven expansion + title tags (Priorities 1 & 3 titles) — ship and request indexing
2. **This weekend:** Conditions page crawlable-text pass
3. **Next week:** FAQ schema, quick-facts blocks, remaining town pages

## Success Metrics (check ~July 10)

- `/beach-haven` position moving from 22 toward low teens
- Conditions-cluster impressions on `/lbi-conditions` (target: 3x from 75)
- `/towns` CTR above 2%
- First multi-click days (5+) during the holiday week
