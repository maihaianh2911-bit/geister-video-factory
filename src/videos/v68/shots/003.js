// 3.0–5.0: wide kitchen — the figure walks in with an empty glass and sets it on the counter ("Küchentisch")
import { stick, walkFeet, prog, eio, lerp } from './lib.js';
import { kitchen, glass, vinegar, TY, FY, FS } from './sets.js';
export default function renderShot(t) {
  const w = prog(t, 3.0, 4.4), x = lerp(150, 460, eio(w));
  const [fL, fR] = w > 0 && w < 1 ? walkFeet(x, FY, (t - 3) * 1.7, 80, FS) : [[x - 50, FY], [x + 50, FY]];
  const dn = eio(prog(t, 4.4, 4.98)), hx = lerp(x + 110, 720, dn), hy = lerp(1060, TY - 60, dn);
  const placed = t >= 4.98;
  const gl = glass(placed ? 720 : hx, placed ? TY : hy + 60 * .9, .9, { id: 'g3' });
  const fig = stick(x, FY, FS, { fL, fR, hR: placed ? [lerp(722, x + 100, eio(prog(t, 4.98, 5.0))), TY - 70] : [hx + 66, hy], hL: [x - 80, 1190], look: .7, lookY: .3, mouth: 'smile', over: placed ? '' : gl });
  return `${kitchen()}${vinegar(930, TY, .7)}${placed ? gl : ''}${fig}`;
}
