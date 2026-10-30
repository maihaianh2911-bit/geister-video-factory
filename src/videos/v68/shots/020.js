// 52.1–55.06: membrane close-up — it bends inward under a finger ("biegsam"), then a crack line shows it can tear ("reißen")
import { K, OL, f1, prog, eio, lerp } from './lib.js';
import { C } from './sets.js';
export default function renderShot(t) {
  const b = eio(prog(t, 52.5, 53.1)) * (1 - eio(prog(t, 53.3, 53.7)));
  const tear = eio(prog(t, 54.0, 54.5));
  const y0 = 900, d = 140 * b;
  const top = `M -60 ${y0} L 300 ${y0} Q 540 ${f1(y0 + d * 2)} 780 ${y0} L 1140 ${y0}`;
  const fill = `<path d="${top} L 1140 1600 L -60 1600 Z" fill="${C.white}"/><path d="${top} L 1140 -60 L -60 -60 Z" fill="${C.wall}"/>`;
  const finger = `<path d="M 540 -60 L 540 ${f1(y0 + d - 50)}" fill="none" ${OL(70)}/><circle cx="540" cy="${f1(y0 + d - 40)}" r="38" fill="${K.ink}"/>`;
  const tearL = tear > 0 ? `<path d="M 380 ${y0} l 30 26 l 22 -18 l 30 30 l 26 -22 l 30 26" fill="none" stroke="${K.red}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="300" stroke-dashoffset="${f1(300 * (1 - tear))}"/>` : '';
  return `${fill}<path d="${top}" fill="none" stroke="${K.teal}" stroke-width="22"/><path d="${top}" fill="none" ${OL(7)}/>${t < 53.8 ? finger : ''}${tearL}`;
}
