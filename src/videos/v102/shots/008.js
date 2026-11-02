// L4b 16.8–18.0: close-up, du yawns (mouth open, eyes closed) and turns away from the pale window without looking at it — "Du bemerkst es nicht".
import { frame, cam, prog, eio, person } from './lib.js';
import { windowView } from './kit.js';
import { fadeWorld, bar } from './base.js';
export default function renderShot(t) {
  let s = windowView(t, { pale: .7, sun: .6, strong: true }) + fadeWorld(t);
  const y = Math.sin(Math.PI * prog(t, 16.85, 17.6));
  s += person('du', 470, 2150, 1.75, { t, seed: 1, look: [-14, 6], eyes: y > .3 ? 'closed' : 'half', brows: 'calm', mouth: y > .3 ? 'o' : 'small', headTilt: -6 * y, armL: y > .3 ? [-60, -640] : undefined, elbowL: [-230, -560] });
  s = cam(s, 540, 950, 1.0 + .06 * eio(prog(t, 16.8, 18.0)));
  s += bar(t);
  return frame(s);
}
