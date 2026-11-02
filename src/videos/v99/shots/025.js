// L15a 65.54–68.6: evening, close-up of du at his desk under the warm desk lamp; a small worry cloud hovers above his head and on "Tatsache" (67.6) a red stamp TATSACHE slams onto it.
import { K, frame, cam, prog, eio, person, pool } from './lib.js';
import { room } from './sets.js';
import { cloud } from './clouds.js';
import { stamp } from './props.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 21, mm: 0, strong: true, light: .6 });
  s += pool(160, 700, 420, 520, '#ffc46b', .45);
  // desk lamp (sharp) left
  s += `<path d="M 60 1300 L 140 900 L 260 760" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M 200 700 L 340 700 L 300 820 L 220 840 Z" fill="#d9a35e" stroke="${INK}" stroke-width="6"/>`;
  s += person('du', 600, 2230, 1.7, { t, seed: 1, look: [-4, -14], brows: 'worried', mouth: 'frown', rimL: '#ffc46b' });
  const c = eio(prog(t, 65.6, 66.2));
  s += cloud(600, 420, 460, { t, seed: 11, dark: .8, a: c, p: c > 0 ? 1 : 0, lines: ['Sorge'], size: 64 });
  s += stamp(600, 440, 'TATSACHE', 64, prog(t, 67.55, 67.8), { rot: -9 });
  return frame(cam(s, 600, 900, 1.0 + .06 * eio(prog(t, 65.54, 68.6))));
}
