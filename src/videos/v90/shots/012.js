// L11 37.52–42.38 estimate vs reality: GESCHÄTZT 50 % (on "Hälfte") vs IN WAHRHEIT ~25 % (on "Vierte"); 4 heads, 2 then 1 looking.
import { K, frame, bg, person, T, cam, prog, eio, eout, pop, f1, lerp } from './lib.js';
function bar(x, label, val, txt, p, col) {
  const H = 560, h = H * val * p, base = 1240;
  return `<rect x="${x - 110}" y="${base - H}" width="220" height="${H}" rx="18" fill="#fff" opacity=".55" stroke="${K.ink}" stroke-width="5"/>` +
    `<rect x="${x - 110}" y="${f1(base - h)}" width="220" height="${f1(h)}" rx="18" fill="${col}" stroke="${K.ink}" stroke-width="5"/>` +
    T(x, base - H - 90, label, 44, { fill: '#fff', stroke: K.ink, sw: 10 }) + (p > .6 ? T(x, f1(base - h - 26), txt, 84, { fill: K.ink, stroke: '#fff', sw: 10 }) : '');
}
export default function renderShot(t) {
  let s = bg('office', { sc: 1.06 });
  s += `<rect width="1080" height="1920" fill="#1d1d1d" opacity=".35"/>`;
  const a = eout(prog(t, 38.5, 39.1)), b = eout(prog(t, 41.2, 41.8));
  s += bar(300, 'GESCHÄTZT:', .5, '50 %', a, K.yellow);
  s += bar(780, 'IN WAHRHEIT:', .25, '~25 %', b, '#7ccf9a');
  // four small heads under each bar: who noticed (looking up, lit) vs not
  for (let i = 0; i < 4; i++) {
    const on1 = i < 2 && a > .5, on2 = i < 1 && b > .5;
    s += `<g transform="translate(${180 + i * 80} 1320) scale(.32)"><circle r="100" fill="${K.ink}" stroke="${on1 ? K.yellow : '#fff'}" stroke-width="${on1 ? 16 : 6}"/><circle cx="-32" cy="-8" r="19" fill="#fff"/><circle cx="32" cy="-8" r="19" fill="#fff"/></g>`;
    s += `<g transform="translate(${660 + i * 80} 1320) scale(.32)"><circle r="100" fill="${K.ink}" stroke="${on2 ? '#7ccf9a' : '#fff'}" stroke-width="${on2 ? 16 : 6}"/><circle cx="-32" cy="-8" r="19" fill="#fff"/><circle cx="32" cy="-8" r="19" fill="#fff"/></g>`;
  }
  return frame(cam(s, 540, 1000, 1 + .03 * eio(prog(t, 37.52, 42.38))));
}
