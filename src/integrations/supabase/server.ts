import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

/** Server-side Supabase client using publishable key (same as .env). */
export function createServerSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY in environment.");
  }

  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
