// L4a 17.1–19.28: DIENSTAG — close-up of du's phone ("Zahnarzt" contact, green call button) and the wall clock: 18:04.
// The thumb moves to the call button, then hesitates and pulls back.
import { K, frame, cam, study, phone, clockFace, dayCard, light, T, prog, eio, eout, lerp, cl, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = study({ mood: 'evening', dx: 20 * eio(prog(t, 17.1, 19.28)), clock: [18, 4] }) + light(300, 560, 300, 300, '#ffd98a', .35);
  // big wall clock (sharp midground)
  const mm = 4 + 2 * prog(t, 17.1, 19.28);
  s += `<g>${clockFace(290, 600, 150, 18, mm, { rim: '#5a3a28' })}</g>`;
  // phone held by a hand from the lower right
  const PX = 650, PY = 1060, PS = 2.1;
  const scr = `<rect x="-68" y="-132" width="136" height="264" rx="14" fill="#f4f7fa"/><circle cx="0" cy="-60" r="34" fill="#9fc0e0"/><path d="M -14 -76 h 28 v 30 h -28 z" fill="#fff"/><path d="M -10 -62 h 20 M 0 -72 v 20" stroke="#3f7fd8" stroke-width="5"/>` + T(0, 0, 'Zahnarzt', 20, { fill: K.ink }) + T(0, 22, 'Dr. Weber', 15, { fill: '#555', w: 700 }) + `<circle cx="0" cy="84" r="24" fill="${K.green}"/><path d="M -10 78 q 0 14 14 18 l 6 -6 l -6 -6 l -4 4 q -6 -2 -8 -8 l 4 -4 l -6 -6 z" fill="#fff"/>`;
  s += `<path d="M 1160 1720 C 980 1560 860 1420 ${PX + 70} ${PY + 180}" stroke="${K.ink}" stroke-width="120" fill="none" stroke-linecap="round"/><path d="M 1160 1720 C 980 1560 860 1420 ${PX + 70} ${PY + 180}" stroke="${K.du}" stroke-width="100" fill="none" stroke-linecap="round"/>`;
  s += phone(PX, PY, PS, { rot: -8, screen: scr });
  s += `<circle cx="${PX + 80}" cy="${PY + 190}" r="50" fill="${K.ink}"/>`;
  // thumb: towards the call button, hesitate, back
  const go = eio(prog(t, 17.7, 18.3)) * (1 - eio(prog(t, 18.6, 19.1)));
  const tx = lerp(PX + 150, PX + 20, go), ty = lerp(PY + 240, PY + 180, go);
  s += `<path d="M ${PX + 110} ${PY + 220} L ${f1(tx)} ${f1(ty)}" stroke="${K.ink}" stroke-width="44" stroke-linecap="round"/>`;
  s = cam(s, 600, 1000, 1.04 + .06 * eio(prog(t, 17.1, 19.28)));
  s += dayCard(t, 17.1, 'DIENSTAG');
  return frame(s);
}
