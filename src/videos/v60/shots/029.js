// Control room monitor: the dispatcher types FR-1234 into the search field; the map jumps to that rescue point.
import { K, DEFS60, forestMap, sign, FG, TX, prog, eio, lerp } from './lib.js';
import { monitor } from './021.js';

export default function renderShot(t) {
  const n = Math.min(7, Math.max(0, Math.floor((t - 43.4) / .12)));
  const code = 'FR-1234'.slice(0, n);
  const pan = eio(prog(t, 44.3, 45.0));
  const inner = `<g transform="translate(${100 - 300 * pan} ${360 - 200 * pan})">${forestMap(1400, 1200, 13)}</g>
    <rect x="130" y="390" width="560" height="96" rx="12" fill="#F6F1E8" stroke="#0B0F12" stroke-width="6"/>
    <circle cx="180" cy="438" r="20" fill="none" stroke="#2E3A42" stroke-width="7"/><path d="M 194 452 l 18 18" stroke="#2E3A42" stroke-width="8" stroke-linecap="round"/>
    ${TX(code + (Math.floor(t * 4) % 2 && n < 7 ? '|' : ''), 230, 462, 62, '#0B0F12', 'start')}
    ${n >= 7 ? `<g transform="translate(760 438) scale(.32)">${sign(0, 0, 1)}</g>` : ''}`;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0A0F14"/>${monitor(inner)}${FG(1440)}`;
}
