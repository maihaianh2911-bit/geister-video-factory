// 53.86–55.7: now the archaeologist must signal the police — his hand holds a phone below the table edge
import { K, DEFS, BG, hand, phone, bars, grain, cam, prog, eio, lerp, TX } from './lib.js';
export default function renderShot(t) {
  const up = eio(prog(t, 53.9, 54.6));
  const scr = `${TX('POLIZEI', 100, 70, 30, K.ink)}<rect x="20" y="110" width="160" height="60" rx="14" fill="#B9C9C2"/>${bars(140, 40, 4, .8)}`;
  return `${DEFS}${BG(K.brownD)}${cam(`<rect x="-60" y="-60" width="1200" height="760" fill="${K.brown}"/><rect x="-60" y="680" width="1200" height="40" fill="${K.brownD}" stroke="${K.ink}" stroke-width="6"/>` + phone(560, lerp(1300, 1080, up), 1.25, -8, scr) + hand(560, lerp(1360, 1140, up) + 120, -90, 1.2, K.suit, { cuff: true }), 1, 540, 1000)}${grain(t)}`;
}
