// L12 45.3–50.62: speed-dating café: little tables, a small sand timer and name cards; the couple at the front asks follow-up questions (yellow ? bubbles "Nachfragen" 47.58); heart + "ZWEITES DATE ✓" on "zweites Date" (49.62).
import { K, frame, cam, person, prog, eio, pop, label, T } from './lib.js';
import { cafe } from './sets.js';
import { qBubble } from './base.js';
import { heart } from './common.js';
const INK = K.ink;
function timer(x, y, t) {
  return `<g transform="translate(${x} ${y})"><rect x="-30" y="-80" width="60" height="10" rx="4" fill="#8a5a36"/><rect x="-30" y="0" width="60" height="10" rx="4" fill="#8a5a36"/><path d="M -22 -70 C -22 -40 -4 -40 -4 -35 C -4 -30 -22 -30 -22 0 H 22 C 22 -30 4 -30 4 -35 C 4 -40 22 -40 22 -70 Z" fill="#dff1f7" stroke="${INK}" stroke-width="4"/><path d="M -14 -10 Q 0 -26 14 -10 V 0 H -14 Z" fill="#f2c14e"/></g>`;
}
export default function renderShot(t) {
  let s = cafe(t);
  // background couples (props)
  s += person('dat1', 290, 1640, .95, { t, seed: 3, look: [14, -2], brows: 'up', mouth: t > 48.9 ? 'grin' : 'smile', legs: false });
  s += person('dat2', 790, 1650, .95, { t, seed: 4, look: [-14, 0], brows: 'calm', mouth: t > 47.4 && t < 48.6 && Math.sin(t * 15) > 0 ? 'talk' : 'smile', legs: false });
  s += `<path d="M 60 1400 H 1020 V 2000 H 60 Z" fill="#6e4a36" stroke="${INK}" stroke-width="6"/><rect x="60" y="1400" width="960" height="24" fill="#8a6248"/>` + timer(540, 1390, t);
  s += `<rect x="200" y="1430" width="150" height="56" rx="6" fill="#fff" stroke="${INK}" stroke-width="4"/>${T(275, 1468, 'LENA', 30, { fill: K.txt })}<rect x="720" y="1430" width="150" height="56" rx="6" fill="#fff" stroke="${INK}" stroke-width="4"/>${T(795, 1468, 'TOM', 30, { fill: K.txt })}`;
  s += qBubble(700, 640, [], 760, 820, { p: pop(t, 47.36, .4) }) + qBubble(860, 520, [], 800, 800, { p: pop(t, 47.9, .4) });
  s += heart(540, 760, 1.4, pop(t, 49.5, .45));
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 45.3, 50.62)), -30 * prog(t, 45.3, 50.62));
  s += label('SPEED-DATING', 540, 240, 96, { p: pop(t, 45.4, .45) });
  s += label('ZWEITES DATE ✓', 540, 1330, 84, { p: pop(t, 49.62, .45), fill: '#ffffff' });
  return frame(s);
}
