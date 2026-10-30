import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// radiator close-up: heat waves die on "aus", frost creeps up
export default function renderShot(t) {
  const heat = 1 - eio(prog(t, 1.42, 1.85)), frost = eout(prog(t, 1.5, 2.0));
  const [sx, sy] = shk(t, 1.42, 10, 8);
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.wall}"/>
  <rect x="0" y="1250" width="1080" height="670" fill="${K.floor}"/>
  <g transform="translate(${f1(sx)} ${f1(sy)})">
  ${radiator(540, 900, 1.9, heat, frost)}
  </g>
  <rect x="0" y="0" width="1080" height="1920" fill="#5E7F93" opacity="${(.25 * (1 - heat)).toFixed(2)}" style="mix-blend-mode:multiply"/>
  ${FG(1380)}`;
}
