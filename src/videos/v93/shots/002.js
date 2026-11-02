// L1 4.62–8.92 Close-up du on the platform: snap judgments stick around the head (RÜPEL, UNHÖFLICH, FAUL);
// "1 TAG" card on "Tag"; on "zurücknehmen" the labels are pulled back off and fade, du's face softens.
import { K, frame, cam, setPlatform, person, chip, T, pop, fade, fout, eio, prog, lerp, f1 } from './lib.js';
import { push, CU } from './base.js';
const J = [['RÜPEL', 250, 470, -8, 4.95], ['UNHÖFLICH', 740, 540, 6, 5.38], ['FAUL', 800, 1040, -5, 6.74]];
export default function renderShot(t) {
  let s = setPlatform(t, { heavy: true });
  const back = eio(prog(t, 7.7, 8.4));
  const soft = t > 7.9;
  s += person('du', 470, CU.y, CU.s, { t, seed: 2, brows: soft ? 'soft' : 'angry', eyes: soft ? 'n' : 'mean', mouth: soft ? 'soft' : 'grim', look: soft ? [0, -2] : [6, 0], rim: '#cfe6ff' });
  J.forEach(([w, x, y, r, t0], i) => {
    const p = pop(t, t0, .35);
    const xx = lerp(x, 470, back), yy = lerp(y, 880, back), a = 1 - back;
    s += chip(xx, yy, w, { p: p * (1 - back * .6), a, rot: r, size: 56, bg: K.red, fill: '#fff', sq: true });
  });
  const tp = pop(t, 5.84, .4);
  if (tp > 0) s += `<g transform="translate(540 250) scale(${f1(tp * 1000) / 1000}) translate(-540 -250)">${T(540, 290, '1 TAG', 120, { fill: K.yellow, stroke: K.ink, sw: 22 })}</g>`;
  return frame(cam(s, 470, 900, push(t, 4.62, 8.92, 1.0, 1.07)));
}
