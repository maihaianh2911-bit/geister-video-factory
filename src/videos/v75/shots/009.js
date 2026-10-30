// 21.38–23.42: it can't process the payment ("keine Zahlung" 21.48–21.72) — your hand holds the phone to the terminal, the screen shows a red cross
import { K, DEFS, phone, reach, glow, cam, prog, eio, lerp } from './lib.js';
import { bakery, terminal } from './sets.js';
export default function renderShot(t) {
  const r = eio(prog(t, 21.38, 21.7)), fail = t > 21.72, w = eio(prog(t, 22.3, 23.0));
  const ph = phone(lerp(900, 700, r) + 120 * w, lerp(1300, 900, r) + 200 * w, .8, `<circle r="40" fill="none" stroke="${K.data}" stroke-width="10"/>`, -20);
  return `${DEFS}${cam(`${bakery()}${fail ? glow(480, 860, 360, .6 + .4 * Math.sin(t * 8), 'iRed') : ''}${terminal(480, 960, 2.2, fail ? 'fail' : 'wait', t)}${reach(1250, 1700, lerp(900, 720, r) + 120 * w, lerp(1400, 1020, r) + 200 * w, 1.3, K.du, ph)}`, lerp(1.05, 1.12, prog(t, 21.38, 23.42)), 540, 950)}`;
}
