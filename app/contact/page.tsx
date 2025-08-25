'use client';
import { useState } from 'react';

export default function ContactPage(){
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [ok, setOk] = useState<string|null>(null);
  const [err, setErr] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent){
    e.preventDefault();
    setLoading(true); setErr(null); setOk(null);
    const res = await fetch('/api/leads', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, phone, message, hp:'' }) });
    setLoading(false);
    if (!res.ok) { setErr('Sorry, something went wrong.'); return; }
    setOk('Thanks! We will contact you shortly.'); setName(''); setPhone(''); setMessage('');
  }

  return (
    <main className="home">
      <div className="section" style={{maxWidth:620, margin:'16px auto'}}>
        <h1 style={{marginTop:0}}>Contact Us</h1>
        <form onSubmit={onSubmit}>
          <label>Name<input value={name} onChange={e=>setName(e.target.value)} required/></label>
          <label>Phone<input value={phone} onChange={e=>setPhone(e.target.value)} required/></label>
          <label>Message<textarea rows={4} value={message} onChange={e=>setMessage(e.target.value)} /></label>
          {ok && <div style={{color:'green'}}>{ok}</div>}
          {err && <div style={{color:'crimson'}}>{err}</div>}
          <button className="btn-primary" disabled={loading}>{loading?'Sending…':'Send'}</button>
        </form>
      </div>
    </main>
  );
}
