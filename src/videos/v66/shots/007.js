// 22.72–28.26: you'd buy perishables more often and cook smaller amounts — the week fills with small bags on "häufiger"; a small pot replaces the big one on "kleinere Mengen"
import { K, DEFS, BG, cal, bag, milk, yog, pot, f1, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const days = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'];
  let inner = '';
  for (let i = 0; i < 7; i += (i === 0 ? 2 : 2)) { const b = back(prog(t, 24.6 + i * .12, 24.9 + i * .12)); if (b > 0) inner += `<g transform="translate(${f1(128 + i * 137)} 1090) scale(${f1(.32 * b)})">${bag(0, 0, 1, `${milk(-20, -130)}${yog(40, -140)}`)}</g>`; }
  const sw = eio(prog(t, 26.2, 26.8));
  return `${DEFS}${BG('url(#kWall)')}<rect x="-60" y="680" width="1200" height="40" fill="${K.counterT}" stroke="${K.ink}" stroke-width="4"/>
    ${pot(lerp(540, -300, sw), 560, 1.4, .8, t)}${pot(lerp(1300, 540, sw), 590, .8, .8, t)}
    ${cal(60, 860, 960, days, inner)}`;
}
