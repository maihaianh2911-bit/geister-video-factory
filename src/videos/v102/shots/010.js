// L5b 19.82–22.26: office two-shot. The colleague (glasses, bun, light-blue blouse) explains and points at a faint, blurry speech bubble (only grey scribble lines); on "zum zweiten Mal" (21.46) a "2×" badge pops on the bubble. du stands right with tired half eyes. World ~50 % grey.
import { K, frame, cam, prog, eio, pop, person, shadow, f1, chip } from './lib.js';
import { office2, desk } from './sets.js';
import { fadeWorld, bar } from './base.js';
const INK = K.ink;
function fuzzy(x, y, w, h, tx, ty) {
  let s = `<path d="M ${x - 40} ${y + h / 2 - 6} L ${tx} ${ty} L ${x + 40} ${y + h / 2 - 6} Z" fill="#fff" stroke="${INK}" stroke-width="5" opacity=".75"/><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="50" fill="#fff" stroke="${INK}" stroke-width="5" opacity=".75"/>`;
  s += `<g stroke="#9aa0a8" stroke-width="16" stroke-linecap="round" opacity=".55">${[0, 1, 2].map(i => `<path d="M ${x - w / 2 + 50} ${y - h / 2 + 50 + i * 42} q 40 -10 80 0 t 80 0 t 80 0 t ${i === 2 ? 0 : 60} 0"/>`).join('')}</g>`;
  return s;
}
export default function renderShot(t) {
  let s = office2(t);
  s += shadow(300, 1640, 170) + shadow(790, 1640, 170);
  const g = Math.sin(t * 5) * 18;
  s += person('kolg', 300, 1640, .95, { t, seed: 4, look: [14, -4], brows: 'up', mouth: Math.floor(t * 6) % 2 ? 'talk' : 'small', armR: [250 + g, -640 - g], elbowR: [220, -470] });
  s += person('du', 790, 1640, .95, { t, seed: 1, look: [-12, 4], eyes: 'tired', brows: 'calm', mouth: 'flat' });
  s += desk(t, { y: 1760, monitor: false, keyboard: false, mugX: 900 });
  s += fadeWorld(t);
  const b = pop(t, 20.0, .45);
  if (b > 0) s += `<g opacity="${(Math.min(1, b)).toFixed(2)}">${fuzzy(420, 470, 520, 200, 330, 760)}</g>`;
  const c = pop(t, 21.46, .4);
  if (c > 0) s += `<g transform="translate(680 380) scale(${f1(Math.max(.01, c) * 1000) / 1000}) translate(-680 -380)">${chip(680, 380, '2×', { size: 56, bg: '#d9493f', fill: '#fff' })}</g>`;
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 19.82, 22.26)), 20 * eio(prog(t, 19.82, 22.26)));
  s += bar(t);
  return frame(s);
}
