// L16a 71.06–73.86: the colleague nods ("nickt" 71.14), says "Kein Problem, dann frage ich Jonas." (71.76) and turns to Jonas (curly hair, mustard sweater), who appears on the right on "Jonas" (73.16).
import { frame, cam, shadow, person, speech, pop, prog, eio, eout, office2, desk, folder, nod } from './all.js';
export default function renderShot(t) {
  let s = office2(t);
  const turned = t >= 72.9, jw = eout(prog(t, 72.8, 73.4)), jx = 1250 - 260 * jw;
  s += person('jonas', jx, 1700, .85, { t, seed: 17, flip: true, look: [10, 0], brows: 'up', mouth: 'smile', legs: false });
  s += person('du', 200, 1700, .9, { t, seed: 1, look: [14, 0], brows: 'calm', mouth: 'smile', legs: false });
  s += person('kol', 600, 1700, .92, { t, seed: 5, flip: !turned, look: [12, 0], brows: 'calm', mouth: t > 71.7 && t < 73.3 && Math.sin(t * 15) > 0 ? 'talk' : 'smile', headDy: nod(t, 71.14, 71.7), armR: [150, -400], front: folder(150, -490, .7, -8), legs: false });
  s += desk(t, { y: 1540, monitor: false, keyboard: false, mugX: 120 });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 71.06, 73.86)), -20 * prog(t, 71.06, 73.86));
  s += speech(560, 320, ['Kein Problem, dann', 'frage ich Jonas.'], 580, 700, { p: pop(t, 71.76), size: 56 });
  return frame(s);
}
