import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// heat view of the wall: warm air streams out through the window glass on "Fenster"
export default function renderShot(t) {
  const s = prog(t, 32.4, 32.8);
  let a = '';
  for (let i = 0; i < 14; i++) { const q = ((t - 32.34) * 1.2 + i / 14) % 1; const y = 520 + (i % 7) * 70; a += `<path d="M ${f1(lerp(860, 120, q))} ${y} l 40 -18 v 36 z" fill="${K.amb}" opacity="${f1(s * Math.sin(q * Math.PI))}"/><line x1="${f1(lerp(860, 120, q) + 30)}" y1="${y}" x2="${f1(lerp(860, 120, q) + 140)}" y2="${y}" stroke="${K.amb}" stroke-width="10" opacity="${f1(.6 * s * Math.sin(q * Math.PI))}"/>`; }
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="#2A1C3A"/>
  <rect x="300" y="0" width="780" height="1920" fill="#7A2A3A"/>
  <ellipse cx="760" cy="800" rx="520" ry="700" fill="url(#kHeat)" opacity=".8"/>
  <rect x="240" y="380" width="140" height="760" fill="#3C5A9B" ${OL(8)}/>
  <rect x="240" y="380" width="140" height="760" fill="${K.amb}" opacity="${f1(.35 * s + .1 * Math.sin(t * 8))}"/>
  <rect x="0" y="0" width="240" height="1920" fill="#14223F"/>
  ${a}
  ${FG(1420)}`;
}
