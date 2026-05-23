import type { ConditionsCurrent } from '../types/index.js'

/**
 * Fetch current beach conditions from Supabase.
 * The conditions_current table is a single-row cache refreshed every 15 min
 * by the conditions-refresh Edge Function.
 */
export async function fetchConditions(
  supabase: { from: (table: string) => unknown }
): Promise<ConditionsCurrent | null> {
  const { data, error } = await (supabase.from('conditions_current') as {
    select: (cols: string) => { eq: (col: string, val: number) => { single: () => Promise<{ data: ConditionsCurrent | null; error: unknown }> } }
  })
    .select('*')
    .eq('id', 1)
    .single()

  if (error) {
    console.error('Failed to fetch conditions:', error)
    return null
  }
  return data
}
