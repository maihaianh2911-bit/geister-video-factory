// 36.9–39.24: the mother kneels and holds the child close; the call bubble now shows a child on "Kind".
import { K, DEFS, FG, prog, back, eio, person, reach, bear, icon, cl } from './lib.js';
export default function renderShot(t) {
  const b = back(prog(t, 37.7, 37.95));
  const hug = eio(prog(t, 36.9, 37.4));
  const mx = 430, my = 980, ms = 1.15, kx = 700, ky = 1080, ks = 1.25;
  const aM = reach('m', mx, my, ms, 1, kx + 10, ky + 120);
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#202C33"/>
    <rect x="-60" y="1300" width="1200" height="700" fill="${K.floor}"/>
    <rect x="-60" y="-60" width="1200" height="2040" fill="#9DB8C8" opacity=".04"/>
    ${person('k', kx - 20 * hug, ky, ks, { aL: [40, 70], aR: [-10, -70], brow: 'worry', eyeS: 1.2, mouth: 'o', look: -10, lookY: 6, lean: -4 * hug, front: bear(70, 140, .6, -10) })}
    ${person('m', mx, my, ms, { noLegs: 1, aR: [aM[0] * hug + 10 * (1 - hug), aM[1] * hug + 10 * (1 - hug)], aL: [16, 30], brow: 'worry', eyeS: 1.15, mouth: 'worried', look: 12, lookY: 8, tilt: 8, lean: 6 * hug })}
    <path d="M 160 1320 Q 430 1280 700 1330 L 700 1460 L 160 1460 Z" fill="${K.mPants}" stroke="#0B0F12" stroke-width="7"/>
    ${b > 0 ? `<g transform="translate(560 380) scale(${b})">
      <path d="M -220 -170 H 220 Q 260 -170 260 -130 V 130 Q 260 170 220 170 H 100 L 60 240 L 40 170 H -220 Q -260 170 -260 130 V -130 Q -260 -170 -220 -170 Z" fill="${K.ol}" stroke="#FFFFFF" stroke-width="8"/>
      ${icon.child(0, 10, 3.0, K.kTop)}</g>` : ''}
    ${FG(1430)}`;
}
