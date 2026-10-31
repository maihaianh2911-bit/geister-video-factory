import { K, antSide, bread, yardSide, back } from './lib.js';
// 33.12–35.3 Side view: two lanes of ants pass each other — empty to the bread, loaded back to the nest ("wiederholten Wege").
export default function renderShot(t) {
  let ants = '';
  for (let i = 0; i < 4; i++) ants += antSide(((t - 33.12) * 190 + i * 330) % 1320 - 120, 920, 1.9, t * 14 + i);
  for (let i = 0; i < 4; i++) ants += antSide(1200 - (((t - 33.12) * 190 + i * 330 + 160) % 1320), 1270, 2.1, t * 14 + i, { dir: -1, carry: 1 });
  let dots = ''; for (let i = 0; i < 40; i++) dots += `<circle cx="${i * 28}" cy="${i % 2 ? 927 : 1278}" r="9" fill="${K.trail}" opacity=".7"/>`;
  return `${yardSide(720)}${dots}${ants}`;
}
