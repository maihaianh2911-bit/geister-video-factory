// 18.18–20.7: first help calm the others — you crouch to the child, palms down, speaking softly; the tears stop on "beruhigen"
import { K, DEFS, cabin, bust, light, label, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const calm = eio(prog(t, 19.2, 20.0));
  const pat = Math.sin(t * 5) * 14;
  const sc = `${cabin(t, { lit: 0 })}${light(560, 960, 520, 1)}
    ${bust('wom', 300, 900, 1.2, { look: .5, brow: lerp(.9, .3, calm), mouth: calm > .5 ? 'flat' : 'down' })}
    ${bust('kid', 520, 1090, 1.3, { look: .7, brow: lerp(1, .3, calm), mouth: calm > .5 ? 'flat' : 'cry', tears: 1 - calm, closed: calm < .4 })}
    ${bust('you', 820, 1060, 1.3, { look: -.8, lookY: .4, brow: .2, mouth: 'talk', t, aL: [[700, 1220], [620, 1240 + pat]], aR: [[900, 1250], [860, 1320]] })}`;
  return `${DEFS}${cam(sc, 1.05, 560, 1000)}${label(540, 290, '1  RUHE', eout(prog(t, 18.3, 18.6)), K.amber, 64)}`;
}
