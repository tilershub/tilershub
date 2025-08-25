'use server';

import { requireAdmin } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabaseServer';

export async function adminClient() {
  await requireAdmin();
  return supabaseServer();
}

export function sanitizeText(v: any, max = 255) {
  return String(v ?? '').slice(0, max);
}

export function sanitizeUrl(v: any, max = 2000) {
  const s = String(v ?? '').slice(0, max);
  if (!s) return s;
  try { new URL(s); return s; } catch { return ''; }
}
