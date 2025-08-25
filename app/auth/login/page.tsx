'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function LoginPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function onSubmit(e: React.FormEvent){
    e.preventDefault();
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    window.location.href = '/';
  }

  return (
    <main className="home">
      <div className="section" style={{maxWidth:420, margin:'24px auto'}}>
        <h1 style={{marginTop:0}}>Login</h1>
        <form onSubmit={onSubmit}>
          <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
          <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>
          {error ? <div style={{color:'crimson',marginTop:8}}>{error}</div> : null}
          <button className="btn-primary" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</button>
        </form>
      </div>
    </main>
  );
}
