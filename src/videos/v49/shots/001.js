import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// HOOK: lit Plattenbau blocks, headline on frame 0, the district goes dark on "weg"
export default function renderShot(t) {
  const push = 1.08 - .08 * eout(prog(t, 0, .35)) + .03 * prog(t, .35, 1.25);
  const [sx, sy] = shk(t, .58, 16, 7);
  const off = prog(t, .58, .98);
  const flash = t > .58 && t < .66 ? .35 : 0;
  const hp = t < .58 ? 1 : 1 + .08 * Math.exp(-(t - .58) * 8) * Math.sin((t - .58) * 40);
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
  <g transform="translate(${f1(540 + sx)} ${f1(1100 + sy)}) scale(${push.toFixed(3)}) translate(-540 -1100)">
    ${tower(-60, 1500, 420, 16, 6, { fh: 70, lit: 1, off, seed: 3 })}
    ${tower(380, 1500, 380, 18, 6, { fh: 66, lit: 1, off, seed: 7 })}
    ${tower(760, 1500, 420, 15, 6, { fh: 72, lit: 1, off, seed: 11 })}
    <rect x="-100" y="1500" width="1300" height="500" fill="#10171B"/>
    <rect x="-100" y="1490" width="1300" height="30" fill="${K.snow}" opacity=".8"/>
  </g>
  ${snow(t, 46, 2, 60, .9)}
  <rect x="0" y="0" width="1080" height="1920" fill="#fff" opacity="${flash}"/>
  <g transform="translate(540 330) scale(${hp.toFixed(3)})">
    <rect x="-470" y="-150" width="940" height="200" rx="26" fill="${K.ol}" opacity=".92"/>
    ${TX('STROM WEG', 0, 10, 150, '#FFFFFF', 'middle', 'letter-spacing="6"')}
    <rect x="-250" y="66" width="500" height="150" rx="22" fill="${K.red}" ${OL(6)}/>
    ${TX('−8 °C', 0, 182, 120, '#FFFFFF')}
  </g>
  ${FG(1380)}`;
}
