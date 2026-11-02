// L2a 5.08–7.02: flash-forward: grey room, du looks up at an almost full hourglass and jumps back on "erschrecken" (6.34).
import { K, frame, cam, shadow, label, pop, prog, eio, back, cl } from './lib.js';
import { room } from './sets.js';
import { duHG } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'grey', hh: 22, mm: 0 });
  const j = prog(t, 6.3, 6.55), jump = Math.sin(cl(j) * Math.PI) * 50;
  const scared = t >= 6.34;
  s += shadow(520, 1640, 190, 1 - jump / 100);
  s += duHG(520 - 30 * eio(j), 1640 - jump, 1, { t, seed: 1, look: [0, -14], eyes: scared ? 'wide' : 'n', brows: scared ? 'up' : 'worried', mouth: scared ? 'o' : 'flat', armL: scared ? [-150, -830] : undefined, armR: scared ? [150, -830] : undefined }, { fill: .96, flow: 0, s: .95, glow: .55 });
  s = cam(s, 540, 900, 1.0 + .04 * eio(prog(t, 5.08, 6.3)) + .08 * eio(prog(t, 6.34, 6.64)));
  s += label('AM ENDE DER WOCHE', 540, 250, 80, { p: pop(t, 5.2, .45) });
  return frame(s);
}
