// 41.1–43.34: meeting point Hilton Basel — the fence (hat, coat) walks up to the lit entrance under the sign
import { K, DEFS, hotel, fig, grain, cam, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 41.2, 43.1));
  const h = fig(lerp(170, 500, p), 1440, .42, { col: '#151817', hat: true, coat: true, walk: (t - 41.1) * 7 * (p < 1 ? 1 : 0), rim: '#F2D38C' });
  return `${DEFS}${cam(hotel(t, { sign: 1 }) + h.svg, lerp(1, 1.12, eio(prog(t, 41.1, 43.34))), 540, 1000)}${grain(t)}`;
}
