import { createClient } from '@supabase/supabase-js'
import type { Database } from '@onlbi/shared'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : null

if (!supabase && import.meta.env.DEV) {
  console.warn(
    'Supabase env vars missing — copy apps/web/.env.example to apps/web/.env and fill in your keys.',
  )
}
