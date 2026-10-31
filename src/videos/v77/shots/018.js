import { card, stick, ground, antSide, bread, breadSide, nestSide, yardSide, prog, eio, lerp } from './lib.js';
// 37.78–40.68 You crouch, grip the bread and lift it away on "weg"; the ants stay on the ground.
export default function renderShot(t) {
  const X = 760, Y = 1250;
  const reach = eio(prog(t, 38.0, 38.9));
  const lift = eio(prog(t, 39.1, 39.84));
  const bx = 560, by = 1250;
  const hx = lerp(700, bx + 130, reach) + lerp(0, 150, lift), hy = lerp(1030, by - 40, reach) - lerp(0, 360, lift);
  const held = t >= 39.1;
  let ants = ''; for (let i = 0; i < 5; i++) ants += antSide(400 + i * 80 + (held ? (i % 2 ? -1 : 1) * 30 * lift : 0), 1250, .6, held ? t * 18 + i : 0, { dir: i % 2 ? -1 : 1 });
  return `${yardSide(Y)}${nestSide(170, Y, 1)}
    ${held ? '' : breadSide(bx, by, .9)}${ants}
    ${stick(X, Y, 1.7, { bob: lerp(110, 40, lift), hR: [hx, hy], hL: [X - 10, Y - 170], fL: [X - 60, Y], fR: [X + 50, Y], lean: lerp(-6, 0, lift), look: -.9, lookY: lerp(.6, 0, lift), brow: 'calm', mouth: 'flat',
      over: held ? breadSide(hx - 130, hy + 40, .9, lerp(0, -10, lift)) : '' })}
    ${card(540, 330, 'WEG', 90, prog(t, 39.84, 40.05))}`;
}
