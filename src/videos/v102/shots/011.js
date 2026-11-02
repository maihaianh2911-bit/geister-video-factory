// L5c 22.26–24.14: close-up of du nodding (head bobs from "nickst" 22.52) with empty, half-closed eyes; the colleague's blurred bubble hangs at the top left — "ohne zuzuhören".
import { K, frame, cam, prog, eio, person } from './lib.js';
import { office2 } from './sets.js';
import { nod } from './common.js';
import { fadeWorld, bar } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = office2(t, { strong: true }) + fadeWorld(t);
  const n = nod(t, 22.5, 23.9);
  s += person('du', 600, 2160, 1.75, { t, seed: 1, look: [0, 0], eyes: 'tired', brows: 'calm', mouth: 'flat', headDy: n * 1.2, headTilt: -4 });
  s += `<g opacity=".7"><rect x="40" y="330" width="420" height="170" rx="50" fill="#fff" stroke="${INK}" stroke-width="5"/><g stroke="#9aa0a8" stroke-width="16" stroke-linecap="round" opacity=".55"><path d="M 90 380 h 300"/><path d="M 90 420 h 260"/><path d="M 90 460 h 200"/></g></g>`;
  s = cam(s, 540, 950, 1.0 + .06 * eio(prog(t, 22.26, 24.14)));
  s += bar(t);
  return frame(s);
}
