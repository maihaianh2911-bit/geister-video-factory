import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, ITint, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// a charcoal grill glows in a living room; invisible gas (dashed contours) rises from it; "CO" on "Kohlenmonoxid"
export default function renderShot(t) {
  const gas = eout(prog(t, 59.9, 61.0));
  const lp = back(prog(t, 60.42, 60.7));
  const z = 1 + .05 * prog(t, 59.14, 61.68);
  return KDEFS + `<g transform="translate(540 1000) scale(${f1(z)}) translate(-540 -1000)">${room(t, { blanket: 1 })}
  <rect x="0" y="0" width="1080" height="1920" fill="#000" opacity=".3"/>
  ${grill(540, 1300, 1.3, t, 1)}
  ${coHaze(t, 540, lerp(1000, 760, gas), lerp(120, 380, gas), lerp(80, 300, gas), gas, 2)}</g>
  ${label('CO', 540, 430, 170, lp, '#FFFFFF', K.red)}
  ${ITint(.25)}${FG(1420)}`;
}
