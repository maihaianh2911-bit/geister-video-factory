import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// REGEL 5 in red: slam, then a second heartbeat punch on "wichtigste"
export default function renderShot(t) {
  const p = back(prog(t, 53.56, 53.84)), [sx, sy] = shk(t, 53.76, 16, 8), [s2x, s2y] = shk(t, 54.62, 12, 7);
  const beat = 1 + .1 * Math.exp(-Math.max(0, t - 54.62) * 6) * (t > 54.62 ? 1 : 0) + .02 * Math.sin(t * 7);
  const red = .4 + .5 * (t > 54.62 ? Math.exp(-(t - 54.62) * 2) : 0);
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="#1A0E10"/>
  <ellipse cx="540" cy="820" rx="620" ry="560" fill="url(#kRed)" opacity="${f1(red + .3)}"/>
  <g transform="translate(${f1(sx + s2x)} ${f1(sy + s2y)})">${card(5, 540, 820, 1.4 * beat, p, true)}</g>
  ${FG(1400)}`;
}
