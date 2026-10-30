// 68.74–72.3: twenty-one magnolias ("einundzwanzig Magnolien") — on the forecourt the trees bloom one after another while a small counter reaches 21
import { K, DEFS, BG, magnolia, grain, TX, f1, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  let trees = '', n = 0;
  for (let i = 0; i < 21; i++) { const r = Math.floor(i / 7), c = i % 7; const s0 = 68.9 + i * .07; const b = eio(prog(t, s0, s0 + .5)); if (t > s0) n = i + 1;
    trees += magnolia(110 + c * 143 + (r % 2) * 50, 820 + r * 230, .75 + r * .12, b, i); }
  return `${DEFS}${BG('url(#lSky)')}${grain(16)}<rect x="-60" y="700" width="1200" height="900" fill="${K.paperD}"/>${trees}${TX(String(n), 540, 420, 160, K.ink)}${TX('MAGNOLIEN', 540, 510, 50, K.inkL)}`;
}
