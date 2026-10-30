// 25.052–28.337: from above, the crowd gets denser and denser ("zunehmend dichten Menge"): the spacing between heads shrinks until shoulders touch
import { K, DEFS, BG, headTop, grain, f1, prog, eio, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const d = eio(prog(t, 25.2, 28.2));
  const sp = lerp(150, 84, d);
  let h = '';
  for (let r = -8; r <= 8; r++) for (let c = -7; c <= 7; c++) {
    const x = 540 + c * sp + (r % 2 ? sp / 2 : 0) + 10 * (hash(r * 17 + c) - .5), y = 860 + r * sp * .9 + 10 * hash(r * 7 + c);
    if (x < -60 || x > 1140 || y < -60 || y > 1500) continue;
    h += headTop(x, y, .85, { col: [K.c1, K.c2, K.c3, K.c4, K.c5][Math.floor(hash(r * 3 + c * 5 + 40) * 5)], hair: hash(r + c * 13) > .5 ? K.brownD : K.ink, rot: 20 * (hash(r * c + 3) - .5) });
  }
  return `${DEFS}${BG(K.concrete)}${grain(7)}${h}`;
}
