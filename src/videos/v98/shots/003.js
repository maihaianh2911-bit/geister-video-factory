// L2a 5.36–8.6: wide: du between roommate and colleague; each opens a warm bubble with a picture ("Menschen" 6.9): exam paper, mountains.
import { K, frame, cam, shadow, person, prog, eio, pop, paper, T } from './lib.js';
import { room } from './sets.js';
import { warmBubble, mountains, oldPhoto } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 19, mm: 0 });
  const P = [['room', 200, 1600, .72, 6.9], ['kol', 870, 1600, .72, 7.2], ['papa', 360, 1700, .0, 99]];
  s += shadow(200, 1600, 140) + shadow(870, 1600, 140) + shadow(540, 1660, 150);
  s += person('room', 190, 1600, .72, { t, seed: 3, look: [10, 0], mouth: 'talk', brows: 'calm' });
  s += person('kol', 890, 1600, .72, { t, seed: 5, look: [-10, 0], mouth: 'smile', brows: 'calm' });
  s += person('du', 540, 1660, .8, { t, seed: 1, look: [-12 + 24 * ((t * .7) % 1 > .5 ? 1 : 0), -4], mouth: 'smile', brows: 'up' });
  const paperIn = paper(0, 0, 160, 200, -6, T(0, -40, 'PRÜFUNG', 26, { fill: '#d9493f' }), {});
  s += warmBubble(200, 640, 260, 220, 200, 930, paperIn, { p: pop(t, 6.9, .45), grow: prog(t, 6.9, 8.4), id: 'b1' });
  s += warmBubble(880, 640, 300, 210, 880, 930, mountains(t, 280, 190), { p: pop(t, 7.2, .45), grow: prog(t, 7.2, 8.6), id: 'b2' });
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 5.36, 8.6))));
}
