// 24.02–26.3: the signal travels along a sensory nerve (Gefühlsnerv) from the palate up into the head
import { K, DEFS, BG, headProfile, cam, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const nerve = eio(prog(t, 24.2, 25.5));
  const head = `<g transform="translate(480 800) scale(1.85)">${headProfile(t, { id: 'o', ice: 1, cold: .8, showNerve: true, nerve, pulse: prog(t, 24.2, 25.5) * .6 })}</g>`;
  const z = lerp(1.25, 1.12, eio(prog(t, 24.02, 26.3)));
  return `${DEFS}${BG(K.bg)}${cam(head, z, 620, 860)}`;
}
