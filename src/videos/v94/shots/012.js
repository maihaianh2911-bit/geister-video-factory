// L7 31.4–35.56: close-up in the café — a big thought bubble with a circular arrow; the four tasks appear on their words
// (Vermieter 33.18, Zahnarzt 33.84, Steuer 34.62, Oma 35.15) and keep circling.
import { K, frame, cam, cafe, person, T, light, prog, eio, eout, lerp, cl, pop, f1, op } from './lib.js';
const W = [['Vermieter.', 33.18], ['Zahnarzt.', 33.84], ['Steuer.', 34.62], ['Oma.', 35.15]];
export default function renderShot(t) {
  let s = cafe({ dx: 40 }) + light(540, 1100, 320, 320, '#7f9cc8', .35);
  s += person('du', 470, 2190, 2.55, { t, seed: 1, load: .85, nStones: 5, hunch: .2, eyes: 'wide', brows: 'worried', mouth: 'strain', look: [8, -14], sweat: .5 + .5 * Math.sin(t * 2.5) });
  const p = pop(t, 31.6, .5);
  if (p > 0) {
    const cx = 590, cy = 520, R = 330;
    let g = `<circle cx="${cx - 150}" cy="${cy + 330}" r="16" fill="#fff" stroke="${K.ink}" stroke-width="5"/><circle cx="${cx - 190}" cy="${cy + 380}" r="10" fill="#fff" stroke="${K.ink}" stroke-width="5"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="${K.ink}" stroke-width="6"/>`;
    const rot = (t - 31.6) * 70;
    g += `<g transform="rotate(${f1(rot)} ${cx} ${cy})"><circle cx="${cx}" cy="${cy}" r="120" fill="none" stroke="${K.red}" stroke-width="12" stroke-dasharray="560 200"/><path d="M ${cx + 110} ${cy - 70} l 34 10 l -6 -36 z" fill="${K.red}" stroke="${K.red}" stroke-width="8" stroke-linejoin="round"/></g>`;
    W.forEach(([w, t0], i) => {
      const q = pop(t, t0, .4); if (q <= 0) return;
      const a = (i * 90 - 90 + rot * .5) * Math.PI / 180;
      g += `<g transform="translate(${f1(cx + Math.cos(a) * 150)} ${f1(cy + Math.sin(a) * 215)}) scale(${f1(q * 1000) / 1000})">${T(0, 15, w, 42, { fill: K.ink })}</g>`;
    });
    s += `<g transform="translate(470 900) scale(${f1(p * 1000) / 1000}) translate(-470 -900)">${g}</g>`;
  }
  s = cam(s, 540, 900, 1.02 + .06 * eio(prog(t, 31.4, 35.56)));
  return frame(s, { vig: .62 });
}
