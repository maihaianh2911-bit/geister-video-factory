// L2 7.2–10.56 MONTAG: in the office the colleague (bun, purple) proudly presents a board crammed with slides.
import { K, frame, bg, shadow, person, easel, dayCard, cam, prog, eio, eout, pop, star } from './lib.js';
export default function renderShot(t) {
  let s = bg('office');
  s += easel(330, 900, 1, { reveal: eio(prog(t, 8.1, 9.6)), label: 'MEIN PROJEKT' });
  s += shadow(640, 1340, 95) + shadow(900, 1360, 95);
  const proud = eout(prog(t, 8.92, 9.3));
  s += person('kol', 640, 1340, .92, { t, seed: 2, eyes: proud > .5 ? 'happy' : 'n', mouth: proud > .5 ? 'grin' : 'smile', look: [-10, -4],
    armL: [-120 - 90 * proud, -320 - 110 * proud], armR: proud > .1 ? [110, -260 - 40 * proud] : null, headDy: -6 * proud });
  s += person('du', 900, 1360, .92, { t, seed: 1, mouth: 'smile', look: [-12, 0] });
  if (proud > 0) for (let i = 0; i < 3; i++) s += star(470 + i * 70, 560 - 20 * (i % 2), 18 * eout(prog(t, 9.0 + i * .12, 9.4 + i * .12)), K.yellow, t * .8);
  s = cam(s, 540, 1000, 1 + .04 * eio(prog(t, 7.2, 10.56)));
  s += dayCard(t, 7.2, 'MONTAG');
  return frame(s);
}
