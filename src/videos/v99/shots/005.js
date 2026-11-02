// L3a 11.54–13.28: card MONTAG; morning office, du behind his desk; the phone on the desk buzzes and lights up on "Chef schreibt" (12.7) and du turns his eyes to it.
import { K, frame, cam, label, pop, prog, eio, person, shadow } from './lib.js';
import { office2, desk } from './sets.js';
import { deskPhone } from './fg.js';
export default function renderShot(t) {
  let s = office2(t);
  const bz = t >= 12.7 ? 1 : 0, look = eio(prog(t, 12.8, 13.1));
  s += person('du', 380, 1640, 1, { t, seed: 1, look: [16 * look, 6 + 8 * look], brows: look > .5 ? 'up' : 'calm', mouth: 'small' });
  s += desk(t, { y: 1300, monX: 800, screen: '#dfeaf4', mugX: 120, kbX: 420 });
  s += deskPhone(t, 760, 1370, { lit: bz, buzz: bz * (Math.sin(t * 9) > -.2 ? 1 : 0) });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 11.54, 13.28)), -20 * prog(t, 11.54, 13.28));
  s += label('MONTAG', 540, 250, 120, { p: pop(t, 11.6, .45) });
  return frame(s);
}
