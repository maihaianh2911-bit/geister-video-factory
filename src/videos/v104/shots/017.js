// L10b 56.82–59.06: the next morning, sun again; du opens the door: the trail through the meadow is still there ("der Pfad noch da", 58.52);
// he smiles with relief and steps out.
import { K, frame, cam, prog, eio, pop } from './lib.js';
import { field } from './common.js';
export default function renderShot(t) {
  const open = eio(prog(t, 56.9, 57.5));
  const happy = t > 58.5;
  const st = eio(prog(t, 58.6, 59.06));
  const s = field(t, 235 + 60 * st, 1240, .78, { frontClip: 390, mood: 'morning', p: .45, tall: 1.35, tallBack: 1.1, house: { open, w: 470, dx: 140 }, du: { look: [16, 4], eyes: happy ? 'happy' : 'n', brows: happy ? 'up' : 'calm', mouth: happy ? 'grin' : 'small', walk: st > 0 && st < 1 ? t * 1.6 : undefined, a: Math.min(1, open * 1.5) } });
  return frame(cam(s, 520, 1000, 1.08 + .05 * eio(prog(t, 56.82, 59.06))));
}
