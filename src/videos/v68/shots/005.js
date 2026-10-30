// 7.08–9.06: the figure pours vinegar from the bottle; the level rises until it covers the egg ("vollständig")
import { K, OL, f1, stick, cam, prog, eio, lerp } from './lib.js';
import { kitchen, glass, egg, vinegar, C, TY, FY, FS } from './sets.js';
export default function renderShot(t) {
  const tilt = eio(prog(t, 7.1, 7.5)) * (1 - eio(prog(t, 8.5, 8.95))), lev = .78 * eio(prog(t, 7.45, 8.4));
  const bx = lerp(860, 800, tilt), by = lerp(1000, 780, tilt), rot = -110 * tilt;
  // bottle mouth position after rotation about (bx,by): local (0,-300)*0.7
  const a = rot * Math.PI / 180, mx = bx + 210 * Math.sin(a), my = by - 210 * Math.cos(a), gx = bx + 84 * Math.sin(a), gy = by - 84 * Math.cos(a);
  const pour = tilt > .8 && t < 8.5 ? `<path d="M ${f1(mx)} ${f1(my)} Q ${f1(mx - 30)} ${f1(my + 60)} 730 ${f1(TY - 40)}" fill="none" stroke="${C.vinL}" stroke-width="16" stroke-linecap="round"/>` : '';
  const fig = stick(460, FY, FS, { hR: [gx, gy], hL: [360, 1180], look: .9, lookY: .5, brow: 'up', mouth: 'smile' });
  const gl = glass(720, TY, .9, { id: 'g5', level: lev, inner: egg(0, -66, .69, { id: 'e5' }) });
  return cam(`${kitchen()}${gl}${pour}${fig}${vinegar(bx, by, .7, { rot })}`, 1.6, 640, 1000, -40, 60);
}
