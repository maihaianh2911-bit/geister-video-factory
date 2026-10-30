import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// a camping stove lights up and is struck out; pull back: all three inside a flat outline under a red ban sign
export default function renderShot(t) {
  const c = back(prog(t, 57.45, 57.7));
  const zo = eio(prog(t, 58.3, 58.75));
  const s = lerp(1, .55, zo);
  const ban = back(prog(t, 58.48, 58.75));
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  <g transform="translate(540 900) scale(${f1(s)}) translate(-540 -900)">
    ${zo > 0 ? `<path d="M 40 1400 V 700 L 540 300 L 1040 700 V 1400 Z" fill="${K.wall}" ${OL(12)}/><rect x="40" y="1300" width="1000" height="100" fill="${K.floor}"/>` : ''}
    ${grill(220, 1300, .8 * zo, t, 1)}${gasOven(860, 1300, .75 * zo, t, 1)}
    ${campStove(540, 1250, 1.5 * c, t, 1)}
  </g>
  ${cross(540, 800, 160, prog(t, 57.75, 57.95) * (1 - zo))}
  ${ban > 0 ? `<g transform="translate(540 860) scale(${f1(ban)})"><circle r="420" fill="none" stroke="${K.ol}" stroke-width="80"/><circle r="420" fill="none" stroke="${K.red}" stroke-width="56"/><line x1="-297" y1="-297" x2="297" y2="297" stroke="${K.ol}" stroke-width="80"/><line x1="-297" y1="-297" x2="297" y2="297" stroke="${K.red}" stroke-width="56"/></g>` : ''}
  ${FG(1420)}`;
}
