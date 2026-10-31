import { P, R, fig, rifle, frame, tag, cashBox, prog, eout, back } from './lib.js';
// 43.9–47.59 Cause chain on paper: the uniform → armed soldiers ("bewaffnete Männer") → the theft ("Diebstahl").
export default function renderShot(t) {
  const n1 = back(prog(t, 43.9, 44.15));
  const a1 = eout(prog(t, 44.1, 44.4));
  const n2 = [44.36, 44.52, 44.68].map(x => back(prog(t, x, x + .2)));
  const glint = prog(t, 44.9, 45.3);
  const a2 = eout(prog(t, 45.35, 45.7));
  const n3 = back(prog(t, 45.7, 45.95));
  const open = eout(prog(t, 46.4, 46.7));
  const arrow = (y, p) => p > 0 ? `<path d="M 540 ${y} V ${y + 150 * p}" stroke="${P.red}" stroke-width="16" stroke-linecap="round"/>${p > .9 ? `<path d="M 500 ${y + 120} L 540 ${y + 170} L 580 ${y + 120}" fill="none" stroke="${P.red}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>` : ''}` : '';
  let sol = '';
  [380, 540, 700].forEach((x, i) => { if (n2[i] > 0) sol += `<g transform="translate(${x} 1000) scale(${n2[i]}) translate(${-x} -1000)">${fig(x, 1000, .48, { kind: 'soldier', backR: rifle, aR: -6, look: -4, brow: 'calm' })}</g>`; });
  const gl = glint > 0 && glint < 1 ? `<path d="M ${380 + 320 * glint} 650 l 10 -26 l 10 26 l 26 10 l -26 10 l -10 26 l -10 -26 l -26 -10 Z" fill="${P.white}" opacity="${Math.sin(glint * Math.PI)}"/>` : '';
  return frame(t, `${R(0, 0, 1080, 1920, P.paper)}${Array.from({ length: 20 }, (_, i) => `<path d="M 0 ${i * 96} H 1080" stroke="${P.paperDk}" stroke-width="2" opacity=".5"/>`).join('')}
    ${n1 > 0 ? `<g transform="translate(540 470) scale(${n1}) translate(-540 -470)"><circle cx="540" cy="320" r="190" fill="url(#kspot)"/>${fig(540, 470, .42, { kind: 'voigt', aR: -90, look: 10, brow: 'angry' })}</g>` : ''}
    ${arrow(500, a1)}${sol}${gl}
    ${n2[0] > 0 ? tag(860, 860, 'BEWAFFNET', n2[0], { sz: 40, rot: 4 }) : ''}
    ${arrow(1030, a2)}
    ${n3 > 0 ? `<g transform="translate(540 1270) scale(${n3}) translate(-540 -1270)">${cashBox(540, 1290, .8, open)}</g>` : ''}
    ${tag(830, 1300, 'DIEBSTAHL', back(prog(t, 45.84, 46.05)), { sz: 46, col: P.red, rot: -5 })}`);
}
