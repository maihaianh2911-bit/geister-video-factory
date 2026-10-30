// 15.04–17.9: in warmth germs multiply faster — close-up of the minced meat pack; a thermometer rises on "Wärme", the germs split again and again on "vermehren"
import { K, DEFS, BG, meat, colony, thermo, kcard, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const h = eout(prog(t, 15.4, 16.0));
  const g = prog(t, 16.0, 17.6);
  const n = Math.round(lerp(3, 40, g * g));
  return `${DEFS}${BG('url(#kWall)')}<rect x="-60" y="1100" width="1200" height="900" fill="${K.counterT}"/>
    ${meat(480, 900, 4.2)}
    <circle cx="480" cy="880" r="260" fill="#fff" opacity=".15"/>${colony(480, 880, n, 16, t, { spread: 220 })}
    ${thermo(900, 1180, 600, lerp(.35, .85, h), K.red)}
    <g opacity="${f1(h)}">${[0, 1, 2].map(i => `<path d="M ${820 + i * 50} 470 q 16 -22 0 -44 q -16 -22 0 -44" fill="none" stroke="${K.sun}" stroke-width="7" stroke-linecap="round"/>`).join('')}</g>
    ${kcard(380, 300, 'KEIME', prog(t, 17.1, 17.4), { sz: 64, col: K.green })}`;
}
