// 63.24–65.84: time passes — the sun crosses the sky and a clock races; gas slowly leaves the open bottle; card ABGESTANDEN
import { K, OL, f1, stream, card, co2, prog, eio, eout, lerp, cl } from './lib.js';
import { wide, FY } from './sets.js';
export default function renderShot(t) {
  const u = eio(prog(t, 63.3, 64.9));
  const sx = lerp(900, 150, u), sy = 330 - Math.sin(u * Math.PI) * 120;
  const ang = u * 360 * 6;
  const clock = `<g transform="translate(180 360)"><circle r="110" fill="${K.white}" ${OL(9)}/>${[0, 1, 2, 3].map(i => `<path d="M 0 ${-92} V -76" ${OL(7)} transform="rotate(${i * 90})"/>`).join('')}
    <path d="M 0 0 V -78" ${OL(9)} transform="rotate(${f1(ang)})"/><path d="M 0 0 V -50" ${OL(12)} transform="rotate(${f1(ang / 12)})"/><circle r="10" fill="${K.ink}"/></g>`;
  let gas = '';
  for (let i = 0; i < 6; i++) { const ph = ((t - 63.3) * .5 + i / 6) % 1; gas += co2(700 + Math.sin(ph * 8 + i) * 18, 880 - ph * 420, 14, cl(1 - ph) * cl((t - 63.3) * 3)); }
  const lev = lerp(300, 292, u);
  return wide({ bottles: [{ x: 700, level: lev, inner: stream(0, -30, lev - 30, t, { n: 4, speed: 40, r: 2, spread: 40, seed: 21 }) }], sunX: sx, sunY: sy, cloud: false,
    extra: clock + gas + card(375, 600, 'ABGESTANDEN', 66, prog(t, 63.9, 64.2), { col: K.grey }) });
}
