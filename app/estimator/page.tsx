'use client';
import { useMemo, useRef, useState } from 'react';
import sizes from './tile-sizes.json';
import type { Inputs, Report } from './EstimatorLogic';
import { computeReport } from './EstimatorLogic';

export default function Estimator(){
  const [inp, setInp] = useState<Inputs>({
    len_ft: 0, wid_ft: 0, tile_label: sizes[1].label,
    tile_price_sqft: 0, skirting_len_ft: 0, labor_rate_sqft: 0
  });

  const rep: Report = useMemo(()=> computeReport(inp, sizes as any), [inp]);

  const onNum = (k: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInp(v => ({ ...v, [k]: +e.target.value || 0 }));
  };

  const reportRef = useRef<HTMLDivElement>(null);
  async function downloadPDF(){
    const [{ default: jsPDF }, html2canvas] = await Promise.all([ import('jspdf'), import('html2canvas') ]);
    const node = reportRef.current; if (!node) return;
    const canvas = await html2canvas.default(node, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const w = canvas.width * ratio; const h = canvas.height * ratio;
    const x = (pageWidth - w) / 2; const y = 24;
    pdf.addImage(imgData, 'PNG', x, y, w, h, undefined, 'FAST');
    pdf.save('tilershub-estimate.pdf');
  }

  return (
    <main className="home">
      <h1 style={{fontSize:22,margin:'8px 0 16px'}}>Floor Tiling Estimator</h1>
      <div className="section">
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
          <label>Length (ft)<input type="number" inputMode="decimal" value={inp.len_ft||''} onChange={onNum('len_ft')} /></label>
          <label>Width (ft)<input type="number" inputMode="decimal" value={inp.wid_ft||''} onChange={onNum('wid_ft')} /></label>
          <label>Tile Size
            <select value={inp.tile_label} onChange={e=>setInp(v=>({...v, tile_label: e.target.value}))}>
              {(sizes as any[]).map(s=>(<option key={s.label} value={s.label}>{s.label}</option>))}
            </select>
          </label>
          <label>Tile Price (LKR / sqft)<input type="number" inputMode="decimal" value={inp.tile_price_sqft||''} onChange={onNum('tile_price_sqft')} /></label>
          <label>Skirting Length (ft)<input type="number" inputMode="decimal" value={inp.skirting_len_ft||''} onChange={onNum('skirting_len_ft')} /></label>
          <label>Labor Rate (LKR / sqft)<input type="number" inputMode="decimal" value={inp.labor_rate_sqft||''} onChange={onNum('labor_rate_sqft')} /></label>
        </div>
      </div>
      <div className="section" ref={reportRef}>
        <h2 style={{marginTop:0}}>Report</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:12}}>
          <div className="card">
            <h3>Project Summary</h3>
            <table className="table"><tbody>
              <tr><td>Area</td><td><b>{rep.sqft}</b> sqft</td></tr>
              <tr><td>Tile Size</td><td><b>{inp.tile_label}</b> (~{rep.tile_sqft.toFixed(2)} sqft/tile)</td></tr>
              <tr><td>Skirting Length</td><td><b>{inp.skirting_len_ft||0}</b> ft</td></tr>
            </tbody></table>
          </div>
          <div className="card">
            <h3>Tile Quantity</h3>
            <table className="table"><tbody>
              <tr><td>Floor Tiles</td><td><b>{rep.floor_tiles}</b></td></tr>
              <tr><td>Skirting Tiles</td><td><b>{rep.skirting_tiles}</b></td></tr>
              <tr><td>Wastage (8%)</td><td><b>{rep.wastage_tiles}</b></td></tr>
              <tr><td>Total Tiles</td><td><b>{rep.tiles_total}</b></td></tr>
            </tbody></table>
          </div>
          <div className="card">
            <h3>Costs</h3>
            <table className="table"><tbody>
              <tr><td>Materials</td><td><b>LKR {rep.materials_cost.toLocaleString()}</b></td></tr>
              <tr><td>Labor — Floor</td><td><b>LKR {rep.labor_floor.toLocaleString()}</b></td></tr>
              <tr><td>Labor — Skirting</td><td><b>LKR {rep.labor_skirting.toLocaleString()}</b></td></tr>
              <tr><td>Total — Labor</td><td><b>LKR {rep.labor_total.toLocaleString()}</b></td></tr>
              <tr><td><b>Grand Total</b></td><td><b>LKR {rep.grand_total.toLocaleString()}</b></td></tr>
            </tbody></table>
          </div>
        </div>
      </div>
      <div className="cta" style={{display:'flex',gap:12,justifyContent:'center'}}>
        <button className="btn" onClick={()=>window.print()}>Print</button>
        <button className="btn-primary" onClick={downloadPDF}>Download PDF</button>
      </div>
    </main>
  );
}
