// 17.5–21.6: cutaway of the shell — acid particles from the vinegar ("Säure") drift down and attack the chalk blocks ("Kalk")
import { K, card, prog, eio, ein, lerp, hash } from './lib.js';
import { shell, acid, SY } from './micro.js';
export default function renderShot(t) {
  let a = '';
  for (let i = 0; i < 16; i++) {
    const x = 60 + (i % 8) * 130 + hash(i) * 40, y0 = 200 + hash(i * 3.3) * 500, u = eio(prog(t, 18.3 + (i % 5) * .15, 19.4 + (i % 5) * .15));
    a += acid(x, lerp(y0, SY - 18, u), prog(t, 18.0 + i * .02, 18.4 + i * .02));
  }
  const eat = 1.2 * eio(prog(t, 19.3, 21.5));
  return `${shell(1, { eat })}${a}${card(540, 330, 'KALK', 96, prog(t, 19.9, 20.2), { col: K.ink })}`;
}
