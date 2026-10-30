// 9.06–11.62: close-up of the glass — tiny bubbles appear on the shell ("Bläschen"); card SCHALE on "Schale"
import { K, card, prog, eio, eout, lerp } from './lib.js';
import { closeBG, glass, egg, shellBubbles, CGX, CGY, CS, EY } from './sets.js';
export default function renderShot(t) {
  const a = eout(prog(t, 9.4, 10.6));
  const inner = egg(0, EY, 1, { id: 'e6', w: 2.4 }) + shellBubbles(0, EY, 48, 60, a, t, 26, 1, 4.2);
  return `${closeBG()}${glass(CGX, CGY, CS, { id: 'g6', level: .78, inner })}${card(540, 520, 'SCHALE', 84, prog(t, 11.0, 11.3), { col: K.orange })}`;
}
