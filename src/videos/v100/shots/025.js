// L13 57.8–61.98: comparison chart. The red "ERWARTET" bar shoots up on "überschätzten" (58.0) – labels "ENTTÄUSCHT," (59.18) / "VERÄRGERT" (59.94), an angry face sits on top. The second bar is still an empty dashed outline.
import { frame, cam, pop, prog, eio, eout, voidRoom, chartBoard } from './all.js';
export default function renderShot(t) {
  let s = voidRoom(t);
  s += chartBoard(t, { a: eout(prog(t, 58.0, 58.9)), la1: prog(t, 58.0, 58.3), la1b: prog(t, 59.18, 59.4), la1c: prog(t, 59.94, 60.2), f1: pop(t, 59.94), ghost2: 1 });
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 57.8, 61.98)), 50 * prog(t, 57.8, 61.98)), { base: '#1c2436' });
}
