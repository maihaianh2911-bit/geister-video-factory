// 12.24–14.2: over the father's shoulder: behind him the frightened wife holds the small child by the hand.
import { K, DEFS, FG, prog, back, eio, person, reach, bear, head } from './lib.js';
import { corridor } from './sets.js';
export default function renderShot(t) {
  const led = Math.sin(t * 26) > -.2 ? 1 : 0;
  const turn = eio(prog(t, 12.24, 12.6));
  const fear = back(prog(t, 13.6, 13.9));
  const mx = 640, my = 760, ms = .9, kx = 840, ky = 1010, ks = .92;
  const aM = reach('m', mx, my, ms, 1, kx - 70, ky + 40);
  const aK = reach('k', kx, ky, ks, -1, kx - 70, ky + 40);
  return `${DEFS}<g transform="translate(1080 0) scale(-1 1)">${corridor(t, { flash: led })}</g>
    <rect x="-60" y="-60" width="1200" height="2040" fill="#0B0F12" opacity=".25"/>
    ${person('m', mx, my - 10 * fear, ms, { aR: aM, aL: [-30 * fear + 20, 120 * fear + 20], brow: 'worry', eyeS: 1.1 + .25 * fear, mouth: fear > .3 ? 'o' : 'worried', look: -10, lookY: 4 })}
    ${person('k', kx, ky, ks, { aL: aK, aR: [-10, -70], brow: 'worry', eyeS: 1.2, mouth: 'o', look: -12, lookY: -8, front: bear(70, 140, .55, -10) })}
    <path d="M -60 1980 L -60 1320 Q 120 1180 330 1210 Q 470 1240 520 1980 Z" fill="${K.vTop}" stroke="#0B0F12" stroke-width="8"/>
    ${head('v', 230, 1050, 1.7, { back: 1, tilt: -8 + 10 * turn })}
    ${FG(1440)}`;
}
