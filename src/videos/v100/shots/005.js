// L3a 10.48–12.34: MONTAG. Office, du behind a desk with a tall paper stack; the colleague (glasses, bun, light blue) walks in from the right ("Kollegin" 11.38).
import { frame, cam, shadow, person, pop, prog, eio, eout, dayCard, office2, desk, stack, batOver, duBat } from './all.js';
export default function renderShot(t) {
  let s = office2(t);
  const w = eout(prog(t, 10.6, 11.5)), kx = 1180 - 380 * w;
  s += person('du', 330, 1700, .9, { t, seed: 1, look: [-6, 10], brows: 'worried', mouth: 'flat', legs: false });
  s += shadow(kx, 1690, 150);
  s += person('kol', kx, 1690, .9, { t, seed: 5, flip: true, walk: w < 1 ? t * 1.6 : undefined, look: [12, 0], mouth: 'smile', brows: 'calm' });
  s += desk(t, { y: 1420, monitor: false, kbX: 330, mugX: 110, extra: stack(560, 1430, 9, 1) });
  const b = duBat(t);
  s += batOver(330, 1700, .9, b.lvl, { t, bs: .85 });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 10.48, 12.34)));
  s += dayCard(t, 10.5, 'MONTAG');
  return frame(s);
}
