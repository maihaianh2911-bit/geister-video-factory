import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// building cut-away: hot water flows from the basement pump up to the radiators, stops on "ausfällt"
export default function renderShot(t) {
  const flow = 1 - eio(prog(t, 14.04, 14.5));
  const hl = back(prog(t, 14.62, 14.95));
  const pipe = 'M 300 1260 V 300 H 780 V 1260';
  let dots = '';
  const seg = [[300, 1260, 300, 300], [300, 300, 780, 300], [780, 300, 780, 1260]], L = [960, 480, 960], T = 2400;
  if (flow > .02) for (let i = 0; i < 26; i++) {
    let d = ((i / 26 + (t - 13.22) * .3) % 1) * T, k = 0; while (k < 2 && d > L[k]) { d -= L[k]; k++; }
    const [x0, y0, x1, y1] = seg[k], q = Math.min(1, d / L[k]);
    dots += `<circle cx="${f1(lerp(x0, x1, q))}" cy="${f1(lerp(y0, y1, q))}" r="15" fill="${k < 1 ? '#FF8A3D' : k < 2 ? '#FFB547' : '#5EA8D6'}" opacity="${f1(flow)}"/>`;
  }
  let floors = '';
  for (let f = 0; f < 4; f++) { const y = 420 + f * 220; floors += `<line x1="120" y1="${y + 150}" x2="960" y2="${y + 150}" stroke="${K.concSh}" stroke-width="10"/>${radiator(540, y + 90, .42, flow * .8, (1 - flow) * .8)}<path d="M 300 ${y + 90} H 448 M 632 ${y + 90} H 780" stroke="#8D9AA2" stroke-width="12"/>`; }
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
  <rect x="120" y="260" width="840" height="1100" fill="${K.conc}" ${OL(8)}/>
  <rect x="120" y="1220" width="840" height="140" fill="#18232A" ${OL(6)}/>
  ${floors}
  <path d="${pipe}" fill="none" stroke="#8D9AA2" stroke-width="22"/>
  ${dots}
  <g transform="translate(540 1290) scale(${f1(1 + .25 * hl)})"><rect x="-110" y="-50" width="220" height="100" rx="20" fill="#C93B3B" ${OL(6)}/><circle cx="-40" cy="0" r="30" fill="#2B2B2B" ${OL(4)}/><rect x="20" y="-26" width="60" height="52" rx="8" fill="#E3E6E8" ${OL(4)}/></g>
  <path d="M 300 1290 H 430 M 650 1290 H 780" stroke="#8D9AA2" stroke-width="22"/>
  ${hl > 0 ? rings(t, 14.62, 540, 1290, K.amb, 2, 200) : ''}
  ${FG(1420)}`;
}
