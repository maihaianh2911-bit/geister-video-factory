import { card, ground, bread, nestTop, trail, prog, eio } from './lib.js';
// 18.62–20.9 Some species use scent roads: a teal dotted "Duftstraße" draws itself between nest and bread (illustration).
export default function renderShot(t) {
  const d = eio(prog(t, 19.4, 20.6));
  return `${ground(1)}${nestTop(250, 1250, 1)}${bread(790, 470, 1)}${trail(0.06, 0.06 + .86 * d, 1.1)}
    ${card(540, 1390 - 1080, 'DUFTSTRASSE', 76, prog(t, 19.4, 19.65))}`;
}
