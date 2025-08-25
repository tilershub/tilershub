export default function Footer(){
  return (
    <footer style={{background:'#fff', marginTop:24, borderTop:'1px solid #e5e7eb'}}>
      <div className="container footer" style={{paddingTop:16, paddingBottom:16}}>
        <div className="spread">
          <strong style={{letterSpacing:.3}}>TILERSHUB</strong>
          <nav className="stack" style={{gridAutoFlow:'column', gap:14}}>
            <a href="https://tilershub.lk" target="_blank" rel="noreferrer">tilershub.lk</a>
            <a href="tel:0774503744">0774503744</a>
            <span style={{color:'var(--muted)'}}>Gampaha</span>
          </nav>
        </div>
        <div style={{marginTop:12, color:'var(--muted)'}}>
          <a href="/about">About</a> &nbsp; <a href="/contact">Contact</a> &nbsp; <a href="/privacy">Privacy</a> &nbsp; <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  )
}