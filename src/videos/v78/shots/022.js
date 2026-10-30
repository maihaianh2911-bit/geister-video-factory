// 66.16–68.6: after the shower you lie down in bed ("Bett" 67.76) — you sit on the bed edge, swing your legs up and lie back, head on the pillow
import { K, stick, cam, prog, eio, lerp } from './lib.js';
import { bedroom, pillow, duvet } from './sets.js';
export default function renderShot(t) {
  const lie = eio(prog(t, 66.6, 67.8));
  // lying pose: figure rotated around the hips from upright (0°) to lying (-90°, head to the left on the pillow)
  const fig = `<g transform="rotate(${(-90 * lie).toFixed(1)} 560 1020)">${stick(560, 1020 + 252, 1.5, { shirt: K.white, look: -.3, mouth: 'smile', brow: 'calm', fL: [lerp(520, 470, lie), 1272], fR: [lerp(600, 650, lie), 1272] })}</g>`;
  return cam(`${bedroom()}${pillow(250, 980, 1.1)}${fig}${duvet(420, 990, 1010, 0)}`, 1.05, 540, 1000);
}
