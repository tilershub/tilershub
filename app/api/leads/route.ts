import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: Request){
  try {
    const body = await req.json();
    if (typeof body?.hp === 'string' && body.hp.length > 0) {
      return NextResponse.json({ ok: true });
    }
    const name = String(body?.name || '').slice(0, 120);
    const phone = String(body?.phone || '').slice(0, 40);
    const message = String(body?.message || '').slice(0, 2000);
    const sb = supabaseServer();
    const { error } = await sb.from('leads').insert({ name, phone, message });
    if (error) return NextResponse.json({ ok:false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok:true });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e?.message || 'unknown' }, { status: 500 });
  }
}
