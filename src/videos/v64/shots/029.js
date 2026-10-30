// 60.6–62.94: the fine — banknotes are counted onto the table, a red stamp 450 DM lands on "vierhundertfünfzig"
import { K, DEFS, BG, note, stamp, grain, f1, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  let n = '';
  for (let i = 0; i < 5; i++) { const p = eout(prog(t, 60.6 + i * .16, 60.9 + i * .16)); if (p > 0) n += note(lerp(1300, 520 + (i % 3 - 1) * 60, p), 860 + i * 40, (i * 37) % 20 - 10, i === 4 ? '50' : '100', 1.4); }
  return `${DEFS}${BG('#7A5A40')}${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M -60 ${200 + i * 220} H 1140" stroke="#6A4C34" stroke-width="5"/>`).join('')}
    ${n}${stamp(540, 1240, '450 DM', 120, prog(t, 60.85, 61.15), -6)}${grain(t)}`;
}
