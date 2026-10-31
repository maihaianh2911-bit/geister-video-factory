import { card, stick, ground, bread, breadSide, nestSide, yardSide, prog, eio, lerp } from './lib.js';
// 2.6–4.9 You crouch and lay the bread on the ground right next to the nest; it touches down on "legst".
export default function renderShot(t) {
  const crouch = eio(prog(t, 2.6, 3.2));
  const down = eio(prog(t, 3.2, 3.96));
  const away = eio(prog(t, 4.1, 4.6));
  const X = 840, Y = 1250;
  const bx = lerp(660, 620, down), by = lerp(960, 1250, down);
  const hx = away > 0 ? lerp(bx + 110, X - 70, away) : bx + 110, hy = away > 0 ? lerp(by - 40, 1080, away) : by - 40;
  const held = t < 3.98;
  return `${yardSide(1250)}${nestSide(250, 1250, 1.4)}
    ${breadSide(held ? bx : 620, held ? by : 1250, .9, held ? lerp(-12, 0, down) : 0)}
    ${stick(X, Y, 1.7, { bob: 110 * crouch, hL: [hx, hy], hR: [X + 70, Y - 300 + 150 * crouch], fL: [X - 60, Y], fR: [X + 50, Y], lean: -14 * crouch, look: -.9, lookY: .6 * crouch, brow: 'calm', mouth: 'smile' })}
    ${card(540, 330, 'NEBEN DAS NEST', 64, prog(t, 3.3, 3.6) * 1)}`;
}
