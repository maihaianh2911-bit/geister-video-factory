// L17 71.48–73.8: from behind in the kitchen — with each written line a stone jumps out of the backpack and thuds on the floor
// (72.14, 72.5, 72.86, 73.2, 73.5); du straightens up as the pack empties.
import { K, frame, cam, kitchen, person, shadow, stone, impact, tableEdge, teapot, prog, eio, eout, ein, lerp, cl, f1, packTopBack } from './lib.js';
const ST = [['VERMIETER', 72.14, -1], ['ZAHNARZT', 72.5, 1], ['STEUER', 72.86, -1], ['OMA', 73.2, 1], ['WÄSCHE', 73.5, -1]];
const IN = [{ label: 'VERMIETER', dx: -45, rot: -6 }, { label: 'ZAHNARZT', dx: 50, rot: 8 }, { label: 'STEUER', dx: -60, rot: 5, dy: -18 }, { label: 'OMA', dx: 70, rot: -8, dy: -16 }, { label: 'WÄSCHE', dx: 0, rot: 2, dy: -30 }];
export default function renderShot(t) {
  let s = kitchen({ dx: 20 * eio(prog(t, 71.48, 73.8)), clock: [9, 12] });
  s += tableEdge(1240, '#d4b48a', '#e4c8a0') + `<path d="M 380 1250 L 640 1250 L 680 1320 L 350 1320 Z" fill="#fffdf4" stroke="${K.ink}" stroke-width="4"/>` + teapot(860, 1250, .9, t);
  const X = 520, Y = 1720, S = 1.8;
  const gone = ST.filter(q => t >= q[1] - .05).length;
  const load = .85 - gone * .15, top = packTopBack(load), hunch = Math.max(0, .55 - gone * .11);
  s += shadow(X, Y + 4, 230);
  const inside = IN.filter(q => !ST.some(z => z[0] === q.label && t >= z[1] - .05)).map(q => ({ ...q, s: .6 }));
  s += person('du', X, Y, S, { t, seed: 1, back: true, load, stones: inside, hunch, armR: [150, -260] });
  ST.forEach(([l, t0, side], i) => {
    if (t < t0 - .05) return;
    const p = prog(t, t0 - .05, t0 + .45), q = IN.find(z => z.label === l);
    const x0 = X + q.dx * S, y0 = Y + (top + 34 + hunch * 26) * S, x1 = X + side * (300 + i * 30), y1 = 1700 + (i % 2) * 30;
    const x = lerp(x0, x1, p), y = lerp(y0, y1, ein(p)) - Math.sin(p * Math.PI) * 180;
    s += stone(x, y, .6 * S, l, { rot: side * 40 * p, size: 26 });
    s += impact(t, t0 + .45, x1, y1, 140);
  });
  s = cam(s, 540, 1050, 1.04 - .04 * eio(prog(t, 71.48, 73.8)));
  return frame(s, { vig: .4 });
}
