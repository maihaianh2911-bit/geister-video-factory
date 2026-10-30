// palate close-up inside a magnifier: a vessel running through the palate tissue
import { K, BG, headProfile, lens, vessel, prog, eout, lerp, f1, cl } from './lib.js';
export function palateLens(t, o = {}) {
  const lx = o.lx || 540, ly = o.ly || 980, r = o.r || 400, w = o.w ?? 1;
  const tissue = `<rect x="${lx - r}" y="${ly - r}" width="${2 * r}" height="${2 * r}" fill="#F9C9CF"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${lx - r + 60 + i * 150}" cy="${ly - r + 80 + (i % 2) * 40}" r="40" fill="#F4B5BE"/><circle cx="${lx - r + 120 + i * 150}" cy="${ly + r - 90 - (i % 2) * 40}" r="46" fill="#F4B5BE"/>`).join('')}
    ${o.cold ? `<rect x="${lx - r}" y="${ly - r}" width="${2 * r}" height="${2 * r}" fill="${K.cold}" opacity="${.28 * cl(o.cold)}"/>` : ''}
    ${vessel(t, lx, ly + (o.vy || 0), 2 * r + 40, w, { id: o.id + 'v', cold: o.cold, hot: o.hot, speed: o.speed })}
    ${o.extra || ''}`;
  return lens(lx, ly, r, tissue, o.id + 'l', o.a ?? 1);
}
// small context icon: profile head with the palate spot marked, dashed line to the lens
export function contextHead(t, x, y, s, o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})">${headProfile(t, { id: o.id || 'ch', ice: 1, cold: o.cold ?? 1 })}<circle cx="150" cy="70" r="34" fill="none" stroke="${K.ink}" stroke-width="10"/></g>`;
}
export function inArrows(cx, cy, d, a, col, out = false) {
  if (a <= .01) return '';
  // s0 = -1 above the vessel, +1 below; arrow tip points toward the vessel (in) or away from it (out)
  return [-1, 1].map(s0 => [-200, 0, 200].map(dx => {
    const by = cy + s0 * d, dir = out ? s0 : -s0, tip = by + dir * 70;
    return `<g opacity="${cl(a)}"><path d="M ${cx + dx} ${by} L ${cx + dx} ${tip}" stroke="${K.ink}" stroke-width="26" stroke-linecap="round"/><path d="M ${cx + dx} ${by} L ${cx + dx} ${tip}" stroke="${col}" stroke-width="14" stroke-linecap="round"/><path d="M ${cx + dx - 26} ${tip - dir * 30} L ${cx + dx} ${tip} L ${cx + dx + 26} ${tip - dir * 30}" fill="none" stroke="${K.ink}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  }).join('')).join('');
}
