import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let supabase: SupabaseClient<any, 'public', any> | null = null;

export function getSupabase() {
  if (!supabase && supabaseUrl && supabaseKey) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase = createClient<any>(supabaseUrl, supabaseKey);
  }
  return supabase;
}
