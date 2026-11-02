// L16a 64.68–66.16: close on the phone: Papa is silent ("kurz still" 65.04), eyes lower, then look up; a faint "…" bubble.
import { K, frame, cam, prog, eio, pop, thought } from './lib.js';
import { room } from './sets.js';
import { callPhone } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 20, mm: 3, strong: true });
  s += `<rect width="1080" height="1920" fill="#1a1410" opacity=".35"/>`;
  const down = t >= 64.9 && t < 65.9;
  s += callPhone(t, 540, 920, 2.0, { mouth: 'flat', brows: down ? 'sad' : 'calm', look: down ? [0, 14] : [0, 0], time: '00:07' });
  s += thought(800, 300, ['…'], 680, 420, { p: pop(t, 65.1, .4), size: 70, a: .8 });
  return frame(cam(s, 540, 900, 1.0 + .04 * eio(prog(t, 64.68, 66.16))));
}
