// L14a 55.94–58.26 du rushes into the office late (wall clock 9:20, sweating). On "Stau" (57.44) a blue label STAU pops with a row of cars:
// for himself the reason is the traffic jam.
import { K, frame, cam, setOffice, person, shadow, chip, icon, T, pop, prog, eio, lerp } from './lib.js';
import { push } from './base.js';
export default function renderShot(t) {
  let s = setOffice(t);
  // big wall clock (sharp)
  s += `<circle cx="820" cy="420" r="120" fill="#fff" stroke="${K.ink}" stroke-width="10"/><path d="M 820 420 L 820 330 M 820 420 L 890 440" stroke="${K.ink}" stroke-width="12" stroke-linecap="round"/><path d="M 820 420 L 840 520" stroke="${K.red}" stroke-width="5"/>`;
  const w = eio(prog(t, 55.94, 57.0)), x = lerp(-120, 300, w);
  s += shadow(x, 1600, 170) + person('du', x, 1600, 1.6, { t, seed: 2, walk: w < 1 ? t * 2.4 : undefined, sweat: true, brows: 'worried', mouth: 'o', look: [8, -2], tilt: w < 1 ? 6 : 0 });
  const p = pop(t, 57.44, .35);
  s += chip(680, 720, 'STAU', { p, size: 70, bg: K.blue, fill: '#fff', sq: true, rot: -4 });
  if (p > 0) s += `<g transform="translate(680 850) scale(${Math.min(1.2, p)})">${icon.car(-110, 0, 1.2)}${icon.car(0, 0, 1.2)}${icon.car(110, 0, 1.2)}</g>`;
  return frame(cam(s, 540, 1000, push(t, 55.94, 58.26, 1.0, 1.06)) + T(540, 230, 'DU KOMMST ZU SPÄT', 64, { fill: '#fff', stroke: K.ink, sw: 14, op: prog(t, 56.0, 56.3) }));
}
