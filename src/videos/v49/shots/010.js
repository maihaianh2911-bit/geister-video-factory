import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// Jonas on the sofa in the cold living room, arms wrapped around himself, shivering
export default function renderShot(t) {
  const jit = 3 * Math.sin(t * 47) + 2 * Math.sin(t * 31);
  const sink = eout(prog(t, 17.14, 17.6));
  const look = t > 17.8 ? lerp(0, 12, eout(prog(t, 17.8, 18.1))) : 0;
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg2}"/>
  <rect x="0" y="1200" width="1080" height="720" fill="${K.bg}"/>
  <polygon points="80,300 360,300 760,1500 120,1500" fill="${K.coldHi}" opacity=".07"/>
  <rect x="740" y="380" width="230" height="300" rx="10" fill="#18232A" ${OL(6)}/>
  <rect x="120" y="960" width="840" height="300" rx="50" fill="#4A5560" ${OL(6)}/>
  <rect x="100" y="880" width="120" height="420" rx="40" fill="#56626C" ${OL(6)}/><rect x="860" y="880" width="120" height="420" rx="40" fill="#56626C" ${OL(6)}/>
  ${jonas(540 + jit, 760 + 30 * sink, .95, { aL: [-30, -112], aR: [-26, -108], look, brow: 'worry', mouth: 'grim', cold: 1, blink: blinkAt(t, .4) })}
  <rect x="160" y="1180" width="760" height="140" rx="40" fill="#56626C" ${OL(6)}/>
  ${breath(t, 17.3, 560, 650, 1)}${breath(t, 18.2, 560, 650, -1)}
  ${FG(1400)}`;
}
