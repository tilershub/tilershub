import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { env } from './env';
export function supabaseServer() {
  const cookieStore = cookies();
  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (name) => cookieStore.get(name)?.value,
      set: (name, value, options) => cookieStore.set({ name, value, ...options }),
      remove: (name, options) => cookieStore.set({ name, value: '', ...options })
    }
  });
}
