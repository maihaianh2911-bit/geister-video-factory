// 32.02–36.32 the plan: crayon sheet "MEIN PLAN" — age 6 → cake 20 → money bag "MILLIONÄR" on "Millionär"
import { K, kid, paper, arrow, T, glow, fade, pop, prog, eout, f1 } from './lib.js';
function cake(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${f1(s * 100) / 100})"><rect x="-80" y="-60" width="160" height="90" rx="14" fill="#f6b8c8" stroke="${K.ol}" stroke-width="6"/><path d="M -80 -30 Q -60 -10 -40 -30 Q -20 -10 0 -30 Q 20 -10 40 -30 Q 60 -10 80 -30" stroke="#fff" stroke-width="10" fill="none"/>${T(0, 20, '20', 48, { fill: K.ol })}<rect x="-30" y="-110" width="14" height="50" rx="5" fill="${K.blue}" stroke="${K.ol}" stroke-width="4"/><rect x="16" y="-110" width="14" height="50" rx="5" fill="${K.blue}" stroke="${K.ol}" stroke-width="4"/><path d="M -23 -114 q -10 -16 0 -26 q 10 10 0 26 M 23 -114 q -10 -16 0 -26 q 10 10 0 26" fill="${K.gold}"/></g>`;
}
function bag(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${f1(s * 100) / 100})"><path d="M -40 -110 L 40 -110 L 24 -80 Q 110 -40 100 40 Q 90 100 0 100 Q -90 100 -100 40 Q -110 -40 -24 -80 Z" fill="#c9a35a" stroke="${K.ol}" stroke-width="6" stroke-linejoin="round"/><path d="M -30 -84 L 30 -84" stroke="${K.ol}" stroke-width="10"/>${T(0, 40, '€', 90, { fill: '#6b4e1c' })}</g>`;
}
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#f3e3c1"/><rect x="0" y="1330" width="1080" height="590" fill="#dcc293"/>`;
  const sl = eout(prog(t, 32.02, 32.4));
  let inner = T(0, -300, 'MEIN PLAN', 76, { fill: K.blue });
  inner += `<g opacity="${f1(fade(t, 32.6) * 100) / 100}"><circle cx="-210" cy="-90" r="70" fill="${K.shirt}" stroke="${K.ol}" stroke-width="6"/>${T(-210, -62, '6', 80)}</g>`;
  inner += arrow(-120, -90, 30, -90, eout(prog(t, 33.2, 33.6)), K.ol, 12);
  inner += `<g opacity="${f1(fade(t, 33.62) * 100) / 100}">${cake(150, -70, pop(t, 33.62))}</g>`;
  inner += arrow(150, 10, 150, 110, eout(prog(t, 34.6, 34.9)), K.ol, 12);
  if (t > 35.2) inner += glow(0, 230, 200, K.gold, .5 * fade(t, 35.28));
  inner += `<g opacity="${f1(fade(t, 35.28, .2) * 100) / 100}">${bag(-180, 240, pop(t, 35.28))}${T(110, 230, 'MILLIONÄR', 56, { fill: K.green })}${T(110, 290, '1.000.000 €', 44)}</g>`;
  s += paper(560, 760 + (1 - sl) * 900, 760, 860, { lines: 0, rot: 1.5, inner });
  s += kid(150, 1330, .62, { aL: [30, 60], aR: [95, -10], mouth: t > 35.28 ? 'grin' : 'smile', brows: 'up', look: [12, -4] });
  return s;
}
