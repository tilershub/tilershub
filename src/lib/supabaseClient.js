import { createClient } from '@supabase/supabase-js'

// Use environment variables in Netlify (Project Settings → Environment)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey)
export const supabase = hasSupabase ? createClient(supabaseUrl, supabaseAnonKey) : null