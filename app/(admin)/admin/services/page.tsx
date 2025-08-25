import { adminClient, sanitizeText, sanitizeUrl } from '../_lib';

export const dynamic = 'force-dynamic';

async function list() {
  const sb = await adminClient();
  const { data } = await sb.from('services').select('*').order('sort_order');
  return data ?? [];
}

async function create(formData: FormData) {
  'use server';
  const sb = await adminClient();
  const row = {
    title: sanitizeText(formData.get('title'), 120),
    description: sanitizeText(formData.get('description'), 400),
    icon_url: sanitizeUrl(formData.get('icon_url')),
    href: sanitizeUrl(formData.get('href')),
    is_active: formData.get('is_active') === 'on',
    sort_order: Number(formData.get('sort_order') ?? 0)
  };
  await sb.from('services').insert(row);
}

async function update(formData: FormData) {
  'use server';
  const sb = await adminClient();
  const id = Number(formData.get('id'));
  if (!id) return;
  const row = {
    title: sanitizeText(formData.get('title'), 120),
    description: sanitizeText(formData.get('description'), 400),
    icon_url: sanitizeUrl(formData.get('icon_url')),
    href: sanitizeUrl(formData.get('href')),
    is_active: formData.get('is_active') === 'on',
    sort_order: Number(formData.get('sort_order') ?? 0)
  };
  await sb.from('services').update(row).eq('id', id);
}

async function destroy(formData: FormData) {
  'use server';
  const sb = await adminClient();
  const id = Number(formData.get('id'));
  if (!id) return;
  await sb.from('services').delete().eq('id', id);
}

export default async function ServicesAdmin() {
  const rows = await list();
  return (
    <div className="section">
      <h1 style={{marginTop:0}}>Services</h1>

      <details open>
        <summary style={{cursor:'pointer',marginBottom:12}}><b>Create new</b></summary>
        <form action={create} style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
          <label>Title<input name="title" required/></label>
          <label>Description<input name="description"/></label>
          <label>Icon URL<input name="icon_url"/></label>
          <label>Link Href<input name="href"/></label>
          <label>Sort Order<input type="number" name="sort_order" defaultValue={0}/></label>
          <label><input type="checkbox" name="is_active" defaultChecked/> Active</label>
          <button className="btn-primary">Create</button>
        </form>
      </details>

      <div style={{overflowX:'auto'}}>
        <table className="table" style={{minWidth:800, marginTop:12}}>
          <thead>
            <tr><th>ID</th><th>Title</th><th>Description</th><th>Icon</th><th>Href</th><th>Active</th><th>Sort</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {rows.map((r:any)=>(
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.title}</td>
                <td style={{maxWidth:260,overflow:'hidden',textOverflow:'ellipsis'}}>{r.description}</td>
                <td style={{maxWidth:200,overflow:'hidden',textOverflow:'ellipsis'}}>{r.icon_url}</td>
                <td style={{maxWidth:200,overflow:'hidden',textOverflow:'ellipsis'}}>{r.href}</td>
                <td>{r.is_active ? 'Yes' : 'No'}</td>
                <td>{r.sort_order}</td>
                <td>
                  <form action={update} style={{display:'inline-block',marginRight:8}}>
                    <input type="hidden" name="id" value={r.id}/>
                    <input type="hidden" name="title" value={r.title || ''}/>
                    <input type="hidden" name="description" value={r.description || ''}/>
                    <input type="hidden" name="icon_url" value={r.icon_url || ''}/>
                    <input type="hidden" name="href" value={r.href || ''}/>
                    <input type="hidden" name="sort_order" value={r.sort_order || 0}/>
                    <input type="hidden" name="is_active" value={r.is_active ? 'on' : ''}/>
                    <button className="btn">Save</button>
                  </form>
                  <form action={destroy} onSubmit={(e)=>{ if(!confirm('Delete service?')) e.preventDefault(); }} style={{display:'inline-block'}}>
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
