// Cross-section: a friend sits right on the cold ground; orange heat arrows drain from the body down into the earth on "zieht die Wärme".
import { K, DEFS60, fig, FG, prog, eio, lerp, hash } from './lib.js';

export default function renderShot(t) {
  const drain = prog(t, 55.95, 57.7);
  let arrows = '';
  for (let i = 0; i < 5; i++) {
    const ph = ((t - 55.95) * 1.2 + i * .2) % 1;
    if (t < 55.95) continue;
    const x = 380 + i * 80, y = lerp(1180, 1560, ph);
    arrows += `<g transform="translate(${x} ${y})" opacity="${(1 - ph).toFixed(2)}"><path d="M 0 -40 V 30 M -22 10 L 0 34 L 22 10" stroke="${K.amb}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  }
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1180" fill="#121B20"/>
  <rect x="0" y="1180" width="1080" height="760" fill="#24323A"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M 0 ${1240 + i * 70} H 1080" stroke="#2E3E46" stroke-width="5"/>`).join('')}
  ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<circle cx="${(hash(i) * 1080).toFixed(0)}" cy="${(1260 + hash(i * 5) * 300).toFixed(0)}" r="14" fill="#3A4A52"/>`).join('')}
  <rect x="0" y="1180" width="1080" height="16" fill="#DCEBF4" opacity=".5"/>
  <ellipse cx="540" cy="1400" rx="${200 + 160 * drain}" ry="${80 + 60 * drain}" fill="#FFB547" opacity="${(.25 * (1 - drain * .5)).toFixed(2)}"/>
  ${fig('green', 540, 1200, 1.15, { sit: true, hug: true, brow: 'worry', mouth: 'tight', cold: drain > .3, look: 0, lookY: 10 })}
  ${arrows}
  ${FG(1460)}`;
}
