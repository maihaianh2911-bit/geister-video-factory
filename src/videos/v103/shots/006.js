// L3 16.36–18.5: closer on the old du in the doorway (warm stairwell light behind him); speech bubble "Ich bin du, nur fünfzig Jahre älter."
// pops at 16.4; he lifts his free hand to his chest.
import { K, frame, cam, prog, eio, pop, person, speech } from './lib.js';
import { entry } from './sets3.js';
import { old, talk } from './common.js';
export default function renderShot(t) {
  let s = entry(t, { open: 1, strong: true });
  s += old(t, 735, 1205, .78, { look: [-14, 2], brows: 'calm', mouth: talk(t, 16.4, 18.0, 'smile'), armL: [-30, -470], elbowL: [-150, -360] });
  s = cam(s, 700, 860, 1.45 + .06 * eio(prog(t, 16.36, 18.5)));
  s += speech(560, 330, ['Ich bin du, nur', 'fünfzig Jahre älter.'], 620, 520, { p: pop(t, 16.42, .4), size: 52 });
  return frame(s);
}
