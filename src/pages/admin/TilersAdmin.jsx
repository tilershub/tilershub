import { useEffect, useState } from 'react'
import { supabase, hasSupabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/AuthProvider'

const empty = { id: '', name: '', city: '', image: '', featured: false, rating: 0, reviewCount: 0, bio: '' }

export default function TilersAdmin() {
  const { user } = useAuth()
  const [tilers, setTilers] = useState([])
  const [form, setForm] = useState(empty)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!hasSupabase) return
    load()
  }, [])

  async function load() {
    const { data, error } = await supabase.from('tilers').select('*').order('updated_at', { ascending: false })
    if (error) return setMessage(error.message)
    setTilers(data || [])
  }

  async function save() {
    setMessage('')
    if (!form.id) { setMessage('ID (slug) is required'); return }
    const payload = { ...form, rating: Number(form.rating)||0, reviewCount: Number(form.reviewCount)||0 }
    const { error } = await supabase.from('tilers').upsert(payload).select().single()
    if (error) setMessage(error.message); else { setMessage('Saved'); setForm(empty); load() }
  }

  async function del(id) {
    const { error } = await supabase.from('tilers').delete().eq('id', id)
    if (error) setMessage(error.message); else { setMessage('Deleted'); load() }
  }

  if (!hasSupabase) return <div className="container">Supabase not configured.</div>
  if (!user) return <div className="container">Not authorized</div>

  return (
    <div className="container vstack">
      <h2 className="section-title">Manage Tilers</h2>

      <div className="vstack" style={{gap:8}}>
        <input placeholder="ID (slug, e.g. saman-anurudda)" value={form.id} onChange={e=>setForm({...form, id:e.target.value})}/>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input placeholder="City" value={form.city} onChange={e=>setForm({...form, city:e.target.value})}/>
        <input placeholder="Image URL (Supabase Storage or /tilers/...)" value={form.image} onChange={e=>setForm({...form, image:e.target.value})}/>
        <textarea placeholder="Bio" value={form.bio} onChange={e=>setForm({...form, bio:e.target.value})}/>
        <div className="hstack">
          <label><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form, featured:e.target.checked})}/> Featured</label>
          <input style={{maxWidth:120}} placeholder="Rating" value={form.rating} onChange={e=>setForm({...form, rating:e.target.value})}/>
          <input style={{maxWidth:140}} placeholder="Review Count" value={form.reviewCount} onChange={e=>setForm({...form, reviewCount:e.target.value})}/>
        </div>
        <button className="btn" onClick={save}>Save</button>
        {message && <div style={{color: message==='Saved' ? 'green' : 'crimson'}}>{message}</div>}
      </div>

      <h3 className="section-title">Existing</h3>
      <div className="vstack" style={{gap:8}}>
        {tilers.map(t => (
          <div key={t.id} className="hstack" style={{justifyContent:'space-between', border:'1px solid var(--ring)', padding:8, borderRadius:8}}>
            <div className="hstack">
              <img src={t.image} alt={t.name} style={{width:40, height:40, borderRadius:6, objectFit:'cover'}}/>
              <div className="vstack">
                <strong>{t.name}</strong>
                <small className="meta">{t.city} — ★ {t.rating} ({t.reviewCount})</small>
              </div>
            </div>
            <div className="hstack">
              <button className="btn ghost" onClick={()=>setForm(t)}>Edit</button>
              <button className="btn" onClick={()=>del(t.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}