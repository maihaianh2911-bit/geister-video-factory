import { antSide, bread, breadSide, nestSide, yardSide } from './lib.js';
// 14.2–15.88 Low side view: a file of ants marches along exactly the same line toward the bread ("derselben Strecke").
export default function renderShot(t) {
  let ants = '';
  for (let i = 0; i < 6; i++) { const x = ((t - 14.2) * 190 + i * 300) - 380; ants += antSide(x, 1150, 2.6, t * 14 + i, {}); }
  return `${yardSide(1150)}${breadSide(1020, 1150, 1.8)}${nestSide(20, 1150, 1.5)}${ants}`;
}
