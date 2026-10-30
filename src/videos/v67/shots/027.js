// 67.9–70.66: both bottles get the same mints at once — FRISCH throws a tall fountain, ABGESTANDEN only a weak one ("schwächer")
import { K, TX, bottle, mentos, fountain, puddle, prog, eout, ein, lerp } from './lib.js';
import { yard, table } from './lib.js';
export const L2 = 310, R2 = 770, TY2 = 1200, S2 = .7;
export function pair(t, hF, hA, o = {}) {
  const top = TY2 - 384 * S2;
  return `${yard({ cloud: false, sunX: 960, sunY: 250 })}${table(80, 1000, TY2, 340)}
  ${bottle(L2, TY2, S2, { id: 'pf', level: lerp(300, 200, cl01(hF / 700)) })}${bottle(R2, TY2, S2, { id: 'pa', level: lerp(290, 262, cl01(hA / 200)) })}
  ${fountain(L2, top, hF, 1, t, { w0: 24, w1: 64, drops: hF > 300 ? 12 : 0 })}${fountain(R2, top, hA, 1, t, { w0: 22, w1: 34, drops: 0 })}
  ${puddle(L2, TY2 + 2, 120, cl01(hF / 300))}${o.extra || ''}
  ${TX('FRISCH', L2, 1330, 80, K.teal, 'middle', `stroke="${K.bg}" stroke-width="14" paint-order="stroke"`)}${TX('ABGESTANDEN', R2, 1330, 64, K.grey, 'middle', `stroke="${K.bg}" stroke-width="14" paint-order="stroke"`)}`;
}
function cl01(x) { return Math.max(0, Math.min(1, x)); }
export default function renderShot(t) {
  const top = TY2 - 384 * S2, d = Math.max(0, t - 68.0);
  let drop = '';
  for (const x of [L2, R2]) for (let i = 0; i < 3; i++) { const y = top - 150 + i * 32 + .5 * 3000 * Math.max(0, d - i * .06) ** 2; if (y < top + 10) drop += mentos(x, y, 16, 0, { lw: 4 }); }
  const hF = eout(prog(t, 68.35, 69.2)) * 760, hA = eout(prog(t, 68.35, 69.0)) * 170;
  return pair(t, hF, hA, { extra: drop });
}
