// L7 23.68–28.98 the next table: one thinks "Sitzen meine Haare?", the other "Was schreibe ich ihr zurück?" — nobody looks at du.
import { K, frame, bg, shadow, person, thought, phone, cafeTable, cam, prog, eio, eout, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('cafe', { dx: -60 });
  s += shadow(300, 1330) + shadow(780, 1330);
  const fix = Math.sin(t * 8) * 10 * (t > 25.0 ? 1 : 0);
  s += person('cap', 300, 1330, 1, { t, seed: 4, look: [-6, -14], mouth: 'flat', armR: t > 25.0 ? [70, -470 + fix] : null, brows: t > 25.0 ? 'up' : null });
  const ph = phone(-20, -300, .45, { screen: `<rect x="-50" y="-60" width="80" height="26" rx="12" fill="#cfe3f2"/><rect x="-30" y="-20" width="80" height="26" rx="12" fill="#bfe6c4"/>` });
  s += person('boss', 780, 1330, 1, { t, seed: 6, look: [-4, 14], mouth: t > 27.3 ? 'o' : 'flat', armL: [-50, -280], armR: [20, -270], front: ph, headDy: 8 });
  s += cafeTable(540, 1150, 820);
  s += thought(330, 620, 'Sitzen meine Haare?', 300, 800, { p: pop(t, 25.32, .45) });
  s += thought(740, 470, ['Was schreibe ich', 'ihr zurück?'], 790, 800, { p: pop(t, 27.5, .45) });
  return frame(cam(s, 540, 1000, 1.02 + .04 * eio(prog(t, 23.68, 28.98))));
}
