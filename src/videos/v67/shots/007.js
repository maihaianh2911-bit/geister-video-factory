// 11.0–15.06: cutaway — three mints sink to the bottom; from "wachsen" bubbles grow all over them and stream up
import { cam, prog, eio, ein, eout, lerp, cl } from './lib.js';
import { cutBG, bigBottle, candies, candyBubbles, molecules } from './sets.js';
import { stream } from './lib.js';
export function sinkY(t, t0 = 11.08, t1 = 12.12, y0 = -370, y1 = -24) { return lerp(y0, y1, ein(prog(t, t0, t1)) * .55 + eio(prog(t, t0, t1)) * .45); }
export default function renderShot(t) {
  const y = sinkY(t), g = eout(prog(t, 12.8, 13.6)) + .5 * prog(t, 13.6, 15);
  let inner = candies(0, y, 3, 0, 10);
  if (t > 12.8) {
    inner = candyBubbles(-13, y, g, t, 1) + candyBubbles(0, y - 4, g, t, 2) + candyBubbles(13, y, g, t, 3) + inner;
    inner += stream(0, y - 10, 300 + y, t, { n: Math.round(6 + 20 * g), speed: 220, r: 4.5, spread: 26, seed: 7, t0: 13.4 });
  } else if (t > 11.1) inner += stream(0, y - 6, 60, t, { n: 4, speed: 60, r: 1.5, spread: 10, seed: 8 });
  const push = eio(prog(t, 12.6, 13.3));
  return cam(`${cutBG()}${bigBottle({ id: 'c7', inner })}`, lerp(1, 1.35, push), 540, 1330, 0, lerp(0, -230, push));
}
