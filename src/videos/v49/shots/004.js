import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// floor plan of the flat: all rooms freeze, then ONE room glows warm on "Zimmer"
export default function renderShot(t) {
  const a = back(prog(t, 4.72, 5.05));
  const dim = eio(prog(t, 4.72, 5.1));
  const z = 1 + .06 * eio(prog(t, 4.9, 5.62));
  const fr = eout(prog(t, 3.74, 4.3));
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  <g transform="translate(590 915) scale(${z.toFixed(3)}) translate(-590 -915)">
  <g transform="translate(${f1(-20 + 20 * eout(prog(t, 3.74, 4.1)))} 0)">${plan(t, { warm: a > 0 ? 3 : -1, a, dim, frost: fr })}</g>
  </g>
  ${a > 0 ? rings(t, 4.72, 590, 915, K.amb, 3, 300) : ''}
  ${FG(1400)}`;
}
