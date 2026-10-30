// 31.0–32.70 · "an der Stirn oder an den Schläfen" — front close-up: pain lights the forehead, then both temples
import { P, pastel, girl, prog, eout, back } from '../lib.js';

export default function renderShot(t) {
  const f = eout(prog(t, 31.1, 31.35)), tm = eout(prog(t, 32.0, 32.25));
  const S = 2.2, X = 540, Y = 1560;
  const mark = (x, y, p) => p > 0 ? `<circle cx="${x}" cy="${y}" r="${70 * back(p)}" fill="none" stroke="${P.pain}" stroke-width="10" stroke-dasharray="22 14"/>` : '';
  return `${pastel(t, { color: '#FBE9EC' })}
    ${girl(X, Y, S, { t, id: 's18', eyes: tm > .5 ? 'shut' : 'half', brow: 1, mouth: 'ouch', painFore: f * (1 + .2 * Math.sin(t * 12)), painTemple: tm * (1 + .2 * Math.sin(t * 12 + 1)), handR: [300, 700], handL: [-300, 700] })}
    ${mark(X, Y - 290 * S, f)}${mark(X - 132 * S, Y - 215 * S, tm)}${mark(X + 132 * S, Y - 215 * S, tm)}`;
}
