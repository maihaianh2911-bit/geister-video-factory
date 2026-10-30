// 3.06–4.82: a German house on a summer night; on "Fenster" the upper window swings open and warm light spills out
import { K, DEFS, BG, vig, stars, house, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const op = eout(prog(t, 3.95, 4.4));
  const s = lerp(1, 1.35, eio(prog(t, 3.06, 4.82)));
  const fence = [...Array(14)].map((_, i) => `<path d="M ${-20 + i * 82} 1390 v -110 l 20 -24 l 20 24 v 110 Z" fill="#20294F" stroke="${K.ink}" stroke-width="4"/>`).join('');
  const world = `${BG('url(#mNight)')}${stars(60, 7, 900)}<circle cx="860" cy="280" r="60" fill="#E8EEFF"/>
    <path d="M -60 1200 Q 300 1120 600 1180 Q 900 1230 1140 1150 L 1140 1980 L -60 1980 Z" fill="#162048"/>
    ${house(560, 1330, 1.05, { win: op })}
    <rect x="-60" y="1330" width="1200" height="700" fill="${K.grassD}"/>${fence}`;
  return `${DEFS}${cam(world, s, 390, 880)}${vig()}`;
}
