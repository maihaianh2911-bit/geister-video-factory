// 172.96–179.67: four simple ways to phrase a request – try them right away
import { K, bg, fade, pop, chip, headline, T } from './lib.js';
export default function renderShot(t) {
  const cols = [K.purple, K.orange, K.blue, K.green];
  let g = '';
  [0, 1, 2, 3].forEach(i => {
    const t0 = 174.38 + i * .18, x = 280 + (i % 2) * 520, y = 720 + Math.floor(i / 2) * 330, p = pop(t, t0);
    g += `<g opacity="${fade(t, t0, .2)}" transform="translate(${x} ${y}) scale(${p})"><rect x="-210" y="-140" width="420" height="280" rx="40" fill="${cols[i]}"/>${T(0, 60, String(i + 1), 170, { fill: '#fff' })}</g>`;
  });
  return bg(K.cream) + headline(t, 300, '4 EINFACHE WEGE', 100, { mark: { word: '4', t: 174.38 } })
    + chip(540, 440, 'EINE BITTE ZU FORMULIEREN', { size: 46, bg: K.ink2, a: fade(t, 176.58) }) + g
    + chip(540, 1290, 'SOFORT AUSPROBIEREN', { size: 52, bg: K.green, a: fade(t, 178.62), sc: pop(t, 178.62) });
}
