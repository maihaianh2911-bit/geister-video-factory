// 29.98–32.14: a Mentos drops in; at once bubbles burst from it and the CO2 rushes to it ("beschleunigen … Gasfreisetzung")
import { K, mentos, bubble, co2, stream, prog, eio, eout, ein, lerp, cl } from './lib.js';
import { cutBG, bigBottle, molSvg, candyBubbles, toW } from './sets.js';
import { MOL } from './010.js';
import { GONE } from './012.js';
export default function renderShot(t) {
  const fall = prog(t, 29.98, 30.55), y = lerp(-470, -70, ein(fall)) + (t > 30.55 ? 45 * eout(prog(t, 30.55, 32.1)) : 0);
  const burst = eout(prog(t, 30.5, 31.1));
  let mols = '';
  MOL.forEach((p, i) => {
    if (GONE.has(i)) return;
    const pull = eio(prog(t, 30.6 + (i % 7) * .05, 31.6)) * (Math.hypot(p[0], p[1] - y) < 140 ? 1 : .35);
    const x = lerp(p[0], p[0] * .3, pull), yy = lerp(p[1], y + (p[1] - y) * .3, pull);
    mols += pull > .9 ? bubble(x, yy, 4) : co2(x, yy, 6.5);
  });
  let inner = mols;
  if (burst > 0) inner += candyBubbles(0, y, 1.4 * burst, t, 4, 12) + stream(0, y - 10, 300 + y, t, { n: Math.round(24 * burst), speed: 300, r: 4.5, spread: 30, seed: 9, t0: 30.5 });
  const m = mentos(0, y, 10, 15, { lw: 2.4 });
  if (y > -380) inner += m;
  return `${cutBG()}${bigBottle({ id: 'c13', inner, level: 290, over: y > -380 ? '' : m })}`;
}
