// L12a 50.68–53.36: two psychologists in a bright Florida office (palm trees outside) with a clipboard;
// chip FLORIDA on "Florida" (51.68), a light bulb on "fanden heraus" (52.0).
import { K, frame, cam, office, person, shadow, chip, T, prog, eio, eout, lerp, cl, pop, f1, tableEdge, mug } from './lib.js';
export default function renderShot(t) {
  let s = office({ dx: -20 * eio(prog(t, 50.68, 53.36)) });
  s += shadow(320, 1604, 180) + shadow(770, 1604, 180);
  const clip = `<g transform="translate(140 -250) rotate(10)"><rect x="-50" y="-70" width="100" height="140" rx="8" fill="#c99a5a" stroke="${K.ink}" stroke-width="5"/><rect x="-40" y="-56" width="80" height="116" fill="#fff"/><path d="M -28 -30 h 56 M -28 -6 h 56 M -28 18 h 40" stroke="#9aa0a8" stroke-width="6"/></g>`;
  const found = t > 52.0;
  s += person('gl', 320, 1600, 1.5, { t, seed: 11, armR: [140, -250], hold: clip, eyes: found ? 'wide' : 'n', brows: found ? 'up' : 'calm', mouth: found ? 'smile' : 'flat', look: [14, -6] });
  s += person('curl', 770, 1600, 1.5, { t, seed: 13, eyes: found ? 'happy' : 'n', brows: 'calm', mouth: found ? 'grin' : 'flat', look: [-14, -6], armL: found ? [-170, -500] : null, elL: [-190, -360] });
  const b = pop(t, 52.0, .45);
  if (b > 0) s += `<g transform="translate(545 600) scale(${f1(b * 1000) / 1000})"><circle cx="0" cy="0" r="120" fill="#fff3b0" opacity=".45"/><path d="M -50 10 C -80 -60 -40 -110 0 -110 C 40 -110 80 -60 50 10 L 30 50 L -30 50 Z" fill="${K.yellow}" stroke="${K.ink}" stroke-width="6"/><rect x="-30" y="50" width="60" height="40" rx="8" fill="#9aa0a8" stroke="${K.ink}" stroke-width="5"/>${[0, 1, 2, 3, 4].map(i => { const a = -Math.PI * (i + 1) / 6; return `<line x1="${f1(Math.cos(a) * 140)}" y1="${f1(-40 + Math.sin(a) * 140)}" x2="${f1(Math.cos(a) * 180)}" y2="${f1(-40 + Math.sin(a) * 180)}" stroke="${K.yellow}" stroke-width="8" stroke-linecap="round"/>`; }).join('')}</g>`;
  s += tableEdge(1730, '#c9cdd2', '#dde0e4') + mug(880, 1730, 1, '#3f7fd8', { t }) + `<rect x="160" y="1700" width="260" height="30" rx="4" fill="#fff" stroke="${K.ink}" stroke-width="4"/>`;
  s = cam(s, 540, 1000, 1.02 + .05 * eio(prog(t, 50.68, 53.36)));
  s += chip(540, 270, 'FLORIDA', { p: pop(t, 51.68, .4), size: 70, bg: K.yellow });
  return frame(s);
}
