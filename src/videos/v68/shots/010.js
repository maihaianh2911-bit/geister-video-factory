// 21.6–25.0: the reaction gives off CO2 — molecules gather into a bubble on the shell that grows and rises ("Bläschen")
import { K, OL, f1, card, co2, prog, eio, eout, ein, lerp, hash } from './lib.js';
import { shell, acid, SY } from './micro.js';
export default function renderShot(t) {
  let m = '';
  const bx = [200, 540, 880];
  bx.forEach((x, k) => {
    for (let j = 0; j < 4; j++) { const sx = x + (hash(k * 4 + j) - .5) * 220, u = eio(prog(t, 21.9 + j * .15, 22.9 + j * .15)); if (u < 1) m += co2(lerp(sx, x, u), lerp(SY - 6, SY - 70, u), 15, prog(t, 21.6, 21.9)); }
    const g = eout(prog(t, 22.7 + k * .1, 23.8)), up = ein(prog(t, 24.0 + k * .15, 25.0)), r = 20 + 55 * g;
    if (g > 0) m += `<circle cx="${x}" cy="${f1(SY - r - 4 - up * 700)}" r="${f1(r)}" fill="#FFFFFF" fill-opacity=".6" ${OL(6)}/><path d="M ${f1(x - r * .5)} ${f1(SY - r * 1.2 - up * 700)} a ${f1(r * .5)} ${f1(r * .5)} 0 0 1 ${f1(r * .4)} ${f1(-r * .35)}" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>`;
  });
  return `${shell(.92, { eat: 1.3 })}${m}${card(540, 330, 'CO₂', 100, prog(t, 22.3, 22.6), { col: K.red })}`;
}
