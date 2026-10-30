// 45.5–47.68: on the table the towel is folded open, revealing the green disc
import { K, DEFS, BG, disc, grain, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const o = eio(prog(t, 45.7, 46.8));
  const flap = (sx, rot) => `<g transform="translate(540 960) rotate(${rot})"><path d="M 0 0 L ${f1(sx * lerp(60, 420, o))} -260 L ${f1(sx * lerp(60, 420, o))} 260 Z" fill="${K.towel}" stroke="${K.ink}" stroke-width="6"/></g>`;
  return `${DEFS}${BG(K.brownD)}${cam(`<rect x="-60" y="500" width="1200" height="1100" fill="${K.brown}"/><rect x="60" y="640" width="960" height="640" fill="${K.towel}" stroke="${K.ink}" stroke-width="6"/>`
    + disc(540, 960, 280, { id: 'y', damage: true }) + `<rect x="60" y="640" width="${f1(lerp(480, 0, o))}" height="640" fill="${K.towel}" stroke="${K.ink}" stroke-width="6"/><rect x="${f1(lerp(540, 1020, o))}" y="640" width="${f1(lerp(480, 0, o))}" height="640" fill="${K.towel}" stroke="${K.ink}" stroke-width="6"/>`, lerp(1.05, 1.15, eio(prog(t, 45.5, 47.68))), 540, 960)}${grain(t)}`;
}
