// L6a 22.06–24.3: medium: the roommate sits down on a chair at the kitchen table ("setzt sich hin" 22.16–22.64) and starts talking; his warm bubble opens.
import { K, frame, cam, shadow, person, prog, eio, pop, lerp } from './lib.js';
import { kitchen, chair } from './sets.js';
import { warmBubble } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = kitchen(t, { fridge: true });
  const sit = eio(prog(t, 22.16, 22.64));
  s += chair(330, 1600, 1.0, 1, '#a8744a');
  s += person('room', 330, lerp(1620, 1700, sit), 1, { t, seed: 3, eyes: 'n', brows: 'worried', mouth: t > 23 && Math.sin(t * 13) > 0 ? 'talk' : 'flat', look: [14, 2], legs: sit < .5 });
  s += shadow(790, 1650) + person('du', 790, 1650, .95, { t, seed: 1, look: [-14, 4], brows: 'calm', mouth: 'small', headTilt: 6 });
  s += `<path d="M -60 1460 H 1140 V 2000 H -60 Z" fill="#c9a26b" stroke="${INK}" stroke-width="6"/><rect x="-60" y="1460" width="1200" height="24" fill="#dcbd95"/>`;
  s += warmBubble(330, 560, 300, 200, 360, 830, `<g fill="#c9a06a">${[-40, 0, 40].map(y => `<rect x="-110" y="${y - 8}" width="220" height="16" rx="8"/>`).join('')}</g>`, { p: pop(t, 23.06, .45), grow: prog(t, 23.06, 24.3), id: 'b9' });
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 22.06, 24.3))));
}
