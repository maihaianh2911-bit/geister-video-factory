// L11b 49.22–51.34: dark scene: du stands right and keeps smiling; above-left his brain glows inside a dashed circle linked to his head,
// red warning lights around it start blinking on "Gehirn" (49.42) and flash faster on "nicht daran" (50.36).
import { K, frame, cam, prog, eio, person, shadow, pool, f1, op, label, pop } from './lib.js';
import { brain } from './sets2.js';
import { tint } from './base.js';
import { room } from './sets.js';
import { grey } from './common.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', strong: true }) + grey(.84) + tint('#0b0f22', .55);
  const on = t > 49.42, fast = t > 50.36;
  const blink = on && (Math.sin(t * (fast ? 22 : 10)) > 0);
  s += pool(360, 600, 420, 420, '#ff3b30', blink ? .55 : .15);
  s += `<circle cx="360" cy="600" r="280" fill="#141a30" stroke="#fff" stroke-width="6" stroke-dasharray="20 16"/>`;
  s += `<path d="M 560 800 Q 640 860 650 900" stroke="#fff" stroke-width="6" stroke-dasharray="20 16" fill="none"/>`;
  s += brain(360, 600, .95, t);
  for (const [x, y] of [[160, 380], [560, 380], [130, 820], [590, 820]]) {
    s += `<circle cx="${x}" cy="${y}" r="38" fill="${blink ? '#ff3b30' : '#5a2a2a'}" stroke="${INK}" stroke-width="7"/>` + (blink ? pool(x, y, 110, 110, '#ff3b30', .6) : '');
  }
  s += shadow(760, 1660);
  s += person('du', 760, 1660, 1, { t, seed: 1, eyes: 'happy', brows: 'up', mouth: 'smile', look: [0, 0] });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 49.22, 51.34)) + (fast ? .01 * Math.sin(t * 40) : 0));
  return frame(s);
}
