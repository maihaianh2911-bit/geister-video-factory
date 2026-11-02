// L14 61.98–66.42: same chart, camera drifts right: the green "IN WAHRHEIT" bar rises only a little on "Absage" (63.88); "GELASSEN" + a calm smiling face on "gelassener" (64.68).
import { frame, cam, pop, prog, eio, eout, voidRoom, chartBoard, pool } from './all.js';
export default function renderShot(t) {
  let s = voidRoom(t);
  s += pool(740, 1000, 420, 500, '#7fe0a0', .25 * prog(t, 64.68, 65.2));
  s += chartBoard(t, { a: 1, la1: 1, la1b: 1, la1c: 1, f1: 1, b: eout(prog(t, 63.88, 64.5)), la2: prog(t, 63.88, 64.2), la2b: prog(t, 64.68, 64.9), f2: pop(t, 64.68), ghost2: 1 - prog(t, 63.88, 64.1) });
  return frame(cam(s, 540, 900, 1.06 + .06 * eio(prog(t, 61.98, 66.42)), 50 - 120 * eio(prog(t, 61.98, 66.42))), { base: '#1c2436' });
}
