import { supabaseServer } from '@/lib/supabaseServer';
import Link from 'next/link';

export default async function TilerProfile({ params }: { params: { id: string } }){
  const sb = supabaseServer();
  const id = Number(params.id);
  const { data: tiler } = await sb.from('tilers').select('*').eq('id', id).single();
  const { data: evals } = await sb.from('evaluations').select('score_quality,score_service,score_timeliness,score_pricing,score_cleanliness').eq('tiler_id', id).limit(100);
  const counts = evals?.length ?? 0;
  const avg = (k: keyof NonNullable<typeof evals>[number]) => evals?.length ? evals.reduce((a,e)=>a+(e[k]||0),0)/evals.length : 0;
  return (
    <main className="home">
      <Link href="/tilers" style={{textDecoration:'none'}}>&larr; Back to Tilers</Link>
      <div className="section" style={{display:'grid',gridTemplateColumns:'160px 1fr',gap:16}}>
        {tiler?.avatar_url ? <img src={tiler.avatar_url} alt="" style={{width:160,height:160,objectFit:'cover',borderRadius:12}}/> : <div style={{width:160,height:160,background:'#eef2ff',borderRadius:12}}/>}
        <div>
          <h1 style={{margin:'0 0 6px'}}>{tiler?.name ?? 'Tiler'}</h1>
          <p style={{margin:0,color:'#6b7280'}}>{tiler?.city ?? ''}</p>
          <div style={{marginTop:12,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:8}}>
            <div className="card"><b>Quality</b><div>{avg('score_quality').toFixed(1)}/5</div></div>
            <div className="card"><b>Service</b><div>{avg('score_service').toFixed(1)}/5</div></div>
            <div className="card"><b>Timeliness</b><div>{avg('score_timeliness').toFixed(1)}/5</div></div>
            <div className="card"><b>Pricing</b><div>{avg('score_pricing').toFixed(1)}/5</div></div>
            <div className="card"><b>Cleanliness</b><div>{avg('score_cleanliness').toFixed(1)}/5</div></div>
            <div className="card"><b>Total Reviews</b><div>{counts}</div></div>
          </div>
        </div>
      </div>
    </main>
  );
}
