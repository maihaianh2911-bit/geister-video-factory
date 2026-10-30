import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// inside the flat: a charcoal grill, then a gas heater slide in — each is struck out in red
export default function renderShot(t) {
  const g = back(prog(t, 56.0, 56.3)), o = back(prog(t, 56.55, 56.85));
  const frame = .5 + .5 * Math.sin(prog(t, 55.56, 55.9) * Math.PI);
  return KDEFS + `${room(t, { blanket: 1 })}
  <rect x="0" y="0" width="1080" height="1920" fill="#000" opacity=".35"/>
  <rect x="24" y="24" width="1032" height="1872" fill="none" stroke="${K.red}" stroke-width="16" opacity="${f1(frame)}"/>
  <g transform="translate(${f1(lerp(-300, 290, g))} 0)">${grill(0, 1220, 1.1, t, 1)}</g>
  <g transform="translate(${f1(lerp(1380, 790, o))} 0)">${gasOven(0, 1250, 1.0, t, 1)}</g>
  ${cross(290, 1000, 150, prog(t, 56.3, 56.5))}${cross(790, 1000, 150, prog(t, 56.85, 57.05))}
  ${FG(1420)}`;
}
