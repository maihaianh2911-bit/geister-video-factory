import { K, antSide, bread, yardSide, back } from './lib.js';
// 33.12–35.3 Side view: two lanes of ants pass each other — empty to the bread, loaded back to the nest ("wiederholten Wege").
export default function renderShot(t) {
  let ants = '';
  for (let i = 0; i < 5; i++) ants += antSide(((t - 33.12) * 160 + i * 230) % 1150 - 60, 1160, 1.3, t * 14 + i);
  for (let i = 0; i < 5; i++) ants += antSide(1140 - (((t - 33.12) * 160 + i * 230 + 100) % 1150), 1340, 1.5, t * 14 + i, { dir: -1, carry: 1 });
  let dots = ''; for (let i = 0; i < 40; i++) dots += `<circle cx="${i * 28}" cy="${i % 2 ? 1165 : 1345}" r="7" fill="${K.trail}" opacity=".7"/>`;
  return `${yardSide(1050)}${dots}${ants}`;
}
