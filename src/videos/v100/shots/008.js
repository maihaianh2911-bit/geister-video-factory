// L4b 16.58–19.0: medium two-shot. du says "Klar, kein Problem." (17.18) with a forced grin and takes the folder (18.2); the colleague is pleased.
import { frame, cam, shadow, person, speech, pop, prog, eio, office2, desk, stack, folder, batOver, duBat } from './all.js';
export default function renderShot(t) {
  let s = office2(t);
  const g = eio(prog(t, 17.9, 18.4));   // folder travels from her hand to du's hand
  const fx = 820 - 150 * .95 * (1 - g) - (820 - 330 - 160 * .95) * g * 0, wx = 820 - 150 * .95 + ((330 + 160 * .95) - (820 - 150 * .95)) * g;
  s += shadow(330, 1690) + shadow(820, 1690);
  s += person('du', 330, 1690, .95, { t, seed: 1, look: [14, 2], brows: 'worried', mouth: t > 17.1 && t < 18.5 ? 'talk' : 'grin', armR: g > .6 ? [160, -400] : null, legs: false });
  s += person('kol', 820, 1690, .95, { t, seed: 5, flip: true, look: [10, 0], brows: 'up', mouth: t > 18.3 ? 'grin' : 'smile', armR: g < .5 ? [150, -400] : null, legs: false });
  s += folder(wx, 1690 - 400 * .95 - 90, .8, -6);
  s += desk(t, { y: 1520, monitor: false, kbX: 300, mugX: 980, extra: stack(560, 1530, 6, .9) });
  s += batOver(330, 1690, .95, duBat(t).lvl, { t, bs: .85 });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 16.58, 19.0)), 20 * prog(t, 16.58, 19.0));
  s += speech(560, 300, ['Klar,', 'kein Problem.'], 420, 640, { p: pop(t, 17.18), size: 64 });
  return frame(s);
}
