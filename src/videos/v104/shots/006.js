// L3b 18.72–20.26: close-up of du, out of breath in the tall grass; thought bubble "Heute lieber nicht." on "Heute" (18.72); his gaze drifts back towards the house.
import { K, frame, cam, prog, eio, pop, thought } from './lib.js';
import { field } from './common.js';
export default function renderShot(t) {
  let s = field(t, 520, 2120, 1.72, { mood: 'morning', p: 0, tall: 1.2, du: { look: [-14, 4], brows: 'sad', mouth: 'frown', sweat: .5, rim: '#fff3b0' } });
  s = cam(s, 540, 950, 1.0 + .06 * eio(prog(t, 18.72, 20.26)));
  s += thought(560, 330, ['Heute lieber nicht.'], 430, 560, { p: pop(t, 18.74, .4), size: 56 });
  return frame(s);
}
