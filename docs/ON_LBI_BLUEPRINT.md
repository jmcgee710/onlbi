# On LBI — Project Blueprint

**Beach concierge app for Long Beach Island, NJ**
Last updated: May 11, 2026

---

## 1. Vision & Positioning

**Product:** On LBI — the go-to mobile-first concierge for visitors and locals on Long Beach Island.
**Tagline candidate:** "Everything you need, on LBI."
**Core promise:** Real-time, hyper-local answers to the questions every LBI visitor actually asks — beach conditions, parking, food, accessibility — in one place.

**Differentiators:**
- Hyper-local (LBI only, not "Jersey Shore" generic)
- Accessibility-first (beach access for wheelchairs, mobility aids, families with strollers)
- Parking intelligence (the #1 LBI visitor pain point)
- Real conditions, not just listings (NOAA tides, water temp, surf, weather, traffic)

---

## 2. Current State

- ✅ **Prototype:** `OnLBI-App.jsx` (working React prototype)
- ✅ **Blueprint + data sourcing plan** finalized
- ⏳ Everything else below

---

## 3. Tech Stack

### Frontend
- **Web (Phase 1):** React + Vite, Tailwind CSS, React Router
- **Mobile (Phase 2):** React Native (Expo) — share business logic with web
- **Deployment:** Vercel (web), App Store + Play Store (mobile)

### Backend
- **Database + Auth:** Supabase (Postgres, Row-Level Security, Auth, Storage, Edge Functions)
- **Realtime:** Supabase Realtime for live updates (beach conditions, event check-ins)

### External APIs
- **NOAA** — tides, water temperature, marine forecast (Atlantic City buoy 44009, Barnegat Light station)
- **NJ511** — traffic on Causeway (Rt 72), LBI Blvd
- **OpenWeather or NWS** — weather + UV index
- **Mapbox or Google Maps** — maps, geocoding, directions
- **Google Places API** — seed business listings (name, address, hours, phone, photos)
- **Stripe** — business subscriptions (Year 2)

### Notifications
- **Firebase Cloud Messaging** — push (storm warnings, rip current alerts, parking alerts)

### Monetization
- **Year 1:** Free listings + Google AdMob (mobile) / AdSense (web)
- **Year 2:** Tiered business subscriptions via Stripe + premium placement

### Analytics
- **PostHog** (self-hostable, generous free tier) — track searches, page views, conversion funnels
- Use Year 1 analytics as the sales pitch for Year 2 business onboarding

---

## 4. Information Architecture

### Top-level sections
1. **Today on LBI** — homepage dashboard (tides, weather, conditions, alerts)
2. **Beaches** — every public beach access, with accessibility + parking
3. **Eat & Drink** — restaurants, takeout, BYOB, breakfast spots, ice cream
4. **Do** — activities (mini golf, kayaking, fishing, surf lessons)
5. **Stay** — rentals, hotels, motels *(Phase 2 — skipped in Phase 1)*
6. **Shop** — surf shops, boutiques, farmers markets
7. **Getting Around** — parking, causeway traffic, public transit (LBI Shuttle), bike paths
8. **Accessibility** — wheelchair beach access, mobi-mats, beach wheelchair rentals, accessible restaurants
9. **Alerts** — storm, rip current, beach closures, water quality

### URL structure (SEO-critical)
```
/                              → Today on LBI
/beaches                       → All beaches
/beaches/[town]                → e.g., /beaches/beach-haven
/beaches/[town]/[street]       → e.g., /beaches/surf-city/12th-street
/accessibility                 → Hub page (PRIORITY)
/accessibility/beach-access    → Wheelchair-accessible beaches
/accessibility/[town]          → Town-specific accessibility
/parking                       → Hub (PRIORITY)
/parking/[town]
/eat/[category]                → /eat/breakfast, /eat/ice-cream, /eat/byob
/eat/[town]/[slug]             → Individual restaurant
/do/[category]
/getting-around/causeway
/alerts
```

**SEO priorities (per recent notes):** accessibility + parking pages.
These are high-intent, low-competition queries with real user pain.

---

## 5. Data Sourcing (per page)

This section documents what is live-pulled vs manually entered for each page.

### Quick Reference

| Page | Live-Pull | Manual / Static |
|------|-----------|-----------------|
| Today on LBI | NOAA, NDBC, NWS | Jellyfish/sea lice warnings (if added) |
| Beaches | Nothing | Full data entry sprint (~80 accesses) |
| Accessibility | Nothing | Research sprint per town |
| Eat & Drink / Do / Shop | Google Places (base fields) | LBI-specific fields (BYOB, BYOB, outdoor seating, etc.) |
| Stay | — | Skipped Phase 1 |
| Getting Around | NJ511 (causeway traffic) | Parking static; Shuttle TBD |
| Alerts | NJ DEP, NJ511, NWS | Beach closures posted by admin |
| Events | Nothing | Admin posts Phase 1; businesses self-post Phase 3 |

---

### Today on LBI (Dashboard)

**Live-pull via Edge Function → `conditions_current`, refreshed every 15 min:**
- Tides: NOAA Tides & Currents station 8534720 (Atlantic City) or 8534921 (Beach Haven)
- Water temp + wave height: NDBC buoy 44091 (Barnegat) or 44009 (Delaware Bay)
- Air temp, UV index, wind speed/direction: NWS gridpoint API or OpenWeather
- Rip current risk: NWS Surf Zone Forecast for Ocean County

**⚠️ Pre-build required:** Manually test each NOAA/NDBC/NWS endpoint and confirm the exact fields are available and machine-readable (especially rip current risk — may be a text blob, not a structured value) before writing the Edge Function.

**Manual (if added):** Jellyfish / sea lice warnings — community-reported, admin posts to `alerts` table or future user-submission feature.

---

### Beaches

**All manual — one-time data entry sprint (target: 1 weekend).**

Sources:
- Primary: each town's official municipality website
  - Barnegat Light, Long Beach Township (covers Loveladies, Harvey Cedars, North Beach, Surf City, Ship Bottom, Brant Beach, Beach Haven Crest, Brighton Beach, Spray Beach, Holgate), Beach Haven
- Secondary: personal knowledge + field research for gaps

Fields most likely to need phone calls or on-the-ground checks:
- Lifeguard hours (vary by town and season, may not be published online)
- Parking spot counts
- Dog hour ordinances
- Badge pass requirements

---

### Accessibility

**All manual — research sprint per town.**

No central LBI accessibility database exists. Each municipality manages their own mobi-mat and beach wheelchair programs separately.

Research needed per town:
- Which street-end accesses have mobi-mats installed
- Whether beach wheelchairs are available on-site or by advance reservation
- Contact phone/email for wheelchair requests

Data goes into: `beach_accesses.has_mobi_mat`, `has_beach_wheelchair`, `wheelchair_contact`

Accessible businesses are derived from `businesses.wheelchair_access` — populated during business data entry, no separate research needed.

---

### Eat & Drink / Do / Shop

**Hybrid: Google Places API seeds base data; LBI-specific fields filled manually.**

**Google Places provides (via "Find Place" + "Place Details"):**
- Business name, address, phone, website
- Hours (including seasonal hours detection)
- Price tier ($–$$$$)
- Photos
- Rating / review count (display only, not stored in our DB)

**Must be entered manually (not in Google):**
- BYOB (extremely common on LBI, not tracked by Google)
- Takeout / delivery
- Outdoor seating
- Kid-friendly
- Wheelchair access
- Cuisine tags / subcategory
- Our own curated description

**Workflow:** Use Google Places to seed the initial ~100 businesses, then do a manual review pass for LBI-specific fields.

**⚠️ Pre-build required:** Get a Google Places API key and test Place Search on a handful of LBI restaurants to confirm data quality before committing to this import strategy.

---

### Stay

**Skipped in Phase 1.** No page, no data collection.

Phase 2/3 plan:
- Hotels/motels → added as businesses in the `businesses` table (same as restaurants)
- Vacation rentals → affiliate links to VRBO/Airbnb search filtered to LBI (zero data entry, referral revenue)

---

### Getting Around

**Causeway traffic (live-pull):** NJ511 events feed filtered to Route 72 Manahawkin Bay Bridges. Edge Function every 10 min during peak season (Fri 2pm–Mon 7pm, Memorial Day–Labor Day).

**Parking (static/manual):**
- No live occupancy sensors exist on LBI for public lots
- Data lives in `beach_accesses` (`parking_type`, `parking_spots_approx`, `parking_notes`) and a parking hub page with static town-by-town descriptions
- Reviewed and updated manually each spring

**LBI Shuttle (TBD — research before building):**
- Check whether LBI Shuttle publishes a GTFS feed (many NJ transit operators do via NJ Transit or independently)
- If GTFS available → show live route/stop info
- If not → display published seasonal schedule as static content, updated manually each spring

---

### Alerts

**Automated (Edge Functions write to `alerts` table):**
- Water quality: NJ DEP Cooperative Coastal Monitoring — daily check, auto-create alert when a beach fails testing (weekly results in summer)
- Rip current / storm: NWS marine/surf zone — auto-alert when rip current risk is "high" or a marine warning is active
- Causeway traffic: NJ511 — auto-create traffic alert when incidents detected on Rt 72

**Manual (admin posts to `alerts` table):**
- Beach closures (sewage event, jellyfish bloom, debris, etc.)
- Any alert not covered by the automated sources above

**Admin UI needed in Phase 1:** Simple form to create/expire alerts with severity, category, body, town, and end time.

**⚠️ Pre-build required:** Spot-check NJ DEP water quality data endpoint — confirm how results are structured (pass/fail per beach? By town? By sampling location ID?) before writing the automated check.

---

### Events

**Phase 1 — admin-curated:**
- Monitor town Facebook pages, official town websites, LBI community boards
- Admin posts directly to `events` table
- Focus: music events, farmers markets, kids events, community fundraisers

**Phase 3 — business self-post:**
- Once the business claim flow is built, owners can post their own events
- `events.business_id` is already nullable in the schema — ready for this

---

## 6. Database Schema (Supabase / Postgres)

### Core tables

```sql
-- Towns on LBI (fixed list)
towns (
  id            uuid primary key,
  slug          text unique not null,    -- 'beach-haven', 'surf-city', etc.
  name          text not null,
  lat           numeric,
  lng           numeric,
  display_order int
)
-- Seed: Barnegat Light, Loveladies, Harvey Cedars, North Beach,
-- Surf City, Ship Bottom, Brant Beach, Beach Haven Crest,
-- Brighton Beach, Spray Beach, Beach Haven, Holgate

-- Beach accesses (one row per street-end access)
beach_accesses (
  id                       uuid primary key,
  town_id                  uuid references towns,
  street                   text,             -- '12th Street'
  slug                     text,             -- auto from town + street
  lat                      numeric,
  lng                      numeric,
  is_lifeguarded           boolean,
  lifeguard_hours          text,             -- '10am–5pm Memorial Day–Labor Day'
  has_restrooms            boolean,
  has_outdoor_shower       boolean,
  has_mobi_mat             boolean,          -- accessibility
  has_beach_wheelchair     boolean,          -- can borrow on-site
  wheelchair_contact       text,
  parking_type             text,             -- 'street', 'lot', 'none', 'permit-only'
  parking_spots_approx     int,
  parking_notes            text,
  surf_break               boolean,
  dog_allowed              boolean,
  dog_hours                text,
  notes                    text,
  photos                   text[],
  badge_pass_required      boolean
)

-- Businesses
businesses (
  id                uuid primary key,
  town_id           uuid references towns,
  category          text,             -- 'restaurant', 'shop', 'activity', 'lodging'
  subcategory       text,             -- 'pizza', 'ice-cream', 'surf-shop'
  slug              text unique,
  name              text,
  description       text,
  address           text,
  lat               numeric,
  lng               numeric,
  phone             text,
  website           text,
  hours             jsonb,            -- {mon: '11-22', tue: '11-22', ...}
  seasonal_hours    jsonb,            -- summer vs off-season
  byob              boolean,
  takeout           boolean,
  delivery          boolean,
  outdoor_seating   boolean,
  kid_friendly      boolean,
  wheelchair_access boolean,
  price_tier        int,              -- 1-4 ($-$$$$)
  cuisine_tags      text[],
  photos            text[],
  is_claimed        boolean default false,
  owner_user_id     uuid references auth.users,
  subscription_tier text default 'free',   -- 'free', 'pro', 'premium'
  created_at        timestamptz default now()
)

-- User accounts (Supabase auth)
profiles (
  id            uuid primary key references auth.users,
  display_name  text,
  is_business   boolean default false,
  home_town     text,           -- for locals
  created_at    timestamptz
)

-- Saved/favorited items
favorites (
  user_id      uuid references auth.users,
  item_type    text,            -- 'beach', 'business', 'event'
  item_id      uuid,
  created_at   timestamptz,
  primary key (user_id, item_type, item_id)
)

-- Conditions cache (refreshed every 10-15 min via Edge Function)
conditions_current (
  id              int primary key default 1,
  fetched_at      timestamptz,
  water_temp_f    numeric,
  air_temp_f      numeric,
  wind_mph        numeric,
  wind_dir        text,
  wave_height_ft  numeric,
  uv_index        numeric,
  next_high_tide  timestamptz,
  next_low_tide   timestamptz,
  rip_current_risk text,         -- 'low', 'moderate', 'high'
  raw_json        jsonb
)

-- Alerts (manual + automated)
alerts (
  id          uuid primary key,
  severity    text,             -- 'info', 'warning', 'critical'
  title       text,
  body        text,
  category    text,              -- 'weather', 'beach-closure', 'traffic', 'water-quality'
  town_id     uuid,              -- null = island-wide
  starts_at   timestamptz,
  ends_at     timestamptz,
  active      boolean default true
)

-- Events
events (
  id          uuid primary key,
  business_id uuid,              -- nullable
  town_id     uuid,
  title       text,
  description text,
  starts_at   timestamptz,
  ends_at     timestamptz,
  location    text,
  category    text                -- 'music', 'market', 'kids', 'fundraiser'
)

-- Analytics for business sales pitch (Year 2)
business_views (
  business_id uuid,
  viewed_at   timestamptz,
  user_id     uuid,               -- nullable
  source      text                -- 'search', 'list', 'map', 'directions'
)
```

### Row-Level Security policies (high-level)
- `profiles` — users read/update only own row
- `businesses` — public read; insert/update only by owner OR admin
- `favorites` — user reads/writes only own
- `alerts` — public read; admin write only
- `conditions_current` — public read; service role write only

---

## 7. APIs & Data Pipelines

### NOAA Conditions Job
- **Trigger:** Supabase scheduled Edge Function every 15 min
- **Sources:**
  - Tides: NOAA Tides & Currents station 8534720 (Atlantic City) or 8534921 (Beach Haven if available)
  - Water temp + wave: NDBC buoy 44091 (Barnegat) or 44009 (Delaware Bay)
  - Weather: NWS gridpoint API
  - Rip current: NWS Surf Zone Forecast for Ocean County
- **Writes to:** `conditions_current`
- **⚠️ Verify endpoints before coding**

### NJ511 Traffic
- **Trigger:** Edge Function every 10 min during peak season (Fri 2pm–Mon 7pm, Memorial Day–Labor Day)
- **Endpoint:** NJ511 events feed filtered to Route 72 Manahawkin Bay Bridges
- **Writes to:** `alerts` (auto-expiring)

### Water Quality
- **Source:** NJ DEP Cooperative Coastal Monitoring (weekly summer testing)
- **Trigger:** Daily check via Edge Function, creates alert on failed tests
- **Manual fallback:** Admin posts alerts off-season
- **⚠️ Verify NJ DEP endpoint structure before coding**

### Google Places Import (one-time + ongoing)
- **Use:** Seed initial ~100 businesses in `businesses` table
- **Fields pulled:** name, address, phone, website, hours, price tier, photos
- **Fields filled manually after import:** byob, takeout, delivery, outdoor_seating, kid_friendly, wheelchair_access, cuisine_tags, description
- **⚠️ Test a handful of LBI businesses first to confirm data quality**

---

## 8. Roadmap

### Phase 0 — Foundation (Now)
- [ ] Initialize repo: `pnpm create vite on-lbi --template react-ts`
- [ ] Set up Tailwind, ESLint, Prettier, Husky
- [ ] Create Supabase project
- [ ] Run schema migrations
- [ ] Verify NOAA / NDBC / NWS / NJ DEP API endpoints manually
- [ ] Get Google Places API key, test on LBI businesses
- [ ] Check LBI Shuttle for GTFS feed
- [ ] Seed `towns` + initial `beach_accesses` (data entry sprint)
- [ ] Port `OnLBI-App.jsx` prototype into proper component structure
- [ ] Deploy to Vercel with custom domain (onlbi.com or similar)

### Phase 1 — SEO Web Launch (Spring 2026)
- [ ] Build accessibility hub + town pages (PRIORITY)
- [ ] Build parking hub + town pages (PRIORITY)
- [ ] All beach access pages (~80 individual pages)
- [ ] All restaurant/business pages (start with 100 hand-curated via Google Places import)
- [ ] Conditions dashboard live (NOAA/NWS Edge Function)
- [ ] Alerts system live (NJ DEP water quality + NJ511 automated; beach closures manual)
- [ ] Admin UI for manual alert posting
- [ ] Events: admin manually curates from town sources
- [ ] Submit sitemap, Google Search Console, Bing Webmaster
- [ ] AdSense integration
- [ ] Goal: Indexed and ranking for "lbi parking", "wheelchair accessible beach lbi", etc. before Memorial Day

### Phase 2 — Mobile App (Summer 2026)
- [ ] Convert to React Native (Expo) — reuse Supabase client + business logic
- [ ] Push notifications via Firebase
- [ ] AdMob integration
- [ ] App Store + Play Store launch
- [ ] In-app: "Save my beach day" itineraries
- [ ] Stay page: hotels/motels as businesses + VRBO/Airbnb affiliate links

### Phase 3 — Business Portal (Year 2)
- [ ] Business claim flow (verify ownership)
- [ ] Dashboard: views, clicks-to-directions, search appearances
- [ ] Stripe subscriptions (Free / Pro $29 mo / Premium $79 mo)
- [ ] Premium features: photos > 3, featured placement, event posting, push reach
- [ ] Businesses can self-post events
- [ ] Sales motion: use Year 1 anonymized analytics as proof ("Your business appeared in 1,247 searches last summer")

### Phase 4 — Network Effects
- [ ] User reviews + photos
- [ ] User-submitted beach reports ("crowded right now")
- [ ] Locals' tips system
- [ ] Annual "Best of LBI" voted by users

---

## 9. Open Decisions

- [ ] **Domain:** onlbi.com vs onlbi.app vs lbi.app — check availability
- [ ] **Brand colors:** Beachy palette TBD (current prototype uses ___)
- [ ] **Logo:** Need designer or DIY
- [ ] **LLC formation:** Before taking any business money in Year 2
- [ ] **Privacy policy + ToS:** Required before launch (use Termly or Iubenda)
- [ ] **Email:** Postmark or Resend for transactional
- [ ] **Support email:** hello@onlbi.com
- [ ] **LBI Shuttle:** Confirm GTFS availability before building Getting Around page
- [ ] **NOAA/NWS endpoint verification:** Must confirm rip current risk is machine-readable

---

## 10. Repo Structure (proposed)

```
on-lbi/
├── apps/
│   ├── web/                    # Vite React app
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── lib/supabase.ts
│   │   │   └── hooks/
│   │   └── public/
│   └── mobile/                 # Expo (Phase 2)
├── packages/
│   ├── shared/                 # Types, API clients, business logic
│   └── ui/                     # Shared design system
├── supabase/
│   ├── migrations/
│   ├── functions/              # Edge functions (NOAA job, NJ511 job, NJ DEP job)
│   └── seed.sql
├── scripts/
│   └── import-places.ts        # One-time Google Places import script
├── docs/
│   └── ON_LBI_BLUEPRINT.md     # this file
└── package.json                # pnpm workspace
```

---

## 11. Success Metrics

**Year 1 targets:**
- 50k page views by Labor Day 2026
- Ranking page 1 for: "lbi parking", "lbi beach accessibility", "things to do lbi today"
- 5k email/push subscribers
- $X in AdSense (TBD baseline)

**Year 2 targets:**
- 25 paying businesses by Memorial Day 2027
- 250k page views
- App: 10k installs, 3k MAU

---

## 12. Next Concrete Steps

1. Confirm domain + buy it
2. `pnpm create vite` and commit Phase 0 scaffold
3. Spin up Supabase project, run schema
4. **Verify APIs before writing any Edge Function code:**
   - NOAA/NDBC/NWS — test endpoints, confirm all fields (esp. rip current risk format)
   - NJ DEP water quality — confirm endpoint + result structure
   - Google Places — test on 3–5 LBI businesses
   - LBI Shuttle — check for GTFS feed
5. Data entry sprint: all ~80 beach accesses with accessibility/parking fields (contact each town's municipality site; some fields may need phone calls)
6. Google Places import script → seed initial ~100 businesses → manual review pass for LBI-specific fields
7. Build the accessibility hub page first (highest-leverage SEO play)
