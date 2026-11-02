// L7 26.32–30.78: canteen at noon: card "MITTAGSPAUSE"; the colleague (bun, purple) tells about her weekend; her warm bubble with mountains grows ("Bergen" 29.92).
import { K, frame, cam, shadow, person, prog, eio, pop, label } from './lib.js';
import { canteen } from './sets.js';
import { warmBubble, mountains } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = canteen(t);
  const talk = t > 27.4 && Math.sin(t * 14) > 0;
  s += person('kol', 300, 1640, 1, { t, seed: 5, look: [14, -2], brows: 'up', mouth: talk ? 'talk' : 'smile', legs: false });
  s += person('du', 790, 1650, .95, { t, seed: 1, look: [-14, 0], brows: 'calm', mouth: 'smile', legs: false });
  s += `<path d="M -60 1400 H 1140 V 2000 H -60 Z" fill="#a8744a" stroke="${INK}" stroke-width="6"/><rect x="-60" y="1400" width="1200" height="24" fill="#c9a26b"/><rect x="160" y="1430" width="280" height="90" rx="12" fill="#e8e1d2" stroke="${INK}" stroke-width="5"/><ellipse cx="300" cy="1470" rx="90" ry="26" fill="#e8b85c"/><rect x="650" y="1430" width="280" height="90" rx="12" fill="#e8e1d2" stroke="${INK}" stroke-width="5"/><ellipse cx="790" cy="1470" rx="90" ry="26" fill="#7aa27a"/>`;
  s += warmBubble(420, 560, 420, 280, 330, 820, mountains(t, 400, 260), { p: pop(t, 29.06, .45), grow: prog(t, 29.06, 30.78), id: 'b11' });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 26.32, 30.78)), 30 * prog(t, 26.32, 30.78));
  s += label('MITTAGSPAUSE', 540, 240, 100, { p: pop(t, 26.4, .45) });
  return frame(s);
}
