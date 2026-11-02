// L6b 28.34–30.68: close-up of the laptop screen: the search field types "Rückenschmerzen Ursachen" (28.8–29.9), result rows with red warning triangles appear; du's face below lit blue by the screen, eyes widen.
import { K, frame, cam, prog, eio, pop, T, f1, op, head, pool } from './lib.js';
import { room } from './sets.js';
import { write } from './props.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 20, mm: 40, light: .3, strong: true });
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#0b0e18" opacity=".45"/>`;
  s += pool(540, 760, 620, 560, '#7fc0ff', .35);
  // laptop screen (big)
  s += `<rect x="90" y="250" width="900" height="640" rx="28" fill="#2a2f36" stroke="${INK}" stroke-width="8"/><rect x="120" y="280" width="840" height="580" rx="10" fill="#f4f7fb"/>`;
  s += `<rect x="160" y="320" width="760" height="80" rx="40" fill="#fff" stroke="#9aa7b4" stroke-width="4"/><circle cx="210" cy="360" r="18" fill="none" stroke="#7a838c" stroke-width="6"/><path d="M 223 373 l 14 14" stroke="#7a838c" stroke-width="6" stroke-linecap="round"/>`;
  s += write('Rückenschmerzen Ursachen', 250, 376, 40, eio(prog(t, 28.8, 29.9)), 's12');
  if (t > 28.8 && t < 29.95 && Math.sin(t * 18) > 0) s += `<rect x="${f1(250 + 520 * eio(prog(t, 28.8, 29.9)))}" y="338" width="4" height="44" fill="${K.txt}"/>`;
  [0, 1, 2, 3].forEach(i => {
    const p = eio(prog(t, 29.95 + i * .18, 30.25 + i * .18)), y = 450 + i * 100; if (p <= 0) return;
    s += `<g opacity="${op(p)}" transform="translate(0 ${f1(20 * (1 - p))})"><path d="M 180 ${y + 40} L 206 ${y - 4} L 232 ${y + 40} Z" fill="#d9493f" stroke="${INK}" stroke-width="3"/>${T(206, y + 34, '!', 30, { fill: '#fff' })}<rect x="260" y="${y}" width="${520 - i * 60}" height="20" rx="8" fill="#2f5fb5"/><rect x="260" y="${y + 34}" width="${600 - i * 40}" height="14" rx="6" fill="#b8c0c8"/></g>`;
  });
  s += `<path d="M 40 890 L 1040 890 L 1000 930 L 80 930 Z" fill="#9aa3ad" stroke="${INK}" stroke-width="6"/>`;
  const wide = eio(prog(t, 30.0, 30.3));
  s += head('du', 540, 1240, 1.45, { t, seed: 1, look: [0, -14], brows: wide > .5 ? 'worried' : 'up', eyes: wide > .5 ? 'wide' : 'n', mouth: wide > .5 ? 'o' : 'flat', rim: '#7fc0ff', rimL: '#7fc0ff' });
  return frame(cam(s, 540, 800, 1.0 + .06 * eio(prog(t, 28.34, 30.68))));
}
