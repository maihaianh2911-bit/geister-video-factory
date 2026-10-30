import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// Jonas (from behind) pulls a thick blanket down over the window
export default function renderShot(t) {
  const b = eout(prog(t, 29.1, 29.9));
  const bot = 282 + 540 * b;
  const aL = jReach(270, 1000, .9, -1, 150, Math.max(bot, 420), 1), aR = jReach(270, 1000, .9, 1, 390, Math.max(bot, 420), 1);
  return KDEFS + `${room(t, { blanket: Math.max(b, .12) })}
  ${lantern(880, 1300, 1, 1)}
  ${jonas(270, 1000, .9, { back: true, u: 0, aL, aR })}
  ${FG(1400)}`;
}
