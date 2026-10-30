import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// macro of a window-frame crack: warm particles race out through the narrow gap on "schnellsten"
export default function renderShot(t) {
  const sp = 1 + 2.2 * eio(prog(t, 34.3, 34.7));
  const z = 1 + .08 * prog(t, 33.96, 35.8);
  let p = '';
  for (let i = 0; i < 20; i++) {
    const q = ((t - 33.96) * .6 * sp + i / 20) % 1;
    const x = q < .5 ? lerp(980, 560, q * 2) : lerp(560, 80, (q - .5) * 2), y = q < .5 ? lerp(700 + (i % 5) * 110, 900, q * 2) : 900 + (i % 5 - 2) * 70 * (q - .5) * 2;
    p += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(16 - 8 * q)}" fill="${q < .5 ? K.amb : '#FF8A3D'}" opacity="${f1(.95 - .6 * q)}"/>`;
  }
  return KDEFS + `<g transform="translate(540 900) scale(${z.toFixed(3)}) translate(-540 -900)">
  <rect x="0" y="0" width="1080" height="1920" fill="#7A2A3A"/><rect x="0" y="0" width="540" height="1920" fill="#14223F"/>
  <rect x="480" y="0" width="60" height="880" fill="#E9ECEE" ${OL(6)}/><rect x="480" y="920" width="60" height="1000" fill="#E9ECEE" ${OL(6)}/>
  <rect x="540" y="0" width="70" height="1920" fill="#BFC7CC" ${OL(6)}/>
  <rect x="470" y="880" width="150" height="40" fill="#05080A"/>
  ${p}</g>
  ${FG(1420)}`;
}
