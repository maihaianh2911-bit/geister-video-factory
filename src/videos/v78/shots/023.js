// 68.6–72.7: the pillowcase and bedding you used all this time ("Kissenbezug" 68.88, "Bettwäsche" 69.9) — green smell lines rise first from the pillow, then from the duvet
import { K, stick, smell, cam, prog, eio } from './lib.js';
import { bedroom, pillow, duvet } from './sets.js';
export default function renderShot(t) {
  const a = eio(prog(t, 68.8, 69.2)), b = eio(prog(t, 69.8, 70.2));
  const fig = `<g transform="rotate(-90 560 1020)">${stick(560, 1272, 1.5, { shirt: K.white, look: 0, lookY: -.3, mouth: 'flat', fL: [470, 1272], fR: [650, 1272] })}</g>`;
  return cam(`${bedroom()}${pillow(250, 980, 1.1)}${fig}${duvet(420, 990, 1010, 0)}${smell(180, 900, t, a, K.odor, 3, 1.2)}${smell(700, 950, t, b, K.odor, 4, 1.2)}`, 1.05, 540, 1000);
}
