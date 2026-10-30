import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// exterior: dark slab blocks in Grünau, one window lit by Jonas' lantern; punch-in on "Stromausfalls"; TAG 2
export default function renderShot(t) {
  const punch = back(prog(t, 11.96, 12.2));
  const z = (1 + .05 * prog(t, 10.4, 11.96)) * (1 + .7 * punch);
  const fx = lerp(540, 610, punch), fy = lerp(960, 690, punch);
  const lp = back(prog(t, 11.16, 11.45));
  let torches = '';
  for (let i = 0; i < 4; i++) { const tx = 120 + i * 260 + 40 * Math.sin(t * 1.3 + i * 2), ty = 520 + i * 170 + 20 * Math.cos(t * 1.7 + i); torches += `<circle cx="${f1(tx)}" cy="${f1(ty)}" r="14" fill="#FFF1CF" opacity="${f1(.5 + .4 * Math.sin(t * 3 + i))}"/>`; }
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
  <g transform="translate(${f1(fx)} ${f1(fy)}) scale(${z.toFixed(3)}) translate(-540 -960)">
    ${tower(-40, 1480, 400, 17, 6, { fh: 70, seed: 3 })}
    ${tower(360, 1480, 400, 19, 6, { fh: 66, seed: 7, mark: [3, 12] })}
    ${tower(760, 1480, 400, 16, 6, { fh: 72, seed: 11 })}
    ${torches}
    <rect x="-100" y="1480" width="1300" height="500" fill="#10171B"/><rect x="-100" y="1470" width="1300" height="30" fill="${K.snow}" opacity=".8"/>
  </g>
  ${snow(t, 50, 5, 70, .9)}
  ${label('TAG 2', 230, 250, 90, lp)}
  ${FG(1400)}`;
}
