-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================================
-- TOWNS
-- ============================================================
create table towns (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  lat           numeric,
  lng           numeric,
  display_order int
);

-- ============================================================
-- BEACH ACCESSES
-- ============================================================
create table beach_accesses (
  id                       uuid primary key default gen_random_uuid(),
  town_id                  uuid references towns on delete cascade,
  street                   text,
  slug                     text,
  lat                      numeric,
  lng                      numeric,
  is_lifeguarded           boolean,
  lifeguard_hours          text,
  has_restrooms            boolean,
  has_outdoor_shower       boolean,
  has_mobi_mat             boolean,
  has_beach_wheelchair     boolean,
  wheelchair_contact       text,
  parking_type             text check (parking_type in ('street','lot','none','permit-only')),
  parking_spots_approx     int,
  parking_notes            text,
  surf_break               boolean,
  dog_allowed              boolean,
  dog_hours                text,
  notes                    text,
  photos                   text[],
  badge_pass_required      boolean
);

-- ============================================================
-- BUSINESSES
-- ============================================================
create table businesses (
  id                uuid primary key default gen_random_uuid(),
  town_id           uuid references towns on delete set null,
  category          text check (category in ('restaurant','shop','activity','lodging')),
  subcategory       text,
  slug              text unique not null,
  name              text,
  description       text,
  address           text,
  lat               numeric,
  lng               numeric,
  phone             text,
  website           text,
  hours             jsonb,
  seasonal_hours    jsonb,
  byob              boolean,
  takeout           boolean,
  delivery          boolean,
  outdoor_seating   boolean,
  kid_friendly      boolean,
  wheelchair_access boolean,
  price_tier        int check (price_tier between 1 and 4),
  cuisine_tags      text[],
  photos            text[],
  is_claimed        boolean default false,
  owner_user_id     uuid references auth.users on delete set null,
  subscription_tier text not null default 'free' check (subscription_tier in ('free','pro','premium')),
  created_at        timestamptz not null default now()
);

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
create table profiles (
  id            uuid primary key references auth.users on delete cascade,
  display_name  text,
  is_business   boolean not null default false,
  home_town     text,
  created_at    timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, created_at)
  values (new.id, now());
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- FAVORITES
-- ============================================================
create table favorites (
  user_id      uuid references auth.users on delete cascade,
  item_type    text not null check (item_type in ('beach','business','event')),
  item_id      uuid not null,
  created_at   timestamptz default now(),
  primary key (user_id, item_type, item_id)
);

-- ============================================================
-- CONDITIONS CACHE (single row, id = 1)
-- ============================================================
create table conditions_current (
  id              int primary key default 1 check (id = 1),
  fetched_at      timestamptz,
  water_temp_f    numeric,
  air_temp_f      numeric,
  wind_mph        numeric,
  wind_dir        text,
  wave_height_ft  numeric,
  uv_index        numeric,
  next_high_tide  timestamptz,
  next_low_tide   timestamptz,
  rip_current_risk text check (rip_current_risk in ('low','moderate','high')),
  raw_json        jsonb
);

-- Pre-insert the single row so upserts always work
insert into conditions_current (id) values (1);

-- ============================================================
-- ALERTS
-- ============================================================
create table alerts (
  id          uuid primary key default gen_random_uuid(),
  severity    text check (severity in ('info','warning','critical')),
  title       text,
  body        text,
  category    text check (category in ('weather','beach-closure','traffic','water-quality')),
  town_id     uuid references towns on delete set null,
  starts_at   timestamptz,
  ends_at     timestamptz,
  active      boolean not null default true
);

-- ============================================================
-- EVENTS
-- ============================================================
create table events (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid references businesses on delete set null,
  town_id     uuid references towns on delete set null,
  title       text,
  description text,
  starts_at   timestamptz,
  ends_at     timestamptz,
  location    text,
  category    text check (category in ('music','market','kids','fundraiser'))
);

-- ============================================================
-- BUSINESS VIEWS (analytics)
-- ============================================================
create table business_views (
  business_id uuid not null references businesses on delete cascade,
  viewed_at   timestamptz not null default now(),
  user_id     uuid references auth.users on delete set null,
  source      text check (source in ('search','list','map','directions'))
);

create index on business_views (business_id, viewed_at);

-- ============================================================
-- ROW-LEVEL SECURITY
-- ============================================================

alter table towns             enable row level security;
alter table beach_accesses    enable row level security;
alter table businesses        enable row level security;
alter table profiles          enable row level security;
alter table favorites         enable row level security;
alter table conditions_current enable row level security;
alter table alerts            enable row level security;
alter table events            enable row level security;
alter table business_views    enable row level security;

-- Public read on reference/public tables
create policy "public read towns"              on towns              for select using (true);
create policy "public read beach_accesses"     on beach_accesses     for select using (true);
create policy "public read businesses"         on businesses         for select using (true);
create policy "public read conditions_current" on conditions_current for select using (true);
create policy "public read alerts"             on alerts             for select using (active = true);
create policy "public read events"             on events             for select using (true);

-- Profiles: own row only
create policy "own profile read"   on profiles for select using (auth.uid() = id);
create policy "own profile update" on profiles for update using (auth.uid() = id);

-- Favorites: own rows only
create policy "own favorites"      on favorites for all using (auth.uid() = user_id);

-- Businesses: owners can update their own
create policy "owner update business" on businesses for update
  using (auth.uid() = owner_user_id);

-- Business views: authenticated users can insert
create policy "insert business views" on business_views for insert
  with check (true);
