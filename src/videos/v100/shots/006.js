// L3b 12.34–14.82: closer two-shot: the colleague holds out her blue presentation folder ("Präsentation" 12.78) and taps it ("schnell" 13.66); du looks at it.
import { frame, cam, shadow, person, pop, prog, eio, office2, desk, stack, folder, batOver, duBat } from './all.js';
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  const up = eio(prog(t, 12.6, 13.0)), tap = t > 13.66 && t < 14.1 ? Math.sin((t - 13.66) * 28) * 8 : 0;
  s += person('du', 300, 1760, 1.08, { t, seed: 1, look: [16, 6], brows: 'worried', mouth: 'flat', legs: false });
  // colleague (flipped): local +x points left in world. Folder held in front of her chest, raised towards du.
  const fy = -170 - 310 * up;
  s += person('kol', 820, 1760, 1.08, { t, seed: 5, flip: true, look: [10, 4], mouth: t > 12.4 && t < 14.4 && Math.sin(t * 15) > 0 ? 'talk' : 'smile', brows: 'up', legs: false,
    behindHead: '', front: folder(150, fy + tap, .9, -8), armR: [150, fy + 120 + tap], armL: up > .5 ? [60, fy + 140] : null });
  s += desk(t, { y: 1500, monitor: false, kbX: 300, mugX: 980, extra: stack(140, 1510, 7, .9) });
  const b = duBat(t);
  s += batOver(300, 1760, 1.08, b.lvl, { t, bs: .8 });
  s = cam(s, 540, 1000, 1.03 + .05 * eio(prog(t, 12.34, 14.82)), -20 * prog(t, 12.34, 14.82));
  return frame(s);
}
