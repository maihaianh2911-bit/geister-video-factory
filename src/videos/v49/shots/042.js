import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, ITint, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// a phone lights up in the dark: 03:00
export default function renderShot(t) {
  const on = eout(prog(t, 71.8, 71.95));
  const lp = back(prog(t, 71.9, 72.15));
  const [sx, sy] = shk(t, 71.9, 8, 9);
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="#06090C"/>
  <ellipse cx="540" cy="760" rx="520" ry="560" fill="url(#kCold)" opacity="${f1(.6 * on)}"/>
  <g transform="translate(${f1(540 + sx)} ${f1(810 + sy)}) rotate(-4)">
    <rect x="-230" y="-430" width="460" height="860" rx="60" fill="#1A2126" ${OL(8)}/>
    <rect x="-200" y="-390" width="400" height="780" rx="30" fill="${on > .1 ? '#1F3A52' : '#0E1418'}"/>
    ${on > .1 ? TX('03:00', 0, -140, 150, '#FFFFFF') : ''}
  </g>
  <rect x="-20" y="1240" width="1120" height="200" fill="#3E2C21" stroke="#0B0F12" stroke-width="6"/>
  ${label('03:00', 540, 1220, 100, lp)}
  ${FG(1420)}`;
}
