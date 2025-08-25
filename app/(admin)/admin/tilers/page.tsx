import { adminClient } from '../_lib';
import { sanitizeText, sanitizeUrl } from '../_utils';

// ... rest of your CRUD code for tilers stays the same

export const dynamic = 'force-dynamic';

async function list() {
  const sb = await adminClient();
  const { data } = await sb.from('tilers').select('*').order('rating', { ascending: false }).limit(200);
  return data ?? [];
}

async function create(formData: FormData) {
  'use server';
  const sb = await adminClient();
  const row = {
    name: sanitizeText(formData.get('name'), 120),
    city: sanitizeText(formData.get('city'), 120),
    avatar_url: sanitizeUrl(formData.get('avatar_url')),
    rating: Number(formData.get('rating') ?? 0)
  };
  await sb.from('tilers').insert(row);
}

async function update(formData: FormData) {
  'use server';
  const sb = await adminClient();
  const id = Number(formData.get('id'));
  if (!id) return;
  const row = {
    name: sanitizeText(formData.get('name'), 120),
    city: sanitizeText(formData.get('city'), 120),
    avatar_url: sanitizeUrl(formData.get('avatar_url')),
    rating: Number(formData.get('rating') ?? 0)
  };
  await sb.from('tilers').update(row).eq('id', id);
}

async function destroy(formData: FormData) {
  'use server';
  const sb = await adminClient();
  const id = Number(formData.get('id'));
  if (!id) return;
  await sb.from('tilers').delete().eq('id', id);
}

export default async function TilersAdmin() {
  const rows = await list();
  return (
    <div className="section">
      <h1 style={{marginTop:0}}>Tilers</h1>

      <details open>
        <summary style={{cursor:'pointer',marginBottom:12}}><b>Create new</b></summary>
        <form action={create} style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
          <label>Name<input name="name" required/></label>
          <label>City<input name="city"/></label>
          <label>Avatar URL<input name="avatar_url"/></label>
          <label>Rating<input type="number" name="rating" step="0.1" min="0" max="5" defaultValue={0}/></label>
          <button className="btn-primary">Create</button>
        </form>
      </details>

      <div style={{overflowX:'auto'}}>
        <table className="table" style={{minWidth:800, marginTop:12}}>
          <thead>
            <tr><th>ID</th><th>Name</th><th>City</th><th>Avatar</th><th>Rating</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {rows.map((r:any)=>(
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.city}</td>
                <td style={{maxWidth:220,overflow:'hidden',textOverflow:'ellipsis'}}>{r.avatar_url}</td>
                <td>{r.rating ?? '-'}</td>
                <td>
                  <form action={update} style={{display:'inline-block',marginRight:8}}>
                    <input type="hidden" name="id" value={r.id}/>
                    <input type="hidden" name="name" value={r.name || ''}/>
                    <input type="hidden" name="city" value={r.city || ''}/>
                    <input type="hidden" name="avatar_url" value={r.avatar_url || ''}/>
                    <input type="hidden" name="rating" value={r.rating ?? 0}/>
                    <button className="btn">Save</button>
                  </form>
                  <form action={destroy} onSubmit={(e)=>{ if(!confirm('Delete tiler?')) e.preventDefault(); }} style={{display:'inline-block'}}>
                    <input type="hidden" name="id" value={r.id}/>
                    <button className="btn">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
