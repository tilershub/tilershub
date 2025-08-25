/** Simple synchronous helpers. Not marked 'use server' so exports can be sync. */
export function sanitizeText(v: any, max = 255) {
  return String(v ?? '').slice(0, max);
}
export function sanitizeUrl(v: any, max = 2000) {
  const s = String(v ?? '').slice(0, max);
  if (!s) return s;
  try { new URL(s); return s; } catch { return ''; }
}