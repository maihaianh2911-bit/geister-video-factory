// 18.02–20.46: medium on the figure — the column still sprays behind; hand to the head on "Gas", a "?" appears
import { K, OL, f1, TX, cam, fountain, puddle, prog, eio, eout, back, lerp, headPos } from './lib.js';
import { wide, FY, FS } from './sets.js';
import { OPEN } from './008.js';
export default function renderShot(t) {
  const h = lerp(780, 520, prog(t, 18.02, 20.46));
  const f = fountain(OPEN[0], OPEN[1], h, 1, t, { w0: 22, w1: 60 });
  const scr = eio(prog(t, 18.55, 18.95)), wig = scr * Math.sin(t * 16) * 8;
  const [hx, hy] = headPos(330, FY, FS);
  const q = back(prog(t, 19.55, 19.9));
  const qm = q > 0 ? `<g transform="translate(${f1(hx + 10)} ${f1(hy - 140)}) scale(${q.toFixed(3)})">${TX('?', 0, 50, 170, K.blue, 'middle', `stroke="${K.ink}" stroke-width="10" paint-order="stroke" stroke-linejoin="round"`)}</g>` : '';
  const world = wide({ caps: [[640, 90]], bottles: [{ x: 730, level: 200 }], extra: f + puddle(730, 1142, 140),
    fig: { x: 330, fL: [280, FY], fR: [380, FY], hL: [lerp(240, hx - 62, scr), lerp(1180, hy - 30, scr) + wig], hR: [440, 1150], look: lerp(.8, .3, scr), lookY: -.5, brow: scr > .5 ? 'knit' : 'up', mouth: scr > .5 ? 'flat' : 'o', over: qm } });
  return cam(world, 1.55, 470, 900, -10, 40);
}
