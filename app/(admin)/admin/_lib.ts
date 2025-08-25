'use server';

import { requireAdmin } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabaseServer';

/** Returns an SSR-bound Supabase client; gated by admin role. */
export async function adminClient() {
  await requireAdmin();
  return supabaseServer();
}