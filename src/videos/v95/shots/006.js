// L2b 12.70–14.70: close-up: the speaker blares the red bubble "Du siehst müde und alt aus." (12.8); du's face sinks.
import { K, frame, cam, spiky, prog, eio, pop } from './lib.js';
import { bathroom } from './sets.js';
import { duSp, spPos } from './base.js';
export default function renderShot(t) {
  let s = bathroom(t, { mood: 'grey', strong: true });
  const hurt = eio(prog(t, 13.2, 13.7));
  const o = { t, eyes: hurt > .5 ? 'tired' : 'n', brows: hurt > .5 ? 'sad' : 'worried', mouth: hurt > .5 ? 'frown' : 'flat', look: [14, -10 + 18 * hurt], headDy: 30 * hurt };
  s += duSp(420, 2070, 1.55, o, { talk: 1 });
  const [sx, sy] = spPos(420, 2070, 1.55, o);
  s += spiky(560, 420, ['„Du siehst müde', 'und alt aus.“'], sx - 20, sy - 120, { p: pop(t, 12.8, .4), size: 58 });
  return frame(cam(s, 540, 960, 1.0 + .06 * eio(prog(t, 12.7, 14.7))));
}
