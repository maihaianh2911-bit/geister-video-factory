// L5a 22.3–26.14: MITTWOCH — cooler, greyer living room. Three new tasks pop up around du as they are named:
// tax return (Steuererklärung 23.36), phone call with Oma (24.96), overflowing laundry basket (25.46). du looks at each.
import { K, frame, cam, home, person, shadow, dayCard, T, light, tableEdge, prog, eio, eout, lerp, cl, pop, f1, op } from './lib.js';
function taxDoc(x, y, p, t) {
  if (p <= 0) return '';
  let g = `<rect x="-130" y="-160" width="260" height="320" rx="6" fill="#f4f1ea" stroke="${K.ink}" stroke-width="5" transform="rotate(6)"/><rect x="-130" y="-160" width="260" height="320" rx="6" fill="#fffdf6" stroke="${K.ink}" stroke-width="5"/>`;
  g += T(0, -112, 'STEUER-', 34, { fill: K.red }) + T(0, -76, 'ERKLÄRUNG', 34, { fill: K.red });
  for (let i = 0; i < 6; i++) g += `<rect x="-100" y="${-44 + i * 32}" width="${i % 2 ? 140 : 200}" height="12" rx="4" fill="#c9cdd4"/><rect x="70" y="${-48 + i * 32}" width="30" height="20" fill="none" stroke="#9aa0a8" stroke-width="3"/>`;
  return `<g transform="translate(${x} ${f1(y + Math.sin(t * 2) * 6)}) rotate(-6) scale(${f1(p * 1000) / 1000})">${g}</g>`;
}
function omaPhone(x, y, p, t) {
  if (p <= 0) return '';
  const sh = Math.sin(t * 40) * 3 * (Math.floor(t * 2) % 2);
  let g = `<rect x="-90" y="-160" width="180" height="320" rx="28" fill="${K.ink}"/><rect x="-76" y="-140" width="152" height="280" rx="16" fill="#eef3f7"/><circle cx="0" cy="-50" r="48" fill="#1d1d1d"/><path d="M -44 -60 C -50 -110 50 -110 44 -60 Z" fill="#cfcfcf"/><circle cx="-16" cy="-44" r="9" fill="#fff"/><circle cx="16" cy="-44" r="9" fill="#fff"/><path d="M -12 -22 Q 0 -14 12 -22" stroke="#fff" stroke-width="4" fill="none"/>` + T(0, 34, 'Oma ♥', 32, { fill: K.ink }) + `<circle cx="0" cy="94" r="26" fill="${K.green}"/>`;
  return `<g transform="translate(${f1(x + sh)} ${y}) rotate(8) scale(${f1(p * 1000) / 1000})">${g}<path d="M 110 -60 q 20 20 0 40 M 130 -80 q 34 40 0 80" stroke="${K.yellow}" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
}
function basket(x, y, p) {
  if (p <= 0) return '';
  let g = `<g fill="#e07a7a" stroke="${K.ink}" stroke-width="4"><path d="M -120 -110 q 40 -70 90 -20 q 30 -60 90 -10 q 40 -30 60 20 z" fill="#7aa2d8"/><circle cx="-60" cy="-120" r="40" fill="#f2efe8"/><path d="M 20 -150 l 60 10 l -10 50 l -60 -10 z" fill="#e8b85c"/></g>`;
  g += `<path d="M -160 -100 L 160 -100 L 130 60 L -130 60 Z" fill="#d9c08a" stroke="${K.ink}" stroke-width="5" stroke-linejoin="round"/>` + [0, 1, 2].map(i => `<path d="M -150 ${-60 + i * 40} H 150" stroke="#b39a64" stroke-width="6"/>`).join('');
  return `<g transform="translate(${x} ${y}) scale(${f1(p * 1000) / 1000})">${g}</g>`;
}
export default function renderShot(t) {
  let s = home({ mood: 'grey', dx: -18 * eio(prog(t, 22.3, 26.14)), clock: [19, 30], lampA: .25 });
  const X = 330, Y = 1600, S = 1.55;
  s += shadow(X, Y + 4, 190);
  const tgt = t < 24.9 ? [16, -10] : (t < 25.4 ? [18, 0] : [14, 14]);
  s += person('du', X, Y, S, { t, seed: 1, load: .4, nStones: 2, hunch: .25, eyes: t > 23.4 ? 'wide' : 'n', brows: 'worried', mouth: t > 25.5 ? 'o' : 'sad', look: t > 23.3 ? tgt : [10, 0] });
  s += taxDoc(790, 560, pop(t, 23.36, .45), t) + omaPhone(820, 960, pop(t, 24.96, .4), t) + basket(740, 1330, pop(t, 25.46, .4));
  s += tableEdge(1760, '#6e5a4e', '#806a5c');
  s = cam(s, 560, 1000, 1.02 + .05 * eio(prog(t, 22.3, 26.14)));
  s += dayCard(t, 22.3, 'MITTWOCH');
  return frame(s);
}
