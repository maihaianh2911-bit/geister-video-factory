// 36.54–40.12: CO2 molecules gather in the pits, bubbles form there ("Gasblasen bilden"), grow and detach upward
import { K, co2, bubble, prog, eio, eout, ein, lerp, hash } from './lib.js';
import { section, PITS, pitY } from './micro.js';
export default function renderShot(t) {
  const y0 = pitY(1);
  let mol = '', bub = '';
  PITS.forEach((x, k) => {
    for (let j = 0; j < 3; j++) {
      const sx = x + (hash(k * 5 + j) - .5) * 300, sy = 300 + hash(k * 3 + j * 7) * 500, u = eio(prog(t, 36.6 + j * .25 + k * .05, 37.4 + j * .25 + k * .05));
      if (u < 1) mol += co2(lerp(sx, x, u), lerp(sy, y0 - 30, u), 16);
    }
    const g = eout(prog(t, 37.3 + k * .06, 38.7 + k * .06));
    const det = ein(prog(t, 39.4 + (k % 3) * .12, 40.12));
    const r = 18 + 52 * g, by = y0 - r * .8 - det * 600;
    if (g > 0) bub += bubble(x, by, r, { fill: 'rgba(255,255,255,.35)', stroke: '#FFFFFF', w: 7 });
    if (det > .25) bub += bubble(x, y0 - 22, 18 * (det - .25), { fill: 'rgba(255,255,255,.35)', stroke: '#FFFFFF', w: 5 });
  });
  return `${section(1, '')}${bub}${mol}`;
}
