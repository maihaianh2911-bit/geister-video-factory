// L16 72.72–74.96: sunny close-up: du reads the paragraph once and smiles ("ersten Lesen" 74.0–74.3), chip "1×" with a green check; the hourglass stands still.
import { K, frame, cam, prog, eio, pop, paper, chip, check, f1, cl } from './lib.js';
import { studyRoom } from './sets.js';
import { duHG } from './base.js';
export default function renderShot(t) {
  let s = studyRoom(t, { strong: true });
  const ph = cl(prog(t, 72.8, 73.9)), got = t >= 74.0;
  s += duHG(540, 2160, 1.7, { t, seed: 1, look: [-10 + 20 * ph, got ? 4 : 14], brows: got ? 'up' : 'calm', mouth: got ? 'smile' : 'flat', eyes: got && t < 74.6 ? 'happy' : 'n' }, { s: .55, dx: 210, dy: -40, glow: .05 });
  let inner = `<rect x="-300" y="-150" width="${f1(600 * ph)}" height="110" rx="8" fill="#a6e3b0" opacity=".7"/>`;
  inner += `<g fill="#55606e">${[-130, -100, -70, -40].map((y, i) => `<rect x="-280" y="${y}" width="${[540, 520, 560, 380][i]}" height="14" rx="7"/>`).join('')}${[20, 50, 80, 110, 140].map((y, i) => `<rect x="-280" y="${y}" width="${[520, 560, 500, 540, 300][i]}" height="14" rx="7" opacity=".6"/>`).join('')}</g>`;
  s += paper(540, 1480, 680, 420, -3, inner, { lines: false });
  s = cam(s, 540, 1100, 1.0 + .05 * eio(prog(t, 72.72, 74.96)));
  if (got) s += chip(300, 300, '1×', { size: 70, bg: '#a6e3b0' }) + check(420, 300, 1.4, K.green, prog(t, 74.0, 74.3));
  return frame(s);
}
