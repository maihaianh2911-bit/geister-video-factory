// 23.48–26.86: in the garden pond something would be missing — camera dives toward the pond; the larvae under the surface turn into empty outlines on "fehlen"
import { K, DEFS, BG, vig, stars, larva, flower, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const z = eio(prog(t, 23.48, 25.4));
  const g = eout(prog(t, 25.95, 26.4));
  const sY = 1000;
  let lv = '';
  for (let i = 0; i < 5; i++) lv += larva(260 + i * 130, sY + 4, 1.15, t + i, { alpha: 1 - g }) + (g > 0 ? larva(260 + i * 130, sY + 4, 1.15, t + i, { ghost: true, alpha: g }) : '');
  const reeds = [...Array(9)].map((_, i) => `<path d="M ${70 + i * 30} ${sY} q ${-10 + i * 3} -200 ${-20 + i * 6} -${300 + (i % 3) * 60}" fill="none" stroke="${K.reed}" stroke-width="7"/>`).join('');
  const sc = `${BG('url(#mDusk)')}${stars(20, 9, 500)}
    <path d="M -60 760 Q 300 700 640 760 Q 900 800 1140 740 L 1140 ${sY} L -60 ${sY} Z" fill="#203A3A"/>
    ${flower(900, sY, 700, .8, { t })}${flower(980, sY, 760, .7, { t: t + 1 })}${reeds}
    <rect x="-60" y="${sY}" width="1200" height="980" fill="url(#mWater)"/>
    <path d="M -60 ${sY} H 1140" stroke="${K.waterL}" stroke-width="6"/>
    ${[0, 1, 2, 3].map(i => `<path d="M ${f1(((i * 300 + t * 30) % 1300) - 100)} ${sY + 2} q 40 -10 80 0" fill="none" stroke="${K.waterL}" stroke-width="4"/>`).join('')}
    ${lv}
    <path d="M -60 1500 Q 300 1460 700 1500 Q 900 1520 1140 1490 L 1140 1980 L -60 1980 Z" fill="#3A3424"/>`;
  return `${DEFS}${cam(sc, lerp(1, 1.5, z), 560, lerp(860, 1060, z))}${vig()}`;
}
