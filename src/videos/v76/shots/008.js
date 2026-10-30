// 12.34–14.10: a dashed position frame around du's body; red "struggle" arrows push out and stop at its edge.
import { K, DEFS, cam, prog, eio, eout, f1, lerp } from './lib.js';
import { orScene } from './or.js';
export default function renderShot(t) {
  const fr = eout(prog(t, 12.34, 12.7));
  const arrow = (x, y, dir, t0) => { const p = prog(t, t0, t0 + .5), bounce = p < .6 ? eout(p / .6) : 1 - .35 * eio((p - .6) / .4); const L = 90 * bounce; if (p <= 0) return '';
    return `<path d="M ${x} ${y} V ${f1(y + dir * L)}" stroke="${K.red}" stroke-width="14" stroke-linecap="round"/><path d="M ${x - 22} ${f1(y + dir * L - dir * 18)} L ${x} ${f1(y + dir * L + dir * 6)} L ${x + 22} ${f1(y + dir * L - dir * 18)}" fill="none" stroke="${K.red}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const frame = fr > 0 ? `<rect x="150" y="${f1(lerp(940, 900, fr))}" width="800" height="${f1(lerp(120, 200, fr))}" rx="30" fill="none" stroke="${K.cyan}" stroke-width="9" stroke-dasharray="30 18" opacity="${f1(fr)}"/>` : '';
  const sc = orScene(t, { inA: 1, inB: 1, gripA: 1, gripB: 1, jerk: -6 * Math.sin(prog(t, 12.9, 13.6) * Math.PI), lift: 6, face: { look: .3, lookY: -.6, brow: .8, eyes: 'wide', mouth: 'grit' }, saw: 'hand', sawUp: .3,
    over: `${frame}${arrow(420, 960, -1, 12.85)}${arrow(700, 980, -1, 13.05)}` });
  return `${DEFS}${cam(sc, 1.25, 540, 1000)}`;
}
