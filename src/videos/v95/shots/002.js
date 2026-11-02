// L0b 3.10–5.22: closer: a red loudspeaker pops up next to du's head on "Lautsprecher" (3.92) and starts to blare; du startles.
import { K, frame, cam, spiky, pool, pop, prog, eio } from './lib.js';
import { room } from './sets.js';
import { duSp, spPos } from './base.js';
export default function renderShot(t) {
  const on = pop(t, 3.92, .45), scare = eio(prog(t, 4.1, 4.4));
  let s = room(t, { mood: 'amber', strong: true, clock: false });
  s += pool(780, 700, 300, 300, '#ff6a5a', .3 * Math.min(1, on));
  const o = { t, look: [16 * scare, -8], brows: scare > .5 ? 'up' : 'worried', eyes: scare > .5 ? 'wide' : 'n', mouth: scare > .5 ? 'o' : 'flat', headTilt: -6 * scare };
  s += duSp(470, 2030, 1.5, o, { p: on, talk: t > 4.3 ? 1 : 0 });
  return frame(cam(s, 540, 960, 1.0 + .06 * eio(prog(t, 3.1, 5.22))));
}
