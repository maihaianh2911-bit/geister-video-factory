// 8.67–10.88: two helpers walk in from the left and put their hands on du's shoulder and legs ("fest" 9.88).
import { DEFS, cam, prog } from './lib.js';
import { orScene } from './or.js';
export default function renderShot(t) {
  const sc = orScene(t, { inA: prog(t, 8.67, 9.35), inB: prog(t, 8.8, 9.5), gripA: prog(t, 9.45, 9.9), gripB: prog(t, 9.55, 9.95),
    lift: 8, face: { look: -.8, lookY: -.3, brow: .7, eyes: 'wide', mouth: 'o' }, saw: 'hand', sawUp: .3 });
  return `${DEFS}${cam(sc, 1.25, 540, 1000)}`;
}
