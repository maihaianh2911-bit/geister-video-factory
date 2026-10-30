// 62.38–64.36: then you hear voices outside — sound waves come through the door seam; everyone turns toward the door ("Stimmen")
import { K, DEFS, cabin, bust, light, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const turn = eio(prog(t, 62.9, 63.4));
  let w = '';
  for (let i = 0; i < 3; i++) { const u = (t * 1.1 + i / 3) % 1; w += `<path d="M ${f1(540 - 60 - 120 * u)} ${f1(700 - 90 * u)} q ${f1(-30 - 30 * u)} ${f1(110 + 60 * u)} 0 ${f1(220 + 120 * u)} M ${f1(540 + 60 + 120 * u)} ${f1(700 - 90 * u)} q ${f1(30 + 30 * u)} ${f1(110 + 60 * u)} 0 ${f1(220 + 120 * u)}" fill="none" stroke="${K.amber}" stroke-width="9" stroke-linecap="round" opacity="${f1((1 - u) * eout(prog(t, 62.5, 62.9)))}"/>`; }
  const sc = `${cabin(t, { lit: 0 })}${light(540, 900, 520, 1)}${w}
    ${bust('wom', 220, 1120, 1.1, { look: lerp(-.2, .9, turn), lookY: -.3, brow: .4, mouth: turn > .5 ? 'o' : 'flat' })}${bust('kid', 400, 1260, 1.05, { look: lerp(-.3, .9, turn), lookY: -.3, brow: .3 })}
    ${bust('man', 860, 1120, 1.1, { look: lerp(.4, -.9, turn), lookY: -.3, brow: .4, mouth: turn > .5 ? 'o' : 'flat' })}`;
  return `${DEFS}${cam(sc, 1.0, 540, 950)}`;
}
