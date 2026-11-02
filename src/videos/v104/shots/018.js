// L11a 59.06–61.6: week nine (card WOCHE 9); close-up of du's feet on the doorstep tiles: hands pull the white sneakers on, heel slips in
// on "ziehst die Schuhe an" (60.76–61.44), a quick tug on the laces.
import { K, frame, cam, prog, eio, pop, label, f1 } from './lib.js';
const INK = K.ink;
function shoe(x, y, s, on) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><path d="M -150 40 Q -160 -60 -40 -80 L 60 -90 Q 150 -80 170 20 L 170 50 L -150 50 Z" fill="#f4f4f0" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><path d="M -150 40 H 170" stroke="#c9ccd2" stroke-width="12"/><path d="M -20 -78 L 40 -40 M 0 -84 L 60 -48 M 20 -88 L 80 -54" stroke="#c9ccd2" stroke-width="7" stroke-linecap="round"/><path d="M 10 -88 q 40 -50 80 -10" stroke="#9aa0a8" stroke-width="6" fill="none" opacity="${on.toFixed(2)}"/></g>`;
}
export default function renderShot(t) {
  let s = `<rect x="-100" y="-100" width="1280" height="2120" fill="#8f8a84"/><g stroke="#7a756f" stroke-width="5">${Array.from({ length: 8 }, (_, i) => `<path d="M -100 ${200 + i * 200} H 1180"/><path d="M ${-100 + ((i % 2) * 150) + 0} ${200 + i * 200} v 200"/>`).join('')}</g>`;
  s += `<rect x="-100" y="-100" width="1280" height="420" fill="#ffd98a"/><rect x="-100" y="300" width="1280" height="30" fill="#6e4a34"/>`; // door light strip at the top
  const on1 = eio(prog(t, 60.0, 60.7)), on2 = eio(prog(t, 60.76, 61.44));
  // legs (black) and shoes; foot slides in → shoe moves up/left into place
  for (const [x, on] of [[270, on1], [800, on2]]) {
    s += `<path d="M ${x + 20} 300 L ${x + 20} ${f1(820 + 40 * (1 - on))}" stroke="${INK}" stroke-width="56" stroke-linecap="round"/>`;
    s += shoe(x, 880 + 90 * (1 - on), 1.12, on);
    // hand pulling the heel
    const hx = x - 150 + 40 * on, hy = 800 + 80 * (1 - on);
    s += `<path d="M ${hx - 260} 380 Q ${hx - 160} ${hy - 160} ${hx} ${hy}" stroke="${INK}" stroke-width="90" fill="none" stroke-linecap="round"/><path d="M ${hx - 260} 380 Q ${hx - 160} ${hy - 160} ${hx} ${hy}" stroke="${K.du}" stroke-width="74" fill="none" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="42" fill="${INK}"/>`;
  }
  s = cam(s, 540, 760, 1.08 + .06 * eio(prog(t, 59.06, 61.6)));
  s += label('WOCHE 9', 540, 250, 104, { p: pop(t, 59.1, .45) });
  return frame(s);
}
