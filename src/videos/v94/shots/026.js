// L19a 78.9–82.94: kitchen with fridge — du, light without stones, sees a to-do list grow longer and longer ("voll" 80.18);
// on "nicht noch mehr Aufgaben" (81.2) a big red X crosses it out and du shakes his head.
import { K, frame, cam, kitchen, person, shadow, fridge, T, light, prog, eio, eout, lerp, cl, pop, f1, op } from './lib.js';
const ITEMS = ['Aufräumen', 'Sport', 'Keller', 'Fahrrad', 'Fenster', 'Bank'];
export default function renderShot(t) {
  let s = kitchen({ dx: -16 * eio(prog(t, 78.9, 82.94)), clock: [11, 0] });
  s += fridge(830, 420, .95, { plan: .9 });
  const X = 250, Y = 1600, S = 1.55;
  s += shadow(X, Y + 4, 180);
  const shake = t > 81.3 && t < 82.3 ? Math.sin((t - 81.3) * 20) * 8 : 0;
  s += person('du', X, Y, S, { t, seed: 1, load: 0, eyes: t > 81.3 ? 'n' : 'wide', brows: t > 81.3 ? 'calm' : 'worried', mouth: t > 81.3 ? 'smile' : 'o', look: [14, -10], headTilt: shake, rim: '#fff2c0' });
  const p = pop(t, 79.2, .4);
  if (p > 0) {
    const n = Math.min(ITEMS.length, Math.floor(cl((t - 79.4) / 1.6) * ITEMS.length));
    let g = `<rect x="-190" y="-60" width="380" height="${f1(110 + n * 62)}" rx="10" fill="#fffdf4" stroke="${K.ink}" stroke-width="5"/>` + T(0, 0, 'TO-DO', 44, { fill: K.ink });
    for (let i = 0; i < n; i++) g += `<rect x="-160" y="${30 + i * 62}" width="30" height="30" rx="4" fill="none" stroke="${K.ink}" stroke-width="4"/>` + T(-115, 56 + i * 62, ITEMS[i], 34, { fill: K.ink, anchor: 'start', w: 800 });
    const x = eio(prog(t, 81.2, 81.6));
    if (x > 0) g += `<path d="M -170 -40 L ${f1(-170 + 340 * x)} ${f1(-40 + (60 + n * 62) * x)}" stroke="${K.red}" stroke-width="22" stroke-linecap="round"/>` + (x > .5 ? `<path d="M 170 -40 L ${f1(170 - 340 * cl(x * 2 - 1))} ${f1(-40 + (60 + n * 62) * cl(x * 2 - 1))}" stroke="${K.red}" stroke-width="22" stroke-linecap="round"/>` : '');
    s += `<g transform="translate(650 ${f1(300 + Math.sin(t * 2) * 6)}) rotate(4) scale(${f1(p * 1000) / 1000})">${g}</g>`;
  }
  s += `<rect x="-60" y="1740" width="1200" height="260" fill="#d4b48a" stroke="${K.ink}" stroke-width="5"/>`;
  s = cam(s, 540, 1000, 1.02 + .05 * eio(prog(t, 78.9, 82.94)));
  return frame(s, { vig: .4 });
}
