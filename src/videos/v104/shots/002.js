// L1a 3.84–6.08: medium shot, du stands in grass up to his chest at the meadow's edge, hand shading his eyes, looking left then right:
// there is no path to see ("kaum finden", 5.04).
import { K, frame, cam, prog, eio } from './lib.js';
import { field } from './common.js';
export default function renderShot(t) {
  const lk = t < 4.9 ? [-14, -4] : [14, -4];
  const s = field(t, 520, 1760, 1.02, { mood: 'dawn', p: 0, tall: 1.75, tallBack: 1.2, du: { look: lk, brows: 'worried', mouth: 'small', armR: [60, -760], elbowR: [210, -600] } });
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 3.84, 6.08)), 30 * (1 - eio(prog(t, 3.84, 6.08)))));
}
