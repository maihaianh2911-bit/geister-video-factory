// 48.34–53.54: a cool cellar could help but is not as cold as a fridge — cutaway of a cellar with shelves; two thermometers: the cellar one stops higher than the fridge one on "so kalt wie"
import { K, DEFS, BG, thermo, chip, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const c = eio(prog(t, 49.0, 50.0)), f = eio(prog(t, 51.6, 52.4));
  let st = '';
  for (let i = 0; i < 7; i++) st += `<path d="M ${80 + i * 60} ${380 + i * 70} h 60 v 70" fill="none" stroke="#7A6A58" stroke-width="10"/>`;
  return `${DEFS}${BG('#6E8A5A')}<rect x="-60" y="-60" width="1200" height="400" fill="#9FC6E0"/><path d="M -60 340 H 1140" stroke="${K.ink}" stroke-width="6"/>
    <rect x="-60" y="346" width="1200" height="1700" fill="url(#kCellar)"/>${st}
    <rect x="80" y="880" width="560" height="22" fill="${K.wood}" stroke="${K.ink}" stroke-width="4"/><rect x="80" y="1110" width="560" height="22" fill="${K.wood}" stroke="${K.ink}" stroke-width="4"/>
    ${[0, 1, 2, 3].map(i => `<ellipse cx="${150 + i * 130}" cy="850" rx="50" ry="34" fill="#C9A24A" stroke="${K.ink}" stroke-width="4"/>`).join('')}
    ${[0, 1, 2].map(i => `<rect x="${130 + i * 160}" y="990" width="90" height="120" rx="12" fill="${K.jar}" stroke="${K.ink}" stroke-width="4"/>`).join('')}
    ${thermo(720, 1220, 640, lerp(.7, .42, c), K.cyan)}
    ${thermo(870, 1220, 640, lerp(.42, .18, f), K.cyan)}${f > 0 ? `<path d="M 746 ${f1(1220 - 640 + 20 + 600 * (1 - .42))} H 846" stroke="${K.sun}" stroke-width="6" stroke-dasharray="10 8" opacity="${f1(f)}"/>` : ''}
    ${chip(720, 470, 'KELLER', 1, K.star, 34)}
    <g transform="translate(870 470)"><rect x="-34" y="-56" width="68" height="112" rx="10" fill="${K.fridge}" stroke="${K.ink}" stroke-width="4"/><path d="M -34 -16 H 34" stroke="${K.fridgeD}" stroke-width="4"/><rect x="-24" y="-46" width="6" height="22" fill="${K.fridgeD}"/></g>`;
}
