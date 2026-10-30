// 27.5–28.8: REGEL 2: the father pulls out his phone, the screen lights his face.
import { K, DEFS, FG, prog, eio, back, lerp, head, phone, armTo, regel, TX } from './lib.js';
export default function renderShot(t) {
  const up = eio(prog(t, 27.5, 27.9));
  const on = prog(t, 27.85, 28.0);
  const card = back(prog(t, 28.05, 28.3));
  const py = lerp(1500, 1020, up);
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#1E2A30"/>
    <rect x="-60" y="-60" width="1200" height="2040" fill="#9DB8C8" opacity="${.08 * on}"/>
    <path d="M 120 1600 Q 140 1180 360 1130 L 720 1130 Q 940 1180 960 1600 Z" fill="${K.vTop}" stroke="#0B0F12" stroke-width="8"/>
    ${head('v', 540, 870, 1.6, { brow: 'worry', mouth: 'tight', lookY: 12, look: 4, eyeS: 1.05 })}
    <ellipse cx="540" cy="860" rx="260" ry="220" fill="#CFE3F0" opacity="${.12 * on}"/>
    ${armTo(1000, 1500, 800, py + 80, 100, K.vTop, 1)}
    ${phone(790, py, 1.0, -8, on > 0 ? `<rect x="-82" y="-160" width="164" height="318" rx="16" fill="#1E4A63" opacity="${on}"/>` + TX('112', 0, -40, 54, '#FFFFFF', 'middle', `opacity="${.25 * on}"`) : '', on)}
    ${regel(2, 540, 300, card)}
    ${FG(1430)}`;
}
