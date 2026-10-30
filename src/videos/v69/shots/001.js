// 0–4.24: cover — shaft cutaway: the cabin slides down and jolts to a stop between floor 9 and 8 ("bleibt … stehen"); label AUFZUG STECKT
import { K, DEFS, shaft, headOf, label, light, f1, prog, eio, eout, ring, lerp } from './lib.js';
export default function renderShot(t) {
  const cy = t < 1.64 ? lerp(640, 820, eio(prog(t, 0, 1.64))) : 820 + 10 * ring(t, 1.64, 3, 5);
  const heads = `${headOf('you', 380, cy + 230, .9, { look: .3, brow: .6, mouth: 'o' })}${headOf('wom', 500, cy + 220, .9, { look: .5, brow: .6 })}${headOf('kid', 600, cy + 260, .9, { look: -.4, brow: .8, mouth: 'o' })}${headOf('man', 720, cy + 215, .9, { look: -.6, brow: .8 })}
    <rect x="260" y="${f1(cy + 330)}" width="560" height="230" fill="${K.steelL}" stroke="${K.ink}" stroke-width="6"/>`;
  const sc = shaft(t, { cy, inner: `<rect x="290" y="${f1(cy + 40)}" width="500" height="300" fill="#2A3238"/>${light(540, cy + 200, 300, t < 1.64 ? 1 : .9)}${heads}` });
  return `${DEFS}${sc}${label(540, 300, 'AUFZUG STECKT', 1, K.amber, 72)}${label(820, 760, 'ZWISCHEN 8 & 9', eout(prog(t, 2.4, 2.8)), K.mono, 40)}`;
}
