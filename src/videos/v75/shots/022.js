// 61.92–64.24: downloaded maps remain usable ("heruntergeladene Karten" 61.92–62.6, "nutzbar" 63.26) — your phone shows an offline map, the position dot moves along the route
import { K, DEFS, BG, phone, tick, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const m = eio(prog(t, 62.3, 64.0));
  const route = `M -60 150 L -60 40 L 40 40 L 40 -80 L -20 -150`;
  const pts = [[-60, 150], [-60, 40], [40, 40], [40, -80], [-20, -150]], seg = m * 4, k = Math.min(3, Math.floor(seg)), f = seg - k;
  const dx = lerp(pts[k][0], pts[k + 1][0], f), dy = lerp(pts[k][1], pts[k + 1][1], f);
  const scr = `<rect x="-100" y="-190" width="200" height="380" rx="18" fill="#2A3C5A"/>${[0, 1, 2, 3].map(i => `<path d="M -100 ${-140 + i * 90} H 100 M ${-80 + i * 60} -190 V 190" stroke="#3A5076" stroke-width="10"/>`).join('')}
    <path d="${route}" fill="none" stroke="${K.data}" stroke-width="10" stroke-linejoin="round"/><circle cx="${f1(dx)}" cy="${f1(dy)}" r="18" fill="${K.sun}" stroke="${K.white}" stroke-width="5"/><rect x="-90" y="-180" width="90" height="34" rx="10" fill="${K.ink}"/><path d="M -70 -170 v 14 l 10 -8 Z" fill="${K.green}"/>`;
  return `${DEFS}${BG()}${cam(phone(540, 880, 2.3, scr), 1, 540, 900)}${tick(860, 380, 1.4, eio(prog(t, 63.2, 63.6)))}`;
}
