// app/(admin)/admin/page.tsx
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'

export const dynamic = 'force-dynamic'

type Profile = {
  role?: string | null
  is_admin?: boolean | null
  full_name?: string | null
}

export default async function AdminPage() {
  // Build a server-side Supabase client (read-only cookie methods in RSC)
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
  )

  // 1) Auth check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    // send to login and return here after
    redirect('/auth/login?next=/admin')
  }

  // 2) Admin gate
  const { data: profile } = await supabase
    .from('profiles')
    .select('role,is_admin,full_name')
    .eq('id', user.id)
    .single<Profile>()

  const isAdmin = profile?.role === 'admin' || profile?.is_admin === true
  if (!isAdmin) {
    return (
      <section style={{display:'grid', gap:16}}>
        <h1>Access denied</h1>
        <p>Your account doesn’t have admin permissions.</p>
        <p><Link href="/">Go home</Link></p>
      </section>
    )
  }

  // 3) Dashboard shell
  return (
    <section style={{display:'grid', gap:16}}>
      {/* Top bar */}
      <div className="card" style={{padding:12, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', gap:8, alignItems:'baseline'}}>
          <h1 style={{margin:0}}>Admin Dashboard</h1>
          <span style={{color:'var(--muted)'}}>Welcome {profile?.full_name ?? user.email}</span>
        </div>
        <nav style={{display:'flex', gap:12}}>
          <Link href="/admin/banners">Banners</Link>
          <Link href="/admin/services">Services</Link>
          <Link href="/admin/tilers">Tilers</Link>
          <Link href="/auth/logout">Logout</Link>
        </nav>
      </div>

      {/* Sections card */}
      <div className="card" style={{padding:16}}>
        <h3 style={{marginTop:0}}>Sections</h3>
        <ul style={{margin:0, paddingLeft:18}}>
          <li><Link href="/admin/banners">Manage Banners</Link></li>
          <li><Link href="/admin/services">Manage Services</Link></li>
          <li><Link href="/admin/tilers">Manage Tilers</Link></li>
        </ul>
      </div>

      {/* KPI placeholders (replace with real queries later) */}
      <div className="card" style={{padding:16}}>
        <strong>Overview</strong>
        <div style={{display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))'}}>
          <div className="card" style={{padding:14}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span>Tilers</span>
              <span className="badge" style={{background:'#003049', color:'#fff', borderRadius:10, padding:'6px 10px'}}>—</span>
            </div>
          </div>
          <div className="card" style={{padding:14}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span>Evaluations</span>
              <span className="badge" style={{background:'#003049', color:'#fff', borderRadius:10, padding:'6px 10px'}}>—</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}