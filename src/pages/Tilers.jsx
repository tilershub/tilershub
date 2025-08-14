import { useEffect, useState } from 'react'
import { hasSupabase, supabase } from '../lib/supabaseClient'
import TilerCard from '../components/TilerCard'

export default function Tilers() {
  const [tilers, setTilers] = useState([])

  useEffect(() => {
    async function load() {
      try {
        if (hasSupabase) {
          const { data, error } = await supabase
            .from('tilers')
            .select('*')
            .order('featured', { ascending: false })
            .order('rating', { ascending: false })
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

  return (
    <div className="container vstack">
      <h2 className="section-title">All Tilers</h2>
      <div className="vstack" style={{ gap: 12 }}>
        {tilers.map(t => <TilerCard key={t.id} tiler={t} />)}
      </div>
    </div>
  )
}