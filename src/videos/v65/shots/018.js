// 52.82–55.68: a female mosquito (thin antennae) also lands — on a juicy stem — and drinks sugary plant sap ("Zuckerquellen")
import { K, DEFS, BG, vig, chip, mosquito, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const land = eio(prog(t, 52.82, 53.6));
  const mx = lerp(-160, 470, land), my = lerp(420, 700, land);
  const sip = eout(prog(t, 53.7, 54.2)), g = eout(prog(t, 54.3, 54.7));
  const sc = `${BG('url(#mDusk)')}
    <path d="M 640 1500 Q 600 1100 650 500" fill="none" stroke="#5C9A52" stroke-width="40"/><path d="M 640 1500 Q 600 1100 650 500" fill="none" stroke="#7FBF6A" stroke-width="16"/>
    <path d="M 630 1000 Q 860 900 960 1000 Q 840 1080 630 1040 Z" fill="${K.leaf}" stroke="${K.ink}" stroke-width="3"/>
    <path d="M 640 760 Q 420 640 330 720 Q 450 800 640 790 Z" fill="${K.leaf}" stroke="${K.ink}" stroke-width="3"/>
    <circle cx="628" cy="790" r="${f1(12 + 6 * g)}" fill="#D9F2A8" stroke="${K.ink}" stroke-width="2"/><circle cx="628" cy="790" r="${f1(70 * g)}" fill="url(#mLamp)" opacity="${f1(.8 * g)}"/>
    ${mosquito(mx, my, 1.55, { t, wings: land < 1 ? 1 : 0, sip, ang: lerp(20, 10, land) })}`;
  return `${DEFS}${cam(sc, lerp(1, 1.08, eio(prog(t, 52.82, 55.68))), 560, 760)}${chip(780, 300, 'WEIBCHEN', prog(t, 52.95, 53.25), K.sun, 48)}${vig()}`;
}
