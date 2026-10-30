// 11.088–13.553: the date — an archive page; the red stamp 24.07.2010 lands on "zweitausendzehn"
import { K, DEFS, BG, stamp, grain, TX, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const slide = eout(prog(t, 11.1, 11.5));
  const page = `<g transform="translate(${f1(lerp(1100, 0, slide))} 0) rotate(-2 540 900)"><rect x="140" y="260" width="800" height="1100" fill="${K.paperL}" stroke="${K.ink}" stroke-width="5"/>
    ${[...Array(9)].map((_, i) => `<rect x="200" y="${700 + i * 64}" width="${f1(560 + 120 * Math.sin(i * 2.1))}" height="20" fill="${K.paperD}"/>`).join('')}
    <rect x="200" y="320" width="420" height="300" fill="${K.c3}" stroke="${K.ink}" stroke-width="4"/>${[...Array(18)].map((_, i) => `<circle cx="${230 + (i % 9) * 46}" cy="${f1(500 + Math.floor(i / 9) * 60 + 8 * Math.sin(i))}" r="18" fill="${K.c4}" stroke="${K.ink}" stroke-width="2"/>`).join('')}
    ${TX('DUISBURG', 780, 400, 44, K.ink)}${TX('JULI', 780, 470, 40, K.inkL)}</g>`;
  return `${DEFS}${BG(K.paperD)}${grain(5)}${page}${stamp(560, 1120, '24.07.2010', prog(t, 12.35, 12.9), 92, -7)}`;
}
