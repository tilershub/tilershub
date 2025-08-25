import Link from "next/link";
import BannerCarousel from "@/components/BannerCarousel";
import ServiceScroller from "@/components/ServiceScroller";
import TilerScroller from "@/components/TilerScroller";
import { supabaseServer } from "@/lib/supabaseServer";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="section__head"><h2>{title}</h2></div>
      {children}
    </section>
  );
}

export default async function Home() {
  const sb = supabaseServer();

  const [{ data: settings }, { data: banners }, { data: services }, { data: spots }] =
    await Promise.all([
      sb.from("site_settings").select("*").single(),
      sb.from("homepage_banners").select("*").eq("is_active", true).order("sort_order"),
      sb.from("services").select("*").eq("is_active", true).order("sort_order"),
      sb.from("tiler_spotlight").select("*, tilers(*)").eq("is_active", true).order("sort_order"),
    ]);

  let tilers: any[] = (spots ?? []).map((s: any) => s.tilers);
  if (!tilers.length) {
    const { data: top } = await sb
      .from("evaluations")
      .select("tiler_id, score_quality, score_service, score_timeliness, score_pricing, score_cleanliness")
      .limit(200);
    const map = new Map<number, { sum: number, n: number }>();
    for (const r of top ?? []) {
      const id = (r as any).tiler_id as number;
      const vals = [r.score_quality, r.score_service, r.score_timeliness, r.score_pricing, r.score_cleanliness].filter((x)=>typeof x==='number') as number[];
      const avg = vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 0;
      const v = map.get(id) || { sum:0, n:0 };
      v.sum += avg; v.n += 1; map.set(id, v);
    }
    const ranked = [...map.entries()].sort((a,b)=>(b[1].sum/b[1].n)-(a[1].sum/a[1].n)).slice(0,10).map(([id])=>id);
    if (ranked.length) {
      const { data: trows } = await sb.from("tilers").select("*").in("id", ranked);
      tilers = trows ?? [];
    }
  }

  return (
    <main className="home">
      <BannerCarousel items={banners ?? []} />
      <Section title="Services">
        <ServiceScroller items={services ?? []} />
      </Section>
      <Section title="Top Rated Tilers">
        <TilerScroller items={tilers} />
      </Section>
      <div className="cta">
        <Link className="btn-primary" href={settings?.estimator_href ?? "/estimator"}>
          Get Estimate
        </Link>
      </div>
    </main>
  );
}
