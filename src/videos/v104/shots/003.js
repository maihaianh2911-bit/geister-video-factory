// L1b 6.08–10.58: du next to a wooden signpost in the meadow; on "Zahl" (6.76) the board shows "?"; on "nicht einundzwanzig" (9.72)
// the board flips to 21 and a red cross strikes it out; du raises his brows.
import { K, frame, cam, prog, eio, pop, f1 } from './lib.js';
import { field, signpost } from './common.js';
export default function renderShot(t) {
  const n21 = t > 9.72;
  const x = eio(prog(t, 9.95, 10.35));
  let cross = '';
  if (x > 0) cross = `<path d="M -130 -540 L ${f1(-130 + 260 * Math.min(1, x * 2))} ${f1(-540 + 140 * Math.min(1, x * 2))}" stroke="#d9493f" stroke-width="26" stroke-linecap="round"/>` + (x > .5 ? `<path d="M 130 -540 L ${f1(130 - 260 * (x - .5) * 2)} ${f1(-540 + 140 * (x - .5) * 2)}" stroke="#d9493f" stroke-width="26" stroke-linecap="round"/>` : '');
  const sp = pop(t, 6.76, .45);
  const sign = sp > 0 ? `<g opacity="${Math.min(1, sp * 2).toFixed(2)}">${signpost(720, 1640, 1.15 * Math.min(1, .6 + .4 * sp), n21 ? '21' : '?', { inner: cross, fill: n21 ? '#2b2b2b' : '#8a5a36' })}</g>` : '';
  const s = field(t, 330, 1720, 1.0, { mood: 'dawn', p: 0, tall: 1.3, before: sign, du: { look: [14, -12], brows: n21 ? 'up' : 'calm', mouth: n21 ? 'o' : 'small' } });
  return frame(cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 6.08, 10.58))));
}
