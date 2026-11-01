// 39.18–42.22 no money: the piggy bank shakes empty ("0,00 €" on "Geld"); mother's big hand says "Nein." on "entscheiden"
import { K, kid, adult, bubble, chip, T, fade, pop, prog, eio, f1 } from './lib.js';
function piggy(x, y, s, r) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(r)}) scale(${s})"><ellipse cx="0" cy="0" rx="120" ry="90" fill="#f4a3b4" stroke="${K.ol}" stroke-width="6"/><ellipse cx="118" cy="-4" rx="30" ry="34" fill="#f08aa0" stroke="${K.ol}" stroke-width="6"/><circle cx="112" cy="-10" r="6" fill="${K.ol}"/><circle cx="126" cy="4" r="6" fill="${K.ol}"/><path d="M 40 -76 L 60 -116 L 80 -70" fill="#f08aa0" stroke="${K.ol}" stroke-width="6" stroke-linejoin="round"/><circle cx="66" cy="-30" r="9" fill="${K.ol}"/><rect x="-30" y="-94" width="60" height="12" rx="6" fill="${K.ol}"/><rect x="-80" y="70" width="34" height="40" rx="10" fill="#f08aa0" stroke="${K.ol}" stroke-width="6"/><rect x="40" y="70" width="34" height="40" rx="10" fill="#f08aa0" stroke="${K.ol}" stroke-width="6"/></g>`;
}
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#2c3560"/><rect x="0" y="1330" width="1080" height="590" fill="#232a4d"/>`;
  const shake = t < 40.2 ? Math.sin(t * 40) * 14 * Math.min(1, (t - 39.18) * 4) : 0;
  // kid holds the piggy bank upside down over his head
  s += kid(330, 1330, 1.0, { aL: [150, 20], aR: [150, 20], mouth: t > 39.8 ? 'sad' : 'flat', brows: 'worried', look: [0, -14] });
  s += piggy(330, 790 + shake * .3, .9, 180 + shake);
  s += chip(330, 600, '0,00 €', { a: fade(t, 39.7), sc: pop(t, 39.7), bg: K.red, size: 56 });
  // mother: decides for you
  const m = fade(t, 40.6, .4);
  s += adult(1000 - 60 * m, 1330, 1.05, { kind: 'mom', aL: [130, 30], aR: [10, 6], mouth: 'flat', look: [-12, 6], a: f1(m * 100) / 100 });
  s += bubble(520, 330, 300, 170, [790, 580], T(670, 440, '„Nein.“', 72), { a: fade(t, 41.36, .2), sc: pop(t, 41.36) });
  return s;
}
