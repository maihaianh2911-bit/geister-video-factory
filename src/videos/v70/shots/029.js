// 78.22–81.444: don't hope to find another one under water later: the family stands together on the bank in the rain while the car slips under ("unter Wasser")
import { K, DEFS, BG, carSide, bust, water, rain, light, f1, prog, eio, ein, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const sink = ein(prog(t, 78.3, 80.2));
  const cy = lerp(1140, 1420, sink), tilt = lerp(9, 22, sink);
  let bub = '';
  for (let i = 0; i < 6; i++) { const ph = (t * .9 + i / 6) % 1; bub += sink > .7 ? `<circle cx="${f1(900 + 50 * Math.sin(i * 2))}" cy="${f1(1040 - 30 * ph)}" r="${f1(6 + 6 * ph)}" fill="none" stroke="${K.foam}" stroke-width="3" opacity="${f1(1 - ph)}"/>` : ''; }
  const fam = `${bust('kidA', 150, 1010, .85, { look: 1, brow: .5, mouth: 'flat' })}${bust('wom', 300, 900, 1.05, { look: 1, brow: .5, mouth: 'flat', aL: [[230, 1060], [190, 1080]] })}
    ${bust('you', 510, 890, 1.1, { look: 1, brow: .5, mouth: 'flat', aR: [[600, 1050], [640, 1080]] })}${bust('kidB', 650, 1020, .78, { look: 1, brow: .5, mouth: 'flat' })}`;
  const sc = `${BG('url(#eSky)')}
    ${carSide(t, 930, cy, .45, { tilt, lights: 0, inner: .2, winF: 1, people: false, id: 's29c' })}
    ${water(t, 1030, { x0: 700, amp: 6, alpha: .95 })}${bub}${fam}
    <path d="M -60 1120 ${[...Array(22)].map((_, i) => `L ${-60 + i * 40} ${i % 2 ? 1100 : 1130}`).join(' ')} L 820 1130 Q 860 1220 840 1340 L -60 1340 Z" fill="#16241F" stroke="${K.ink}" stroke-width="6"/>
    ${water(t, 1200, { x0: 820, amp: 6 })}
    ${light(400, 980, 480, .6)}${rain(t, .9, 60)}`;
  return `${DEFS}${sc}`;
}
