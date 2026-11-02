// L10 44.50–48.22: FREITAGNACHT, dark blue bedroom: du lies awake in bed; the heavy backpack sinks onto his chest on "drückt" (46.86), eyes go wide.
import { K, frame, person, head, cam, bagSolo, dayCard, prog, eio, ein, f1 } from './lib.js';
import { bedroom } from './sets.js';
import { LB } from './base.js';
export function bedScene(t, o = {}) {
  let s = bedroom(t, { dawn: o.dawn || 0 });
  // bed frame + mattress (midground, sharp)
  s += `<rect x="40" y="1080" width="1060" height="330" rx="24" fill="#3b2f4f" stroke="${K.ink}" stroke-width="6"/><rect x="40" y="980" width="70" height="430" rx="14" fill="#4a3b62" stroke="${K.ink}" stroke-width="6"/>`;
  s += `<rect x="60" y="1040" width="1040" height="120" rx="30" fill="#dfe4f2" stroke="${K.ink}" stroke-width="5"/>`;
  s += `<path d="M 120 1060 C 110 960 330 940 380 1000 C 400 1060 360 1090 300 1090 L 150 1090 Z" fill="#f4f6fb" stroke="${K.ink}" stroke-width="5"/>`;
  // du lying on his back: head upright on the pillow, teal hoodie torso under the blanket
  s += `<path d="M 330 1000 C 330 930 420 920 560 920 L 700 930 L 700 1120 L 360 1120 C 330 1100 320 1050 330 1000 Z" fill="${K.du}" stroke="${K.ink}" stroke-width="5"/><path d="M 380 960 C 400 1000 400 1060 380 1100" stroke="${K.duSh}" stroke-width="8" fill="none"/>`;
  s += head('du', 245, 960, .78, { t, eyes: o.eyes || 'n', brows: o.brows || 'worried', mouth: o.mouth || 'flat', look: o.look || [0, -14], blink: o.blink });
  return s;
}
export default function renderShot(t) {
  const press = ein(prog(t, 46.4, 46.86));
  const lift = Math.sin(t * 2) * 6 * (1 - press);
  let s = bedScene(t, { eyes: press > .9 ? 'wide' : 'tired', brows: press > .9 ? 'strain' : 'worried', mouth: press > .9 ? 'o' : 'flat', look: [0, -14] });
  s += bagSolo(560, 728 + 36 * press + lift, .8, 5, LB, -6 + 4 * press);
  s = cam(s, 540, 950, 1.12 + .08 * eio(prog(t, 44.5, 48.22)), 0, 170);
  s += dayCard(t, 44.5, 'FREITAGNACHT', { size: 92 });
  return frame(s);
}
