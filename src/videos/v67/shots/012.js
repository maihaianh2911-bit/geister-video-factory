// 25.68–29.98: open bottle — part of the CO2 forms bubbles, rises and escapes through the opening ("entweichen")
import { K, cam, bubble, co2, prog, eio, eout, ein, lerp } from './lib.js';
import { cutBG, bigBottle, molSvg, toW } from './sets.js';
import { MOL } from './010.js';
export const GONE = new Set([2, 5, 9, 13, 17, 21, 26, 30, 35, 40, 44]);
export default function renderShot(t) {
  let stay = '', move = '', out = '';
  MOL.forEach((p, i) => {
    if (!GONE.has(i)) { stay += molSvg([p], 1, 6.5, t); return; }
    const k = [...GONE].indexOf(i), t0 = 26.3 + k * .18, u = prog(t, t0, t0 + 1.6);
    if (u <= 0) { stay += molSvg([p], 1, 6.5, t); return; }
    const y = lerp(p[1], -400, ein(u)), x = lerp(p[0], (k % 2 ? 6 : -6), eio(cl2(u * 1.4)));
    if (y > -384) move += bubble(x, y, 5 + 4 * u, { w: 1.3 }) + co2(x, y, 4.5);
    else { const [wx, wy] = toW(x, y); out += co2(wx + (k % 2 ? 1 : -1) * 60 * (u - .8), wy - 300 * (u - .8), 14, 1 - (u - .85) * 4); }
  });
  const push = eio(prog(t, 26.9, 27.6));
  return cam(`${cutBG()}${bigBottle({ id: 'c12', inner: stay + move })}${out}`, lerp(1, 1.5, push), 540, 520, 0, lerp(0, 120, push));
}
function cl2(x) { return Math.max(0, Math.min(1, x)); }
