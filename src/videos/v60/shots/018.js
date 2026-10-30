// Phone status bar huge: own network shows no bars and gets crossed out — but the call still goes through.
import { K, DEFS60, bars, FG, TX, prog, eout, back, lerp, shk } from './lib.js';

export default function renderShot(t) {
  const x = back(prog(t, 24.62, 24.9)), [sx, sy] = shk(t, 24.9, 8, 8);
  const ok = back(prog(t, 25.9, 26.2));
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0E161A"/>
  <g transform="translate(${sx} ${sy})">
    <rect x="60" y="360" width="960" height="760" rx="70" fill="#16242C" stroke="#0B0F12" stroke-width="10"/>
    <rect x="60" y="360" width="960" height="760" rx="70" fill="none" stroke="#2E3A42" stroke-width="22"/>
    ${bars(250, 760, 4.4, 0)}
    ${x > 0 ? `<g transform="translate(400 640) scale(${x})"><path d="M -150 -150 L 150 150 M 150 -150 L -150 150" stroke="${K.red}" stroke-width="44" stroke-linecap="round"/></g>` : ''}
    ${ok > 0 ? `<g transform="translate(820 640) scale(${ok})"><circle cx="0" cy="0" r="110" fill="#2EB872" stroke="#0B0F12" stroke-width="8"/><path d="M -48 -16 q 48 70 96 0" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round"/>${TX('112', 0, 190, 80, '#FFFFFF')}</g>` : ''}
  </g>
  ${FG(1440)}`;
}
