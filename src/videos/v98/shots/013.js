// L8b 33.36–36.04: two-shot: du asks with the yellow bubble „Was war der schönste Moment?“ ("Was" 34.28); the colleague leans in.
import { K, frame, cam, person, prog, eio, pop } from './lib.js';
import { canteen } from './sets.js';
import { qBubble } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = canteen(t);
  const q = t >= 34.2;
  s += person('kol', 300, 1640, 1, { t, seed: 5, look: [14, -2], brows: q ? 'up' : 'calm', mouth: 'smile', legs: false, lean: q ? 4 : 0 });
  s += person('du', 790, 1650, .95, { t, seed: 1, look: [-14, 0], brows: 'calm', mouth: q && t < 35.6 && Math.sin(t * 15) > 0 ? 'talk' : 'smile', legs: false });
  s += `<path d="M -60 1400 H 1140 V 2000 H -60 Z" fill="#a8744a" stroke="${INK}" stroke-width="6"/><rect x="-60" y="1400" width="1200" height="24" fill="#c9a26b"/>`;
  s += qBubble(640, 520, ['„Was war der', 'schönste Moment?“'], 760, 780, { p: pop(t, 34.28, .4), size: 54 });
  return frame(cam(s, 540, 1000, 1.05 - .05 * eio(prog(t, 33.36, 36.04))));
}
