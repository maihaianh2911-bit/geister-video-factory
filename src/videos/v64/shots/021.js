// 40.3–41.74: the side wall gives way on "nach" — the panel swings out and Tuffi's front leans out of the opening
import { K, DEFS, bahnScene, tuffi, grain, cam, f1, prog, eout, eio, lerp, shk } from './lib.js';
export default function renderShot(t) {
  const op = eout(prog(t, 41.0, 41.35));
  const inner = tuffi(30, 352, .66, { ear: 1, eye: 'wide', tr: .5, rot: -10, legs: [-20, -10, 18, 10] });
  const lean = eio(prog(t, 41.1, 41.74));
  const out = t > 41.0 ? tuffi(lerp(530, 560, lean), lerp(660, 672, lean), lerp(.2, .22, lean), { ear: 1, eye: 'wide', tr: .7, rot: lerp(0, 18, lean), legs: [-20, -10, 25, 10] }) : '';
  const [sx, sy] = shk(t, 41.06, 7, 6);
  const world = bahnScene(t, { carX: 540, car: t < 41.0 ? { faces: true, inner, id: 'w21', bulge: 1, broken: 1, tilt: 2 * Math.sin(t * 9) } : { faces: true, open: op, tilt: 4 * Math.exp(-(t - 41) * 2) * Math.sin(t * 9) }, over: out });
  return `${DEFS}${cam(world, 1.7, 540, 640, sx, sy)}${grain(t)}`;
}
