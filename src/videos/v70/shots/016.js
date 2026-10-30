// 36.46–40.26: lose no time with phone, bags or an emergency call: your hand drifts toward the lit phone and pulls back; phone, bag and 112 are struck out on each word
import { K, DEFS, BG, foreArm, crossOut, water, TX, light, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const reach = eio(prog(t, 36.6, 37.4)), back = eio(prog(t, 37.8, 38.4));
  const hx = lerp(lerp(1000, 760, reach), 1040, back), hy = lerp(lerp(1500, 760, reach), 1400, back);
  const call = prog(t, 39.2, 39.5) > 0;
  const phone = `<g transform="translate(300 640) rotate(-8)"><rect x="-90" y="-170" width="180" height="340" rx="26" fill="#15191C" stroke="${K.ink}" stroke-width="7"/><rect x="-74" y="-150" width="148" height="290" rx="12" fill="${call ? '#1F3B2E' : '#33424C'}"/>
    ${call ? `${TX('112', 0, -20, 66, K.white)}<circle cx="0" cy="80" r="30" fill="#3BB273"/>` : `<rect x="-50" y="-110" width="100" height="16" rx="8" fill="${K.mono}" opacity=".7"/><rect x="-50" y="-80" width="70" height="16" rx="8" fill="${K.mono}" opacity=".5"/>`}</g>`;
  const bag = `<g transform="translate(720 1150)"><path d="M -150 -40 Q -140 -150 0 -150 Q 140 -150 150 -40" fill="none" stroke="${K.ink}" stroke-width="30"/><path d="M -150 -40 Q -140 -150 0 -150 Q 140 -150 150 -40" fill="none" stroke="#7A4A2A" stroke-width="18"/><rect x="-200" y="-50" width="400" height="250" rx="40" fill="#8A5A34" stroke="${K.ink}" stroke-width="7"/><path d="M -200 30 H 200" stroke="${K.ink}" stroke-width="5"/></g>`;
  const sc = `${BG('#10161A')}<path d="M -60 380 L 1140 340 L 1140 1980 L -60 1980 Z" fill="#1B2227" stroke="${K.ink}" stroke-width="6"/>
    <path d="M 60 470 L 560 450 L 560 860 L 60 880 Z" fill="#232B31" stroke="${K.ink}" stroke-width="6"/>
    ${light(300, 640, 420, .6)}${phone}${bag}
    ${water(t, 1330 - 60 * prog(t, 36.46, 40.26), { amp: 8, alpha: .8 })}
    ${foreArm(1200, 1800, hx, hy, K.you, { w: 120 })}
    ${crossOut(300, 640, 220, prog(t, 37.65, 37.95))}${crossOut(720, 1100, 250, prog(t, 38.35, 38.65))}${crossOut(300, 640, 250, prog(t, 39.45, 39.75)).replace(/<circle[^>]*\/>/, '')}`;
  return `${DEFS}${sc}`;
}
