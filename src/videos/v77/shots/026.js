import { K, OL, card, ground, antTop, f1, prog, lerp } from './lib.js';
// 60.4–63.96 Top-down: a file of ants all turns at the same pebble ("abbiegen") and reaches the same crumb one after another ("Ziel").
export default function renderShot(t) {
  const pts = [[150, 1350], [560, 1150], [560, 1150], [700, 500]];
  const at = v => { const L1 = 1; if (v < .55) { const k = v / .55; return [lerp(150, 560, k), lerp(1350, 1150, k), Math.atan2(-200, 410) * 180 / Math.PI]; } const k = (v - .55) / .45; return [lerp(560, 700, k), lerp(1150, 500, k), Math.atan2(-650, 140) * 180 / Math.PI]; };
  let ants = '', reached = 0;
  for (let i = 0; i < 6; i++) { const v = (t - 60.4) * .32 - i * .14; if (v < 0) continue; if (v >= 1) { reached++; continue; } const [x, y, a] = at(v); ants += antTop(x, y, a, 1.5, t * 22 + i); }
  let dots = ''; for (let i = 0; i <= 40; i++) { const [x, y] = at(i / 40); dots += `<circle cx="${f1(x)}" cy="${f1(y)}" r="8" fill="${K.trail}" opacity=".6"/>`; }
  return `${ground(11)}${dots}<ellipse cx="610" cy="1205" rx="60" ry="44" fill="#A99A86" ${OL(6)}/>
    <rect x="660" y="430" width="80" height="60" rx="14" fill="${K.crumb}" ${OL(6)}/>
    ${ants}${card(760, 1060, 'ABBIEGEN', 56, prog(t, 60.72, 60.95))}${card(700, 330, 'ZIEL', 64, prog(t, 62.7, 62.9))}`;
}
