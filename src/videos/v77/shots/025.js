import { stick, ground, antSide, yardSide } from './lib.js';
// 58.28–60.4 You crouch again and watch a line of ants on the ground ("Du siehst").
export default function renderShot(t) {
  const X = 800, Y = 1250;
  let ants = ''; for (let i = 0; i < 7; i++) ants += antSide(((t - 58.28) * 120 + i * 110) % 800 - 40, Y, .75, t * 14 + i);
  return `${yardSide(Y)}${ants}
    ${stick(X, Y, 1.6, { bob: 120, fL: [X - 80, Y], fR: [X + 70, Y], hL: [X - 70, Y - 320], hR: [X + 20, Y - 300], lean: -10, look: -1, lookY: .8, brow: 'up', mouth: 'smile' })}`;
}
