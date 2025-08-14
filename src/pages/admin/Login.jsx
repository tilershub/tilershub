import { useState } from 'react'
import { supabase, hasSupabase } from '../../lib/supabaseClient'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../lib/AuthProvider'

export default function Login() {
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')

  if (!hasSupabase) {
    return <div className="container">Supabase not configured.</div>
  }
  if (user) return <Navigate to="/admin/tilers" replace />

  async function handleLogin(e) {
    e.preventDefault()
    setErr('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
    if (error) setErr(error.message)
  }

  return (
    <div className="container vstack">
      <h2 className="section-title">Admin Login</h2>
      <form className="vstack" onSubmit={handleLogin}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} required />
        {err && <div style={{color:'crimson'}}>{err}</div>}
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  )
}