import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// heat gauge: one sitting person — the needle and the number climb to ≈ 100 W exactly on "hundert"
export default function renderShot(t) {
  const v = Math.round(100 * eout(prog(t, 40.6, 40.85)));
  const a = (-90 + 180 * v / 150) * Math.PI / 180;
  const lp = back(prog(t, 40.76, 41.0));
  const pulse = 1 + .03 * Math.sin(t * 6);
  let ticks = '';
  for (let i = 0; i <= 6; i++) { const b = (-90 + i * 30) * Math.PI / 180; ticks += `<line x1="${f1(540 + 330 * Math.sin(b))}" y1="${f1(860 - 330 * Math.cos(b))}" x2="${f1(540 + 290 * Math.sin(b))}" y2="${f1(860 - 290 * Math.cos(b))}" stroke="#E9ECEE" stroke-width="10"/>`; }
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  <ellipse cx="540" cy="760" rx="520" ry="420" fill="url(#kHeat)" opacity="${f1(.3 + .5 * v / 100)}"/>
  <path d="M 190 860 A 350 350 0 0 1 890 860" fill="none" stroke="${K.ol}" stroke-width="80"/>
  <path d="M 190 860 A 350 350 0 0 1 890 860" fill="none" stroke="#3C5A6B" stroke-width="56"/>
  <path d="M 190 860 A 350 350 0 0 1 ${f1(540 + 350 * Math.sin(a))} ${f1(860 - 350 * Math.cos(a))}" fill="none" stroke="#FF8A3D" stroke-width="56"/>
  ${ticks}
  <line x1="540" y1="860" x2="${f1(540 + 300 * Math.sin(a))}" y2="${f1(860 - 300 * Math.cos(a))}" stroke="${K.red}" stroke-width="16" stroke-linecap="round"/><circle cx="540" cy="860" r="34" fill="${K.ol}"/>
  <g transform="translate(540 300) scale(${f1(.8 * pulse)})">${jHead({ mouth: 'flat', blink: blinkAt(t) })}</g>
  ${lp > 0 ? label('≈ 100 W', 540, 1140, 130, lp, '#FFFFFF', K.ambD) : TX('≈ ' + v + ' W', 540, 1186, 130, '#FFFFFF')}
  ${FG(1420)}`;
}
