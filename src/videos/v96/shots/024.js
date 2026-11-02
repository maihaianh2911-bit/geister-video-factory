// L15a 68.3–70.54: next Monday, sunny kitchen: du lays the phone on the counter ("Handy" 69.52, "Küche" 70.08); the hourglass is almost empty and still.
import { K, frame, cam, shadow, label, pop, prog, eio, lerp } from './lib.js';
import { kitchen } from './sets.js';
import { duHG, gphone, phoneDown } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = kitchen(t, { fridge: true });
  const d = eio(prog(t, 69.3, 69.8));
  s += shadow(420, 1640);
  const hand = [lerp(160, 260, d), lerp(-460, -380, d)];
  s += duHG(420, 1640, 1, { t, seed: 1, look: [16, 14], brows: 'calm', mouth: d >= 1 ? 'smile' : 'flat', armR: hand }, { glow: .15 });
  // sharp counter in front (right), phone on it
  s += `<path d="M 560 1250 H 1140 V 2000 H 560 Z" fill="#a8744a" stroke="${INK}" stroke-width="6"/><rect x="560" y="1250" width="580" height="26" fill="#c9a26b"/>`;
  if (d < 1) s += gphone(420 + hand[0], 1640 + hand[1] - 30, .7, lerp(-10, 80, d), { lit: .3 * (1 - d), id: 'p24' });
  else s += phoneDown(720, 1262, .9, 3);
  s += `<g transform="translate(900 1250)"><path d="M -60 -100 H 60 L 50 0 H -50 Z" fill="#e8b85c" stroke="${INK}" stroke-width="5"/><circle cx="-20" cy="-120" r="26" fill="#d9493f" stroke="${INK}" stroke-width="4"/><circle cx="20" cy="-116" r="24" fill="#7aa27a" stroke="${INK}" stroke-width="4"/></g>`;
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 68.3, 70.54)), 20 * prog(t, 68.3, 70.54));
  s += label('MONTAG', 540, 250, 110, { p: pop(t, 68.4, .45) });
  return frame(s);
}
