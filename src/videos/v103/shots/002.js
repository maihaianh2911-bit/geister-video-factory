// L0b 3.08–5.88: close-up of the old du (glasses, white curls, grey scarf), warm lamp rim light; he speaks gently, on "bereut" (4.96)
// his brows soften and a small sepia memory bubble with a question mark rises beside him.
import { K, frame, cam, prog, eio, pop, person, T } from './lib.js';
import { room } from './sets.js';
import { memBubble } from './sets3.js';
import { talk } from './common.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', strong: true, hh: 20, mm: 15 });
  const sad = t > 4.96;
  s += person('old', 600, 2080, 1.72, { t, seed: 7, hunch: .3, look: [-10, -2], brows: sad ? 'sad' : 'calm', mouth: talk(t, 3.1, 5.4, 'smile'), rim: '#ffd98a' });
  s += memBubble(250, 470, 300, 240, 400, 760, pop(t, 4.96, .45), `<rect x="-150" y="-120" width="300" height="240" fill="#efe2cf"/>${T(0, 50, '?', 160, { fill: '#8a5a36' })}`, 'q2');
  return frame(cam(s, 560, 900, 1.0 + .07 * eio(prog(t, 3.08, 5.88))));
}
