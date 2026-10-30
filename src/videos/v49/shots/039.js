import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, ITint, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// the person slumps sideways onto the sofa, unconscious; the picture darkens from the edges
export default function renderShot(t) {
  const f = ein(prog(t, 66.5, 67.1));
  const bounce = t > 67.1 ? 4 * ring(t, 67.1, 2, 5) : 0;
  const dark = eio(prog(t, 66.9, 68.1));
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg2}"/>
  <rect x="60" y="1000" width="960" height="380" rx="60" fill="#4A5560" ${OL(6)}/>
  <rect x="40" y="900" width="140" height="480" rx="50" fill="#56626C" ${OL(6)}/>
  ${nbr(5, lerp(560, 470, f), lerp(900, 1000, f), 1.1, { lean: -72 * f + bounce, tilt: -10 * f, lid: lerp(.75, 1, f), mouth: 'o', brow: 'calm' })}
  ${coHaze(t, 540, 700, 420, 300, .6, 4)}
  <circle cx="540" cy="960" r="${f1(lerp(1300, 380, dark))}" fill="none" stroke="#000" stroke-width="${f1(lerp(0, 1500, dark))}" opacity=".9"/>
  ${ITint(.25)}${FG(1420)}`;
}
function ein(x) { return x * x * x; }
