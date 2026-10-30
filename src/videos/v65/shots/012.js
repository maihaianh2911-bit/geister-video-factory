// 33.4–36.04: a dragonfly — a predatory insect — darts over the reeds and seizes a mosquito on "fangen"
import { K, DEFS, BG, vig, stars, mosquito, dragonfly, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const tc = 34.14;
  const dx = t < tc ? lerp(-240, 560, eio(prog(t, 33.4, tc))) : lerp(560, 760, eio(prog(t, tc, 36.04)));
  const dy = t < tc ? lerp(900, 740, eio(prog(t, 33.4, tc))) : lerp(740, 640, eio(prog(t, tc, 36.04)));
  const mx = 660 + 30 * Math.sin(t * 6), my = 730 + 18 * Math.cos(t * 5);
  const reeds = [...Array(16)].map((_, i) => `<path d="M ${i * 70} 1400 q ${-8 + (i % 4) * 5} -260 ${-16 + (i % 5) * 8} -${380 + (i % 4) * 70}" fill="none" stroke="${K.reed}" stroke-width="8"/>`).join('');
  const sc = `${BG('url(#mDusk)')}${stars(14, 5, 500)}
    <path d="M -60 1180 Q 300 1120 640 1170 Q 900 1210 1140 1150 L 1140 1980 L -60 1980 Z" fill="#203A3A"/>${reeds}
    ${t < tc ? mosquito(mx, my, .75, { t }) : mosquito(dx + 70, dy + 40, .55, { t, ang: 40, wings: 0 })}
    ${dragonfly(dx, dy, 1.6, { t, grab: t >= tc - .05, ang: t < tc ? -8 : -4 })}`;
  return `${DEFS}${sc}${vig()}`;
}
