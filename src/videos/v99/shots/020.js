// L11a 51.14–53.88: card DIENSTAG; sunny office; the boss (moustache, grey vest) walks in from the right, smiling, on "Chef" (52.24); du behind his desk still has three (lighter) clouds above and looks over nervously.
import { K, frame, cam, prog, eio, pop, label, person, shadow, lerp } from './lib.js';
import { office2, desk } from './sets.js';
import { cloud } from './clouds.js';
export default function renderShot(t) {
  let s = office2(t);
  s += `<path d="M -200 0 L 600 0 L 1100 1700 L -200 1700 Z" fill="#fff4c8" opacity=".14"/>`;
  const w = eio(prog(t, 51.6, 52.6)), bx = lerp(1250, 790, w);
  s += cloud(210, 560, 390, { t, seed: 11, dark: .55, lines: ['Ich verliere', 'meinen Job.'], size: 38 });
  s += cloud(540, 430, 390, { t, seed: 21, dark: .55, lines: ['Ist sie sauer', 'auf mich?'], size: 38 });
  s += cloud(380, 340, 280, { t, seed: 31, dark: .5, q: true });
  s += person('du', 320, 1640, 1, { t, seed: 1, look: [16 * w, 0], brows: 'worried', mouth: 'small', hunch: .2 });
  s += shadow(bx, 1640, 170);
  s += person('chef', bx, 1640, 1, { t, seed: 9, look: [-14, 2], brows: 'calm', mouth: 'smile', walk: w < 1 ? t * 1.6 : undefined });
  s += desk(t, { y: 1330, monitor: false, mugX: 120, kbX: 360 });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 51.14, 53.88)));
  s += label('DIENSTAG', 540, 240, 120, { p: pop(t, 51.2, .45) });
  return frame(s);
}
