import { card, stick, ground, bread, breadSide, nestSide, yardSide, prog, eio, lerp } from './lib.js';
// 2.6–4.9 You crouch and lay the bread on the ground right next to the nest; it touches down on "legst".
export default function renderShot(t) {
  const crouch = eio(prog(t, 2.6, 3.2));
  const down = eio(prog(t, 3.2, 3.96));
  const away = eio(prog(t, 4.1, 4.6));
  const X = 760, Y = 1250;
  const bx = lerp(640, 560, down), by = lerp(900, 1250, down);
  const hx = away > 0 ? lerp(bx + 120, 720, away) : bx + 120, hy = away > 0 ? lerp(by - 50, 1020, away) : by - 50;
  const held = t < 3.98;
  return `${yardSide(1250)}${nestSide(250, 1250, 1.4)}
    ${breadSide(held ? bx : 560, held ? by : 1250, .9, held ? lerp(-12, 0, down) : 0)}
    ${stick(X, Y, 1.7, { bob: 110 * crouch, hR: [hx, hy], hL: [X - 10, Y - 300 + 130 * crouch], fL: [X - 60, Y], fR: [X + 50, Y], lean: -6 * crouch, look: -.9, lookY: .6 * crouch, brow: 'calm', mouth: 'smile' })}
    ${card(540, 330, 'NEBEN DAS NEST', 64, prog(t, 3.3, 3.6) * 1)}`;
}
