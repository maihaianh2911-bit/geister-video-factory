// 53.02–55.72: they are no longer matched continuously ("nicht mehr laufend" 53.54–54.02, "abgeglichen" 54.86) — the sync links turn red and break one after another
import { K, DEFS, BG, prog, eio } from './lib.js';
import { panels } from './018.js';
export default function renderShot(t) {
  return `${DEFS}${BG()}${panels(t, [1, 1, 1], [prog(t, 53.5, 53.6), prog(t, 54.0, 54.1), prog(t, 54.8, 54.9)])}`;
}
