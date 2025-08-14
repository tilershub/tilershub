import { useEffect, useState } from 'react'
import { hasSupabase, supabase } from '../lib/supabaseClient'
import TilerCard from '../components/TilerCard'

export default function Home() {
  const [tilers, setTilers] = useState([])

  useEffect(() => {
    async function load() {
      try {
        if (hasSupabase) {
          const { data, error } = await supabase
            .from('tilers')
            .select('*')
            .order('rating', { ascending: false })
            .limit(20)
          if (error) throw error
          setTilers(data || [])
        } else {
          const res = await fetch('/tilers/tilers.json')
          setTilers(await res.json())
        }
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  const featured = tilers.filter(t => t.featured)
  const highRated = tilers.filter(t => (t.rating ?? 0) >= 4.8)

  return (
    <div className="container vstack">
      <h2 className="section-title">Featured Tilers</h2>
      <div className="scroller">
        {featured.map(t => <TilerCard key={t.id} tiler={t} />)}
      </div>

      <h2 className="section-title">Top Rated</h2>
      <div className="scroller">
        {highRated.map(t => <TilerCard key={t.id} tiler={t} />)}
      </div>

      <h2 className="section-title">Tools</h2>
      <div className="hstack" style={{ flexWrap: 'wrap', gap: 12 }}>
        <a className="btn" href="/estimator">Tiling Cost Estimator</a>
        <a className="btn" href="/bathroom-estimator">Bathroom Estimator</a>
        <a className="btn" href="/quotation">Quotation Maker</a>
        <a className="btn" href="/invoice">Invoice Maker</a>
        <a className="btn" href="/blog">Blog</a>
      </div>
    </div>
  )
}