import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// big room vs small room with the same warmth: the big one cools to blue, the small one stays warm
export default function renderShot(t) {
  const c = eio(prog(t, 25.6, 27.3));
  const mix = (a, b, p) => '#' + [0, 2, 4].map(i => Math.round(lerp(parseInt(a.substr(i + 1, 2), 16), parseInt(b.substr(i + 1, 2), 16), p)).toString(16).padStart(2, '0')).join('');
  const bigCol = mix('#C9822A', '#3C5A6B', c), smallCol = mix('#C9822A', '#B57A30', c * .2);
  const sp = back(prog(t, 25.24, 25.5)), sp2 = back(prog(t, 25.34, 25.6));
  let dB = '', dS = '';
  for (let i = 0; i < 18; i++) {
    const r = .2 + .8 * c;
    const bx = 540 + 400 * r * (hash(i) - .5) * 2 + 10 * Math.sin(t * 2 + i), by = 540 + 190 * r * (hash(i + 7) - .5) * 2;
    dB += `<circle cx="${f1(bx)}" cy="${f1(by)}" r="13" fill="${K.amb}" opacity="${f1(.9 * (1 - .8 * c))}"/>`;
    const sx = 540 + 150 * (hash(i + 3) - .5) * 2 + 8 * Math.sin(t * 2.4 + i), sy = 1110 + 120 * (hash(i + 11) - .5) * 2;
    dS += `<circle cx="${f1(sx)}" cy="${f1(sy)}" r="13" fill="${K.amb}" opacity=".9"/>`;
  }
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  <g transform="translate(540 540) scale(${f1(sp)}) translate(-540 -540)"><rect x="100" y="300" width="880" height="480" rx="10" fill="${bigCol}" opacity=".55" ${OL(10)}/>${dB}${lantern(540, 700, .6, 1 - .5 * c)}</g>
  <g transform="translate(540 1110) scale(${f1(sp2)}) translate(-540 -1110)"><rect x="340" y="940" width="400" height="340" rx="10" fill="${smallCol}" opacity=".7" ${OL(10)}/>${dS}${lantern(540, 1240, .6, 1)}</g>
  ${FG(1420)}`;
}
