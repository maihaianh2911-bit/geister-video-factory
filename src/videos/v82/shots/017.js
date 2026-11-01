// 58.72–60.68 more time with the family: mother, kid and father together on the sofa, hearts rise on "Familie"
import { K, kid, adult, heart, glow, fade, pop, prog, f1 } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#f6dcc0"/>` + glow(540, 700, 420, K.goldL, .7);
  // lamp
  s += `<path d="M 920 1330 L 920 620" stroke="${K.ol}" stroke-width="10"/><path d="M 840 620 L 1000 620 L 960 520 L 880 520 Z" fill="${K.gold}" stroke="${K.ol}" stroke-width="6"/>`;
  s += `<rect x="0" y="1330" width="1080" height="590" fill="#d9b48a"/>`;
  // sofa back
  s += `<rect x="70" y="900" width="940" height="330" rx="60" fill="#5f8fbf" stroke="${K.ol}" stroke-width="7"/>`;
  s += adult(260, 1330, .82, { kind: 'mom', aL: [8, 4], aR: [55, 40], mouth: 'smile', look: [10, 4] });
  s += adult(820, 1330, .86, { kind: 'dad', aL: [55, 40], aR: [8, 4], mouth: 'smile', look: [-10, 4] });
  s += kid(540, 1330, .85, { aL: [40, 30], aR: [40, 30], mouth: 'grin', brows: 'up' });
  s += `<rect x="40" y="1150" width="1000" height="180" rx="40" fill="#4f7dab" stroke="${K.ol}" stroke-width="7"/>`;
  [[400, 620, 60.24], [540, 540, 60.34], [680, 620, 60.44]].forEach(([x, y, t0]) => { const a = fade(t, t0, .2); if (a > 0) s += heart(x, y - (t - t0) * 40, .9 * pop(t, t0), K.red, { a }); });
  return s;
}
