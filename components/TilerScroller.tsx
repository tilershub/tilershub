'use client';
type Tiler = { id?: string|number; name?: string; city?: string; avatar_url?: string; rating?: number; href?: string; };

export default function TilerScroller({ items = [] as Tiler[] }) {
  return (
    <div className="scroller" role="list">
      {items.map((t, i) => (
        <a key={t.id ?? i} className="card" role="listitem" href={t.href ?? `/tilers/${t.id}`}>
          {t.avatar_url ? <img src={t.avatar_url} alt="" style={{width:56,height:56,borderRadius:8}}/> : null}
          <h3>{t.name ?? 'Tiler'}</h3>
          <p>{t.city ?? ''}{typeof t.rating === 'number' ? ` • ★ ${Number(t.rating).toFixed(1)}` : ''}</p>
        </a>
      ))}
    </div>
  );
}
