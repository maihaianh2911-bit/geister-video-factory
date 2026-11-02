// L4b 21.1–24.3: close-up young du, embarrassed; two picture bubbles pop: the wedding speech with microphone (on "Rede" 21.74)
// and the letter KÜNDIGUNG (on "Kündigung" 23.2); du winces.
import { K, frame, cam, prog, eio, pop, person } from './lib.js';
import { room } from './sets.js';
import { memBubble, picWedding, picLetter } from './sets3.js';
import { talk } from './common.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', strong: true, hh: 20, mm: 30 });
  s += person('du', 330, 2100, 1.7, { t, seed: 1, look: [10, -10], brows: t > 23.2 ? 'strain' : 'worried', mouth: talk(t, 21.15, 24.0, 'wavy'), headTilt: 4 * eio(prog(t, 23.2, 23.6)) });
  s += memBubble(720, 470, 420, 300, 520, 700, pop(t, 21.74, .45), picWedding(t, 420, 300), 'w8', { sepia: .08 });
  s += memBubble(760, 900, 380, 300, 560, 960, pop(t, 23.2, .45), picLetter(t, 380, 300), 'k8', { sepia: .08 });
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 21.1, 24.3))));
}
