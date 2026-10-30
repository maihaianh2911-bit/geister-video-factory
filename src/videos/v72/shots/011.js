// 26.14–29.4: cutting off the mouldy corner ("Ecke abzuschneiden" 26.76–27.04) — a knife in your hand slices through, the corner falls away
import { K, DEFS, BG, slice, arm, cam, prog, eio, ein, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const c = eio(prog(t, 26.6, 27.5)), fall = ein(prog(t, 27.5, 28.3));
  const kx = 330, ky = lerp(420, 840, c);
  const knife = `<g transform="translate(${kx} ${f1(ky)}) rotate(-6)"><path d="M -12 0 L 14 0 L 14 380 Q 0 420 -12 380 Z" fill="${K.steel}" stroke="${K.ink}" stroke-width="5"/><rect x="-20" y="-160" width="40" height="170" rx="14" fill="${K.ink}"/></g>`;
  const mask = `<defs><clipPath id="k11a"><rect x="350" y="-100" width="900" height="2000"/></clipPath><clipPath id="k11b"><rect x="-100" y="-100" width="450" height="2000"/></clipPath></defs>`;
  const sl = id => slice(540, 900, 2.6, { id, spot: 1, at: [-120, 0] });
  const body = `<g clip-path="url(#k11a)">${sl('s11a')}</g><g clip-path="url(#k11b)" transform="translate(${f1(-60 * fall)} ${f1(700 * fall)}) rotate(${f1(-25 * fall)} 300 900)">${sl('s11b')}</g>`;
  return `${DEFS}${mask}${BG(K.room)}${cam(`${body}${knife}${arm([700, -200], [520, -60], [kx, ky - 140], 1.5, K.du)}`, 1.0, 540, 900)}`;
}
