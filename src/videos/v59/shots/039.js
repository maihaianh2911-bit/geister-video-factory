// 63.6–65.56: the phone on the call: the dispatcher's voice comes in waves, the father nods and follows each instruction.
import { K, DEFS, FG, prog, back, phone, TX, head } from './lib.js';
export default function renderShot(t) {
  let bars = '';
  for (let i = 0; i < 9; i++) { const h = 20 + 70 * Math.abs(Math.sin(t * 9 + i * 1.3)) * (t > 63.7 ? 1 : .2); bars += `<rect x="${-64 + i * 16}" y="${60 - h / 2}" width="10" height="${h}" rx="5" fill="${K.safe}"/>`; }
  const scr = `<rect x="-82" y="-160" width="164" height="318" rx="16" fill="#0E3A2A"/>${TX('112', 0, -90, 34, '#FFFFFF')}
    <g transform="translate(0 -30)"><path d="M -30 10 Q -30 -30 0 -30 Q 30 -30 30 10" stroke="#fff" stroke-width="6" fill="none"/><rect x="-36" y="0" width="14" height="26" rx="6" fill="#fff"/><rect x="22" y="0" width="14" height="26" rx="6" fill="#fff"/></g>${bars}`;
  const nods = [63.9, 64.5, 65.1].reduce((a, x) => a + 10 * Math.sin(Math.PI * Math.max(0, Math.min(1, (t - x) / .3))), 0);
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#1A2228"/>
    <ellipse cx="400" cy="800" rx="500" ry="500" fill="url(#vCold)" opacity=".5"/>
    <g transform="translate(220 640) rotate(${nods})"><path d="M -280 700 Q -260 400 -100 360 L 120 360 Q 280 400 300 700 Z" fill="${K.vTop}" stroke="#0B0F12" stroke-width="8"/>${head('v', 0, 120, 1.9, { brow: 'worry', mouth: 'tight', look: 14, eyeS: 1.05 })}</g>
    ${phone(740, 760, 1.55, 6, scr, .7)}
    ${FG(1430)}`;
}
