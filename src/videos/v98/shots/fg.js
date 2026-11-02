// sharp foreground strips for v98
import { K, mug, f1 } from './lib.js';
import { phoneDown } from './base.js';
const INK = K.ink;
export function fgTable(t, o = {}) {
  const y = o.y || 1700, c = o.col || '#8a5a3c', hi = o.hi || '#a26c4a';
  let s = `<rect x="-60" y="${y}" width="1200" height="${2000 - y}" rx="20" fill="${c}" stroke="${INK}" stroke-width="5"/><rect x="-60" y="${y}" width="1200" height="26" fill="${hi}"/>`;
  if (o.mug !== false) s += mug(o.mugX || 210, y, 1, '#f2efe8', t);
  if (o.keys) s += `<g transform="translate(${o.keys} ${y + 14})"><circle cx="0" cy="-10" r="20" fill="none" stroke="#c9a86a" stroke-width="7"/><rect x="14" y="-16" width="60" height="12" rx="4" fill="#c9a86a"/></g>`;
  if (o.remote) s += `<rect x="${o.remote}" y="${y - 22}" width="170" height="30" rx="12" fill="${INK}" transform="rotate(-5 ${o.remote + 85} ${y - 7})"/>`;
  return s;
}
