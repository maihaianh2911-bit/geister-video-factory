// 1.64–3.0: close-up — the egg in the fingers just above the vinegar in the glass ("Ei in Essig")
import { K, OL, f1, prog, eio, lerp } from './lib.js';
import { closeBG, glass, egg, CGX, CGY, CS } from './sets.js';
export default function renderShot(t) {
  const d = eio(prog(t, 1.64, 2.6)), ey = lerp(470, 520, d);
  const hand = `<path d="M 1180 ${f1(ey - 230)} L ${CGX + 150} ${f1(ey - 70)}" fill="none" ${OL(36)}/><circle cx="${CGX + 128}" cy="${f1(ey - 58)}" r="40" fill="${K.ink}"/>`;
  return `${closeBG()}${glass(CGX, CGY, CS, { id: 'g2', level: .6 })}${egg(CGX + 60, ey, 2.2, { id: 'e2', rot: 20 })}${hand}`;
}
