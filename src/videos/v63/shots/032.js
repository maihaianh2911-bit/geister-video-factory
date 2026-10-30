// 60.38–62.36: no reception down there — phone screen KEIN NETZ, empty bars
import { K, DEFS, BG, phone, bars, grain, cam, prog, eout, back, TX } from './lib.js';
export default function renderShot(t) {
  const k = back(prog(t, 61.2, 61.5));
  const scr = `${bars(60, 80, 0, 1.4, K.red)}<rect x="10" y="170" width="180" height="70" rx="12" fill="${K.paperL}" stroke="${K.red}" stroke-width="5" transform="translate(100 205) scale(${k}) translate(-100 -205)"/>${TX('KEIN NETZ', 100, 216, 28, K.red, 'middle', `transform="translate(100 205) scale(${k}) translate(-100 -205)"`)}<rect x="50" y="300" width="100" height="50" rx="25" fill="#9AA3A6"/>`;
  return `${DEFS}${BG('#B7BFC0')}${[...Array(12)].map((_, i) => `<path d="M ${i * 100 - 40} 0 V 1920" stroke="#8C9496" stroke-width="3"/>`).join('')}${cam(phone(540, 880, 2.6, -3, scr), 1, 540, 880)}${grain(t)}`;
}
