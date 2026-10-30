// 10.88–12.34: close on the head end — du jerks, the helpers' hands press down and hold; teeth gritted.
import { DEFS, cam, prog, eio } from './lib.js';
import { orScene } from './or.js';
export default function renderShot(t) {
  const j = t < 11.2 ? 0 : -26 * Math.sin(prog(t, 11.2, 11.9) * Math.PI) * (1 + .3 * Math.sin(t * 30));
  const sc = orScene(t, { inA: 1, inB: 1, gripA: 1, gripB: 1, jerk: j, lift: 6 - j * .3, face: { look: .3, lookY: -.6, brow: 1, eyes: t > 11.2 && t < 11.9 ? 'closed' : 'wide', mouth: 'grit' }, saw: 'hand', sawUp: .3 });
  return `${DEFS}${cam(sc, 1.7, 300, 960, 240, 0)}`;
}
