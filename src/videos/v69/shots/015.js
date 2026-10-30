// 47.6–51.64: if someone is unconscious or in immediate danger, dial 112 — a dashed vignette of a person collapsed on the floor, then the phone keypad shows 1-1-2 on "einhundertzwölf"
import { K, DEFS, BG, light, label, TX, f1, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const v = eout(prog(t, 47.8, 48.3));
  const d = [50.7, 50.95, 51.2].map(t0 => back(prog(t, t0, t0 + .2)));
  const vign = `<g opacity="${f1(v)}"><ellipse cx="540" cy="560" rx="360" ry="230" fill="#05080A" stroke="${K.red}" stroke-width="5" stroke-dasharray="18 12"/>
    <g fill="none" stroke="${K.mono}" stroke-width="8" stroke-dasharray="14 10" stroke-linecap="round"><circle cx="330" cy="600" r="50"/><path d="M 380 620 L 700 640 M 700 640 L 820 600 M 700 640 L 820 680 M 470 625 L 520 540"/></g>
    ${TX('BEWUSSTLOS?', 540, 420, 48, K.red)}</g>`;
  const keys = `<g transform="translate(540 1120)"><rect x="-300" y="-260" width="600" height="440" rx="40" fill="#15191C" stroke="${K.ink}" stroke-width="8"/>
    ${['1', '1', '2'].map((n, i) => d[i] > 0 ? `<g transform="translate(${-150 + i * 150} -120) scale(${f1(d[i])})">${TX(n, 0, 40, 130, K.amber)}</g>` : '').join('')}
    <circle cx="0" cy="90" r="56" fill="${d[2] > .5 ? '#3FBF6A' : '#2E5A3A'}" stroke="${K.ink}" stroke-width="6"/></g>`;
  return `${DEFS}${BG('#0E1316')}${light(540, 600, 520, .5)}${vign}${keys}`;
}
