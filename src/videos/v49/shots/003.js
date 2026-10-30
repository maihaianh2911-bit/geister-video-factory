import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// outside the window: snowstorm, outdoor thermometer needle falls to −8 on "acht"
export default function renderShot(t) {
  const v = lerp(2, -8, eio(prog(t, 2.1, 2.72))) + .3 * ring(t, 2.72, 3, 4);
  const lp = back(prog(t, 2.72, 2.95));
  const push = 1 + .04 * prog(t, 2, 3.74);
  return KDEFS + `<g transform="translate(540 800) scale(${push.toFixed(3)}) translate(-540 -800)">
  <rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
  ${tower(560, 1400, 360, 14, 5, { fh: 70, col: '#18232A', lw: 4 })}${tower(80, 1400, 300, 11, 4, { fh: 70, col: '#1A262C', lw: 4 })}
  ${snow(t, 70, 9, 260, .95)}
  <rect x="0" y="0" width="1080" height="1920" fill="none" stroke="#0D1519" stroke-width="140"/>
  <path d="M 540 0 V 1920" stroke="#0D1519" stroke-width="60"/>
  <path d="M 70 70 Q 90 300 80 600 M 1010 1100 Q 990 1300 1000 1500" stroke="${K.ice}" stroke-width="18" opacity=".35" fill="none" stroke-linecap="round"/>
  ${thermo(300, 760, 1.15, v)}
  </g>
  ${label('−8 °C', 760, 1180, 110, lp, '#FFFFFF', K.red)}
  ${FG(1400)}`;
}
