import { K, OL, TX, KDEFS, FG, snow, tower, jonas, jHead, jReach, armTo, nbr, lantern, thermo, card, label, rings, breath, radiator, room, heater, grill, gasOven, campStove, coHaze, cross, plan, PLAN, door, germany, shk, blinkAt, talkAt, f1, cl, prog, eio, eout, back, lerp, ring, hash } from '../lib.js';
// pump close-up: current runs along the cable, impeller spins — then the bolt is crossed out on "Strom" and it stops
export default function renderShot(t) {
  const run = prog(t, 15.2, 15.6) * (1 - eout(prog(t, 16.2, 16.9)));
  const ang = 400 * (prog(t, 15.2, 16.2) * 1.0 + .5 * eout(prog(t, 16.2, 16.9))) * 1.6;
  const bolt = back(prog(t, 15.35, 15.6));
  const x = cross(860, 560, 70, prog(t, 16.2, 16.45));
  let blades = '';
  for (let i = 0; i < 6; i++) blades += `<path d="M 0 0 Q 40 -60 0 -120 Q -20 -60 0 0 Z" fill="#9AA3A8" ${OL(4)} transform="rotate(${f1(ang + i * 60)})"/>`;
  let spark = '';
  if (t > 15.2 && t < 16.2) for (let i = 0; i < 3; i++) { const q = ((t - 15.2) * 1.4 + i / 3) % 1; spark += `<circle cx="${f1(lerp(860, 600, q))}" cy="${f1(lerp(640, 900, q))}" r="14" fill="#FFF1CF"/>`; }
  return KDEFS + `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg2}"/>
  <rect x="0" y="0" width="1080" height="1920" fill="url(#kAmb)" opacity="${f1(.25 * run)}"/>
  <path d="M -20 940 H 260 M 820 940 H 1100" stroke="#8D9AA2" stroke-width="70"/>
  <rect x="200" y="760" width="140" height="360" rx="20" fill="#8D9AA2" ${OL(6)}/><rect x="740" y="760" width="140" height="360" rx="20" fill="#8D9AA2" ${OL(6)}/>
  <rect x="260" y="700" width="560" height="480" rx="60" fill="#C93B3B" ${OL(8)}/>
  <circle cx="460" cy="940" r="170" fill="#1A2024" ${OL(6)}/>
  <g transform="translate(460 940)">${blades}<circle cx="0" cy="0" r="30" fill="#5A6A74" ${OL(4)}/></g>
  <rect x="660" y="840" width="120" height="200" rx="14" fill="#E3E6E8" ${OL(5)}/>
  <path d="M 720 840 Q 720 640 860 640" fill="none" stroke="${K.ol}" stroke-width="26"/><path d="M 720 840 Q 720 640 860 640" fill="none" stroke="#2B2B2B" stroke-width="14"/>
  ${spark}
  <g transform="translate(860 560) scale(${f1(bolt)})"><circle cx="0" cy="0" r="110" fill="${K.amb}" ${OL(8)}/><path d="M 14 -70 L -40 10 L 0 10 L -16 70 L 44 -14 L 4 -14 Z" fill="${K.ol}"/></g>
  ${x}
  ${FG(1400)}`;
}
