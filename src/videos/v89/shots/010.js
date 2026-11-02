// L9 29.94–32.66 FREITAG, hallway: du in the new mustard jacket; Lena walks in wearing exactly the same jacket.
import { K, frame, bg, shadow, person, dayCard, T, cam, prog, eio, eout, pop, fade, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('hall');
  const w = eout(prog(t, 30.3, 31.3));
  const lx = lerp(1060, 760, w);
  s += shadow(320, 1330) + shadow(lx, 1330);
  const seen = t > 31.76;
  s += person('du', 320, 1330, 1, { t, seed: 1, hear: .6, jacket: true, eyes: seen ? 'wide' : 'n', mouth: seen ? 'o' : 'smile', look: [10, 0] });
  s += person('lena', lx, 1330, 1, { t, seed: 2, jacket: true, walk: w < 1 ? t * 1.9 : undefined, eyes: 'n', mouth: 'smile', look: [-10, 0] });
  const eq = pop(t, 31.76, .4);
  if (eq > 0) s += `<g transform="translate(540 1000) scale(${f1(eq * 100) / 100})">${T(0, 40, '=', 160, { fill: K.yellow, stroke: K.ink, sw: 18 })}</g>`;
  s += dayCard(t, 29.94, 'FREITAG');
  return frame(cam(s, 540, 1000, 1 + .03 * eio(prog(t, 29.94, 32.66))));
}
