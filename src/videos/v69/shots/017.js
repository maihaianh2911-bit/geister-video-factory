// 54.18–57.32: and don't try to climb through the cabin roof — the man reaches up to the roof hatch; red NO-sign on "Kabinendach"
import { K, DEFS, cabin, bust, light, crossOut, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const up = eio(prog(t, 54.3, 55.3));
  const x = eout(prog(t, 55.7, 56.2));
  const hatch = `<rect x="390" y="120" width="300" height="110" fill="#14191D" stroke="${K.ink}" stroke-width="6"/><path d="M 390 120 L ${f1(390 + 60 * up)} ${f1(80 - 20 * up)}" stroke="${K.ink}" stroke-width="8"/>`;
  const sc = `${cabin(t, { lit: 0 })}${hatch}${light(540, 600, 560, 1)}${bust('man', 540, 900, 1.2, { lookY: -1, brow: .6, mouth: 'flat', aL: [[lerp(420, 440, up), lerp(1100, 560, up)], [lerp(430, 470, up), lerp(1250, 270, up)]], aR: [[lerp(660, 640, up), lerp(1100, 560, up)], [lerp(650, 610, up), lerp(1250, 270, up)]] })}`;
  return `${DEFS}${cam(sc, 1.0, 540, 900)}${crossOut(540, 600, 380, x)}`;
}
