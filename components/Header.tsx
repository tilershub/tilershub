'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header(){
  const [open, setOpen] = useState(false)

  // Close menu on route change/hash change
  useEffect(()=>{
    const close = ()=>setOpen(false)
    window.addEventListener('hashchange', close)
    return ()=>window.removeEventListener('hashchange', close)
  },[])

  return (
    <header style={{background:'#fff', position:'sticky', top:0, zIndex:20, boxShadow:'0 1px 0 rgba(0,0,0,.06)'}}>
      <div className="container spread" style={{paddingTop:12,paddingBottom:12}}>
        <Link href="/" style={{fontWeight:900, letterSpacing:.3, color:'var(--brand)'}}>TILERSHUB</Link>
        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={()=>setOpen(v=>!v)}
          style={{
            background:'#fff', border:'1px solid #e5e7eb', borderRadius:10,
            padding:'10px 12px', lineHeight:0
          }}>
          <div style={{width:18, height:2, background:'#0f172a', margin:'3px 0'}}/>
          <div style={{width:18, height:2, background:'#0f172a', margin:'3px 0'}}/>
          <div style={{width:18, height:2, background:'#0f172a', margin:'3px 0'}}/>
        </button>
      </div>

      {open && (
        <nav className="container" style={{paddingTop:0, paddingBottom:12}}>
          <div className="card stack">
            <Link href="/#services">Services</Link>
            <Link href="/#tilers">Top Rated Tilers</Link>
            <Link href="/estimator">Get Estimate</Link>
            <Link href="/login">Login</Link>
          </div>
        </nav>
      )}
    </header>
  )
}