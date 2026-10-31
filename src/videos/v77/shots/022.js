import { K, card, ground, antTop, breadGhost, f1, prog } from './lib.js';
// 48.52–51.95 At the old spot the ants fan out in loops and search the surroundings ("in der Umgebung").
export default function renderShot(t) {
  const u = prog(t, 49.0, 51.95);
  let s = '';
  for (let i = 0; i < 5; i++) {
    const a0 = i / 5 * 6.283 + .4, path = v => { const r = 40 + 330 * v, a = a0 + 4 * v; return [540 + Math.cos(a) * r, 860 + Math.sin(a) * r * .9]; };
    let wake = ''; for (let k = 1; k <= 24; k++) { const [x, y] = path(u * k / 24); wake += `<circle cx="${f1(x)}" cy="${f1(y)}" r="5" fill="${K.ink}" opacity=".25"/>`; }
    const [x, y] = path(u), [x2, y2] = path(Math.min(1, u + .01));
    s += wake + antTop(x, y, Math.atan2(y2 - y, x2 - x) * 180 / Math.PI, 1.4, t * 22 + i);
  }
  return `${ground(7)}${breadGhost(540, 860, 1.2)}${s}${card(540, 300, 'SUCHEN', 76, prog(t, 49.94, 50.2))}`;
}
