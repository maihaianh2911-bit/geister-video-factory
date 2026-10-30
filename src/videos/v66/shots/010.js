// 36.26–40.64: long before the electric fridge people preserved food — an old pantry with jars, hanging herbs and a smoked ham; the camera pans along the shelves
import { K, DEFS, BG, f1, cam, prog, eio, lerp } from './lib.js';
export function pantry(t) {
  let s = `<rect x="-60" y="-60" width="1800" height="2040" fill="url(#kOld)"/><rect x="-60" y="1200" width="1800" height="800" fill="#2A2018"/>`;
  for (let r = 0; r < 3; r++) s += `<rect x="-60" y="${560 + r * 240}" width="1600" height="22" fill="${K.wood}" stroke="${K.ink}" stroke-width="4"/>`;
  for (let i = 0; i < 12; i++) { const x = 40 + i * 130, y = 560 + (i % 3) * 240; s += `<rect x="${x}" y="${y - 120}" width="90" height="120" rx="12" fill="${K.jar}" fill-opacity=".85" stroke="${K.ink}" stroke-width="4"/><rect x="${x}" y="${y - 136}" width="90" height="22" rx="6" fill="${['#B23A2E', '#C9A24A', '#6B7B4B'][i % 3]}" stroke="${K.ink}" stroke-width="3"/>${[0, 1, 2].map(k => `<circle cx="${x + 25 + k * 20}" cy="${y - 50 - (k % 2) * 26}" r="13" fill="${['#C0392B', '#E3B341', '#7BA05B'][i % 3]}"/>`).join('')}`; }
  for (let i = 0; i < 6; i++) { const x = 120 + i * 260; s += `<path d="M ${x} 160 v 120" stroke="${K.ink}" stroke-width="4"/>${i % 2 ? `<path d="M ${x - 50} 280 Q ${x} 470 ${x + 50} 280 Z" fill="#8A3B2B" stroke="${K.ink}" stroke-width="4"/>` : `<g>${[0, 1, 2, 3].map(k => `<path d="M ${x} 280 q ${-40 + k * 26} 60 ${-30 + k * 20} 150" fill="none" stroke="#6B8F4E" stroke-width="10" stroke-linecap="round"/>`).join('')}</g>`}`; }
  return s;
}
export default function renderShot(t) {
  const px = lerp(0, -420, eio(prog(t, 36.26, 40.64)));
  return `${DEFS}<g transform="translate(${f1(px)} 0)">${pantry(t)}</g><rect x="-60" y="-60" width="1200" height="2040" fill="#C99A5A" opacity=".12"/>`;
}
