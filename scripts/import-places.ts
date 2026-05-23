/**
 * Google Places → Supabase business import script
 *
 * One-time (and periodic refresh) script to seed the businesses table
 * using the Google Places API. Run this after verifying Places API
 * data quality on a handful of LBI businesses.
 *
 * ⚠️ PRE-BUILD CHECKLIST:
 *   1. Get a Google Places API key (Maps Platform → Place Details)
 *   2. Test "Find Place" + "Place Details" on 3–5 LBI restaurants
 *   3. Confirm seasonal hours detection works
 *   4. Map Google price_level (0–4) to our price_tier (1–4)
 *
 * Fields from Google Places:
 *   name, address, phone, website, hours, price_tier, photos, lat, lng
 *
 * Fields to fill manually after import:
 *   byob, takeout, delivery, outdoor_seating, kid_friendly,
 *   wheelchair_access, cuisine_tags, description, subcategory
 *
 * Usage:
 *   GOOGLE_PLACES_API_KEY=... SUPABASE_URL=... SUPABASE_SERVICE_KEY=... \
 *   npx tsx scripts/import-places.ts
 */

async function main() {
  console.log('import-places: not yet implemented — see comments above')
  console.log('Verify Google Places API data quality before implementing.')
}

main().catch(console.error)
