// 51.68–53.86: the contract — 700.000 € — a hand (suit sleeve, white cuff) signs with the pen
import { K, DEFS, BG, card, grain, prog, eio, back, lerp, f1 } from './lib.js';
import { fist } from './hands.js';
export default function renderShot(t) {
  const sig = eio(prog(t, 52.3, 53.6));
  const px = lerp(300, 760, sig), py = 1200 + 20 * Math.sin(sig * 30);
  return `${DEFS}${BG(K.brown)}<rect x="150" y="260" width="780" height="1120" fill="${K.paperL}" stroke="${K.ink}" stroke-width="5" transform="rotate(1.5 540 820)"/>
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M 230 ${380 + i * 54} H ${820 - (i % 3) * 70}" stroke="${K.paperD}" stroke-width="14"/>`).join('')}
    ${card(540, 920, '700.000 €', 116, prog(t, 53.0, 53.1), { sc: back(prog(t, 53.0, 53.3)), w: 820, rot: 1 })}
    <path d="M 300 1200 ${[...Array(24)].map((_, i) => { const u = i / 23; return u <= sig ? `L ${f1(lerp(300, 760, u))} ${f1(1200 + 20 * Math.sin(u * 30))}` : ''; }).join(' ')}" fill="none" stroke="#24364F" stroke-width="7" stroke-linecap="round"/>
    <g transform="translate(${f1(px)} ${f1(py)}) rotate(35)"><rect x="-12" y="-300" width="24" height="280" fill="#24364F" stroke="${K.ink}" stroke-width="4"/><path d="M -12 -20 L 0 0 L 12 -20 Z" fill="${K.gold}"/></g>${fist(px + Math.sin(.61) * 120, py - Math.cos(.61) * 120, -55, 30, .8, K.suit, { cuff: true, len: 900 })}${grain(t)}`;
}
