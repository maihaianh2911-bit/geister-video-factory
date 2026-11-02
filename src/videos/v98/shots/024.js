// L16b 66.16–69.92: medium: du on the sofa holds the phone; Papa talks, a big warm bubble with an old sepia photo of young Papa opens; the wall clock spins an hour fast ("eine Stunde lang" 66.98–67.8).
import { K, frame, cam, shadow, person, prog, eio, pop, clock, chip } from './lib.js';
import { room } from './sets.js';
import { callPhone, warmBubble, oldPhoto } from './base.js';
import { fgTable } from './fg.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 21, mm: 0, clock: false });
  const spin = eio(prog(t, 66.98, 67.9));
  s += clock(495, 715, 60, 20 + spin, (3 + spin * 60) % 60);
  s += shadow(330, 1640) + person('du', 330, 1640, 1, { t, seed: 1, look: [16, -8], brows: 'up', mouth: 'small', armR: [230, -640] });
  const talk = Math.sin(t * 13) > 0;
  s += callPhone(t, 690, 860, .95, { mouth: talk ? 'talk' : 'smile', brows: 'calm', look: [-4, 2], time: spin > .5 ? '1:04:10' : '00:09', rot: 4 });
  s += warmBubble(690, 330, 460, 320, 700, 600, oldPhoto(t, 440, 300), { p: pop(t, 66.3, .45), grow: prog(t, 66.3, 69.5), id: 'b24' });
  s += chip(495, 600, '+1 STUNDE', { size: 40, bg: '#ffd23f', a: pop(t, 67.5, .4) > 0 ? 1 : 0 });
  s += fgTable(t, { mugX: 140, remote: 820 });
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 66.16, 69.92))));
}
