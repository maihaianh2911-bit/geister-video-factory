// 27.16–29.24: then the disc vanishes — wrapped in a cloth, it slides into darkness (verschwindet)
import { K, DEFS, BG, disc, grain, cam, prog, eout, eio, ein, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const p = ein(prog(t, 27.6, 28.6)), dark = eio(prog(t, 27.9, 28.9));
  return `${DEFS}${BG(K.brownD)}<rect x="-60" y="900" width="1200" height="1100" fill="${K.brown}"/>
    ${disc(lerp(540, 1300, p), 900, lerp(280, 220, p), { id: 'o', damage: true, rot: 40 * p })}
    <rect x="-60" y="-60" width="1200" height="2040" fill="#0E0B09" opacity="${f1(dark * .9)}"/>${grain(t)}`;
}
