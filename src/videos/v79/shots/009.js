// 37.44–43.9 the reversed story: ZUHAUSE 19:00 ← 2 STD. STAU ← BÜRO BIS 18:00; the pieces don't fit, the magnifier finds the contradiction
import { K, TEXT, CH, chip, kitchen, office, road, house, magnifier, prog, eio, eout, back, fade, pop, lerp } from './lib.js';
function row(y, a, icon, name, val, warn) {
  const x = lerp(-700, 0, back(a, 1.2));
  return `<g transform="translate(${x} 0)"><rect x="120" y="${y}" width="840" height="200" rx="34" fill="${K.cream}" stroke="${warn ? K.red : K.ol}" stroke-width="${warn ? 10 : 6}"/>${icon}<text x="330" y="${y + 90}" ${TEXT(50, K.ink, 'start')}>${name}</text><text x="330" y="${y + 158}" ${TEXT(56, warn ? K.red : K.accent, 'start')}>${val}</text></g>`;
}
export default function renderShot(t) {
  const a = [prog(t, 37.5, 37.95), prog(t, 38.08, 38.5), prog(t, 38.7, 39.1)];
  const bad = prog(t, 40.64, 40.9), mag = eio(prog(t, 41.88, 42.6)), res = pop(t, 42.8);
  let s = kitchen({ dim: .6 });
  s += `<text x="540" y="320" ${TEXT(50, K.cream)}>VOM ENDE ZUM ANFANG</text>`;
  s += row(370, a[0], house(225, 545, .9), 'ZUHAUSE', 'um 19:00', mag > .5);
  s += row(660, a[1], road(225, 830, 1), 'STRASSE', '2 Std. Stau', mag > .5);
  s += row(950, a[2], office(225, 1120, .95), 'BÜRO', 'bis 18:00', mag > .5);
  for (const [y, i] of [[575, 1], [865, 2]]) if (a[i] >= 1) s += `<path d="M 540 ${y} L 540 ${y + 80}" stroke="${K.cream}" stroke-width="10"/><path d="M 540 ${y + 82} l -18 -26 l 36 0 Z" fill="${K.cream}"/>`;
  if (bad > 0) s += `<g opacity="${bad}"><path d="M 470 905 l 30 -20 l 30 20 l 30 -20 l 30 20 l 30 -20" stroke="${K.red}" stroke-width="10" fill="none" stroke-linejoin="round" transform="translate(-40 0)"/><circle cx="760" cy="905" r="${40 + 6 * Math.sin(t * 8)}" fill="${K.red}"/><text x="760" y="925" ${TEXT(56, '#fff')}>?</text></g>`;
  if (mag > 0) s += magnifier(lerp(1000, 820, mag), lerp(1300, 700, mag), 1.1, -20);
  if (res > 0) s += `<g transform="translate(540 1300) scale(${res}) translate(-540 -1300)"><rect x="70" y="1240" width="940" height="110" rx="55" fill="${K.red}" stroke="${K.ol}" stroke-width="6"/><text x="540" y="1313" ${TEXT(50, '#fff')}>18:00 + 2 Std. = 20:00 ≠ 19:00</text></g>`;
  return s + chip(CH[2]);
}
