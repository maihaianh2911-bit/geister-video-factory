// L2a 4.68–7.14: card ENDE DER WOCHE; one cloud after another moves in over du until the whole "sky" of the room is black ("schwarz" 6.34); the room goes cold and dark.
import { K, frame, cam, shadow, label, pop, prog, eio, person } from './lib.js';
import { room } from './sets.js';
import { fgTable } from './fg.js';
import { cloud, gloom } from './clouds.js';
const CL = [[300, 520, 360, 4.8], [720, 470, 380, 5.1], [520, 340, 400, 5.4], [160, 330, 300, 5.7], [880, 300, 320, 5.95], [560, 640, 300, 6.2], [920, 620, 260, 6.4]];
export default function renderShot(t) {
  const d = eio(prog(t, 4.8, 6.6));
  let s = room(t, { mood: d > .5 ? 'blue' : 'amber', hh: 21, mm: 0, light: 1 - .6 * d });
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#0b0e18" opacity="${(.4 * d).toFixed(2)}"/>`;
  s += gloom(540, 800, 700, 700, .5 * d, 'c');
  s += shadow(540, 1640);
  s += person('du', 540, 1640, 1, { t, seed: 1, look: [0, -14], brows: 'worried', mouth: 'frown', hunch: .5 * d });
  CL.forEach(([x, y, w, t0], i) => { const k = eio(prog(t, t0, t0 + .5)); s += cloud(x + (i % 2 ? 1 : -1) * 500 * (1 - k), y, w, { t, seed: i + 3, p: k > 0 ? 1 : 0, a: k, dark: .75 + .2 * d }); });
  s += fgTable(t, { mugX: 860 });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 4.68, 7.14)));
  s += label('ENDE DER WOCHE', 540, 240, 92, { p: pop(t, 4.75, .45) });
  return frame(s);
}
