// 15.64–18.18: how do you all get out safely? — back to the shaft cutaway, four people in the dark cabin between the floors; SICHER RAUS?
import { K, DEFS, shaft, headOf, label, light, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const cy = 820;
  const heads = `${headOf('you', 380, cy + 230, .9, { look: .5, brow: .5 })}${headOf('wom', 500, cy + 220, .9, { look: -.4, brow: .7 })}${headOf('kid', 600, cy + 260, .9, { look: -.5, brow: .9, mouth: 'down' })}${headOf('man', 720, cy + 215, .9, { look: -.7, brow: .6 })}
    <rect x="260" y="${cy + 330}" width="560" height="230" fill="${K.steelL}" stroke="${K.ink}" stroke-width="6"/>`;
  const sc = shaft(t, { cy, inner: `<rect x="290" y="${cy + 40}" width="500" height="300" fill="#1A2026"/>${light(400, cy + 200, 260, .9)}${heads}` });
  return `${DEFS}<g transform="translate(540 1100) scale(${f1(lerp(1.15, 1, eio(prog(t, 15.64, 18.18))))}) translate(-540 -1100)">${sc}</g>${label(540, 300, 'SICHER RAUS?', eout(prog(t, 16.4, 16.8)), K.amber, 72)}`;
}
