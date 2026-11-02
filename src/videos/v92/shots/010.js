// L9 29.44–31.82 backs to each other: a small heart over each head ("Nähe"), then a wall rises between them ("Abwehr").
import { K, frame, person, heart, chip, cam, prog, eio, eout, pop, f1 } from './lib.js';
import { kitchen, GY } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t, { sink: false, du: 330, er: 750 });
  s += person('du', 330, GY, 1, { t, seed: 1, hear: .6, back: true });
  s += person('er', 750, GY, 1, { t, seed: 2, back: true });
  const h = pop(t, 29.98, .4);
  if (h > 0) s += heart(330, 780, 1.2 * h, '#f07b8c') + heart(750, 780, 1.2 * h, '#f07b8c');
  const w = eio(prog(t, 30.66, 31.3));
  if (w > 0) {
    const top = 1330 - 640 * w;
    s += `<rect x="500" y="${f1(top)}" width="80" height="${f1(1330 - top)}" fill="#b5654a" stroke="${K.ink}" stroke-width="6"/>`;
    for (let y = 1330 - 40; y > top; y -= 40) s += `<path d="M 500 ${f1(y)} H 580 M ${(y / 40) % 2 ? 540 : 520} ${f1(y)} v 40" stroke="${K.ink}" stroke-width="3" opacity=".6"/>`;
  }
  s += chip(330, 560, 'NÄHE', { p: pop(t, 29.98, .4), size: 46, bg: '#fff' }) + chip(750, 560, 'NÄHE', { p: pop(t, 30.1, .4), size: 46, bg: '#fff' });
  s += chip(540, 380, 'ABWEHR', { p: pop(t, 31.06, .4), size: 54, bg: K.red, fill: '#fff' });
  return frame(cam(s, 540, 1000, 1.03));
}
