// 40.36–43.18: customers can't place new orders ("keine neuen Bestellungen" 41.0–41.6) — a shop page on a phone: the order button is tapped and turns into a red error
import { K, DEFS, BG, phone, reach, TX, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const tap = eio(prog(t, 40.6, 41.3)), err = t > 41.6;
  const scr = `<rect x="-80" y="-170" width="160" height="150" rx="12" fill="${K.ind3}"/><ellipse cx="0" cy="-95" rx="50" ry="34" fill="${K.bread}"/>${[0, 1].map(i => `<rect x="-80" y="${-5 + i * 30}" width="${140 - i * 50}" height="14" rx="7" fill="${K.grey}"/>`).join('')}
    <rect x="-80" y="90" width="160" height="60" rx="30" fill="${err ? K.red : K.green}"/>${err ? `<path d="M -16 106 L 16 134 M 16 106 L -16 134" stroke="${K.white}" stroke-width="10" stroke-linecap="round"/>` : `<path d="M -20 120 h 40 M 8 106 l 14 14 l -14 14" stroke="${K.ink}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`}`;
  return `${DEFS}${BG()}${cam(`${phone(540, 860, 2.3, scr)}${reach(1250, 1900, lerp(900, 560, tap), lerp(1500, 1170, tap), 1.4, '#8A5A3C')}`, 1, 540, 900)}`;
}
