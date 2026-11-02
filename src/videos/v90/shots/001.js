// L0 0–5.16 hook: du in the office; du's head lights up on "hören"; the colleagues' thoughts (still unknown) pop up on "denken".
import { K, frame, bg, shadow, person, thought, title, cam, prog, eio, eout, pop } from './lib.js';
export default function renderShot(t) {
  const hear = eout(prog(t, 0.94, 1.5));
  let s = bg('office', { sc: 1 + .02 * eio(prog(t, 0, 5.16)) });
  s += shadow(170, 1330, 90) + shadow(540, 1330) + shadow(900, 1330, 90);
  s += person('gl', 170, 1330, .82, { t, seed: 5, look: [10, 0], mouth: 'flat' });
  s += person('du', 540, 1330, 1, { t, seed: 1, hear, eyes: t > 1.2 ? 'wide' : 'n', mouth: t > 1.2 ? 'o' : 'flat', look: t > 2.8 ? [-10, -8] : [0, 0] });
  s += person('boss', 900, 1330, .82, { t, seed: 6, look: [-10, 0], mouth: 'flat' });
  s += thought(200, 800, ['...'], 170, 930, { p: pop(t, 2.72, .4), size: 56 });
  s += thought(880, 800, ['...'], 900, 930, { p: pop(t, 2.9, .4), size: 56 });
  s = cam(s, 540, 1000, 1 + .05 * eio(prog(t, 0, 5.16)));
  s += title(['WAS DENKEN ANDERE,', 'WENN DIR WAS', ['PEINLICHES PASSIERT?', K.yellow]], 230, 70);
  return frame(s);
}
