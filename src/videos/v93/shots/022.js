// L14b 58.26–61.44 Same office: a colleague (curly hair, mustard top) comes in late; du, arms crossed by the clock, judges him.
// On "unzuverlässig" (59.92) a red stamp UNZUVERLÄSSIG slams onto him.
import { K, frame, cam, setOffice, person, shadow, chip, T, pop, prog, eio, lerp } from './lib.js';
import { push } from './base.js';
export default function renderShot(t) {
  let s = setOffice(t);
  s += `<circle cx="820" cy="420" r="120" fill="#fff" stroke="${K.ink}" stroke-width="10"/><path d="M 820 420 L 820 330 M 820 420 L 890 440" stroke="${K.ink}" stroke-width="12" stroke-linecap="round"/>`;
  s += shadow(830, 1620, 170) + person('du', 830, 1620, 1.6, { t, seed: 2, crossed: true, brows: 'angry', eyes: 'mean', mouth: 'grim', look: [-9, 0] });
  const w = eio(prog(t, 58.26, 59.3)), x = lerp(-120, 300, w);
  s += shadow(x, 1580, 160) + person('p1', x, 1580, 1.5, { t, seed: 5, walk: w < 1 ? t * 2.4 : undefined, sweat: true, brows: 'worried', mouth: 'o', look: [9, 0] });
  const p = pop(t, 59.92, .25);
  s += chip(Math.max(x, 440), 1080, 'UNZUVERLÄSSIG', { p: p > 0 ? 1 + (1 - Math.min(1, p)) * 1.2 : 0, a: Math.min(1, p * 2), size: 58, bg: K.red, fill: '#fff', sq: true, rot: -8 });
  return frame(cam(s, 540, 1000, push(t, 58.26, 61.44, 1.0, 1.06), t > 59.92 && t < 60.15 ? Math.sin(t * 90) * 7 : 0) + T(540, 230, 'ER KOMMT ZU SPÄT', 64, { fill: '#fff', stroke: K.ink, sw: 14, op: prog(t, 58.3, 58.6) }));
}
