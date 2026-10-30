// 70.66–73.12: the same candies — an identical blue roll stands in front of each bottle (=); the difference is only the gas left in the cola
import { K, TX, roll, prog, eout, back, lerp } from './lib.js';
import { pair, L2, R2, TY2 } from './027.js';
export default function renderShot(t) {
  const hF = lerp(760, 600, prog(t, 70.66, 73.12)), hA = lerp(170, 110, prog(t, 70.66, 73.12));
  const a = back(prog(t, 70.95, 71.35)), b = back(prog(t, 71.05, 71.45)), e = eout(prog(t, 71.4, 71.7));
  const rolls = `${a > 0 ? `<g transform="translate(${L2} ${TY2 - 22}) scale(${a.toFixed(3)})">${roll(0, 0, 1.7, 0)}</g>` : ''}${b > 0 ? `<g transform="translate(${R2} ${TY2 - 22}) scale(${b.toFixed(3)})">${roll(0, 0, 1.7, 0)}</g>` : ''}
    <g opacity="${e.toFixed(3)}">${TX('=', 540, TY2 - 40, 220, K.ink, 'middle', `stroke="${K.bg}" stroke-width="12" paint-order="stroke"`)}</g>`;
  return pair(t, hF, hA, { extra: rolls });
}
