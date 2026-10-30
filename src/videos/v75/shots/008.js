// 18.8–21.38: a card terminal that needs a connection ("Kartenterminal" 18.98, "Verbindung" 20.22) — it shows the no-signal symbol while waiting
import { K, DEFS, wifi, cam, prog, eio, lerp } from './lib.js';
import { bakery, terminal } from './sets.js';
export default function renderShot(t) {
  const w = eio(prog(t, 20.1, 20.4));
  return `${DEFS}${cam(`${bakery()}${terminal(540, 960, 2.2, 'wait', t)}${wifi(820, 560, .6, w > .5 ? 0 : 1)}`, lerp(1.0, 1.08, prog(t, 18.8, 21.38)), 540, 950)}`;
}
