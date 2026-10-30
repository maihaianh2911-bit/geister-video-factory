// 31.66–34.2: the carriage pulls away; the camera drops to show how high it hangs over the Wupper
import { K, DEFS, bahnScene, tuffi, grain, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const go = prog(t, 32.2, 34.2), carX = 380 + 300 * go * go;
  const sway = 3 * Math.sin(prog(t, 32.2, 34.2) * 6);
  const inner = tuffi(-40, 352, .62, { ear: .3, tr: .2 });
  const world = bahnScene(t, { carX, car: { faces: true, inner, id: 'w16', tilt: -sway * .5 } });
  const tilt = eio(prog(t, 32.8, 33.8));
  return `${DEFS}${cam(world, lerp(1.9, 1.0, tilt), lerp(carX, 540, tilt), lerp(560, 640, tilt))}${grain(t)}`;
}
