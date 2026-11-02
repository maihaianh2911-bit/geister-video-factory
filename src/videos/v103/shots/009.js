// L5 24.3–27.5: two-shot behind the coffee table, camera slightly on the old du; he laughs softly (25.16, eyes closed happy, small shake);
// on "Daran denke ich kaum noch" (26.2–27.3) the two small bubbles above young du (wedding, KÜNDIGUNG) shrink and fade away.
import { K, frame, cam, prog, eio, pop, person } from './lib.js';
import { room } from './sets.js';
import { memBubble, picWedding, picLetter } from './sets3.js';
import { coffeeTable, talk } from './common.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 20, mm: 30 });
  const laugh = t > 25.16 && t < 26.2;
  s += person('du', 300, 1620, 1, { t, seed: 1, legs: false, look: [14, -2], brows: 'worried', mouth: 'small' });
  s += person('old', 790, 1620, .98, { t, seed: 7, legs: false, hunch: .35, look: [-12, 0], eyes: laugh ? 'happy' : 'n', brows: 'calm', mouth: laugh ? 'grin' : talk(t, 26.2, 27.3, 'smile'), headTilt: laugh ? 4 * Math.sin((t - 25.16) * 18) : 0 });
  s += coffeeTable(t, -40, 1120, 1440, { book: 560 });
  const f = 1 - eio(prog(t, 26.3, 27.3));
  s += memBubble(220, 660, 300, 210, 280, 800, f, picWedding(t, 420, 300).replace('<rect', '<rect') , 'w9', { sepia: .1 + .4 * (1 - f), a: f });
  s += memBubble(520, 560, 260, 200, 340, 780, f, picLetter(t, 380, 300), 'k9', { sepia: .1 + .4 * (1 - f), a: f });
  return frame(cam(s, 640, 1050, 1.04 + .06 * eio(prog(t, 24.3, 27.5))));
}
