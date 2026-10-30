// 6.0–8.02: … over a hotel toilet — the men's room door swings open
import { K, DEFS, BG, wcDoor, grain, cam, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const o = eio(prog(t, 6.3, 7.1));
  const tiles = [...Array(12)].map((_, i) => `<path d="M ${i * 100 - 40} 0 V 1920" stroke="#8C9496" stroke-width="3"/>`).join('') + [...Array(20)].map((_, i) => `<path d="M 0 ${i * 100} H 1080" stroke="#8C9496" stroke-width="3"/>`).join('');
  return `${DEFS}${BG('#B7BFC0')}${tiles}<rect x="-60" y="1300" width="1200" height="700" fill="#6E7778"/>
    ${cam(wcDoor(540, 860, 1, o), lerp(1, 1.08, eio(prog(t, 6, 8))), 540, 860)}${grain(t)}`;
}
