import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// the neighbours come into the small room one by one; Jonas waves them in
export default function renderShot(t) {
  const d = eout(prog(t, 36.82, 37.1));
  const X = [400, 590, 760, 880, 300], Y = [930, 960, 940, 980, 980];
  let n = '';
  for (let i = 4; i >= 0; i--) {
    const p = eio(prog(t, 37.0 + i * .3, 37.6 + i * .3));
    if (p <= 0) continue;
    const x = lerp(1000, X[i], p), bob = 10 * Math.abs(Math.sin(t * 8 + i)) * (p < 1 ? 1 : 0);
    n += nbr(i, x, Y[i] - bob, .62, { look: -10, mouth: i === 0 ? 'smile' : 'flat', blink: blinkAt(t, i * .7) });
  }
  const wave = Math.sin(t * 10) * 20;
  return KDEFS + `${room(t, { door: .85 * d, blanket: 1, towel: 0 })}
  ${lantern(540, 1330, .9, 1)}
  ${n}
  ${jonas(180, 900, .7, { aR: [140, 160 + wave], aL: [10, 6], mouth: 'smile', talk: talkAt(t, 37.2, 37.9), look: 12 })}
  ${FG(1400)}`;
}
