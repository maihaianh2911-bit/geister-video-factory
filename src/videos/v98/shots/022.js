// L15 61.46–64.68: close-up du, phone at the side: asks back with the yellow bubble „Und wie geht es dir wirklich, Papa?“ ("Und" 62.64).
import { K, frame, cam, prog, eio, pop, person } from './lib.js';
import { room } from './sets.js';
import { qBubble, callPhone } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 20, mm: 2, strong: true });
  const talk = t > 62.6 && t < 63.9 && Math.sin(t * 15) > 0;
  s += person('du', 420, 2160, 1.7, { t, seed: 1, look: [14, 0], brows: 'up', mouth: talk ? 'talk' : 'small', headTilt: 5 });
  s += callPhone(t, 880, 1180, .7, { mouth: 'flat', look: [-6, 0], time: '00:04', rot: 6 });
  s += qBubble(520, 400, ['„Und wie geht es dir', 'wirklich, Papa?“'], 480, 640, { p: pop(t, 62.64, .4), size: 54 });
  return frame(cam(s, 540, 900, 1.0 + .05 * eio(prog(t, 61.46, 64.68))));
}
