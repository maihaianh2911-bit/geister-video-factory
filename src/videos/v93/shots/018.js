// L11b 43.0–47.78 Through the windscreen of the orange car: the young driver (yellow cap, orange top) grips the wheel with both hands,
// eyes wide, sweating. His bubble rises on "Blase" (43.08): „Erster Tag mit Führerschein.“ (44.34) „Bitte nicht hupen.“ (46.36).
import { K, frame, cam, setStreet, person, thought, pop, prog } from './lib.js';
import { push, CU } from './base.js';
export default function renderShot(t) {
  let s = setStreet(t, { heavy: true, lx: 800 });
  s += person('fahrer', 540, 2080, 2.5, { t, seed: 17, eyes: 'wide', brows: 'worried', mouth: 'wavy', sweat: true, look: [0, -2], armL: [-120, -170], armR: [120, -170] });
  // his steering wheel (sharp foreground)
  s += `<g transform="translate(540 1560)"><ellipse rx="300" ry="110" fill="none" stroke="${K.ink}" stroke-width="50"/><ellipse rx="300" ry="110" fill="none" stroke="#3a4055" stroke-width="32"/></g><rect x="-80" y="1600" width="1240" height="400" fill="#c86a2a" stroke="${K.ink}" stroke-width="6"/>`;
  // windscreen frame (orange car body)
  s += `<path d="M -80 -80 H 1160 V 2000 H -80 Z M 70 170 H 1010 L 1050 1600 H 30 Z" fill="#e8803a" fill-rule="evenodd" stroke="${K.ink}" stroke-width="8"/>`;
  const L2 = t >= 46.2;
  s += thought(540, 420, L2 ? ['Erster Tag mit Führerschein.', 'Bitte nicht hupen.'] : ['Erster Tag mit', 'Führerschein.'], 560, 680, { p: pop(t, 43.08, .45), size: 52, w: 820, h: 220, text: L2 ? .5 + .5 * prog(t, 46.36, 46.9) : prog(t, 44.34, 45.3) });
  return frame(cam(s, 540, 1000, push(t, 43.0, 47.78, 1.0, 1.08)), { tint: ['#20305a', .1] });
}
