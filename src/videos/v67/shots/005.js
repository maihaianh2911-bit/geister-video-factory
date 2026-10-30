// 7.42–9.98: close-up of the neck — a hand brings three mints over the opening and lets go on "hineinfallen"
import { K, bottle, mentos, stream, prog, eio, eout, ein, lerp, cl } from './lib.js';
import { bigArm } from './sets.js';
export const NB = { x: 540, y: 2210, s: 3.4 }; // rim at y ≈ 905
export function neckBottle(id, inner = '', level = 300) { return bottle(NB.x, NB.y, NB.s, { id, level, inner, lw: .6 }); }
export function neckBG() { return `<rect x="-60" y="-60" width="1200" height="2040" fill="#F4EFE6"/><rect x="-60" y="1260" width="1200" height="800" fill="#CFE3B4"/><path d="M -60 1260 H 1140" stroke="#1B1B1F" stroke-width="7"/>`; }
export default function renderShot(t) {
  const inn = eout(prog(t, 7.42, 8.15)), rel = 9.34;
  const px = lerp(980, 545, inn), py = lerp(380, 700, inn) + (t > rel ? -18 * eout(prog(t, rel, rel + .2)) : 0);
  let cand = '';
  for (let i = 0; i < 3; i++) {
    const dt = Math.max(0, t - rel - i * .07), y0 = py + 46 + i * 40;
    const y = y0 + .5 * 3200 * dt * dt;
    if (y < 1500) cand += mentos(px + (dt > 0 ? 0 : 0), y, 30, 0);
  }
  const fizz = stream(0, -40, 230, t, { n: 6, speed: 50, r: 2.4, spread: 40, seed: 5 });
  return `${neckBG()}${neckBottle('c5', fizz)}${cand}${bigArm(1180, lerp(140, 300, inn), px, py)}`;
}
