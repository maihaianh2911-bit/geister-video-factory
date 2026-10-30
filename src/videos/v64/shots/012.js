// 21.62–25.48: four years old, about 700 kilo — Tuffi on a big platform scale; card 4 JAHRE, the dial needle swings to 700
import { K, DEFS, BG, tuffi, card, HL, TX, grain, f1, prog, eout, eio, back, lerp, ring } from './lib.js';
export default function renderShot(t) {
  const step = eio(prog(t, 21.7, 22.3));
  const tx = lerp(250, 470, step);
  const on = prog(t, 22.2, 22.4);
  const needle = t < 23.9 ? lerp(0, 0.3, on) * Math.min(1, 1) : 1;
  const sw = eout(prog(t, 23.62, 23.9)); // needle swings up to 700 and lands on the word
  const val = t < 23.9 ? lerp(0.25 * on + 0.05 * Math.sin(t * 9) * on, 1, sw) : 1 - 0.06 * ring(t, 23.9, 1.6, 3);
  const ang = -120 + 240 * Math.max(0, Math.min(1.05, val * 700 / 1000));
  let ticks = '';
  for (let i = 0; i <= 10; i++) { const a = (-120 + 24 * i - 90) * Math.PI / 180; ticks += `<path d="M ${f1(Math.cos(a) * 150)} ${f1(Math.sin(a) * 150)} L ${f1(Math.cos(a) * 175)} ${f1(Math.sin(a) * 175)}" stroke="${K.ink}" stroke-width="${i % 5 ? 4 : 8}"/>`; if (i % 5 === 0) ticks += TX(String(i * 100), Math.cos(a) * 120, Math.sin(a) * 120 + 14, 34, K.ink); }
  const dial = `<g transform="translate(540 470)"><circle r="200" fill="${K.paperL}" stroke="${K.ink}" stroke-width="12"/>${ticks}${TX('KG', 0, 110, 40, K.inkL)}
    <g transform="rotate(${f1(ang)})"><path d="M -8 20 L 0 -165 L 8 20 Z" fill="${K.red}" stroke="${K.ink}" stroke-width="3"/></g><circle r="16" fill="${K.ink}"/></g>
    <path d="M 540 670 V 1160" stroke="${K.steel}" stroke-width="30"/>`;
  return `${DEFS}${BG()}<rect x="-60" y="1160" width="1200" height="800" fill="#B5A88E"/>
    ${dial}<rect x="250" y="1150" width="600" height="40" fill="${K.steelL}" stroke="${K.ink}" stroke-width="6"/>
    ${tuffi(tx, 1150 - 2, .95, { walk: step < 1 ? t * 8 : 0, ear: .3, tr: .2 })}
    ${card(290, 1290, '4 JAHRE', 64, back(prog(t, 22.38, 22.6)), { rot: -4 })}
    ${t > 23.9 ? card(790, 1290, '≈ 700 KG', 64, back(prog(t, 24.0, 24.25)), { rot: 3, col: K.red }) : ''}${grain(t)}`;
}
