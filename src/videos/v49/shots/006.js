import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// Jonas in his dark flat blows warm air into his cupped hands; breath clouds
export default function renderShot(t) {
  const up = eout(prog(t, 8.0, 8.4));
  const rub = 10 * Math.sin(t * 14) * prog(t, 9.0, 9.2);
  const hx = 540, hy = lerp(1100, 720, up);
  const aL = jReach(540, 760, 1, -1, hx - 34 + rub, hy, -1), aR = jReach(540, 760, 1, 1, hx + 34 - rub, hy, -1);
  const look = t > 9.6 ? -12 * eout(prog(t, 9.6, 9.8)) : 0;
  const jit = 2 * Math.sin(t * 50);
  return KDEFS + `${room(t, { lamp: 1 })}
  ${lantern(880, 1290, 1.1, 1)}
  <rect x="640" y="1290" width="440" height="40" fill="${K.woodHi}" ${OL(5)}/>
  ${jonas(540 + jit, 760, 1, { aL, aR, look, mouth: t > 8.3 && t < 8.9 || t > 9.3 && t < 9.7 ? 'o' : 'flat', brow: 'worry', cold: 1, blink: blinkAt(t) })}
  ${breath(t, 8.35, 540, 690, 1)}${breath(t, 9.35, 540, 690, -1)}
  ${FG(1400)}`;
}
