import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// wall thermometer close-up: needle slides down to 14 on "vierzehn"
export default function renderShot(t) {
  const v = lerp(17, 14, eio(prog(t, 18.7, 19.05))) + .25 * ring(t, 19.05, 3, 4);
  const lp = back(prog(t, 18.86, 19.15));
  const z = 1 + .05 * prog(t, 18.7, 20.24);
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.wall}"/>
  <g transform="translate(540 760) scale(${z.toFixed(3)}) translate(-540 -760)">${thermo(540, 740, 1.9, v)}</g>
  ${breath(t, 19.4, 120, 1100, 1)}
  ${label('14 °C', 540, 1250, 130, lp, '#FFFFFF', '#2C507F')}
  ${FG(1420)}`;
}
