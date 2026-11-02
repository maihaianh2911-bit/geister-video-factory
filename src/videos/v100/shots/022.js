// L11b 48.62–50.62: evening corridor, close-up du, eyes towards the acquaintance (blurred, right). Thought "Mag er mich dann nicht mehr?" on "Beziehung" (49.12); a heart cracks in two on "beschädigen" (49.56).
import { frame, cam, person, head, bust, pop, prog, eio, thought, corridor, K, f1 } from './all.js';
export default function renderShot(t) {
  let s = corridor(t, { strong: true });
  s += person('bek', 900, 1700, .85, { t, seed: 7, flip: true, look: [0, 0], mouth: 'flat', legs: false });
  s += bust('du', 380, 1080, 1.6, { t, seed: 1, look: [16, -4], brows: 'worried', mouth: 'wavy' });
  s = cam(s, 540, 1000, 1.02 + .05 * eio(prog(t, 48.62, 50.62)), -15 * prog(t, 48.62, 50.62));
  s += thought(540, 340, ['Mag er mich', 'dann nicht mehr?'], 420, 700, { p: pop(t, 49.12), size: 62 });
  const c = eio(prog(t, 49.56, 49.9)), hp = pop(t, 49.4);
  if (hp > 0) {
    const H = 'M 0 30 C -60 -10 -50 -60 -18 -60 C -4 -60 0 -48 0 -40 C 0 -48 4 -60 18 -60 C 50 -60 60 -10 0 30 Z';
    const half = (side) => `<g transform="translate(${f1(side * 18 * c)} ${f1(10 * c)}) rotate(${f1(side * 12 * c)})"><clipPath id="v100hc${side < 0 ? 'l' : 'r'}"><path d="${side < 0 ? 'M -80 -80 H 4 L -8 -30 L 6 -10 L -4 40 H -80 Z' : 'M 80 -80 H 4 L -8 -30 L 6 -10 L -4 40 H 80 Z'}"/></clipPath><path d="${H}" fill="#e8546a" stroke="${K.ink}" stroke-width="6" clip-path="url(#v100hc${side < 0 ? 'l' : 'r'})"/></g>`;
    s += `<g transform="translate(860 760) scale(${f1(1.5 * hp * 100) / 100})">${half(-1)}${half(1)}</g>`;
  }
  return frame(s);
}
