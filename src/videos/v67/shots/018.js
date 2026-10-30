// 44.16–46.4: the rising bubbles drag cola with them — white arrows up, foam swells into the shoulder and neck ("reißen Cola mit")
import { K, arrow, stream, bubble, prog, eio, eout, lerp, hash } from './lib.js';
import { cutBG, bigBottle, candies, candyBubbles } from './sets.js';
export default function renderShot(t) {
  const u = eio(prog(t, 44.3, 46.2)), lev = lerp(300, 372, u);
  let inner = candyBubbles(-13, -24, 1.5, t, 11) + candyBubbles(13, -24, 1.5, t, 12) + candies(0, -24, 3, 0, 10)
    + stream(0, -30, lev - 30, t, { n: 46, speed: 360, r: 5, spread: 50, seed: 14 });
  // foam band on top of the liquid, thickening as it rises
  let foam = '';
  for (let i = 0; i < 26; i++) { const x = (hash(i * 2.7) - .5) * 130, y = -lev + hash(i * 6.1) * lerp(20, 90, u); foam += bubble(x, y, 6 + 7 * hash(i * 1.3), { fill: '#F3E3C8', stroke: '#1B1B1F', w: 1.6 }); }
  inner += foam;
  const ar = [-40, 0, 40].map((x, i) => arrow(x, -60 - i * 20, x, -60 - i * 20 - lerp(40, 150, eout(prog(t, 44.6 + i * .12, 45.5 + i * .12))), '#FFFFFF', 7)).join('');
  return `${cutBG()}${bigBottle({ id: 'c18', inner: inner + ar, level: lev })}`;
}
