// L14 59.92–63.54: close-up du — the circling thought bubble from the café slows and stops on "hört auf" (60.38);
// the four words drop away and the bubble fades; du closes his eyes and smiles, relieved.
import { K, frame, cam, home, person, T, light, prog, eio, eout, ein, lerp, cl, pop, f1, op } from './lib.js';
const W = ['Vermieter.', 'Zahnarzt.', 'Steuer.', 'Oma.'];
export default function renderShot(t) {
  let s = home({ mood: 'day', dx: -30 * eio(prog(t, 59.92, 63.54)), clock: [9, 50] }) + light(800, 400, 400, 400, '#fff6d0', .35);
  const calm = eio(prog(t, 61.0, 61.6));
  s += person('du', 470, 2190, 2.55, { t, seed: 1, load: .85, nStones: 5, hunch: .2 * (1 - calm), eyes: calm > .5 ? 'closed' : 'n', brows: calm > .5 ? 'calm' : 'worried', mouth: calm > .5 ? 'smile' : 'flat', look: [8, -14] });
  const fadeB = 1 - eio(prog(t, 61.8, 62.6));
  if (fadeB > 0) {
    const cx = 590, cy = 520, R = 330;
    const spin = (t < 60.38 ? (t - 59.92) * 70 : 32 + 70 * (1 - Math.exp(-(t - 60.38) * 3)) / 3);
    let g = `<circle cx="${cx - 150}" cy="${cy + 360}" r="16" fill="#fff" stroke="${K.ink}" stroke-width="5"/><circle cx="${cx - 190}" cy="${cy + 410}" r="10" fill="#fff" stroke="${K.ink}" stroke-width="5"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="${K.ink}" stroke-width="6"/>`;
    const arrowA = 1 - eio(prog(t, 60.38, 60.9));
    g += `<g transform="rotate(${f1(spin)} ${cx} ${cy})" opacity="${op(arrowA)}"><circle cx="${cx}" cy="${cy}" r="120" fill="none" stroke="${K.red}" stroke-width="12" stroke-dasharray="560 200"/><path d="M ${cx + 110} ${cy - 70} l 34 10 l -6 -36 z" fill="${K.red}" stroke="${K.red}" stroke-width="8"/></g>`;
    W.forEach((w, i) => {
      const a = (i * 90 - 90 + spin * .5) * Math.PI / 180, d = ein(prog(t, 60.6 + i * .2, 61.3 + i * .2));
      g += `<g transform="translate(${f1(cx + Math.cos(a) * 150)} ${f1(cy + Math.sin(a) * 215 + d * 260)}) rotate(${f1(d * (i % 2 ? 30 : -30))})" opacity="${op(1 - d)}">${T(0, 15, w, 42, { fill: K.ink })}</g>`;
    });
    s += `<g opacity="${op(fadeB)}">${g}</g>`;
  }
  s = cam(s, 540, 900, 1.06 - .04 * eio(prog(t, 59.92, 63.54)));
  return frame(s, { vig: .4 });
}
