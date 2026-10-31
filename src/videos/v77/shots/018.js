import { card, stick, ground, antSide, bread, breadSide, nestSide, yardSide, prog, eio, lerp } from './lib.js';
// 37.78–40.68 You crouch, grip the bread and lift it away on "weg"; the ants stay on the ground.
export default function renderShot(t) {
  const X = 840, Y = 1250;
  const reach = eio(prog(t, 38.0, 38.9));
  const lift = eio(prog(t, 39.1, 39.84));
  const bx = 620, by = 1250;
  const hx = lerp(X - 110, bx + 110, reach) + lerp(0, -150, lift), hy = lerp(1120, by - 40, reach) - lerp(0, 390, lift);
  const held = t >= 39.1;
  let ants = ''; for (let i = 0; i < 5; i++) ants += antSide(470 + i * 70 + (held ? (i % 2 ? -1 : 1) * 30 * lift : 0), 1250, .6, held ? t * 18 + i : 0, { dir: i % 2 ? -1 : 1 });
  return `${yardSide(Y)}${nestSide(250, Y, 1.4)}
    ${held ? '' : breadSide(bx, by, .9)}${ants}
    ${stick(X, Y, 1.7, { bob: lerp(110, 40, lift), hL: [hx, hy], bendL: lift > .3 ? -1 : 1, hR: [X + 80, lerp(Y - 150, Y - 330, lift)], fL: [X - 60, Y], fR: [X + 50, Y], lean: lerp(-14, 0, lift), look: -.9, lookY: lerp(.6, 0, lift), brow: 'calm', mouth: 'flat',
      over: held ? breadSide(hx - 110, hy + 40, .9, lerp(0, 8, lift)) : '' })}
    ${card(540, 330, 'WEG', 90, prog(t, 39.84, 40.05))}`;
}
