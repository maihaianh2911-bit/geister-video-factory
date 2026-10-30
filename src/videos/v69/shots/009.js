// 23.66–27.64: a power cut doesn't mean the air is running out — plug icon crossed (no power) while the air keeps flowing; everyone breathes calmly ("Luft")
import { K, DEFS, cabin, bust, light, label, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const plug = eout(prog(t, 23.8, 24.2));
  const br = Math.sin(t * 2.2);
  let air = '';
  for (let i = 0; i < 5; i++) { const u = (t * .45 + i / 5) % 1; air += `<path d="M ${f1(200 + i * 170)} ${f1(lerp(1350, 300, u))} q 24 -16 48 0" fill="none" stroke="#8FD0F0" stroke-width="7" stroke-linecap="round" opacity="${f1(.6 * Math.sin(u * Math.PI))}"/>`; }
  const sc = `${cabin(t, { lit: 0 })}${light(540, 900, 520, 1)}${air}
    ${bust('wom', 280, 960 + br * 4, 1.1, { look: .4, brow: .3, closed: prog(t, 26.6, 27.4) > 0 })}${bust('kid', 520, 1120 + br * 3, 1.15, { look: -.3, brow: .3 })}${bust('man', 800, 950 + br * 5, 1.15, { look: -.4, brow: .3, closed: prog(t, 26.6, 27.4) > 0 })}`;
  const icon = plug > 0 ? `<g transform="translate(860 300) scale(${f1(plug)})"><rect x="-70" y="-50" width="140" height="100" rx="18" fill="#05080A" stroke="${K.mono}" stroke-width="4"/><path d="M -20 -30 v 20 M 20 -30 v 20 M -32 -10 h 64 v 14 q 0 26 -32 26 q -32 0 -32 -26 Z" fill="none" stroke="${K.mono}" stroke-width="7" stroke-linejoin="round"/><path d="M -60 -40 L 60 40" stroke="${K.red}" stroke-width="10" stroke-linecap="round"/></g>` : '';
  return `${DEFS}${cam(sc, 1.04, 540, 950)}${icon}${label(330, 300, 'LUFT: OK', eout(prog(t, 26.7, 27.0)), '#8FD0F0', 56)}`;
}
