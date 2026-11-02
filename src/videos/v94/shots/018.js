// L12b 53.36–56.14: close-up du in daylight with the backpack; the label SOFORT ERLEDIGEN appears and gets struck out
// on "nicht sofort" (54.54) — du relaxes.
import { K, frame, cam, home, person, chip, light, prog, eio, eout, lerp, cl, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = home({ mood: 'day', dx: 30 * eio(prog(t, 53.36, 56.14)), clock: [9, 30] });
  const rel = eio(prog(t, 54.6, 55.1));
  s += person('du', 300, 2010, 2.7, { t, seed: 1, load: .85, nStones: 5, hunch: .3 * (1 - rel), eyes: rel > .5 ? 'happy' : 'n', brows: rel > .5 ? 'up' : 'worried', mouth: rel > .5 ? 'smile' : 'flat', look: [14, -14], armR: rel > .3 ? null : [80, -360], rim: '#fff2c0' });
  const p = pop(t, 53.6, .4);
  if (p > 0) {
    const k = eio(prog(t, 54.54, 54.9));
    s += `<g transform="translate(800 430) scale(${f1(p * 1000) / 1000}) rotate(-4)">${chip(0, 0, 'SOFORT', { size: 70, bg: '#fff' })}${chip(0, 110, 'ERLEDIGEN', { size: 56, bg: '#fff' })}<line x1="-200" y1="40" x2="${f1(-200 + 400 * k)}" y2="${f1(40 + 30 * k)}" stroke="${K.red}" stroke-width="20" stroke-linecap="round"/></g>`;
    s += chip(780, 680, 'MUSS NICHT SEIN', { p: pop(t, 55.0, .4), size: 46, bg: K.yellow });
  }
  s = cam(s, 540, 900, 1.02 + .05 * eio(prog(t, 53.36, 56.14)));
  return frame(s, { vig: .4 });
}
