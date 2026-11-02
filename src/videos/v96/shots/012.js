// L7 28.66–31.96: Texas campus, bright day; "TEXAS" pops on 29.9; two researchers walk in and one writes on a clipboard on "untersucht" (31.02).
import { K, frame, cam, person, shadow, label, pop, prog, eio, lerp, paper, check } from './lib.js';
import { campus } from './sets.js';
export default function renderShot(t) {
  let s = campus(t);
  const w = eio(prog(t, 28.66, 29.8));
  const x1 = lerp(-100, 330, w), x2 = lerp(80, 700, w);
  const wp = t < 29.8 ? (t * 1.6) % 1 : undefined;
  const writing = t >= 31.0;
  s += shadow(x1, 1640, 170) + shadow(x2, 1650, 170);
  const clip = paper(-10, -470, 160, 210, -8, check(-10, -470 + 0, 1, '#3c9a5f', prog(t, 31.02, 31.4)) , { fill: '#f6f1e6' });
  s += person('res1', x1, 1640, .92, { t, seed: 2, walk: wp, look: [10, writing ? 14 : 0], mouth: 'flat', brows: 'calm', armR: [60, -420], front: `<g transform="translate(70 0)">${paper(0, -470, 170, 220, -6, '', { fill: '#f6f1e6' })}</g>` });
  s += person('doc1', x2, 1650, .92, { t, seed: 5, walk: wp, look: [-14, 6], mouth: writing ? 'smile' : 'flat', brows: 'calm', flip: false });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 28.66, 31.96)));
  s += label('TEXAS', 540, 280, 150, { p: pop(t, 29.9, .45) });
  return frame(s);
}
