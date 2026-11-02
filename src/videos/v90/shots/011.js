// L10 32.9–37.52 experiment: a student in an embarrassing T-shirt walks into a full room.
import { K, frame, bg, shadow, person, chip, star, cam, prog, eio, eout, pop, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('office', { dx: 80 });
  s += chip(540, 260, 'EXPERIMENT', { p: pop(t, 33.24, .4), size: 56, bg: '#fff' });
  // a full room: people seated in two rows (small)
  const crowd = [[140, 'gl', 5], [330, 'cap', 4], [760, 'boss', 6], [940, 'gl', 7], [240, 'cap', 8], [850, 'cap', 9]];
  crowd.forEach(([x, who, seed], i) => { const y = i < 4 ? 1060 : 1180; s += person(who, x, y, i < 4 ? .55 : .62, { t, seed, look: [x < 540 ? 8 : -8, 0], mouth: 'flat' }); });
  const w = eout(prog(t, 33.78, 35.0));
  const x = lerp(-120, 540, w);
  s += shadow(x, 1340);
  s += person('stud', x, 1340, 1, { t, seed: 11, walk: w < 1 ? t * 1.9 : undefined, eyes: 'wide', mouth: 'sad', blush: eio(prog(t, 35.1, 35.5)) * .8, look: [0, 4] });
  const sp = pop(t, 35.08, .35);
  if (sp > 0) s += star(x - 90, 1030, 22 * sp, K.yellow, t) + star(x + 90, 1060, 18 * sp, K.yellow, -t);
  return frame(cam(s, 540, 1000, 1 + .03 * eio(prog(t, 32.9, 37.52))));
}
