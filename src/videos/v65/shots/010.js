// 26.86–31.66: underwater — larvae hang below the surface; a fish snaps one on "Fischen", a water beetle grabs another on "Wassertieren"
import { K, DEFS, BG, vig, larva, fish, ic, f1, prog, eio, eout, ein, back, lerp } from './lib.js';
export default function renderShot(t) {
  const sY = 360;
  const fx = t < 29.44 ? lerp(-200, 330, eio(prog(t, 28.2, 29.44))) : lerp(330, 1300, ein(prog(t, 29.7, 31.3)));
  const fy = t < 29.44 ? lerp(760, 560, eio(prog(t, 28.2, 29.44))) : lerp(560, 520, prog(t, 29.7, 31.3));
  const mouth = t < 29.44 ? eout(prog(t, 29.0, 29.4)) : 1 - eout(prog(t, 29.44, 29.6));
  const eaten1 = t >= 29.44;
  const bx = t < 30.1 ? lerp(1200, 760, eio(prog(t, 29.4, 30.1))) : lerp(760, 820, prog(t, 30.1, 31.6));
  const by = t < 30.1 ? lerp(900, 560, eio(prog(t, 29.4, 30.1))) : lerp(560, 760, eio(prog(t, 30.4, 31.6)));
  const grab = t >= 30.1;
  let lv = '';
  [[200], [470, 1], [610], [760, 2], [900]].forEach(([x, k]) => {
    if (k === 1 && eaten1) return;
    if (k === 2 && grab) return;
    lv += larva(x, sY + 4, 1, t + x);
  });
  const beetle = `<g transform="translate(${f1(bx)} ${f1(by)}) rotate(-40) scale(2)">${ic.beetle()}</g>${grab ? `<g transform="translate(${f1(bx - 40)} ${f1(by - 40)}) rotate(140)">${larva(0, 0, .75, t)}</g>` : ''}`;
  const sc = `${BG('url(#mWater)')}
    <rect x="-60" y="-60" width="1200" height="${sY + 60}" fill="#2B3F6A"/><path d="M -60 ${sY} H 1140" stroke="${K.waterL}" stroke-width="8"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M ${f1(((i * 220 + t * 40) % 1300) - 100)} ${sY + 4} q 30 8 60 0" fill="none" stroke="#BFE6EE" stroke-width="4"/>`).join('')}
    ${[...Array(12)].map((_, i) => `<path d="M ${i * 100 - 20} 1500 q 20 -150 ${-10 + (i % 3) * 20} -${220 + (i % 4) * 40}" fill="none" stroke="#2F6B44" stroke-width="10" opacity=".8"/>`).join('')}
    <rect x="-60" y="1440" width="1200" height="600" fill="#2A2418"/>
    ${lv}${fish(fx, fy, 1.5, { t, mouth, ang: t < 29.44 ? -14 : 0 })}${beetle}`;
  return `${DEFS}${sc}${vig()}`;
}
