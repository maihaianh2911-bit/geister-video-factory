// 40.12–44.16: whole bottle — the mints sink to the bottom ("absinken"); bubbles start there and rise through the full depth ("tief")
import { K, f1, arrow, stream, prog, eio, eout, lerp } from './lib.js';
import { cutBG, bigBottle, candies, candyBubbles, toW } from './sets.js';
import { sinkY } from './007.js';
export default function renderShot(t) {
  const y = sinkY(t, 40.2, 41.4, -250, -24), g = eout(prog(t, 41.6, 42.4));
  let inner = candies(0, y, 3, 0, 10);
  if (g > 0) inner = candyBubbles(-13, y, g * 1.2, t, 11) + candyBubbles(13, y, g * 1.2, t, 12) + inner
    + stream(-8, y - 8, 300, t, { n: Math.round(26 * g), speed: 240, r: 4.5, spread: 24, seed: 13, t0: 41.6 });
  const [ax, ayT] = toW(88, -300), [, ayB] = toW(88, -16), a = eout(prog(t, 42.6, 43.1));
  const depth = a > 0 ? arrow(ax + 40, ayT, ax + 40, lerp(ayT, ayB, a), K.blue, 14) + arrow(ax + 40, ayB, ax + 40, ayB - 1, K.blue, 14, a) : '';
  return `${cutBG()}${bigBottle({ id: 'c17', inner, level: 300 })}${depth}`;
}
