// 10.6–13.38: the camera follows the torches up to the summit: red pin + MITTELBERG · NEBRA lands on "Nebra"; date tag stays
import { K, DEFS, card, grain, cam, prog, back, eout, eio, lerp, f1 } from './lib.js';
import { hill } from './hill.js';
export default function renderShot(t) {
  const z = lerp(1.04, 1.32, eio(prog(t, 10.6, 13.3))), cy = lerp(1000, 900, eio(prog(t, 10.6, 13.3)));
  const pin = back(prog(t, 11.4, 11.7)), py = lerp(560, 760, eout(prog(t, 11.4, 11.65)));
  const pinSvg = `<g transform="translate(540 ${f1(py)}) scale(${f1(pin * .75)})"><path d="M 0 0 Q -60 -80 -60 -130 A 60 60 0 1 1 60 -130 Q 60 -80 0 0 Z" fill="${K.red}" stroke="${K.ink}" stroke-width="6"/><circle cx="0" cy="-130" r="22" fill="${K.paperL}"/></g>`;
  return `${DEFS}${cam(hill(t) + pinSvg, z, 540, cy)}
    ${card(540, 330, '4.7.1999', 120, 1, { w: 640 })}${card(540, 520, 'MITTELBERG · NEBRA', 70, prog(t, 11.46, 11.6), { sc: back(prog(t, 11.46, 11.75)), w: 860, rot: 1.5, bg: K.paper })}${grain(t)}`;
}
