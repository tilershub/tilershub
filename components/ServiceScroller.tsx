'use client';
type Service = { id?: string|number; title?: string; description?: string; icon_url?: string; href?: string; };

export default function ServiceScroller({ items = [] as Service[] }) {
  return (
    <div className="scroller" role="list">
      {items.map((s, i) => (
        <a key={s.id ?? i} className="card" role="listitem" href={s.href ?? '#'}>
          {s.icon_url ? <img src={s.icon_url} alt="" style={{width:48,height:48}}/> : null}
          <h3>{s.title ?? 'Service'}</h3>
          <p>{s.description ?? ''}</p>
        </a>
      ))}
    </div>
  );
}
