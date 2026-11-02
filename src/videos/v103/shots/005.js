// L2b 12.58–16.36: du opens the door (12.6–13.3): in the yellow stairwell light stands the old du with grey scarf, glasses and cane;
// the scarf gets a soft highlight on "Schal" (14.64); on "Lächeln" (15.48) he smiles widely and the camera pushes towards him.
import { K, frame, cam, prog, eio, person, shadow, pool } from './lib.js';
import { entry, bell } from './sets3.js';
import { old } from './common.js';
export default function renderShot(t) {
  const op_ = eio(prog(t, 12.6, 13.4));
  let s = entry(t, { open: op_ });
  s += bell(980, 760, 0);
  if (op_ > .3) s += old(t, 735, 1205, .78, { a: Math.min(1, (op_ - .3) * 3), look: [-12, 4], brows: 'calm', mouth: t > 15.48 ? 'grin' : 'smile', eyes: t > 15.48 ? 'happy' : 'n' });
  if (t > 14.6) s += pool(705, 780, 140, 60, '#fff6d0', .6 * Math.sin(Math.min(1, (t - 14.6) / 1.0) * Math.PI));
  s += shadow(250, 1760, 210);
  s += person('du', 250, 1760, 1.12, { t, seed: 1, look: [16, -10], eyes: t > 13.3 ? 'wide' : 'n', brows: 'up', mouth: t > 13.3 ? 'o' : 'small', armR: op_ < 1 ? [260, -560] : undefined, elbowR: [200, -460] });
  const z = 1.0 + .05 * eio(prog(t, 12.58, 15.2)) + .1 * eio(prog(t, 15.2, 16.36));
  return frame(cam(s, 700, 900, z));
}
