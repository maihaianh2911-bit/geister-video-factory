// 4.82–5.88: you brush your teeth ("Zähne" 5.28) — toothbrush in the right hand moves back and forth at the mouth
import { K, OL, f1, stick, calendar, cam, prog, eio, lerp } from './lib.js';
import { bathroom, FY, FS } from './sets.js';
export default function renderShot(t) {
  const up = eio(prog(t, 4.85, 5.2)), br = Math.sin(t * 22) * 16 * eio(prog(t, 5.15, 5.3));
  const hx = lerp(670, 600, up) + br, hy = lerp(1110, 790, up);
  const brush = `<g transform="translate(${f1(hx)} ${f1(hy)}) rotate(-10)"><rect x="-10" y="-8" width="120" height="16" rx="8" fill="${K.teal}" ${OL(5)}/><rect x="-46" y="-18" width="40" height="18" rx="4" fill="${K.white}" ${OL(4)}/></g>`;
  const fig = stick(560, FY, FS, { look: 1, mouth: 'flat', hR: [hx, hy], mid: brush, hL: [470, 1100] });
  return cam(`${bathroom({ sx: 840 })}${fig}${calendar(930, 150, 1)}`, 1.3, 600, 880);
}
