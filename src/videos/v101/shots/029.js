// L16a 75.6–79.3: diary close-up under the lamp: a new page with the date SONNTAG; three numbered lines are written one after another ("drei gute Dinge" 76.5–78.7).
import { K, frame, cam, prog, eio } from './lib.js';
import { diary } from './page.js';
export default function renderShot(t) {
  const s = diary(t, [76.5, 77.3, 78.1], { id: 'f', date: 'HEUTE', items: ['1. Sonne', '2. Lob', '3. Lachen'] });
  return frame(cam(s, 540, 900, 1.0 + .05 * eio(prog(t, 75.6, 79.3))));
}
