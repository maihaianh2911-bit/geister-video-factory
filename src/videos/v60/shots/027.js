// Full-frame: the RETTUNGSPUNKT sign in the torch light; a ring stamps on "Rettungspunkt".
import { K, DEFS60, sign, trunk, rings, FG, prog, back, lerp } from './lib.js';

export default function renderShot(t) {
  const flick = .9 + .1 * Math.sin(t * 23);
  const s = lerp(2.4, 2.2, back(prog(t, 40.6, 40.9)));
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0B0F12"/>
  ${trunk(540, 900, K.bark, K.barkHi, -20, 1940)}
  ${[200, 420, 650, 880].map((x, i) => `<path d="M ${x} ${i * 200} q 30 200 0 400 q -30 200 0 500" stroke="#2A2018" stroke-width="12" fill="none"/>`).join('')}
  <ellipse cx="540" cy="780" rx="620" ry="560" fill="url(#fAmb)" opacity="${.7 * flick}"/>
  ${sign(540, 780, s, { rot: -2 })}
  ${rings(t, 40.66, 540, 780, K.amb, 3, 420, 10)}
  ${FG(1440)}`;
}
