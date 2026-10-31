// 26.36–30.78: close-up of your checklist — the pen keeps going back to the top to find where you stopped ("prüfen" 27.04, "aufgehört" 29.12), then ticks row 4
import { K, BG, tick, TX, prog, eio, lerp, f1 } from './lib.js';
const RY = i => 520 + i * 140;
export default function renderShot(t) {
  // pen tip path (x, y) through key poses
  const keys = [[26.36, 3.0], [27.0, 3.0], [27.4, 0], [28.3, 2.2], [28.6, 0.4], [29.12, 3.0], [30.78, 3.0]];
  let row = 3;
  for (let k = 0; k < keys.length - 1; k++) { const [a, ra] = keys[k], [b, rb] = keys[k + 1]; if (t >= a && t <= b) { row = lerp(ra, rb, eio(prog(t, a, b))); break; } }
  const hover = t < 27.0 ? 10 * Math.sin(t * 9) : 0;
  const writing = prog(t, 29.5, 30.1);
  const px = 300 + hover + (writing > 0 ? 40 * writing : 0), py = RY(row) + 10 - (writing > 0 ? 30 * Math.sin(writing * Math.PI) : 0);
  let rows = '';
  for (let i = 0; i < 6; i++) rows += `<rect x="250" y="${RY(i) - 34}" width="68" height="68" rx="12" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/><rect x="360" y="${RY(i) - 14}" width="${[420, 360, 450, 390, 430, 340][i]}" height="28" rx="12" fill="${K.steel}"/>
    ${i < 3 ? tick(284, RY(i) - 4, .7, 1, K.tealD) : ''}`;
  rows += tick(284, RY(3) - 4, .7, writing, K.tealD);
  const q = (t > 27.04 && t < 27.8) || (t > 29.12 && t < 29.6) ? `<g transform="translate(${f1(px + 210)} ${f1(py - 120)})"><circle r="46" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/>${TX('?', 0, 26, 70, K.amberD)}</g>` : '';
  const pen = `<g transform="translate(${f1(px)} ${f1(py)}) rotate(-35)"><path d="M 0 0 L 14 -30 L 22 -300 L -2 -300 L -6 -30 Z" fill="${K.du}" stroke="${K.ink}" stroke-width="4"/><path d="M 0 0 L -6 -30 L 14 -30 Z" fill="${K.ink}"/></g>`;
  const hx = px + 90, hy = py - 130;
  const handArm = `<path d="M 1160 ${f1(hy + 360)} L ${f1(hx + 120)} ${f1(hy + 80)} L ${f1(hx)} ${f1(hy)}" fill="none" stroke="${K.ink}" stroke-width="88" stroke-linecap="round" stroke-linejoin="round"/><path d="M 1160 ${f1(hy + 360)} L ${f1(hx + 120)} ${f1(hy + 80)} L ${f1(hx)} ${f1(hy)}" fill="none" stroke="${K.du}" stroke-width="80" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="46" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/>`;
  return `${BG('#DDE3E8')}<g transform="rotate(-2 540 900)"><rect x="190" y="380" width="760" height="980" rx="16" fill="${K.paper}" stroke="${K.ink}" stroke-width="6"/>${rows}</g>${pen}${handArm}${q}`;
}
