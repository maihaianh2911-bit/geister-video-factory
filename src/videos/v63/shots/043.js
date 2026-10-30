// 86.96–90.64: without the looters it might still lie in the forest floor — soil closes over the disc, roots
import { K, DEFS, disc, grain, cam, prog, eio, lerp, f1 } from './lib.js';
import { soilBg } from './soil.js';
export default function renderShot(t) {
  const d = eio(prog(t, 88.0, 89.6));
  const roots = `<path d="M 200 -60 Q 260 400 180 700 Q 140 900 260 1100 M 880 -60 Q 820 300 900 600 Q 960 900 840 1300" fill="none" stroke="#2A1F16" stroke-width="22" stroke-linecap="round"/>`;
  return `${DEFS}${cam(soilBg(8) + roots + disc(540, 960, 260, { id: 'R', damage: false, dirt: d * .9 }) + `<rect x="-60" y="-60" width="1200" height="${f1(lerp(-60, 300, d))}" fill="#26332D"/>`, lerp(1, .9, eio(prog(t, 86.96, 90.64))), 540, 960)}${grain(t)}`;
}
