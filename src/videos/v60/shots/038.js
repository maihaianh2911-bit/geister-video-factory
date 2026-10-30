// Dry branches drop onto the pile on "Äste", a friend sits on it — now the heat arrows bounce back up and stay in the body.
import { K, DEFS60, fig, backpack, FG, prog, ein, eio, lerp } from './lib.js';

export default function renderShot(t) {
  const br = ein(prog(t, 59.3, 59.6)), sit = eio(prog(t, 59.85, 60.25));
  let branches = '';
  for (let i = 0; i < 5; i++) { const y = lerp(300 + i * 40, 1150 - i * 14, br); branches += `<path d="M ${300 + i * 20} ${y} L ${780 - i * 18} ${y + (i % 2 ? 20 : -16)} M ${450 + i * 30} ${y} l 40 -40" stroke="#6A4A2E" stroke-width="20" stroke-linecap="round"/>`; }
  let arrows = '';
  if (sit >= 1) for (let i = 0; i < 4; i++) {
    const ph = ((t - 60.25) * 1.4 + i * .25) % 1;
    arrows += `<g transform="translate(${420 + i * 80} ${lerp(1120, 1000, ph)})" opacity="${(1 - ph).toFixed(2)}"><path d="M 0 30 V -30 M -20 -10 L 0 -34 L 20 -10" stroke="${K.amb}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  }
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1180" fill="#121B20"/>
  <rect x="0" y="1180" width="1080" height="760" fill="#24323A"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M 0 ${1240 + i * 70} H 1080" stroke="#2E3E46" stroke-width="5"/>`).join('')}
  <rect x="300" y="1140" width="480" height="50" rx="20" fill="#3C6DB0" stroke="#0B0F12" stroke-width="6"/>
  ${backpack(540, 1110, .7, 90)}
  ${branches}
  <ellipse cx="540" cy="1000" rx="420" ry="300" fill="url(#fAmb)" opacity="${.3 + .3 * sit}"/>
  ${sit < .5 ? fig('green', lerp(840, 640, sit * 2), 1210, 1.0, { walk: sit > 0 ? t * 9 : undefined, brow: 'worry', mouth: 'flat', look: -10, hug: sit === 0 }) : fig('green', 540, 1140, 1.1, { sit: true, brow: 'calm', mouth: sit >= 1 ? 'smile' : 'flat', look: 0, lookY: 8, hug: true })}
  ${arrows}
  ${FG(1460)}`;
}
