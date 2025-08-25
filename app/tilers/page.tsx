import Link from 'next/link';
import { supabaseServer } from '@/lib/supabaseServer';

export default async function TilersPage(){
  const sb = supabaseServer();
  const { data: tilers } = await sb.from('tilers').select('id, name, city, avatar_url, rating').order('rating', { ascending: false }).limit(30);
  return (
    <main className="home">
      <h1 style={{fontSize:22,margin:'8px 0 16px'}}>Tilers</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        {(tilers ?? []).map(t => (
          <Link key={t.id} href={`/tilers/${t.id}`} className="card" style={{textDecoration:'none',color:'inherit'}}>
            {t.avatar_url ? <img src={t.avatar_url} alt="" style={{width:'100%',height:140,objectFit:'cover',borderRadius:8}}/> : null}
            <h3>{t.name ?? 'Tiler'}</h3>
            <p>{t.city ?? ''}{typeof t.rating === 'number' ? ` • ★ ${Number(t.rating).toFixed(1)}` : ''}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
