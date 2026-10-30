// 37.2–38.92: she pushes against the side wall — outside view, the wall panel bows out under her weight, the carriage sways
import { K, DEFS, bahnScene, tuffi, grain, cam, f1, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const push = eio(prog(t, 37.22, 38.7));
  const sway = 5 * push * Math.sin(t * 9);
  const inner = tuffi(lerp(-20, 30, push), 352, .66, { ear: 1, eye: 'wide', tr: .5, rot: -10 * push, legs: [-20, -10, 18, 10] });
  const world = bahnScene(t, { carX: 540, car: { faces: true, inner, id: 'w19', bulge: push, tilt: sway } });
  return `${DEFS}${cam(world, 2.1, 540, 590)}${grain(t)}`;
}
