// v102 sharp furniture + small shared scene pieces
import { K, f1, op, pool, T } from './lib.js';
const INK = K.ink;
// sharp bed (side view) at left; y = mattress top
export function bed(y = 1380, o = {}) {
  const w = o.w || 640;
  return `<rect x="-80" y="${y - 260}" width="70" height="420" rx="16" fill="#6d4c3d" stroke="${INK}" stroke-width="6"/><rect x="-60" y="${y}" width="${w}" height="120" rx="20" fill="#e9ecf2" stroke="${INK}" stroke-width="6"/><path d="M ${w - 300} ${y + 4} C ${w - 200} ${y - 20} ${w - 100} ${y - 20} ${w - 60} ${y + 8} L ${w - 60} ${y + 120} L ${w - 300} ${y + 120} Z" fill="#4f7fb5" stroke="${INK}" stroke-width="5"/><rect x="-60" y="${y + 120}" width="${w}" height="60" fill="#6d4c3d" stroke="${INK}" stroke-width="6"/><rect x="-40" y="${y - 70}" width="230" height="80" rx="30" fill="#f4f1ea" stroke="${INK}" stroke-width="5"/>`;
}
// digital clock block (sharp) centred at x, bottom y
export function digiClock(x, y, txt, o = {}) {
  const ring = o.ring || 0, sh = ring ? Math.sin((o.t || 0) * 70) * 6 * ring : 0;
  let g = `<g transform="translate(${f1(x + sh)} ${y}) rotate(${f1(sh * .8)})"><rect x="-120" y="-130" width="240" height="130" rx="22" fill="#2a2a30" stroke="${INK}" stroke-width="6"/><rect x="-100" y="-110" width="200" height="80" rx="10" fill="#160f12"/>${T(0, -48, txt, 60, { fill: o.col || '#ff5a4a' })}</g>`;
  if (ring > 0) g += pool(x, y - 70, 200, 140, '#ff5a4a', .35 * ring) + `<g stroke="#ffd23f" stroke-width="8" fill="none" stroke-linecap="round" opacity="${op(ring)}"><path d="M ${x - 150} ${y - 150} q -24 -30 -10 -60"/><path d="M ${x + 150} ${y - 150} q 24 -30 10 -60"/></g>`;
  return g;
}
// small sharp side table top at y with the digital clock
export function sideTable(x, y) {
  return `<rect x="${x - 170}" y="${y}" width="340" height="${1980 - y}" rx="10" fill="#6b5446" stroke="${INK}" stroke-width="6"/><rect x="${x - 185}" y="${y - 10}" width="370" height="34" rx="8" fill="#7e6352" stroke="${INK}" stroke-width="6"/><rect x="${x - 140}" y="${y + 90}" width="280" height="120" rx="8" fill="#5c4639" stroke="${INK}" stroke-width="4"/><circle cx="${x}" cy="${y + 150}" r="10" fill="#c9a86a"/>`;
}
// dark tinted full-frame overlay
export const tint = (col, a) => a > 0 ? `<rect x="-300" y="-300" width="1680" height="2520" fill="${col}" opacity="${op(a)}"/>` : '';
// laptop back (lid facing viewer) with glow from its screen toward the face
export function laptopBack(x, y, s, t, glow = 1) {
  const fl = .75 + .25 * Math.sin(t * 7.3) * Math.sin(t * 2.1);
  return pool(x, y - 380 * s, 360 * s, 300 * s, '#7fc4ff', .5 * glow * fl) + `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})"><path d="M -240 0 L -220 -300 L 220 -300 L 240 0 Z" fill="#aeb6c0" stroke="${INK}" stroke-width="6"/><circle cx="0" cy="-150" r="26" fill="#d8dee4"/><path d="M -220 -300 L 220 -300" stroke="#bfe6ff" stroke-width="8" opacity="${op(.8 * fl)}"/><rect x="-270" y="0" width="540" height="30" rx="10" fill="#8a929c" stroke="${INK}" stroke-width="5"/></g>`;
}
