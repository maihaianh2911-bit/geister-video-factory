// 10.6–13.38: the Mittelberg near Nebra — wooded hill at night, a red pin drops on the summit (Nebra)
import { K, DEFS, BG, grain, cam, prog, eout, back, lerp, hash, f1 } from './lib.js';
export default function renderShot(t) {
  let tr = '';
  for (let i = 0; i < 40; i++) { const u = i / 39, x = 60 + u * 960, y = 1180 - 420 * Math.sin(u * Math.PI) - hash(i) * 30, h = 70 + hash(i + 3) * 50;
    tr += `<path d="M ${f1(x)} ${f1(y - h)} L ${f1(x - 30)} ${f1(y)} L ${f1(x + 30)} ${f1(y)} Z" fill="${i % 2 ? K.oliveD : K.olive}" stroke="${K.ink}" stroke-width="3"/>`; }
  const pin = back(prog(t, 11.4, 11.75)), py = lerp(380, 700, eout(prog(t, 11.4, 11.7)));
  return `${DEFS}${BG(K.paper)}${cam(`<path d="M -60 1260 Q 540 640 1140 1260 Z" fill="${K.paperD}" stroke="${K.ink}" stroke-width="6"/>${tr}
    <rect x="-60" y="1250" width="1200" height="700" fill="${K.paperD}"/>
    <g transform="translate(540 ${f1(py)}) scale(${f1(pin)})"><path d="M 0 0 Q -60 -80 -60 -130 A 60 60 0 1 1 60 -130 Q 60 -80 0 0 Z" fill="${K.red}" stroke="${K.ink}" stroke-width="6"/><circle cx="0" cy="-130" r="22" fill="${K.paperL}"/></g>`, lerp(1, 1.1, eout(prog(t, 10.6, 13.4))), 540, 900)}${grain(t)}`;
}
