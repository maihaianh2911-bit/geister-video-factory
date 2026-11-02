// L10 48.06–51.14: bar chart in the lecture hall: a big column rises on "neunzig" (48.47) and counts to "ÜBER 90 %", label NICHT EINGETROFFEN; a small column EINGETROFFEN next to it; clouds above the chart start to fade.
import { K, frame, cam, prog, eio, pop, T, f1, label } from './lib.js';
import { hall } from './sets.js';
import { cloud } from './clouds.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = hall(t, { strong: true });
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#1d1a16" opacity=".35"/>`;
  // chart board
  s += `<rect x="90" y="330" width="900" height="1060" rx="30" fill="#fbf8ef" stroke="${INK}" stroke-width="8"/><path d="M 180 1260 H 900" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
  const g = eio(prog(t, 48.08, 49.3)), H = 760;
  s += `<rect x="230" y="${f1(1260 - H * .91 * g)}" width="320" height="${f1(H * .91 * g)}" fill="#3c9a5f" stroke="${INK}" stroke-width="6"/>`;
  const g2 = eio(prog(t, 49.5, 49.9));
  s += `<rect x="650" y="${f1(1260 - H * .09 * g2)}" width="200" height="${f1(H * .09 * g2)}" fill="#d9493f" stroke="${INK}" stroke-width="6"/>`;
  const n = Math.round(91 * g);
  if (g > .04) s += T(390, 1240 - H * .91 * g - 30, g >= 1 ? 'ÜBER 90 %' : `${n} %`, 78, { fill: '#2e6e44', stroke: '#fbf8ef', sw: 10 });
  s += T(390, 1330, 'NICHT EINGETROFFEN', 34, { fill: K.txt, op: eio(prog(t, 49.3, 49.7)) }) + T(750, 1330, 'EINGETROFFEN', 34, { fill: K.txt, op: g2 });
  // two small clouds fading over the chart
  s += cloud(760, 760, 240, { t, seed: 11, dark: .8, gone: eio(prog(t, 49.3, 50.2)) }) + cloud(860, 540, 200, { t, seed: 21, dark: .8, gone: eio(prog(t, 49.5, 50.4)) });
  s = cam(s, 540, 860, 1.0 + .05 * eio(prog(t, 48.06, 51.14)));
  s += label('ÜBER 90 % NICHT EINGETROFFEN', 540, 230, 62, { p: pop(t, 49.9, .45) });
  return frame(s);
}
