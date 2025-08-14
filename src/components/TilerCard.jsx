export default function TilerCard({ tiler }) {
  return (
    <article className="tiler-card">
      <img className="tiler-thumb" src={tiler.image || '/tilers/images/placeholder.jpg'} alt={tiler.name} />
      <div className="vstack">
        <h3 className="tiler-name">{tiler.name} {tiler.featured && <span className="badge">Featured</span>}</h3>
        <div className="meta">{tiler.city || ''}</div>
        <div className="rating">★ {tiler.rating?.toFixed(1) ?? '—'} <span className="meta">({tiler.reviewCount ?? 0})</span></div>
        <div className="hstack" style={{ marginTop: 4 }}>
          <a className="btn" href={`/book?tiler=${encodeURIComponent(tiler.id)}`}>Book now</a>
          <a className="btn ghost" href={`/tilers/${encodeURIComponent(tiler.id)}`}>View profile</a>
        </div>
      </div>
    </article>
  )
}