// L18b 74.94–78.252: close-up du leaning in, listening ("hör … wirklich an" 75.42–76.8); the roommate's warm bubble grows beside him. End beat.
import { K, frame, cam, prog, eio, person, pop, label } from './lib.js';
import { room } from './sets.js';
import { warmBubble } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 21, mm: 35, strong: true });
  s += person('du', 620, 2160, 1.7, { t, seed: 1, look: [-14, 0], brows: 'up', mouth: 'small', headTilt: -8, lean: -3 });
  s += warmBubble(260, 420, 320, 220, 120, 700, `<g fill="#c9a06a">${[-50, -10, 30, 70].map((y, i) => `<rect x="-120" y="${y - 8}" width="${[240, 200, 230, 150][i]}" height="16" rx="8"/>`).join('')}</g>`, { p: pop(t, 75.0, .45), grow: prog(t, 75.0, 78.2), id: 'b27' });
  s = cam(s, 540, 900, 1.0 + .07 * eio(prog(t, 74.94, 78.25)));
  s += label('WIRKLICH ZUHÖREN', 540, 1370, 80, { p: pop(t, 76.42, .45) });
  return frame(s);
}
