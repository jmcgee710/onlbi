export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      towns: { Row: Town; Insert: Omit<Town, 'id'>; Update: Partial<Town> }
      beach_accesses: { Row: BeachAccess; Insert: Omit<BeachAccess, 'id'>; Update: Partial<BeachAccess> }
      businesses: { Row: Business; Insert: Omit<Business, 'id' | 'created_at'>; Update: Partial<Business> }
      profiles: { Row: Profile; Insert: Profile; Update: Partial<Profile> }
      favorites: { Row: Favorite; Insert: Favorite; Update: never }
      conditions_current: { Row: ConditionsCurrent; Insert: ConditionsCurrent; Update: Partial<ConditionsCurrent> }
      alerts: { Row: Alert; Insert: Omit<Alert, 'id'>; Update: Partial<Alert> }
      events: { Row: Event; Insert: Omit<Event, 'id'>; Update: Partial<Event> }
      business_views: { Row: BusinessView; Insert: BusinessView; Update: never }
    }
  }
}

export interface Town {
  id: string
  slug: string
  name: string
  lat: number | null
  lng: number | null
  display_order: number | null
}

export interface BeachAccess {
  id: string
  town_id: string
  street: string | null
  slug: string | null
  lat: number | null
  lng: number | null
  is_lifeguarded: boolean | null
  lifeguard_hours: string | null
  has_restrooms: boolean | null
  has_outdoor_shower: boolean | null
  has_mobi_mat: boolean | null
  has_beach_wheelchair: boolean | null
  wheelchair_contact: string | null
  parking_type: 'street' | 'lot' | 'none' | 'permit-only' | null
  parking_spots_approx: number | null
  parking_notes: string | null
  surf_break: boolean | null
  dog_allowed: boolean | null
  dog_hours: string | null
  notes: string | null
  photos: string[] | null
  badge_pass_required: boolean | null
}

export interface Business {
  id: string
  town_id: string | null
  category: 'restaurant' | 'shop' | 'activity' | 'lodging' | null
  subcategory: string | null
  slug: string
  name: string | null
  description: string | null
  address: string | null
  lat: number | null
  lng: number | null
  phone: string | null
  website: string | null
  hours: Record<string, string> | null
  seasonal_hours: Json | null
  byob: boolean | null
  takeout: boolean | null
  delivery: boolean | null
  outdoor_seating: boolean | null
  kid_friendly: boolean | null
  wheelchair_access: boolean | null
  price_tier: 1 | 2 | 3 | 4 | null
  cuisine_tags: string[] | null
  photos: string[] | null
  is_claimed: boolean
  owner_user_id: string | null
  subscription_tier: 'free' | 'pro' | 'premium'
  created_at: string
}

export interface Profile {
  id: string
  display_name: string | null
  is_business: boolean
  home_town: string | null
  created_at: string | null
}

export interface Favorite {
  user_id: string
  item_type: 'beach' | 'business' | 'event'
  item_id: string
  created_at: string | null
}

export interface ConditionsCurrent {
  id: number
  fetched_at: string | null
  water_temp_f: number | null
  air_temp_f: number | null
  wind_mph: number | null
  wind_dir: string | null
  wave_height_ft: number | null
  uv_index: number | null
  next_high_tide: string | null
  next_low_tide: string | null
  rip_current_risk: 'low' | 'moderate' | 'high' | null
  raw_json: Json | null
}

export interface Alert {
  id: string
  severity: 'info' | 'warning' | 'critical' | null
  title: string | null
  body: string | null
  category: 'weather' | 'beach-closure' | 'traffic' | 'water-quality' | null
  town_id: string | null
  starts_at: string | null
  ends_at: string | null
  active: boolean
}

export interface Event {
  id: string
  business_id: string | null
  town_id: string | null
  title: string | null
  description: string | null
  starts_at: string | null
  ends_at: string | null
  location: string | null
  category: 'music' | 'market' | 'kids' | 'fundraiser' | null
}

export interface BusinessView {
  business_id: string
  viewed_at: string
  user_id: string | null
  source: 'search' | 'list' | 'map' | 'directions' | null
}
