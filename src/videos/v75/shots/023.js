// 64.24–66.9: cash still changes hands ("Bargeld" 64.24, "Besitzer" 65.76) — at the bakery counter your note goes from your hand into the baker's hand
import { K, DEFS, reach, tick, cam, prog, eio, lerp } from './lib.js';
import { bakery } from './sets.js';
import { cash } from './010.js';
export default function renderShot(t) {
  const m = eio(prog(t, 64.5, 65.6)), give = t >= 65.65, back = eio(prog(t, 65.75, 66.6));
  const cx = lerp(380, 700, m), cy = lerp(1020, 960, m);
  // giver's hand holds the note until both hands meet (65.6), then withdraws from that spot
  const mine = give ? reach(-200, 1700, lerp(660, 380, back), lerp(980, 1300, back), 1.3, K.du) : reach(-200, 1700, cx - 40, cy + 20, 1.3, K.du, cash(cx, cy, 1.1));
  const theirs = reach(1300, 1500, lerp(1000, 750, m), lerp(1300, 980, m), 1.3, K.white, give ? cash(cx, cy, 1.1) : '');
  return `${DEFS}${cam(`${bakery()}${mine}${theirs}`, 1.05, 540, 1000)}${tick(540, 520, 1.4, eio(prog(t, 65.7, 66.1)))}`;
}
