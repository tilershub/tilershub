// app/(admin)/admin/page.tsx
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
      },
    }
  )

  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Check admin role in `profiles`
  const { data: profile } = await supabase
    .from('profiles')
    .select('role,is_admin,full_name')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.role === 'admin' || profile?.is_admin === true
  if (!isAdmin) {
    return <p>Access denied</p>
  }

  // Dashboard shell
  return (
    <section style={{display:'grid', gap:16}}>
      <h1>Admin Dashboard</h1>
      <p>Welcome {profile?.full_name ?? user.email}</p>

      <div className="card" style={{padding:16}}>
        <h3>Sections</h3>
        <ul style={{margin:0, paddingLeft:18}}>
          <li><Link href="/admin/banners">Manage Banners</Link></li>
          <li><Link href="/admin/services">Manage Services</Link></li>
          <li><Link href="/admin/tilers">Manage Tilers</Link></li>
        </ul>
      </div>
    </section>
  )
}