// 8.36–10.54: breakfast in the morning sun — you sit relaxed, lift the cup on "Frühstückstisch"; the free hand rests, no scratching
import { K, DEFS, BG, vig, head, limb, handC, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const c = eio(prog(t, 8.7, 9.3)) * (1 - eio(prog(t, 9.9, 10.4)));
  const sx = 640, sy = 760; // right shoulder (screen)
  const hx = lerp(760, 600, c), hy = lerp(1010, 720, c);
  const ex = lerp(760, 720, c), ey = lerp(900, 860, c);
  const cup = `<g transform="translate(${f1(hx + 10)} ${f1(hy - 10)}) rotate(${f1(-10 * c)})"><path d="M -34 -46 L 34 -46 L 28 30 Q 0 42 -28 30 Z" fill="#F2F5FF" stroke="${K.ink}" stroke-width="4"/><path d="M 34 -30 q 26 6 18 30 q -6 12 -20 8" fill="none" stroke="${K.ink}" stroke-width="5"/>${[0, 1].map(i => `<path d="M ${-10 + i * 18} -58 q -10 -20 4 -40" fill="none" stroke="#fff" stroke-width="4" opacity="${f1(.5 * (1 - c))}"/>`).join('')}</g>`;
  const sc = `${BG('url(#mMorn)')}
    <rect x="620" y="160" width="360" height="460" fill="#FFF6DE" stroke="${K.ink}" stroke-width="8"/><path d="M 800 160 v 460 M 620 390 h 360" stroke="${K.ink}" stroke-width="6"/>
    <polygon points="620,620 980,620 760,1060 300,1060" fill="#FFF3C8" opacity=".35"/>
    <path d="M 330 1300 L 330 760 Q 330 690 400 690 L 680 690 Q 750 690 750 760 L 750 1300 Z" fill="${K.shirt}" stroke="${K.ink}" stroke-width="5"/>
    ${head(540, 610 - 6 * c, 1.15, { look: .3 * c, rot: -4 * c })}
    ${limb([[440, 760], [380, 920], [440, 1010]], 46, K.shirt)}${handC(470, 1010, 24)}
    <rect x="-60" y="1020" width="1200" height="60" fill="${K.wood}" stroke="${K.ink}" stroke-width="5"/><rect x="-60" y="1080" width="1200" height="900" fill="${K.woodD}"/>
    <ellipse cx="300" cy="1020" rx="120" ry="22" fill="#F2F5FF" stroke="${K.ink}" stroke-width="4"/><path d="M 230 1010 q 70 -50 140 0 Z" fill="#D9A15A" stroke="${K.ink}" stroke-width="4"/>
    ${limb([[sx, sy], [ex, ey], [hx, hy]], 46, K.shirt)}${handC(hx, hy, 24)}${cup}`;
  return `${DEFS}${cam(sc, 1.25, 540, 820)}${vig(.6)}`;
}
