// 42.22–45.26 no grown-up believes you: the kid explains the rising chart, both parents laugh on "glaubt"
import { K, kid, adult, bubble, T, fade, pop, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#2c3560"/><rect x="0" y="1330" width="1080" height="590" fill="#232a4d"/>`;
  const laugh = t > 43.3;
  const bob = laugh ? Math.abs(Math.sin(t * 10)) * 8 : 0;
  s += adult(620, 1330 - bob, 1.0, { kind: 'mom', mouth: laugh ? 'laugh' : 'smile', closed: laugh, aL: [8, 4], aR: [8, 4] });
  s += adult(900, 1330 - bob, 1.04, { kind: 'dad', mouth: laugh ? 'laugh' : 'smile', closed: laugh, aL: [8, 4], aR: [8, 4] });
  s += kid(220, 1330, .9, { aL: [12, 6], aR: [110, 30], mouth: t < 43.3 ? 'wow' : 'sad', brows: t < 43.3 ? 'up' : 'sad' });
  // kid's bubble: future chart
  const b = fade(t, 42.3, .3);
  s += bubble(60, 330, 420, 300, [240, 720], `<path d="M 120 600 L 200 570 L 260 585 L 330 515 L 420 465" stroke="${K.green}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M 420 465 l -40 4 m 40 -4 l -8 38" stroke="${K.green}" stroke-width="14" stroke-linecap="round"/>` + T(270, 405, 'Ich weiß es!', 46), { a: b, sc: .85 + .15 * pop(t, 42.3) });
  s += bubble(560, 230, 440, 170, [760, 520], T(780, 335, '„Ja, ja …“', 64), { a: fade(t, 43.3, .2), sc: pop(t, 43.3) });
  return s;
}
