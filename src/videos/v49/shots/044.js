import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, ITint, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// over Jonas' shoulder: a neighbour's door, flickering orange light and smoke under the gap; push-in on "zugehört"
export default function renderShot(t) {
  const push = eio(prog(t, 75.0, 76.0));
  const z = 1 + .35 * push;
  const fl = .6 + .4 * Math.sin(t * 11) * Math.sin(t * 7.3);
  const u = eout(prog(t, 74.7, 75.1));
  let smoke = '';
  for (let i = 0; i < 6; i++) { const q = ((t - 74.54) * .5 + i / 6) % 1; smoke += `<ellipse cx="${f1(560 + 120 * (hash(i) - .5) + 50 * Math.sin(t + i))}" cy="${f1(lerp(1150, 700, q))}" rx="${f1(60 + 80 * q)}" ry="${f1(30 + 30 * q)}" fill="#6B737A" opacity="${f1(.4 * Math.sin(q * Math.PI))}"/>`; }
  return KDEFS + `<g transform="translate(540 1000) scale(${f1(z)}) translate(-540 -1000)">
  <rect x="0" y="0" width="1080" height="1920" fill="${K.bg2}"/>
  <rect x="0" y="1180" width="1080" height="740" fill="${K.concSh}"/>
  ${door(400, 1180, 1, { gap: '#05080A' })}
  <rect x="396" y="1168" width="328" height="16" fill="#FF8A3D" opacity="${f1(fl)}"/>
  <ellipse cx="560" cy="1190" rx="${f1(260 + 40 * fl)}" ry="70" fill="url(#kHeat)" opacity="${f1(fl)}"/>
  ${smoke}
  <rect x="660" y="680" width="70" height="40" rx="6" fill="#C9A45A" ${OL(3)}/>
  </g>
  ${jonas(180, 1180, 1.25, { back: true, u })}
  ${FG(1420)}`;
}
