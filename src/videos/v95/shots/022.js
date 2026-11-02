// L15a 59.40–61.72: close on the speaker: it turns from red to green on "nicht faul" (59.92–60.52); label "FREUNDLICHKEIT ≠ FAUL".
import { K, frame, cam, speaker, label, pool, prog, eio, pop, lerp } from './lib.js';
import { room } from './sets.js';
const mix = (a, b, p) => { const h = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)); const A = h(a), B = h(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], p)).toString(16).padStart(2, '0')).join(''); };
export default function renderShot(t) {
  const g = eio(prog(t, 59.92, 60.6));
  let s = room(t, { mood: 'amber', strong: true });
  s += pool(540, 860, 420, 420, mix('#ff6a5a', '#7fe0a0', g), .4);
  s += speaker(540, 900, 2.2, { t, col: mix('#d9493f', '#3c9a5f', g), sh: mix('#a8322b', '#2c7a49', g), talk: .6, rot: 0, face: g > .5 ? `<path d="M -40 -70 Q -20 -84 0 -70 M 10 -70 Q 30 -84 50 -70" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>` : `<path d="M -54 -66 L -14 -52 M 14 -52 L 54 -66" stroke="#fff" stroke-width="9" stroke-linecap="round"/>` });
  s = cam(s, 540, 960, 1.0 + .06 * eio(prog(t, 59.4, 61.72)));
  s += label('FREUNDLICHKEIT', 540, 240, 86, { fill: '#7fe0a0', p: pop(t, 59.4, .4) });
  s += label('MACHT NICHT FAUL', 540, 360, 72, { fill: '#fff', p: pop(t, 60.24, .4) });
  return frame(s);
}
