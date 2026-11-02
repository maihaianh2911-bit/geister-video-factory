// L5a 22.30–25.95: MITTWOCH, grey day, laundry basket: three stones appear above du one by one: STEUER (23.36), OMA (24.96), WÄSCHE (25.46).
import { K, frame, person, cam, shadow, stone, paper, phone, T, dayCard, pop, prog, eio } from './lib.js';
import { room, fgTable } from './sets.js';
import { DX, GY, packOf } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'grey', basket: [900, 1290], hh: 12, mm: 30 });
  const k = (t >= 23.36) + (t >= 24.96) + (t >= 25.46);
  s += shadow(DX, GY) + person('du', DX, GY, 1, { t, pack: packOf(2), look: [-8 + 6 * k, -16], brows: k ? 'worried' : 'sad', mouth: k >= 2 ? 'wavy' : 'frown', hunch: .1 });
  const items = [[23.36, 220, 470, 'STEUER', -8], [24.96, 540, 400, 'OMA', 5], [25.46, 860, 470, 'WÄSCHE', -4]];
  items.forEach(([t0, x, y, lb, r], i) => {
    const p = pop(t, t0, .45); if (p <= 0) return;
    const yy = y + Math.sin(t * 3 + i) * 10;
    s += `<g transform="translate(${x} ${yy}) scale(${Math.max(.01, p)}) translate(${-x} ${-yy})">${stone(x, yy, 1.35, lb, r, { seed: i, glow: .5 })}</g>`;
  });
  // small icons under each stone
  if (t >= 23.36) s += paper(220, 610, 110, 130, -6, T(0, -30, 'STEUER', 16, { fill: K.red }), { lines: true });
  if (t >= 24.96) s += phone(540, 550, .55, 6, '#3c9a5f', T(0, 10, 'Oma', 28, { fill: '#fff' }));
  s += fgTable(t, { mugX: 160, phone: 600 });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 22.3, 25.95)));
  s += dayCard(t, 22.3, 'MITTWOCH');
  return frame(s);
}
