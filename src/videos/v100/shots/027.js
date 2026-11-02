// L15a 66.42–68.08: DONNERSTAG, bright office morning. du at the desk (battery green 90 %); the colleague walks in again with her folder ("Kollegin fragt wieder" 67.18–67.94).
import { frame, cam, shadow, person, pop, prog, eio, eout, dayCard, office2, desk, stack, folder, batOver, duBat } from './all.js';
export default function renderShot(t) {
  let s = office2(t);
  const w = eout(prog(t, 66.5, 67.4)), kx = 1180 - 380 * w;
  s += person('du', 330, 1700, .9, { t, seed: 1, look: t > 67.2 ? [12, 0] : [-6, 10], brows: 'calm', mouth: 'small', legs: false });
  s += shadow(kx, 1690, 150);
  s += person('kol', kx, 1690, .9, { t, seed: 5, flip: true, walk: w < 1 ? t * 1.6 : undefined, look: [12, 0], mouth: t > 67.4 && Math.sin(t * 15) > 0 ? 'talk' : 'smile', brows: 'up', armR: [150, -400], front: folder(150, -490, .75, -8) });
  s += desk(t, { y: 1420, monitor: false, kbX: 330, mugX: 110, extra: stack(560, 1430, 3, 1) });
  s += batOver(330, 1700, .9, duBat(t).lvl, { t, bs: .85 });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 66.42, 68.08)), 20 * prog(t, 66.42, 68.08));
  s += dayCard(t, 66.45, 'DONNERSTAG');
  return frame(s);
}
