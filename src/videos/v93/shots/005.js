// L3 13.4–15.2 Close-up du, offended: brows down, eyes narrow, rubbing the shoulder; thought bubble
// „Was für ein Rüpel.“ pops on "Was" (14.08).
import { K, frame, cam, setTrain, trainFG, person, thought, pop } from './lib.js';
import { push, CU } from './base.js';
export default function renderShot(t) {
  let s = setTrain(t, { heavy: true });
  s += person('du', 400, CU.y, CU.s, { t, seed: 2, brows: 'angry', eyes: 'mean', mouth: 'grim', look: [-8, 0], armL: [70, -320], rim: '#cfe6ff' });
  s += thought(560, 380, ['Was für ein', 'Rüpel.'], 520, 620, { p: pop(t, 14.08, .4), size: 64 });
  s += trainFG(1030, { strap: false });
  return frame(cam(s, 400, 900, push(t, 13.4, 15.2, 1.0, 1.1)), { tint: ['#3a6ea8', .1] });
}
