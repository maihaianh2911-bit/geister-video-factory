import { P, R, fig, hat, jacketShape, puff, frame, tag, prog, eout, back, lerp } from './lib.js';
// 41.24–43.9 The uniform made it possible: the coat lands on the plain man and turns him into the captain; label HOCHSTAPLER.
export default function renderShot(t) {
  const fly = prog(t, 41.3, 41.8);
  const on = t >= 41.8;
  const jx = lerp(1200, 540, eout(fly)), jy = lerp(300, 990, fly) - 200 * Math.sin(fly * Math.PI);
  const glow = eout(prog(t, 43.0, 43.4));
  let rays = ''; for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283 + t * .3; rays += `<path d="M 540 900 L ${540 + Math.cos(a) * 900} ${900 + Math.sin(a) * 900} L ${540 + Math.cos(a + .12) * 900} ${900 + Math.sin(a + .12) * 900} Z" fill="${P.goldHi}" opacity="${.3 * glow}"/>`; }
  return frame(t, `${R(0, 0, 1080, 1920, P.paper)}${rays}${R(0, 1500, 1080, 440, P.paperSh)}
    ${fig(540, 1640, 1.3, { kind: on ? 'voigt' : 'voigtCiv', hat: on ? 'pickel' : 'cap', aR: on ? lerp(-8, -30, glow) : -8, aL: on ? lerp(8, 30, glow) : 8, look: on ? 0 : 14, lookY: on ? 0 : -8, brow: on ? 'angry' : 'up', mouth: on ? 'flat' : 'o', eyeS: !on && fly > .2 ? 1.5 : 1 })}
    ${!on && fly > 0 ? jacketShape(jx, jy - 300, 1.05, { epaul: 1, rot: (1 - fly) * 40 }) : ''}
    ${puff(540, 1100, t, 41.8, 10, 34, 220)}
    ${tag(540, 330, 'HOCHSTAPLER', back(prog(t, 42.5, 42.75)), { sz: 70, rot: -3 })}`);
}
