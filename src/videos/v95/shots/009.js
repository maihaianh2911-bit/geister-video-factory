// L4b 20.50–22.38: close-up: the speaker blares "Lass es. Das ist bestimmt dumm." (20.6); du's raised hand drops.
import { K, frame, cam, spiky, prog, eio, pop } from './lib.js';
import { meeting } from './sets.js';
import { duSp, spPos } from './base.js';
export default function renderShot(t) {
  let s = meeting(t);
  const drop = eio(prog(t, 21.0, 21.6));
  const o = { t, look: [14, -6 + 16 * drop], brows: drop > .5 ? 'sad' : 'worried', mouth: drop > .5 ? 'frown' : 'o', armR: [150, -820 + 340 * drop], elbowR: [240, -540 + 80 * drop] };
  s += duSp(430, 2070, 1.5, o, { talk: 1 });
  const [sx, sy] = spPos(430, 2070, 1.5, o);
  s += spiky(570, 380, ['„Lass es. Das ist', 'bestimmt dumm.“'], sx, sy - 120, { p: pop(t, 20.6, .4), size: 56 });
  return frame(cam(s, 540, 960, 1.02 + .05 * eio(prog(t, 20.5, 22.38))));
}
