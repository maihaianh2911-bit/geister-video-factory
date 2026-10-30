// 1.6–4.42: dug up by looters — two hands work the shovel, each stroke throws soil off the disc until it lies bare (Raubgräbern … ausgegraben)
import { K, DEFS, disc, grain, cam, shk, prog, eout, eio, lerp, f1 } from './lib.js';
import { soilBg } from './soil.js';
import { shovel } from './hands.js';
export default function renderShot(t) {
  const dirt = 1 - eio(prog(t, 1.8, 3.22));
  // three strokes: push in (blade lowers onto soil), lever out (blade lifts and throws to the right)
  const ph = cl01((t - 1.7) / .55), k = Math.floor(ph), f = ph - k, on = t < 3.35;
  const push = on ? (f < .55 ? eio(f / .55) : 1 - eio((f - .55) / .45)) : 0;
  const bx = lerp(700, 560, push) + (on ? 0 : 40), by = lerp(1150, 1190, push) - (on ? 0 : 60);
  const d = lerp(-55, -42, push);
  const [sx, sy] = shk(t, 3.22, 5, 8);
  const throwP = on && f >= .55 ? (f - .55) / .45 : -1;
  const clumps = throwP >= 0 ? [0, 1, 2].map(i => `<circle cx="${f1(bx + 80 + 260 * throwP + i * 30)}" cy="${f1(by - 60 - 200 * Math.sin(throwP * Math.PI) + i * 20)}" r="${16 + i * 4}" fill="${K.soil}" stroke="#2A1F16" stroke-width="4"/>`).join('') : '';
  return `${DEFS}<g transform="translate(${f1(sx)} ${f1(sy)})">${cam(soilBg(1) + disc(500, 1000, 300, { id: 'b', dirt, damage: true, glow: .4 * prog(t, 3.2, 3.6) }) + clumps + shovel(bx, by, d, { L: 820 }), lerp(1.05, 1, eout(prog(t, 1.6, 4.4))), 540, 950)}</g>${grain(t)}`;
}
function cl01(x) { return Math.max(0, Math.min(2.999, x)); }
