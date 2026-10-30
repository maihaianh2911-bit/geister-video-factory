import { K, BG, hash, f1 } from './lib.js';
export function soilBg(seed = 0) { return `${BG(K.soilD)}${[...Array(34)].map((_, i) => `<circle cx="${f1(hash(i + seed) * 1100)}" cy="${f1(hash(i * 3 + seed) * 1950)}" r="${f1(16 + hash(i + 7 + seed) * 40)}" fill="${K.soil}" opacity=".6"/>`).join('')}
  ${[...Array(10)].map((_, i) => `<path d="M ${f1(hash(i + 50 + seed) * 1080)} ${f1(hash(i + 70 + seed) * 1900)} q 60 40 140 20 q 50 -10 90 30" fill="none" stroke="#2A1F16" stroke-width="10" stroke-linecap="round" opacity=".7"/>`).join('')}`; }
