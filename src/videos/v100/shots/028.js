// L15b 68.08–71.06: medium two-shot. du answers calmly and kindly "Diese Woche schaffe ich es leider nicht." (69.0), an open hand; battery stays green.
import { frame, cam, shadow, person, speech, pop, prog, eio, office2, desk, folder, batOver, duBat } from './all.js';
export default function renderShot(t) {
  let s = office2(t);
  const talk = t > 68.95 && t < 70.9 && Math.sin(t * 15) > 0;
  s += person('du', 330, 1690, .95, { t, seed: 1, look: [14, 0], brows: 'calm', mouth: talk ? 'talk' : 'small', armR: t > 69.0 ? [190, -360] : null, legs: false });
  s += person('kol', 800, 1690, .95, { t, seed: 5, flip: true, look: [12, 2], brows: 'calm', mouth: 'flat', armR: [150, -400], front: folder(150, -490, .75, -8), legs: false });
  s += desk(t, { y: 1520, monitor: false, kbX: 300, mugX: 980 });
  s += batOver(330, 1690, .95, duBat(t).lvl, { t, bs: .85 });
  s = cam(s, 540, 1000, 1.02 + .05 * eio(prog(t, 68.08, 71.06)), -20 * prog(t, 68.08, 71.06));
  s += speech(560, 300, ['Diese Woche schaffe', 'ich es leider nicht.'], 400, 640, { p: pop(t, 69.0), size: 56 });
  return frame(s);
}
