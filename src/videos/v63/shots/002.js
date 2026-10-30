// 1.6–4.42: dug up by looters — a shovel scrapes soil away and uncovers the disc's edge (Raubgräbern … ausgegraben)
import { K, DEFS, disc, grain, cam, shk, prog, eout, eio, lerp, f1 } from './lib.js';
import { soilBg } from './soil.js';
export default function renderShot(t) {
  const dirt = 1 - eio(prog(t, 2.5, 3.6));
  const sw = Math.sin(Math.max(0, t - 2.4) * 7.5) * (t < 3.7 ? 1 : 0);
  const [sx, sy] = shk(t, 3.22, 6, 8);
  const shovel = `<g transform="translate(${f1(640 + 120 * sw)} ${f1(560 + 40 * Math.abs(sw))}) rotate(${f1(-28 + 10 * sw)})"><rect x="-14" y="-620" width="28" height="560" fill="${K.brownD}" stroke="${K.ink}" stroke-width="5"/><path d="M -80 -70 L 80 -70 L 70 60 Q 0 120 -70 60 Z" fill="#7D8589" stroke="${K.ink}" stroke-width="6"/></g>`;
  return `${DEFS}<g transform="translate(${f1(sx)} ${f1(sy)})">${cam(soilBg(1) + disc(500, 1000, 300, { id: 'b', dirt, damage: true }) + shovel, lerp(1.05, 1, eout(prog(t, 1.6, 4.4))), 540, 950)}</g>${grain(t)}`;
}
