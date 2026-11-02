// L16 56.84–59.96 "Für alle anderen ist es nur eine Sekunde": a stopwatch ticks one second; the others go on with their day.
import { K, frame, bg, shadow, person, T, cam, prog, eio, eout, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('office', { sc: 1.04 });
  const P = [[200, 'gl', 5], [540, 'boss', 6], [880, 'cap', 4]];
  for (const [x] of P) s += shadow(x, 1330, 90);
  P.forEach(([x, who, seed], i) => { s += person(who, x, 1330, .8, { t, seed, eyes: 'happy', mouth: 'smile', look: [(i - 1) * 8, 0] }); });
  // stopwatch: one tick on "Sekunde"
  const p = pop(t, 57.0, .45), tick = eio(prog(t, 58.38, 58.6));
  if (p > 0) s += `<g transform="translate(540 560) scale(${f1(p * 100) / 100})"><rect x="-24" y="-200" width="48" height="40" rx="8" fill="${K.ink}"/><circle r="170" fill="#fff" stroke="${K.ink}" stroke-width="12"/>${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="-150" x2="0" y2="-128" stroke="${K.ink}" stroke-width="8" transform="rotate(${i * 30})"/>`).join('')}<line x1="0" y1="0" x2="0" y2="-120" stroke="${K.red}" stroke-width="10" stroke-linecap="round" transform="rotate(${f1(6 * tick)})"/><circle r="14" fill="${K.ink}"/></g>`;
  s += T(540, 860, '1 SEKUNDE', 88, { fill: K.yellow, stroke: K.ink, sw: 18, op: eio(prog(t, 58.18, 58.5)) });
  return frame(cam(s, 540, 1000, 1 + .03 * eio(prog(t, 56.84, 59.96))));
}
