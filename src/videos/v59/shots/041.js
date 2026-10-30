// 67.0–68.8: the mother kneels and wraps the child in her arms, the father's hand on the child's shoulder — an adult right there.
import { K, DEFS, FG, prog, eio, back, person, bear, armTo } from './lib.js';
export default function renderShot(t) {
  const h = eio(prog(t, 67.05, 67.6));
  const fh = back(prog(t, 67.5, 67.8));
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#2A3A40"/><rect x="-60" y="1250" width="1200" height="800" fill="#1A2422"/>
    ${person('m', 380 + 60 * h, 900, 1.15, { noLegs: 1, aR: [40 + 30 * h, 90 + 40 * h], aL: [20, 40], brow: 'worry', mouth: 'flat', look: 10, tilt: 8 * h })}
    ${person('k', 660, 960, 1.1, { aL: [-20 * h, -60 * h], aR: [-10, -70], brow: 'worry', eyeS: 1.15, mouth: h > .6 ? 'flat' : 'o', look: -12, lean: -8 * h, front: bear(70, 140, .6, -10) })}
    <path d="M 120 1250 Q 400 1200 660 1260 L 660 1440 L 120 1440 Z" fill="${K.mPants}" stroke="#0B0F12" stroke-width="7"/>
    ${fh > 0 ? armTo(1160, 500, 1160 - 400 * fh, 1000, 110, K.vTop, -1) : ''}
    ${FG(1430)}`;
}
