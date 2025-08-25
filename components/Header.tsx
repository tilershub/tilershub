'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header(){
  const [open, setOpen] = useState(false);
  return (
    <header style={{background:'#fff',borderBottom:'1px solid #e5e7eb'}}>
      <div className="nav">
        <Link href="/" className="brand">TILERSHUB</Link>
        <button aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(o=>!o)} className="nav-toggle"
          style={{border:'1px solid #e5e7eb',borderRadius:8,background:'#fff',padding:'6px 10px'}}>☰</button>
        <nav className={`nav-menu ${open?'active':''}`}>
          <Link href="/estimator">Estimator</Link>
          <Link href="/tilers">Tilers</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/(admin)/admin">Admin</Link>
          <Link href="/auth/login">Login</Link>
        </nav>
      </div>
      <style jsx>{`
        .nav-menu { display:none; gap:16px; }
        @media (min-width: 720px){ .nav-menu{display:flex;} .nav-toggle{display:none;} }
        .nav-menu.active{ display:flex; flex-direction:column; padding:8px 16px; }
      `}</style>
    </header>
  );
}
