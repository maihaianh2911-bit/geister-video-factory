// L11 42.94–45.3: Harvard campus (red brick): "HARVARD" pops on 43.46; a researcher with a clipboard ticks something on "gemessen" (44.7).
import { K, frame, cam, person, shadow, label, pop, prog, eio, paper, check } from './lib.js';
import { campus } from './sets.js';
export default function renderShot(t) {
  let s = campus(t, { brick: true });
  s += shadow(380, 1640) + shadow(720, 1650);
  s += person('res1', 380, 1640, .95, { t, seed: 2, look: [10, 14], mouth: 'flat', brows: 'calm', armR: [60, -420], front: `<g transform="translate(70 0)">${paper(0, -470, 170, 220, -6, check(0, 40, 1.2, '#3c9a5f', prog(t, 44.7, 45.1)), { fill: '#f6f1e6' })}</g>` });
  s += person('doc2', 720, 1650, .95, { t, seed: 5, look: [-14, 6], mouth: 'smile', brows: 'calm' });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 42.94, 45.3)));
  s += label('HARVARD', 540, 280, 140, { p: pop(t, 43.46, .45) });
  return frame(s);
}
