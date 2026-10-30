// 72.7–74.48: your body odour still clings to it ("Körpergeruch" 73.24) — close on your face on the pillow: you sniff, wrinkle your nose, eyes open
import { K, stick, smell, cam, prog, eio } from './lib.js';
import { bedroom, pillow, duvet } from './sets.js';
export default function renderShot(t) {
  const s = eio(prog(t, 73.0, 73.4));
  const fig = `<g transform="rotate(-90 560 1020)">${stick(560, 1272, 1.5, { shirt: K.white, look: s > .5 ? 1 : 0, lookY: -.3, mouth: s > .5 ? 'worried' : 'flat', brow: s > .5 ? 'knit' : 'calm', fL: [470, 1272], fR: [650, 1272] })}</g>`;
  return cam(`${bedroom()}${pillow(250, 980, 1.1)}${fig}${duvet(420, 990, 1010, 0)}${smell(220, 900, t, 1, K.odor, 3, 1.2)}`, 2.0, 300, 960);
}
