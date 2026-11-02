// L2b 7.06–10.48: office daylight, medium two-shot. "DAS ÜBERRASCHENDE" (7.34); du says "Nein." (8.38); the colleague smiles calmly and nods, a green check appears (9.24 "kaum jemand").
import { frame, cam, shadow, person, speech, pop, prog, eio, label, office2, desk, nod, check, K } from './all.js';
export default function renderShot(t) {
  let s = office2(t);
  s += shadow(330, 1640) + shadow(770, 1640);
  s += person('du', 330, 1640, .95, { t, seed: 1, look: [14, 0], brows: t > 8.3 ? 'calm' : 'worried', mouth: t > 8.3 && t < 8.9 ? 'talk' : 'small' });
  const okay = t >= 9.04;
  s += person('kol', 770, 1640, .95, { t, seed: 5, flip: true, look: [10, 0], brows: 'calm', mouth: okay ? 'smile' : 'flat', headDy: nod(t, 9.04, 9.6) });
  s += desk(t, { y: 1560, monitor: false, keyboard: false, mugX: 900 });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 7.06, 10.48)), 25 * prog(t, 7.06, 10.48));
  s += label('DAS ÜBERRASCHENDE:', 540, 260, 78, { p: pop(t, 7.34, .45) });
  s += speech(330, 470, 'Nein.', 360, 700, { p: pop(t, 8.38), size: 74 });
  const cp = prog(t, 9.24, 9.7);
  if (cp > 0) s += `<g transform="translate(790 500)"><circle r="${66 * Math.min(1, cp * 1.6)}" fill="#fff" stroke="${K.ink}" stroke-width="6"/>${check(0, 4, 1.4, K.green, cp)}</g>`;
  return frame(s);
}
