// L4 15.04–18.52 the colleague at the window does not look at du — she thinks "Habe ich den Herd ausgemacht?"
import { K, frame, bg, shadow, person, thought, cam, prog, eio, eout, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('office', { dx: 120 });
  s += shadow(700, 1330);
  // du small in the background, still getting up (left)
  s += `<g opacity=".9">${person('du', 220, 1200, .55, { t, seed: 1, hear: .6, blush: .6, eyes: 'wide', mouth: 'sad', look: [10, 0] })}</g>`;
  s += person('gl', 700, 1330, 1, { t, seed: 5, look: [14, -10], mouth: t > 16.6 ? 'o' : 'flat', armR: t > 16.6 ? [90, -390] : null });
  s += thought(560, 600, ['Habe ich den Herd', 'ausgemacht?'], 680, 800, { p: pop(t, 16.8, .45) });
  return frame(cam(s, 600, 1000, 1.02 + .05 * eio(prog(t, 15.04, 18.52))));
}
