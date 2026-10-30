import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// airing: a hand tilts the window open, cold air rushes in, the clock hand sweeps one hour, window shuts
export default function renderShot(t) {
  const open = eout(prog(t, 51.2, 51.6)) * (1 - eio(prog(t, 52.9, 53.35)));
  const air = open;
  const hand = prog(t, 51.5, 53.2) * 360;
  let a = '';
  for (let i = 0; i < 10; i++) { const q = ((t * 1.5 + i / 10) % 1); a += `<path d="M ${f1(300 + 40 * Math.sin(i))} ${f1(lerp(500, 1300, q))} q 60 20 120 0" stroke="${K.ice}" stroke-width="9" fill="none" stroke-linecap="round" opacity="${f1(air * .8 * Math.sin(q * Math.PI))}"/>`; }
  const hx = 520 + 220 * (1 - open) * 0 + 60 * open, hy = 900;
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.wall}"/>
  <rect x="120" y="300" width="560" height="900" rx="8" fill="#0D1519" ${OL(8)}/>
  <rect x="140" y="320" width="520" height="860" fill="url(#kSky)"/>
  ${snow(t, 14, 6, 40, .8)}
  <g transform="translate(140 320) skewY(${f1(-14 * open)}) scale(${f1(1 - .25 * open)} 1)"><rect x="0" y="0" width="520" height="860" fill="#9DB8C8" opacity=".14" ${OL(10)}/><rect x="440" y="560" width="30" height="110" rx="12" fill="#E9ECEE" ${OL(4)}/></g>
  ${a}
  <g transform="translate(860 420)"><circle cx="0" cy="0" r="130" fill="#E9ECEE" ${OL(8)}/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<line x1="${f1(100 * Math.sin(i * Math.PI / 6))}" y1="${f1(-100 * Math.cos(i * Math.PI / 6))}" x2="${f1(116 * Math.sin(i * Math.PI / 6))}" y2="${f1(-116 * Math.cos(i * Math.PI / 6))}" stroke="${K.ol}" stroke-width="6"/>`).join('')}
    <line x1="0" y1="0" x2="${f1(96 * Math.sin(hand * Math.PI / 180))}" y2="${f1(-96 * Math.cos(hand * Math.PI / 180))}" stroke="${K.red}" stroke-width="10" stroke-linecap="round"/><line x1="0" y1="0" x2="${f1(60 * Math.sin((300 + hand / 12) * Math.PI / 180))}" y2="${f1(-60 * Math.cos((300 + hand / 12) * Math.PI / 180))}" stroke="${K.ol}" stroke-width="14" stroke-linecap="round"/><circle r="12" fill="${K.ol}"/></g>
  ${armTo(1100, 1500, lerp(590, 520, open), lerp(940, 930, open), 80, 1)}
  ${FG(1420)}`;
}
