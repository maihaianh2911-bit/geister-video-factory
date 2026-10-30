// 21.86–24.36: at the same time your seatbelt — thumb presses the red button ("löse"), the tongue pops out, the belt runs back up to the pillar ("Sicherheitsgurt")
import { K, DEFS, BG, foreArm, label, f1, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const reach = eio(prog(t, 21.86, 22.25)), press = eout(prog(t, 22.25, 22.4)), pop = back(prog(t, 22.45, 22.75)), ret = eio(prog(t, 22.8, 23.7));
  const bx = 560, by = 1150; // buckle
  const tongue = [lerp(bx - 10, bx - 120, pop), lerp(by - 70, by - 190, pop)];
  const tip = [lerp(tongue[0], 980, ret), lerp(tongue[1], 120, ret)];
  const strap = `<path d="M 1120 -40 L ${f1(tip[0])} ${f1(tip[1])}" stroke="${K.ink}" stroke-width="98" stroke-linecap="round"/><path d="M 1120 -40 L ${f1(tip[0])} ${f1(tip[1])}" stroke="${K.strap}" stroke-width="84" stroke-linecap="round"/>
    <path d="M 1120 -40 L ${f1(tip[0])} ${f1(tip[1])}" stroke="#4A535A" stroke-width="6" stroke-dasharray="20 26"/>`;
  const tg = `<g transform="translate(${f1(tip[0])} ${f1(tip[1])}) rotate(-38)"><rect x="-46" y="-10" width="92" height="120" rx="12" fill="#C9D0D4" stroke="${K.ink}" stroke-width="6"/><rect x="-18" y="50" width="36" height="34" rx="6" fill="#3A4248"/></g>`;
  const buckle = `<g transform="translate(${bx} ${by}) rotate(-38)"><rect x="-70" y="-40" width="140" height="210" rx="26" fill="#1E2328" stroke="${K.ink}" stroke-width="7"/><rect x="-40" y="-26" width="80" height="60" rx="10" fill="${K.red}" stroke="${K.ink}" stroke-width="5" transform="translate(0 ${f1(8 * press * (1 - ret))})"/><path d="M -20 170 L -30 400 M 20 170 L 30 400" stroke="${K.ink}" stroke-width="6"/><rect x="-36" y="170" width="72" height="240" fill="#1E2328" stroke="${K.ink}" stroke-width="6"/></g>`;
  const thumbAt = [lerp(220, bx - 34, reach), lerp(1600, by + 6, reach) + 8 * press * (1 - ret)];
  const away = eio(prog(t, 23.0, 23.6));
  const th = [lerp(thumbAt[0], 160, away), lerp(thumbAt[1], 1560, away)];
  const sc = `${BG('#141B20')}<path d="M -60 600 Q 540 520 1140 640 L 1140 1980 L -60 1980 Z" fill="${K.you}" stroke="${K.ink}" stroke-width="6"/><path d="M 300 560 Q 320 1200 260 1980" stroke="${K.youD}" stroke-width="10" fill="none"/>
    <path d="M -60 1260 Q 540 1200 1140 1300 L 1140 1980 L -60 1980 Z" fill="#2E3B48" stroke="${K.ink}" stroke-width="6"/>
    ${buckle}${strap}${tg}${foreArm(-80, 1900, th[0], th[1], K.you, { finger: true, w: 120 })}`;
  return `${DEFS}${sc}${label(540, 330, '+ GURT LÖSEN', eout(prog(t, 21.9, 22.2)), K.amber, 66)}`;
}
