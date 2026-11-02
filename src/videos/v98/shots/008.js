// L5 19.78–22.06: close-up du (zipped mouth opens): the yellow question bubble „Was hält dich gerade wach?“ pops on "Was" (20.8).
import { K, frame, cam, prog, eio, pop, person } from './lib.js';
import { kitchen } from './sets.js';
import { qBubble } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t, { strong: true });
  const open = t >= 20.6;
  s += person('du', 600, 2160, 1.7, { t, seed: 1, look: [-14, 0], brows: open ? 'calm' : 'up', zip: open ? 0 : 1, mouth: open && t < 21.9 && Math.sin(t * 15) > 0 ? 'talk' : 'smile', headTilt: open ? 6 : 0 });
  s += qBubble(450, 380, ['„Was hält dich', 'gerade wach?“'], 520, 620, { p: pop(t, 20.8, .4), size: 56 });
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 19.78, 22.06))));
}
