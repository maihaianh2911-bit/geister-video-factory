// L1 5.88–9.82: close-up young du; quick push on "staunen" (6.26), eyes wide. Bubble with typical small mistakes (spilled coffee, crumpled
// page) pops at 7.6; on "Fehler" (8.22) a red cross strikes it out: these are NOT the regrets.
import { K, frame, cam, prog, eio, pop, person, f1, op } from './lib.js';
import { room } from './sets.js';
import { memBubble } from './sets3.js';
const INK = K.ink;
function mistakes(t) {
  let s = `<rect x="-220" y="-140" width="440" height="280" fill="#e9eef2"/>`;
  s += `<g transform="translate(-90 20) rotate(80)"><path d="M -40 -80 L 40 -80 L 32 0 L -32 0 Z" fill="#f2efe8" stroke="${INK}" stroke-width="5"/></g><path d="M -60 50 C -10 40 30 70 10 90 C -30 110 -90 90 -60 50 Z" fill="#7a4a2e"/>`;
  s += `<g transform="translate(100 10)"><path d="M -60 -50 L -10 -66 L 30 -40 L 64 -56 L 56 10 L 70 50 L 10 64 L -30 46 L -66 56 L -50 0 Z" fill="#fbf8ef" stroke="${INK}" stroke-width="5"/><path d="M -40 -20 L 30 -10 M -30 20 L 40 26" stroke="#b9b2a4" stroke-width="6"/></g>`;
  return s;
}
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', strong: true, hh: 20, mm: 15 });
  const w = t > 6.26;
  s += person('du', 470, 2090, 1.75, { t, seed: 1, look: w ? [0, 0] : [6, -4], eyes: w ? 'wide' : 'n', brows: w ? 'up' : 'calm', mouth: w ? 'o' : 'small', drops: [6.26] });
  const bp = pop(t, 7.6, .45);
  const x = eio(prog(t, 8.22, 8.6));
  let inner = mistakes(t);
  if (x > 0) inner += `<path d="M -150 -100 L ${f1(-150 + 300 * Math.min(1, x * 2))} ${f1(-100 + 200 * Math.min(1, x * 2))}" stroke="#d9493f" stroke-width="22" stroke-linecap="round"/>` + (x > .5 ? `<path d="M 150 -100 L ${f1(150 - 300 * (x - .5) * 2)} ${f1(-100 + 200 * (x - .5) * 2)}" stroke="#d9493f" stroke-width="22" stroke-linecap="round"/>` : '');
  s += memBubble(740, 400, 420, 280, 660, 660, bp, inner, 'm3', { sepia: 0, a: 1 - .45 * prog(t, 8.9, 9.8) });
  const z = 1.0 + .08 * eio(prog(t, 6.2, 6.6)) + .04 * eio(prog(t, 6.6, 9.82));
  return frame(cam(s, 520, 900, z));
}
