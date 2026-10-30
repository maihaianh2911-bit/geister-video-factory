// 23.94–25.6: a fence (Hehler) in a hat waits by a car boot at night
import { K, DEFS, BG, fig, grain, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const h = fig(lerp(720, 640, eio(prog(t, 23.94, 25))), 1500, 1.05, { col: '#151817', hat: true, coat: true, aL: [lerp(10, 50, eio(prog(t, 24.6, 25.3))), 20], rim: '#C9B48A' });
  const car = `<path d="M -60 1180 L 380 1180 L 470 1020 L 520 1020 L 520 1520 L -60 1520 Z" fill="#2E3438" stroke="${K.ink}" stroke-width="6"/><rect x="-60" y="1200" width="440" height="40" fill="#E2B34A" opacity=".5"/><circle cx="120" cy="1520" r="90" fill="#151817"/>`;
  return `${DEFS}${cam(`<rect x="-60" y="-60" width="1200" height="2040" fill="url(#nSky)"/><circle cx="880" cy="420" r="260" fill="url(#nLamp)" opacity=".5"/><rect x="860" y="420" width="16" height="1100" fill="#151817"/><rect x="-60" y="1500" width="1200" height="500" fill="#1C2321"/>` + car + h.svg, 1, 540, 1000)}${grain(t)}`;
}
