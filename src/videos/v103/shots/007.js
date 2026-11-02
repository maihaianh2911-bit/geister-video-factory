// L4a 18.5–21.1: warm living room, both sit behind the coffee table (cups steaming); young du leans forward and asks at once:
// speech bubble "Was bereust du am meisten?" at 19.7; the old du listens with a calm smile.
import { K, frame, cam, prog, eio, pop, person, speech } from './lib.js';
import { room } from './sets.js';
import { coffeeTable, talk } from './common.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 20, mm: 30 });
  const lean = eio(prog(t, 18.6, 19.2));
  s += person('du', 300, 1620, 1, { t, seed: 1, legs: false, lean: 5 * lean, look: [14, -4], brows: 'up', mouth: talk(t, 18.6, 21.0, 'small'), armR: [210, -360], elbowR: [200, -300] });
  s += person('old', 790, 1620, .98, { t, seed: 7, legs: false, hunch: .35, look: [-14, -2], brows: 'calm', mouth: 'smile' });
  s += coffeeTable(t, -40, 1120, 1440, { book: 560 });
  s = cam(s, 540, 1050, 1.0 + .05 * eio(prog(t, 18.5, 21.1)), 0, 0);
  s += speech(400, 400, ['Was bereust du', 'am meisten?'], 330, 640, { p: pop(t, 19.7, .4), size: 54 });
  return frame(s);
}
