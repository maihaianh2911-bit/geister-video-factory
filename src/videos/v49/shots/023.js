import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// Jonas sits down on a stool; a warm glow of body heat grows around him and rises
export default function renderShot(t) {
  const sit = eio(prog(t, 39.3, 39.85));
  const aura = eout(prog(t, 39.9, 40.5));
  let w = '';
  for (let i = 0; i < 5; i++) { const q = ((t - 39.9) * .8 + i / 5) % 1; if (t > 39.9) w += `<path d="M ${380 + i * 80} ${f1(700 - 400 * q)} q 18 -30 0 -60 q -18 -30 0 -60" stroke="#FF8A3D" stroke-width="10" fill="none" stroke-linecap="round" opacity="${f1(aura * .8 * Math.sin(q * Math.PI))}"/>`; }
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  <rect x="0" y="1260" width="1080" height="660" fill="${K.floor}"/>
  <ellipse cx="540" cy="900" rx="${f1(200 + 320 * aura)}" ry="${f1(260 + 400 * aura)}" fill="url(#kHeat)" opacity="${f1(.9 * aura)}"/>
  <rect x="400" y="1170" width="280" height="40" rx="14" fill="${K.woodHi}" ${OL(6)}/><path d="M 430 1210 L 410 1330 M 650 1210 L 670 1330" stroke="${K.ol}" stroke-width="20" stroke-linecap="round"/>
  ${jonas(540, lerp(560, 720, sit), .85, { aL: [6, -40], aR: [6, -40], brow: 'calm', mouth: 'flat', look: 0, blink: blinkAt(t) })}
  ${w}
  ${FG(1420)}`;
}
