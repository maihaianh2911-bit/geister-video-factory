// 17.42–18.8: you walk to the bakery ("Bäcker" 18.0) — street, warm shop window with a pretzel sign, you walk toward the door
import { K, DEFS, BG, bust, glow, TX, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const x = lerp(140, 420, eio(prog(t, 17.42, 18.8))), bob = Math.abs(Math.sin(t * 8)) * 10;
  const shop = `<rect x="460" y="500" width="580" height="800" fill="#3A2E5A" stroke="${K.ink}" stroke-width="4"/><rect x="520" y="760" width="300" height="360" fill="${K.sunL}" stroke="${K.ink}" stroke-width="4"/>${glow(670, 940, 360, .8, 'iWarm')}
    <rect x="860" y="820" width="120" height="480" fill="${K.wood}" stroke="${K.ink}" stroke-width="4"/>
    <g transform="translate(750 620)"><path d="M -60 20 Q -80 -60 0 -50 Q 80 -60 60 20 Q 30 -10 0 30 Q -30 -10 -60 20 Z M -40 10 L 40 -30 M 40 10 L -40 -30" fill="none" stroke="${K.bread}" stroke-width="16" stroke-linecap="round"/></g>`;
  const du = bust('du', x, 1000 - bob, 1.2, { look: 1, brow: .1, mouth: 'flat', aL: [[x - 130, 1150], [x - 90 + 30 * Math.sin(t * 8), 1300]], aR: [[x + 120, 1150], [x + 90 - 30 * Math.sin(t * 8), 1300]] });
  return `${DEFS}${BG()}${cam(`${shop}<rect x="-60" y="1300" width="1200" height="700" fill="${K.floor}"/>${du}`, 1, 540, 1000)}`;
}
