// L6b 28.10–30.20: close-up: red bubble "Typisch. Du kriegst nie etwas hin." (28.12); du slumps and covers her face.
import { K, frame, cam, spiky, prog, eio, pop } from './lib.js';
import { canteen } from './sets.js';
import { duSp, spPos } from './base.js';
export default function renderShot(t) {
  let s = canteen(t, { strong: true });
  const slump = eio(prog(t, 28.8, 29.5));
  const o = { t, look: [0, 14], brows: 'sad', eyes: slump > .5 ? 'closed' : 'tired', mouth: 'frown', headDy: 40 * slump, armL: slump > 0 ? [-80, -720 + 40 * (1 - slump)] : null, elbowL: [-230, -560] };
  s += duSp(450, 2070, 1.5, o, { talk: 1 });
  const [sx, sy] = spPos(450, 2070, 1.5, o);
  s += spiky(560, 380, ['„Typisch. Du kriegst', 'nie etwas hin.“'], sx, sy - 120, { p: pop(t, 28.12, .4), size: 54 });
  return frame(cam(s, 540, 960, 1.0 + .06 * eio(prog(t, 28.1, 30.2))));
}
