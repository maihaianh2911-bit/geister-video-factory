// L12c 60.1–62.5: diary close-up: next to each of the three good things a red "WARUM?" pops in ("warum" 60.98) and a short reason is handwritten.
import { K, frame, cam, prog, eio, pop, T, label } from './lib.js';
import { diary } from './page.js';
import { write } from './props.js';
export default function renderShot(t) {
  let extra = '';
  const R = ['weil ich Zeit hatte', 'weil sie nett ist', 'weil sie an mich denkt'];
  R.forEach((r, i) => { const t0 = 61.0 + i * .35; extra += write(r, 46, 150 + i * 100, 24, eio(prog(t, t0 + .2, t0 + .8)), `w24${i}`, '#7a4a2e'); });
  let s = diary(t, [-1, -1, -1], { id: 'e', extra });
  s = cam(s, 540, 900, 1.06 + .05 * eio(prog(t, 60.1, 62.5)));
  s += label('WARUM?', 540, 250, 120, { p: pop(t, 60.98, .45), fill: '#ffffff' });
  return frame(s);
}
