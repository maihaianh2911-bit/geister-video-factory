// 55.72–59.8: but not every device stops at the same time ("nicht jedes Gerät" 56.34–56.88, "gleichzeitig" 57.7) — a row of devices: router and laptop go grey, fridge, lamp and torch stay lit
import { K, DEFS, BG, glow, tick, crossOut, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const a = eio(prog(t, 56.3, 56.9)), b = eio(prog(t, 57.6, 58.2));
  const dev = [
    [270, 600, `<rect x="-110" y="-40" width="220" height="80" rx="16" fill="${K.ind3}" stroke="${K.ink}" stroke-width="4"/><path d="M -60 -40 V -110 M 60 -40 V -110" stroke="${K.greyL}" stroke-width="10"/>`, 0],
    [810, 600, `<rect x="-130" y="-90" width="260" height="160" rx="10" fill="#0A0F22" stroke="${K.ink}" stroke-width="4"/><rect x="-150" y="70" width="300" height="24" rx="8" fill="${K.grey}"/>`, 0],
    [270, 1080, `<rect x="-90" y="-160" width="180" height="320" rx="20" fill="${K.white}" stroke="${K.ink}" stroke-width="4"/><path d="M -90 -40 H 90 M 60 -130 V -70 M 60 -10 V 60" stroke="${K.ink}" stroke-width="6"/>`, 1],
    [810, 1080, `<path d="M -70 -60 L 70 -60 L 40 -140 L -40 -140 Z" fill="${K.sun}" stroke="${K.ink}" stroke-width="4"/><path d="M 0 -60 V 120 M -60 120 H 60" stroke="${K.greyL}" stroke-width="12"/>`, 1],
  ];
  const s = dev.map(([x, y, svg, stays], i) => `${stays ? glow(x, y, 240, a, 'iWarm') : ''}<g transform="translate(${x} ${y})" opacity="${f1(stays ? 1 : 1 - .5 * a)}">${svg}</g>${stays ? tick(x + 130, y - 140, 1.1, b) : crossOut(x, y - 20, 150, b)}`).join('');
  return `${DEFS}${BG()}${cam(s, 1 + .04 * eio(prog(t, 55.72, 59.8)), 540, 850)}`;
}
