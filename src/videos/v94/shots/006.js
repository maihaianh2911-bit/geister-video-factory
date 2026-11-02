// L2b 13.60–15.40: close-up of du; thought "Mach ich morgen." pops on "Mach" (14.3); eyes slide away from the screen.
import { K, frame, person, cam, thought, pool, prog, eio, pop } from './lib.js';
import { room } from './sets.js';
export default function renderShot(t) {
  const away = eio(prog(t, 14.1, 14.6));
  let s = room(t, { mood: 'amber', strong: true });
  s += pool(540, 1500, 400, 200, '#cfe2ff', .25 * (1 - away));
  s += person('du', 560, 2090, 1.75, { t, pack: { n: 0, labels: [] }, look: [-16 * away, 14 - 20 * away], brows: away > .5 ? 'calm' : 'none', mouth: away > .5 ? 'small' : 'flat', eyes: away > .5 ? 'half' : 'n', headTilt: -6 * away, rim: '#ffd98a' });
  s += thought(560, 380, ['„Mach ich', 'morgen.“'], 560, 560, { p: pop(t, 14.3, .4), size: 64 });
  return frame(cam(s, 540, 900, 1 + .07 * eio(prog(t, 13.6, 15.4))));
}
