// 4.24–7.04: the power fails and the light goes out — the ceiling light flickers and dies ("erlischt"); your phone torch clicks on
import { K, DEFS, cabin, bust, phone, light, f1, prog, eio, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const fl = t < 4.36 ? 1 : t < 6.2 ? (hash(Math.floor(t * 12)) > .45 ? .8 : .15) * (1 - prog(t, 5.6, 6.2)) + .1 : 0;
  const torch = eout(prog(t, 6.5, 6.7));
  const up = eio(prog(t, 6.2, 6.6));
  const ph = [lerp(300, 330, up), lerp(1350, 1150, up)];
  const sc = `${cabin(t, { lit: fl })}
    ${bust('wom', 330, 980, 1.05, { look: -.2, lookY: -1, brow: .7, mouth: fl < .3 ? 'o' : 'flat' })}${bust('kid', 530, 1150, 1.05, { look: -.6, brow: .8 })}${bust('man', 780, 960, 1.1, { lookY: -1, brow: .6 })}
    ${bust('you', 230, 1320, 1.2, { aR: [[330, 1500], [ph[0], ph[1]]], noL: true, look: .2, lookY: -.5, brow: .5 })}${phone(ph[0], ph[1] - 50, 1.3, { torch: torch > 0 })}
    ${torch > 0 ? `<path d="M ${ph[0]} ${ph[1] - 100} L 900 500 L 1000 900 Z" fill="url(#eBeam)" opacity="${f1(.7 * torch)}"/>${light(700, 820, 480, torch)}` : ''}`;
  return `${DEFS}${sc}`;
}
