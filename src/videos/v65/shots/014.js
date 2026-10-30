// 40.8–43.22: many can eat other prey — top: a fish snaps a water flea; bottom: a swallow catches a fly, on "Beute"
import { K, DEFS, BG, vig, fish, swallow, ic, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const tc = 41.84;
  const fx = t < tc ? lerp(-80, 420, eio(prog(t, 40.8, tc))) : lerp(420, 560, prog(t, tc, 43.22));
  const m = t < tc ? eout(prog(t, 41.5, tc)) : 1 - eout(prog(t, tc, tc + .2));
  const bx = t < tc + .2 ? lerp(1250, 520, eio(prog(t, 40.9, tc + .2))) : lerp(520, -200, eio(prog(t, tc + .2, 43.22)));
  const by = t < tc + .2 ? lerp(1000, 1150, eio(prog(t, 40.9, tc + .2))) : lerp(1150, 980, prog(t, tc + .2, 43.22));
  const flea = t < tc ? `<g transform="translate(${f1(560 + 10 * Math.sin(t * 7))} ${f1(470 + 8 * Math.cos(t * 6))}) scale(1.3)">${ic.flea()}</g>` : '';
  const fly = t < tc + .2 ? `<g transform="translate(${f1(470 + 30 * Math.sin(t * 9))} ${f1(1150 + 20 * Math.cos(t * 8))}) scale(1.3)">${ic.fly()}</g>` : '';
  const top = `<clipPath id="c14a"><rect x="40" y="160" width="1000" height="600" rx="28"/></clipPath><g clip-path="url(#c14a)"><rect x="40" y="160" width="1000" height="600" fill="url(#mWater)"/>
    ${[...Array(8)].map((_, i) => `<path d="M ${80 + i * 130} 760 q 10 -120 -10 -200" fill="none" stroke="#2F6B44" stroke-width="10"/>`).join('')}${flea}${fish(fx, 480, 1.3, { t, mouth: m })}</g>
    <rect x="40" y="160" width="1000" height="600" rx="28" fill="none" stroke="${K.cyan}" stroke-width="4"/>`;
  const bot = `<clipPath id="c14b"><rect x="40" y="820" width="1000" height="560" rx="28"/></clipPath><g clip-path="url(#c14b)"><rect x="40" y="820" width="1000" height="560" fill="url(#mDusk)"/>
    <path d="M 40 1300 Q 400 1260 1040 1300 L 1040 1380 L 40 1380 Z" fill="#203A3A"/>${fly}${swallow(bx, by, 1.4, { t, dir: -1, ang: 0 }).replace('scale(1.4)', 'scale(-1.4 1.4)')}</g>
    <rect x="40" y="820" width="1000" height="560" rx="28" fill="none" stroke="${K.sun}" stroke-width="4"/>`;
  return `${DEFS}${BG('url(#mData)')}${top}${bot}${vig()}`;
}
