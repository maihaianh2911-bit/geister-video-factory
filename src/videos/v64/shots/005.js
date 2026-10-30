// 7.66–10.84: the question — an ink sketch of the carriage and of an elephant drawn on paper; a red "?" lands on "Schwebebahn"
import { K, DEFS, BG, TX, grain, f1, prog, eout, eio, back, lerp } from './lib.js';
export default function renderShot(t) {
  const d1 = .2 + .8 * eio(prog(t, 7.66, 8.25)), d2 = eio(prog(t, 7.95, 8.85)); // the sketch is already started on the first frame
  const car = `<g transform="translate(540 560)"><path pathLength="1" stroke-dasharray="${f1(d1)} 1" d="M -380 -60 Q -380 -110 -330 -110 L 330 -110 Q 380 -110 380 -60 L 390 90 Q 390 130 350 130 L -350 130 Q -390 130 -390 90 Z" fill="none" stroke="${K.ink}" stroke-width="7"/>
    <path pathLength="1" stroke-dasharray="${f1(d1)} 1" d="M -20 -110 L -20 -200 L -120 -200 M 20 -110 L 20 -200 L 120 -200 M -500 -230 L 500 -230" fill="none" stroke="${K.ink}" stroke-width="7"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${-340 + i * 116}" y="-70" width="90" height="90" rx="6" fill="none" stroke="${K.ink}" stroke-width="5" opacity="${f1(prog(t, 7.95 + i * .05, 8.1 + i * .05))}"/>`).join('')}</g>`;
  // elephant outline, simple and big, pen-drawn
  const ele = d2 <= 0 ? '' : `<g transform="translate(400 1060) scale(1.45)"><path pathLength="1" stroke-dasharray="${f1(d2)} 1" d="M -200 40 C -210 -90 -80 -130 40 -120 C 120 -110 170 -90 180 -40 C 230 -60 270 -20 260 40 C 250 80 250 140 270 190 M 180 60 L 175 130 C 120 160 -80 160 -170 130 C -200 100 -200 70 -200 40 M -150 130 L -150 230 L -100 230 L -100 150 M 100 150 L 100 230 L 150 230 L 150 130" fill="none" stroke="${K.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <path pathLength="1" stroke-dasharray="${f1(d2)} 1" d="M 130 -60 C 60 -90 40 0 60 50 C 80 80 120 70 130 40" fill="none" stroke="${K.ink}" stroke-width="6"/><circle cx="205" cy="-20" r="7" fill="${K.ink}" opacity="${f1(d2)}"/></g>`;
  const q = back(prog(t, 9.24, 9.55));
  const arrow = eio(prog(t, 9.0, 9.4));
  return `${DEFS}${BG(K.paperL)}
    ${[...Array(20)].map((_, i) => `<path d="M 0 ${120 + i * 90} H 1080" stroke="#C9D3D6" stroke-width="2"/>`).join('')}
    ${car}${ele}
    ${arrow > 0 ? `<path d="M 880 1000 Q 940 860 860 720" fill="none" stroke="${K.red}" stroke-width="8" stroke-dasharray="${f1(arrow * 400)} 400" stroke-linecap="round"/>` : ''}
    ${q > 0 ? `<g transform="translate(900 1200) scale(${f1(q)}) rotate(8)">${TX('?', 0, 90, 300, K.red, 'middle', `stroke="${K.ink}" stroke-width="10" paint-order="stroke"`)}</g>` : ''}
    ${grain(t)}`;
}
