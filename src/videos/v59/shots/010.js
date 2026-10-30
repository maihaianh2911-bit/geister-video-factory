// 14.2–16.3: closer: the frightened mother holds the child's hand; on "Hand" she squeezes and pulls the child to her side.
import { K, DEFS, FG, prog, back, eio, person, reach, bear, cl } from './lib.js';
export default function renderShot(t) {
  const led = Math.sin(t * 26) > -.2 ? 1 : 0;
  const pull = eio(prog(t, 15.1, 15.6));
  const sq = back(prog(t, 15.2, 15.45));
  const z = 1 + .05 * eio(prog(t, 14.2, 16.3));
  const mx = 360, my = 640, ms = 1.35;
  const kx = 800 - 90 * pull, ky = 960, ks = 1.45;
  const hx = (mx + kx) / 2 + 40, hy = 1170 - 10 * pull;
  const aM = reach('m', mx, my, ms, 1, hx, hy);
  const aK = reach('k', kx, ky, ks, -1, hx + 10, hy + 6);
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#202C33"/>
    <rect x="-60" y="-60" width="1200" height="1000" fill="#26343B"/>
    <rect x="-60" y="-60" width="1200" height="2040" fill="${K.red}" opacity="${.1 * led}"/>
    <g transform="translate(540 900) scale(${z}) translate(-540 -900)">
    ${person('m', mx, my, ms, { aR: aM, aL: [16, 30], brow: 'worry', eyeS: 1.25, mouth: 'worried', look: 12, lookY: 10, tilt: 6 })}
    ${person('k', kx, ky, ks, { aL: aK, aR: [-10, -70], brow: 'worry', eyeS: 1.25, mouth: 'o', look: -14, lookY: -12, lean: -6 * pull, front: bear(70, 140, .6, -10) })}
    <circle cx="${hx}" cy="${hy}" r="${44 + 6 * cl(sq)}" fill="${K.skin2}" stroke="#0B0F12" stroke-width="6"/>
    <path d="M ${hx - 30} ${hy + 10} Q ${hx} ${hy + 34} ${hx + 32} ${hy + 8}" stroke="${K.skin2Sh}" stroke-width="8" fill="none" stroke-linecap="round"/>
    </g>${FG(1430)}`;
}
