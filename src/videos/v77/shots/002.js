import { card, stick, breadSide, nestSide, yardSide, prog, eio, lerp, f1 } from './lib.js';
import { handAt, GRIP } from './grip.js';
// 2.6–4.9 You crouch and lower the bread with your hand to the ground right next to the nest:
// hand and bread share one grip point → bread touches down on "legst" (3.96) → hand lets go and withdraws.
export default function renderShot(t) {
  const X = 840, Y = 1250, S = 1.7;
  const crouch = eio(prog(t, 2.6, 3.25));
  const down = eio(prog(t, 3.1, 3.96));
  const away = eio(prog(t, 4.2, 4.7));
  const g0 = [X - 175, 1010], g1 = [620 + GRIP[0], Y + GRIP[1]];
  let tg = [lerp(g0[0], g1[0], down), lerp(g0[1], g1[1], down)];
  if (away > 0) tg = [lerp(g1[0], X - 80, away), lerp(g1[1], 1080, away)];
  const pose = { bob: 120 * crouch, lean: -16 * crouch, hL: tg };
  const held = t < 4.2;
  const h = handAt(X, Y, S, pose, 'L');
  // while held the bread hangs from the hand's grip point (slight tilt, levelling as it lands); after release it rests where it landed
  const rot = held ? lerp(-8, 0, down) : 0;
  const breadSvg = held
    ? `<g transform="rotate(${f1(rot)} ${f1(h[0])} ${f1(h[1])})">${breadSide(h[0] - GRIP[0], h[1] - GRIP[1], .9)}</g>`
    : breadSide(620, Y, .9);
  return `${yardSide(Y)}${nestSide(250, Y, 1.4)}
    ${breadSvg}
    ${stick(X, Y, S, { ...pose, hR: [X + 70, Y - 300 + 150 * crouch], fL: [X - 60, Y], fR: [X + 50, Y], look: -.9, lookY: .6 * crouch, brow: 'calm', mouth: 'smile' })}
    ${card(540, 330, 'NEBEN DAS NEST', 64, prog(t, 3.3, 3.6) * 1)}`;
}
