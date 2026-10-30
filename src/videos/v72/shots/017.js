// 43.82–46.46: you consider putting the bread in the toaster ("Toaster" 45.4, "stecken" 46.0) — the mouldy slice goes down into the slot
import { K, DEFS, kitchen, bust, slice, cam, prog, eio, lerp, f1 } from './lib.js';
export function toaster(x, y, s, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><rect x="-200" y="-150" width="400" height="300" rx="70" fill="${K.steel}" stroke="${K.ink}" stroke-width="5"/>
    <rect x="-130" y="-160" width="100" height="26" rx="10" fill="${K.ink}"/><rect x="30" y="-160" width="100" height="26" rx="10" fill="${K.ink}"/><rect x="200" y="${f1(-60 + 70 * (o.lever || 0))}" width="40" height="30" rx="8" fill="${K.ink}"/>
    <rect x="-170" y="150" width="60" height="20" rx="6" fill="${K.steelD}"/><rect x="110" y="150" width="60" height="20" rx="6" fill="${K.steelD}"/>${o.glow ? `<circle cx="0" cy="-150" r="200" fill="url(#kHeat)" opacity="${f1(o.glow)}"/>` : ''}</g>`;
}
export default function renderShot(t) {
  const m = eio(prog(t, 43.9, 45.3)), d = eio(prog(t, 45.4, 46.1));
  const sx = lerp(330, 620, m), sy = lerp(980, 1090, m) + 120 * d;
  const piece = `<defs><clipPath id="k17"><rect x="-100" y="-100" width="1300" height="${f1(1190 + 2)}"/></clipPath></defs><g clip-path="url(#k17)">${slice(sx, sy, .55, { id: 's17', spot: 1, at: [-60, 40] })}</g>`;
  const du = bust('du', 230, 1060, 1.2, { look: 1, lookY: .4, brow: .4, mouth: 'flat', aR: [[380, 1240], [sx - 20, sy + 70]] });
  return `${DEFS}${cam(`${kitchen(1350)}${toaster(640, 1200, 1.0)}${piece}${du}`, 1.05, 520, 1100)}`;
}
