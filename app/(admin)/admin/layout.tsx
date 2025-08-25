import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="home">
      <div className="section" style={{marginBottom:12}}>
        <nav style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          <Link className="btn" href="/(admin)/admin">Overview</Link>
          <Link className="btn" href="/(admin)/admin/banners">Banners</Link>
          <Link className="btn" href="/(admin)/admin/services">Services</Link>
          <Link className="btn" href="/(admin)/admin/tilers">Tilers</Link>
        </nav>
      </div>
      {children}
    </main>
  );
}
