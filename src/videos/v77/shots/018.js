import { card, stick, antSide, breadSide, nestSide, yardSide, prog, eio, lerp, f1 } from './lib.js';
import { handAt, GRIP } from './grip.js';
// 37.78–40.68 You reach for the bread, grip its crust, and lift it away; the bread only moves with the hand
// (shared grip point) and leaves the ground before "weg" (39.84); the ants stay on the ground and scatter.
export default function renderShot(t) {
  const X = 840, Y = 1250, S = 1.7, bx = 620, by = 1250;
  const reach = eio(prog(t, 38.0, 38.85));
  const lift = eio(prog(t, 39.15, 39.8));
  const g = [bx + GRIP[0], by + GRIP[1]];
  let tg = [lerp(X - 110, g[0], reach), lerp(1110, g[1], reach)];
  if (lift > 0) tg = [lerp(g[0], X - 200, lift), lerp(g[1], 930, lift)];
  const pose = { bob: lerp(120, 40, lift), lean: lerp(-16, -4, lift), hL: tg };
  const h = handAt(X, Y, S, pose, 'L');
  const held = t >= 38.85;
  // grip: hand closes on the crust for a beat (bread dips 2 px) before the lift
  const squeeze = held && lift === 0 ? 2 * Math.sin(Math.PI * prog(t, 38.85, 39.15)) : 0;
  const breadSvg = lift > 0
    ? `<g transform="rotate(${f1(lerp(0, 8, lift))} ${f1(h[0])} ${f1(h[1])})">${breadSide(h[0] - GRIP[0], h[1] - GRIP[1], .9)}</g>`
    : breadSide(bx, by + squeeze, .9);
  let ants = ''; for (let i = 0; i < 5; i++) ants += antSide(470 + i * 70 + (lift > 0 ? (i % 2 ? -1 : 1) * 30 * lift : 0), 1250, .6, lift > 0 ? t * 18 + i : 0, { dir: i % 2 ? -1 : 1 });
  return `${yardSide(Y)}${nestSide(250, Y, 1.4)}
    ${breadSvg}${ants}
    ${stick(X, Y, S, { ...pose, bendL: 1, hR: [X + 80, lerp(Y - 150, Y - 330, lift)], fL: [X - 60, Y], fR: [X + 50, Y], look: -.9, lookY: lerp(.6, 0, lift), brow: 'calm', mouth: 'flat' })}
    ${card(540, 330, 'WEG', 90, prog(t, 39.84, 40.05))}`;
}
