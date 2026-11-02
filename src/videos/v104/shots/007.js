// L4 20.26–24.92: three weeks later (counter TAG 21 pops on "drei Wochen" 20.5); from the door a narrow trail is now visible through the
// meadow ("schmaler Pfad", 21.4); but du stands sluggish on the doorstep, half-closed eyes, shoulders hanging, and yawns on "überwinden" (24.38).
import { K, frame, cam, prog, eio, pop, lerp } from './lib.js';
import { field } from './common.js';
import { dayCounter } from './meadow.js';
export default function renderShot(t) {
  const yawn = t > 24.3 && t < 24.9;
  let s = field(t, 235, 1240, .78, { frontClip: 390, mood: 'morning', p: .3 * eio(prog(t, 20.6, 21.8)) + .05, tall: 1.4, tallBack: 1.15, house: { open: 1, w: 470, dx: 140 }, du: { eyes: yawn ? 'closed' : 'half', brows: 'sad', mouth: yawn ? 'o' : 'flat', hunch: .45, look: [12, 6] } });
  const pan = eio(prog(t, 20.26, 22.8));
  s = cam(s, lerp(620, 380, pan), 1000, 1.1);
  s += dayCounter('TAG 21', 820, 400, pop(t, 20.5, .4));
  return frame(s);
}
