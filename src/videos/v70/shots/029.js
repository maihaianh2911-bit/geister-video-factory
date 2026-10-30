// 78.22–81.444: don't hope to find another one under water later: the family stands together on the bank in the rain while the car slips under ("unter Wasser")
import { K, DEFS, BG, carSide, bust, water, rain, light, f1, prog, eio, ein, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const sink = ein(prog(t, 78.3, 80.2));
  const cy = lerp(1270, 1640, sink), tilt = lerp(9, 22, sink);
  let bub = '';
  for (let i = 0; i < 6; i++) { const ph = (t * .9 + i / 6) % 1; bub += sink > .7 ? `<circle cx="${f1(800 + 60 * Math.sin(i * 2))}" cy="${f1(1160 - 30 * ph)}" r="${f1(6 + 6 * ph)}" fill="none" stroke="${K.foam}" stroke-width="3" opacity="${f1(1 - ph)}"/>` : ''; }
  const fam = `${bust('kidA', 160, 1060, .62, { look: 1, brow: .5, mouth: 'flat' })}${bust('wom', 250, 960, .78, { look: 1, brow: .5, mouth: 'flat', aR: [[300, 1080], [230, 1110]] })}
    ${bust('you', 400, 950, .8, { look: 1, brow: .5, mouth: 'flat', aL: [[340, 1080], [300, 1110]] })}${bust('kidB', 480, 1080, .56, { look: 1, brow: .5, mouth: 'flat' })}`;
  const sc = `${BG('url(#eSky)')}<path d="M -60 1000 L 560 1000 Q 640 1040 660 1200 L -60 1200 Z" fill="#1A2A24" stroke="${K.ink}" stroke-width="6"/>
    ${carSide(t, 840, cy, .62, { tilt, lights: 0, inner: .2, winF: 1, people: false, id: 's29c' })}
    ${water(t, 1140, { x0: 560, amp: 8, alpha: .95 })}${bub}${fam}<path d="M -60 1110 ${[...Array(18)].map((_, i) => `L ${-60 + i * 40} ${i % 2 ? 1090 : 1120}`).join(' ')} L 640 1120 Q 660 1200 650 1320 L -60 1320 Z" fill="#16241F" stroke="${K.ink}" stroke-width="6"/>
    ${light(330, 1000, 380, .6)}${rain(t, .9, 60)}`;
  return `${DEFS}${sc}`;
}
