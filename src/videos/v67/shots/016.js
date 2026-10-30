// 36.54–40.12: CO2 molecules gather in the pits, bubbles form there ("Gasblasen bilden"), grow and detach upward
import { K, OL, f1, co2, prog, eio, eout, ein, lerp, hash } from './lib.js';
import { section, PITS, SY } from './micro.js';
const gasBubble = (x, y, r) => r < 1 ? '' : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#F6E7D2" fill-opacity=".92" ${OL(6)}/>
  <path d="M ${f1(x - r * .5)} ${f1(y - r * .2)} A ${f1(r * .55)} ${f1(r * .55)} 0 0 1 ${f1(x - r * .05)} ${f1(y - r * .6)}" fill="none" stroke="#FFFFFF" stroke-width="${f1(Math.max(3, r * .14))}" stroke-linecap="round"/>`;
export default function renderShot(t) {
  let mol = '', bub = '';
  PITS.forEach((x, k) => {
    for (let j = 0; j < 3; j++) {
      const sx = x + (hash(k * 5 + j) - .5) * 300, sy = 300 + hash(k * 3 + j * 7) * 500, u = eio(prog(t, 36.6 + j * .25 + k * .05, 37.4 + j * .25 + k * .05));
      if (u < 1) mol += co2(lerp(sx, x, u), lerp(sy, SY + 40, u), 16);
    }
    const g = eout(prog(t, 37.3 + k * .06, 38.7 + k * .06)), det = ein(prog(t, 39.4 + (k % 3) * .12, 40.12));
    const r = 14 + 46 * g;
    bub += gasBubble(x, SY + 70 - r - det * 640, r);
    if (det > .2) bub += gasBubble(x, SY + 60 - 16 * (det - .2), 18 * (det - .2) / .8);
  });
  return `${section(1)}${bub}${mol}`;
}
