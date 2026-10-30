// 64.24–66.9: cash still changes hands ("Bargeld" 64.24, "Besitzer" 65.76) — at the bakery counter your note goes from your hand into the baker's hand
import { K, DEFS, reach, tick, cam, prog, eio, lerp } from './lib.js';
import { bakery } from './sets.js';
import { cash } from './010.js';
export default function renderShot(t) {
  const m = eio(prog(t, 64.5, 65.7)), give = t > 65.2;
  const cx = lerp(380, 700, m), cy = lerp(1020, 960, m);
  const mine = reach(-200, 1700, give ? lerp(380, 520, eio(prog(t, 65.2, 65.8))) - 60 * eio(prog(t, 65.8, 66.6)) : cx - 40, give ? 1000 + 200 * eio(prog(t, 65.8, 66.6)) : cy + 20, 1.3, K.du, give ? '' : cash(cx, cy, 1.1));
  const theirs = reach(1300, 1500, give ? cx + 50 : lerp(1000, 760, m), give ? cy + 20 : lerp(1300, 990, m), 1.3, K.white, give ? cash(cx, cy, 1.1) : '');
  return `${DEFS}${cam(`${bakery()}${mine}${theirs}`, 1.05, 540, 1000)}${tick(540, 520, 1.4, eio(prog(t, 65.7, 66.1)))}`;
}
