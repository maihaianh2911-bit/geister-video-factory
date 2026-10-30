// 41.74–43.72: Tuffi falls from the carriage into the river; splash on "Fluss"
import { K, DEFS, bahnScene, tuffi, splash, grain, cam, f1, prog, eio, lerp, WY, shk } from './lib.js';
export default function renderShot(t) {
  const p = prog(t, 41.74, 43.02);
  const y = 672 + (WY + 40 - 672) * p * p;
  const fall = t < 43.02 ? tuffi(lerp(560, 600, p), y, lerp(.22, .27, p), { ear: 1, eye: 'wide', tr: .75, rot: lerp(18, 40, p), legs: [-18, -10, 22, 14], mouth: 1 })
    : tuffi(605, WY + 58, .27, { sit: .7, ear: .6, eye: 'wide', tr: .3 }) + `<rect x="480" y="${WY + 30}" width="250" height="60" fill="#7D8C80" opacity=".8"/>`;
  const [sx, sy] = shk(t, 43.02, 9, 6);
  const world = bahnScene(t, { carX: 540, car: { faces: true, open: 1, tilt: 3 * Math.sin(t * 5) }, over: fall + splash(600, WY + 30, prog(t, 43.02, 43.72), .6) });
  return `${DEFS}${cam(world, lerp(1.25, 1.0, eio(prog(t, 41.74, 42.6))), 540, 800, sx, sy)}${grain(t)}`;
}
