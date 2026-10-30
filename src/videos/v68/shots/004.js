// 5.0–7.08: medium — the hand lowers the raw egg into the empty glass; it rests on the bottom on "hinein"
import { K, stick, cam, prog, eio, ein, lerp } from './lib.js';
import { kitchen, glass, egg, vinegar, TY, FY, FS } from './sets.js';
export default function renderShot(t) {
  const d = eio(prog(t, 5.3, 6.44)), ey = lerp(800, TY - 60, d);
  const rel = t >= 6.44, hx = 720, hy = rel ? lerp(TY - 100, 900, eio(prog(t, 6.5, 7.0))) : ey - 46;
  const e = egg(720, ey, .62, { id: 'e4' });
  const fig = stick(460, FY, FS, { hR: [hx + 20, hy], hL: [360, 1180], look: .9, lookY: .6, brow: 'calm', mouth: 'smile', over: rel ? '' : e });
  const gl = glass(720, TY, .9, { id: 'g4', inner: rel ? egg(0, -66, .69, { id: 'e4b', w: 6 }) : '' });
  return cam(`${kitchen()}${vinegar(930, TY, .7)}${gl}${fig}`, 1.6, 640, 1000, -40, 60);
}
