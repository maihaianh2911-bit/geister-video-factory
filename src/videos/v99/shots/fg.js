// sharp foreground strips for v99
import { K, mug } from './lib.js';
const INK = K.ink;
export function fgTable(t, o = {}) {
  const y = o.y || 1700, c = o.col || '#8a5a3c', hi = o.hi || '#a26c4a';
  let s = `<rect x="-60" y="${y}" width="1200" height="${2000 - y}" rx="20" fill="${c}" stroke="${INK}" stroke-width="5"/><rect x="-60" y="${y}" width="1200" height="26" fill="${hi}"/>`;
  if (o.mug !== false) s += mug(o.mugX || 210, y, 1, '#f2efe8', t, o.steam !== false);
  if (o.keys) s += `<g transform="translate(${o.keys} ${y + 14})"><circle cx="0" cy="-10" r="20" fill="none" stroke="#c9a86a" stroke-width="7"/><rect x="14" y="-16" width="60" height="12" rx="4" fill="#c9a86a"/></g>`;
  if (o.remote) s += `<rect x="${o.remote}" y="${y - 22}" width="170" height="30" rx="12" fill="${INK}" transform="rotate(-5 ${o.remote + 85} ${y - 7})"/>`;
  return s;
}
// phone lying on a desk (sharp). lit 0..1 lights the screen, buzz 0..1 shakes it
export function deskPhone(t, x, y, o = {}) {
  const lit = o.lit || 0, bz = o.buzz || 0, sh = bz ? Math.sin(t * 70) * 6 * bz : 0;
  let g = `<g transform="translate(${(x + sh).toFixed(1)} ${y}) rotate(-6)"><rect x="-90" y="-26" width="180" height="40" rx="12" fill="#2e3440" stroke="${INK}" stroke-width="5"/><rect x="-80" y="-30" width="160" height="12" rx="5" fill="${lit > 0 ? '#9fd8ff' : '#4a5262'}" opacity="${(0.4 + .6 * lit).toFixed(2)}"/></g>`;
  if (bz > 0) g += `<g stroke="${K.yellow}" stroke-width="7" fill="none" stroke-linecap="round" opacity="${bz.toFixed(2)}"><path d="M ${x - 130} ${y - 40} q -18 20 0 40"/><path d="M ${x + 130} ${y - 40} q 18 20 0 40"/><path d="M ${x - 160} ${y - 56} q -26 36 0 72"/><path d="M ${x + 160} ${y - 56} q 26 36 0 72"/></g>`;
  return g;
}
