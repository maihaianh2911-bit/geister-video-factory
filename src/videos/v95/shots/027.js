// L19 74.86–77.86: close-up, calm du; the green speaker shrinks away; labels "NIEMAND HÖRT SIE." (74.86) / "ABER DU – JEDEN TAG." (76.26).
import { K, frame, cam, label, prog, eio, pop } from './lib.js';
import { room } from './sets.js';
import { duSp, GREEN } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', strong: true });
  const shrink = 1 - .65 * eio(prog(t, 75.0, 77.5));
  s += duSp(500, 2090, 1.5, { t, look: [10, -4], brows: 'calm', eyes: t > 76.4 ? 'happy' : 'n', mouth: 'smile', rim: '#ffd98a' }, { ...GREEN, talk: 0, p: shrink });
  s = cam(s, 540, 960, 1.0 + .06 * eio(prog(t, 74.86, 77.86)));
  s += label('NIEMAND HÖRT SIE.', 540, 230, 84, { fill: '#fff', p: pop(t, 74.86, .4) });
  s += label('ABER DU – JEDEN TAG.', 540, 340, 74, { p: pop(t, 76.26, .4) });
  return frame(s);
}
