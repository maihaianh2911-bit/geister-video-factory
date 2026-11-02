// L12b 53.30–56.14: a note "SOFORT ERLEDIGEN" is struck through in red on "nicht" (54.54); stamp "NICHT NÖTIG" on "erledigen" (55.06).
import { K, frame, cam, paper, T, pool, prog, eio, pop, f1 } from './lib.js';
import { office } from './sets.js';
export default function renderShot(t) {
  let s = cam(office(t), 540, 960, 1.2);
  s += `<rect width="1080" height="1920" fill="#1d2a33" opacity=".35"/>` + pool(540, 860, 420, 380, '#fff3b0', .25);
  const st = eio(prog(t, 54.54, 54.9));
  let inner = T(0, -120, 'Aufgabe:', 44, { fill: '#55606e', w: 700 }) + T(0, -10, 'SOFORT', 104, { fill: K.txt }) + T(0, 100, 'ERLEDIGEN', 84, { fill: K.txt });
  inner += `<path d="M -260 -40 L ${f1(-260 + 520 * st)} ${f1(-40 + 70 * st)}" stroke="${K.red}" stroke-width="18" stroke-linecap="round"/>`;
  inner += `<path d="M -240 60 L ${f1(-240 + 480 * eio(prog(t, 54.75, 55.05)))} ${f1(60 + 40 * eio(prog(t, 54.75, 55.05)))}" stroke="${K.red}" stroke-width="18" stroke-linecap="round"/>`;
  const z = 1 + .05 * eio(prog(t, 53.3, 56.14));
  s += `<g transform="translate(540 860) scale(${z}) translate(-540 -860)">${paper(540, 860, 680, 520, -3, inner, { lines: false })}</g>`;
  const p = pop(t, 55.06, .35);
  if (p > 0) s += `<g transform="translate(560 1240) rotate(-8) scale(${f1(Math.max(.01, p) * 1000) / 1000})"><rect x="-300" y="-70" width="600" height="140" rx="16" fill="none" stroke="${K.green}" stroke-width="12"/>${T(0, 26, 'NICHT NÖTIG', 76, { fill: K.green })}</g>`;
  return frame(s);
}
