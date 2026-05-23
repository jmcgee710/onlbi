# onLBI

**Beach concierge app for Long Beach Island, NJ.**
Real-time tides, weather, parking, accessibility, and local business listings — in one mobile-first app.

See [`docs/ON_LBI_BLUEPRINT.md`](docs/ON_LBI_BLUEPRINT.md) for the full product blueprint, roadmap, and data sourcing plan.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Web frontend | React 19 + Vite + TypeScript + Tailwind CSS |
| Routing | React Router v7 |
| Backend | Supabase (Postgres, Auth, RLS, Edge Functions, Realtime) |
| Mobile (Phase 2) | React Native (Expo) |
| Deployment | Vercel (web) |

---

## Repo structure

```
apps/web/          React + Vite web app
packages/shared/   TypeScript types + API utilities (shared across web + mobile)
packages/ui/       Shared component library (Phase 2)
supabase/
  migrations/      Postgres schema migrations
  functions/       Edge Functions (conditions refresh, NJ511 traffic, etc.)
  seed.sql         Seed 12 LBI towns
scripts/
  import-places.ts Google Places → Supabase business import (one-time)
docs/
  ON_LBI_BLUEPRINT.md  Full product blueprint
```

---

## Setup

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm 11+](https://pnpm.io/) (`npm install -g pnpm`)
- A [Supabase](https://supabase.com) project

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp apps/web/.env.example apps/web/.env
```

Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project settings → API.

### 3. Run the database schema

In your Supabase project dashboard, go to **SQL Editor** and run:

1. `supabase/migrations/0001_initial_schema.sql`
2. `supabase/seed.sql`

Or if you have the Supabase CLI installed:

```bash
supabase db push
```

### 4. Start the dev server

```bash
pnpm dev
# or
pnpm --filter web dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Available scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the web app dev server |
| `pnpm build` | Build for production |
| `pnpm lint` | Run ESLint across all packages |
| `pnpm format` | Run Prettier across all files |

---

## Phase 0 checklist

Before writing any Edge Function code, verify these APIs manually:

- [ ] **NOAA/NDBC/NWS** — test tide, buoy, weather, and rip current endpoints
- [ ] **NJ DEP water quality** — confirm endpoint structure (pass/fail per beach?)
- [ ] **Google Places** — test on 3–5 LBI businesses, confirm data quality
- [ ] **LBI Shuttle** — check for GTFS feed availability

See the blueprint for full details on each API.

---

## External resources

- [Supabase Dashboard](https://app.supabase.com)
- [NOAA Tides station 8534720](https://tidesandcurrents.noaa.gov/stationhome.html?id=8534720)
- [NDBC Buoy 44091](https://www.ndbc.noaa.gov/station_page.php?station=44091)
- [NWS Ocean County Forecast](https://forecast.weather.gov/MapClick.php?CityName=Beach+Haven&state=NJ)
- [NJ511 Developers](https://www.511nj.org/developers)
- [NJ DEP Water Quality](https://www.nj.gov/dep/wms/bears/beachq.htm)
