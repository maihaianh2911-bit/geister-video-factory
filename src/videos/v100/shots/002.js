// L1b 2.98–4.86: close-up of du; a battery appears above the head on "Akku" (3.12) and drains 100→70 % on "leeren" (3.86).
import { frame, cam, head, pop, prog, eio, battery, duBat, room, blur } from './all.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 19, mm: 30, strong: true, sofa: true });
  const b = duBat(t), dropped = t >= 3.86;
  s += head('du', 540, 1250, 1.7, { t, seed: 1, look: [0, -14], brows: dropped ? 'worried' : 'up', mouth: dropped ? 'o' : 'small', eyes: dropped ? 'wide' : 'n' });
  s += `<path d="M 160 1900 C 180 1600 330 1530 540 1530 C 750 1530 900 1600 920 1900 Z" fill="#2fa59a" stroke="#1d1d1d" stroke-width="6"/>`;
  s = cam(s, 540, 1100, 1.0 + .05 * eio(prog(t, 2.98, 4.86)));
  s += battery(540, 560, 1.55 * Math.min(1, pop(t, 3.12, .4) || 0.0001), b.lvl, { t, drop: b.drop });
  return frame(s);
}
