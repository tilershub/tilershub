export type Inputs = {
  len_ft: number;
  wid_ft: number;
  tile_label: string;
  tile_price_sqft: number;
  skirting_len_ft?: number;
  labor_rate_sqft?: number;
};

export type Report = {
  sqft: number;
  tile_sqft: number;
  floor_tiles: number;
  skirting_tiles: number;
  wastage_tiles: number;
  tiles_total: number;
  materials_cost: number;
  labor_floor: number;
  labor_skirting: number;
  labor_total: number;
  grand_total: number;
};

type TileSize = { label: string; w?: number; h?: number; w_in?: number; h_in?: number };

export function computeReport(inp: Inputs, sizes: TileSize[]): Report {
  const sqft = +(inp.len_ft * inp.wid_ft || 0).toFixed(2);
  const size = sizes.find(s => s.label === inp.tile_label) || sizes[1];
  const wft = size.w ? (size.w/304.8) : (size.w_in ? (size.w_in/12) : 2);
  const hft = size.h ? (size.h/304.8) : (size.h_in ? (size.h_in/12) : 2);
  const tile_sqft = +(wft * hft).toFixed(4);

  const floor_tiles_raw = tile_sqft > 0 ? (sqft / tile_sqft) : 0;
  const floor_tiles = Math.ceil(floor_tiles_raw);
  const skirting_len = inp.skirting_len_ft || 0;
  const skirting_tiles = Math.ceil(skirting_len / (wft || 1));
  const wastage_tiles = Math.ceil((floor_tiles + skirting_tiles) * 0.08);
  const tiles_total = floor_tiles + skirting_tiles + wastage_tiles;

  const materials_cost = +(sqft * (inp.tile_price_sqft || 0)).toFixed(2);
  const labor_rate = inp.labor_rate_sqft || 0;
  const labor_floor = +(sqft * labor_rate).toFixed(2);
  const labor_skirting = +((skirting_len) * (labor_rate * 0.4)).toFixed(2);
  const labor_total = +(labor_floor + labor_skirting).toFixed(2);
  const grand_total = +(materials_cost + labor_total).toFixed(2);

  return { sqft, tile_sqft, floor_tiles, skirting_tiles, wastage_tiles, tiles_total, materials_cost, labor_floor, labor_skirting, labor_total, grand_total };
}
