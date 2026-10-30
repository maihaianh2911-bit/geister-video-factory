// 31.66–33.4: above the pond at dusk a swallow swoops in and snaps an adult mosquito on "Vögel"
import { K, DEFS, BG, vig, stars, mosquito, swallow, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const tc = 32.26;
  const p = prog(t, 31.66, tc), q = prog(t, tc, 33.4);
  const bx = t < tc ? lerp(-200, 560, eio(p)) : lerp(560, 1300, eio(q)), by = t < tc ? lerp(1100, 700, eio(p)) : lerp(700, 420, eio(q));
  const mx = 640 + 30 * Math.sin(t * 6), my = 690 + 20 * Math.cos(t * 5);
  const sc = `${BG('url(#mDusk)')}${stars(18, 4, 500)}
    <path d="M -60 1180 Q 300 1120 640 1170 Q 900 1210 1140 1150 L 1140 1980 L -60 1980 Z" fill="#203A3A"/>
    <ellipse cx="540" cy="1320" rx="600" ry="120" fill="#2A6F86" stroke="${K.waterL}" stroke-width="4"/>
    ${[...Array(12)].map((_, i) => `<path d="M ${30 + i * 26} 1240 q -6 -200 -14 -${260 + (i % 3) * 50}" fill="none" stroke="${K.reed}" stroke-width="6"/>`).join('')}
    ${t < tc + .03 ? mosquito(mx, my, .7, { t }) : ''}
    ${swallow(bx, by, 1.7, { t, beak: t < tc ? eout(prog(t, 31.9, tc)) : 1 - eout(prog(t, tc, tc + .15)), ang: t < tc ? -22 : -18 })}`;
  return `${DEFS}${sc}${vig()}`;
}
