// L10a 44.74–47.98: board graph "BEDAUERN" over time; the red line GETAN starts high right after the act (draws 45.0–47.4),
// the label KURZ DANACH is highlighted, chip GETAN pops on "getan" (46.94).
import { K, frame, cam, prog, eio, pop, label, chip, T } from './lib.js';
import { voidRoom2, graph, G, yGetan } from './sets3.js';
export default function renderShot(t) {
  let s = voidRoom2(t, { top: '#2c3346', bot: '#3d4258' });
  const a = .38 * eio(prog(t, 45.0, 47.4));
  s += graph(t, a, 0, { lab1: .5 + .5 * eio(prog(t, 44.8, 45.3)), lab2: .35 });
  const cp = pop(t, 46.94, .4);
  if (cp > 0) s += `<g opacity="${Math.min(1, cp)}">${chip(470, yGetan(0) - 60, 'GETAN', { size: 40, bg: '#fde3e0', fill: '#b5332b' })}</g>`;
  s = cam(s, 420, 880, 1.12 + .04 * eio(prog(t, 44.74, 47.98)));
  s += label('KURZ DANACH', 540, 250, 92, { p: pop(t, 44.8, .45) });
  return frame(s);
}
