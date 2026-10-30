// 62.36–64.66: then the message goes out — a bar appears, the send arrow flies off (doch raus)
import { K, DEFS, BG, phone, bars, grain, cam, prog, eio, eout, lerp, f1, TX } from './lib.js';
export default function renderShot(t) {
  const n = t > 62.9 ? 1 : 0, fly = eio(prog(t, 63.2, 63.9));
  const scr = `${bars(60, 80, n, 1.4, n ? '#2F7A55' : K.red)}<rect x="20" y="170" width="160" height="70" rx="12" fill="#B9C9C2"/>${t > 64 ? TX('✓', 100, 220, 44, '#2F7A55') : ''}<rect x="50" y="300" width="100" height="50" rx="25" fill="${K.red}"/>`;
  const env = fly > 0 && fly < 1 ? `<g transform="translate(${f1(lerp(540, 980, fly))} ${f1(lerp(1100, 200, fly))}) rotate(-30) scale(${f1(1.6 - fly)})"><rect x="-70" y="-45" width="140" height="90" fill="${K.paperL}" stroke="${K.ink}" stroke-width="5"/><path d="M -70 -45 L 0 10 L 70 -45" fill="none" stroke="${K.ink}" stroke-width="5"/></g>` : '';
  return `${DEFS}${BG('#B7BFC0')}${[...Array(12)].map((_, i) => `<path d="M ${i * 100 - 40} 0 V 1920" stroke="#8C9496" stroke-width="3"/>`).join('')}${cam(phone(540, 880, 2.6, -3, scr), 1, 540, 880)}${env}${grain(t)}`;
}
