import { stick, ground, antSide, yardSide } from './lib.js';
// 58.28–60.4 You crouch again and watch a line of ants on the ground ("Du siehst").
export default function renderShot(t) {
  const X = 800, Y = 1250;
  let ants = ''; for (let i = 0; i < 7; i++) ants += antSide(((t - 58.28) * 120 + i * 110) % 800 - 40, Y, .75, t * 14 + i);
  return `${yardSide(Y)}${ants}
    ${stick(X, Y, 1.6, { bob: 120, fL: [X - 80, Y], fR: [X + 70, Y], hL: [X - 85, Y - 150], hR: [X + 75, Y - 150], lean: -4, look: -1, lookY: .8, brow: 'up', mouth: 'smile' })}`;
}
