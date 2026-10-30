// 2.44–4.06: pull back — the whole Wuppertal Schwebebahn over the river while Tuffi keeps falling
import { K, DEFS, bahnScene, tag, grain, cam, prog, eio, lerp } from './lib.js';
import { fallingTuffi } from './fall.js';
export default function renderShot(t) {
  const world = bahnScene(t, { carX: 540, car: { faces: true, open: 1, tilt: 2 * Math.sin(t * 2.2) }, over: fallingTuffi(t) });
  return `${DEFS}${cam(world, lerp(1.95, 1.0, eio(prog(t, 2.44, 3.7))), 540, 640)}${tag('WUPPERTALER SCHWEBEBAHN', prog(t, 2.5, 2.8), 150)}${grain(t)}`;
}
