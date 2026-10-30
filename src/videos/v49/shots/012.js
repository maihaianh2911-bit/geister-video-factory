import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// REGEL 1 card slams onto the screen (impact shake), light rays behind
export default function renderShot(t) {
  const t0 = 20.24, p = back(prog(t, t0, t0 + .28)), [sx, sy] = shk(t, t0 + .2, 14, 8);
  const col = false ? K.red : K.amb, rot = (t - t0) * 12;
  let rays = '';
  for (let i = 0; i < 12; i++) rays += `<path d="M 0 0 L ${f1(1400 * Math.cos((i * 30 + rot) * Math.PI / 180 - .1))} ${f1(1400 * Math.sin((i * 30 + rot) * Math.PI / 180 - .1))} L ${f1(1400 * Math.cos((i * 30 + rot) * Math.PI / 180 + .1))} ${f1(1400 * Math.sin((i * 30 + rot) * Math.PI / 180 + .1))} Z" fill="${col}" opacity=".07"/>`;
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  <g transform="translate(540 820)">${rays}</g>
  <ellipse cx="540" cy="820" rx="560" ry="460" fill="url(#${false ? 'kRed' : 'kAmb'})" opacity=".55"/>
  <g transform="translate(${f1(sx)} ${f1(sy)})">${card(1, 540, 820, 1.35 * (1 + .04 * Math.sin((t - t0) * 3)), p, false)}</g>
  ${FG(1400)}`;
}
