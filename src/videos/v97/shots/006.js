// L3a 14.86–17.50: close-up du in the meeting: thought bubble "Das war richtig gut." (15.34); "Du sagst nichts" (16.98) → lips pressed.
import { frame, cam, pop, prog, eio, person, thought } from './lib.js';
import { meeting } from './sets.js';
export default function renderShot(t) {
  let s = meeting(t);
  const X = 560, Y = 2120, S = 1.6;
  const shut = t >= 16.9;
  s += person('du', X, Y, S, { t, look: [-12, -8], brows: shut ? 'worried' : 'up', mouth: shut ? 'press' : 'soft' });
  s += thought(520, 360, ['„Das war', 'richtig gut.“'], 620, 640, { p: pop(t, 15.34, .4), size: 60 });
  return frame(cam(s, 540, 1050, 1 + .06 * eio(prog(t, 14.86, 17.5))));
}
