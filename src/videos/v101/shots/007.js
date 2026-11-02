// L4a 16.08–19.5: medium shot, du on the bed; small thought bubbles pop up: a bus with a clock showing it is late ("Bus" 16.18), then the boss's grumpy face (moustache, grey vest) ("Chef" 17.74); du slumps more.
import { K, frame, cam, prog, eio, pop, person, shadow, head, clock, f1 } from './lib.js';
import { bedroom, bed, nightstand, jar } from './base.js';
import { picBubble } from './jar.js';
const INK = K.ink;
function bus(t) {
  return `<rect x="-170" y="-110" width="340" height="220" fill="#cfd8e0"/><rect x="-170" y="60" width="340" height="50" fill="#8a8f96"/><g transform="translate(-30 30)"><rect x="-120" y="-80" width="240" height="110" rx="16" fill="#f2c14e" stroke="${INK}" stroke-width="5"/>${[-90, -40, 10, 60].map(x => `<rect x="${x}" y="-66" width="40" height="40" rx="4" fill="#bcd8ee"/>`).join('')}<circle cx="-70" cy="32" r="18" fill="${INK}"/><circle cx="70" cy="32" r="18" fill="${INK}"/></g>` + clock(120, -40, 46, 8, 25, { hand: '#d9493f' });
}
function boss(t) {
  return `<rect x="-170" y="-110" width="340" height="220" fill="#dfe6ee"/><path d="M -120 120 C -120 20 120 20 120 120 Z" fill="#80838b" stroke="${INK}" stroke-width="5"/><path d="M -30 34 L 0 90 L 30 34 Z" fill="#f2f2ee"/>` + head('chef', 0, -20, .55, { t, seed: 9, brows: 'angry', mouth: 'frown', look: [0, 4] });
}
export default function renderShot(t) {
  let s = bedroom(t, { light: 0 });
  s += bed(1420, { w: 600 });
  const sl = eio(prog(t, 17.7, 18.6));
  s += shadow(360, 1640);
  s += person('du', 360, 1640, 1, { t, seed: 1, look: [6, -10], brows: 'sad', mouth: 'frown', hunch: .3 + .3 * sl });
  s += nightstand(t, 840, 1330) + jar(800, 1330, .95, { t, n: 0, glow: 0 });
  s += picBubble(250, 420, 360, 240, 330, 760, pop(t, 16.18, .4), bus(t), 'b7');
  s += picBubble(700, 560, 360, 240, 440, 800, pop(t, 17.74, .4), boss(t), 'c7');
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 16.08, 19.5))));
}
