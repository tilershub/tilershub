import { redirect } from 'next/navigation';
import { supabaseServer } from './supabaseServer';
export async function getSession() {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  return user ?? null;
}
export async function requireAdmin() {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect('/auth/login');
  const { data: profile } = await sb.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/auth/login?e=not_admin');
  return user;
}
