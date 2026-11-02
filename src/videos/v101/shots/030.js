// L16b 79.3–82.404: the reasons are added ("und schreib dazu, warum" 79.6–80.9: "weil …"), then three lights rise from the page and float into the jar standing beside the diary; warm ending.
import { K, frame, cam, prog, eio, pop, T } from './lib.js';
import { diary } from './page.js';
import { write } from './props.js';
import { jar, flyer } from './jar.js';
export default function renderShot(t) {
  let extra = '';
  ['weil ich rausging', 'weil ich half', 'weil ich zuhörte'].forEach((r, i) => { extra += write(r, 46, 150 + i * 100, 24, eio(prog(t, 79.5 + i * .35, 80.1 + i * .35)), `w30${i}`, '#7a4a2e'); });
  let s = diary(t, [-1, -1, -1], { id: 'g', date: 'HEUTE', items: ['1. Sonne', '2. Lob', '3. Lachen'], extra });
  const T0 = [80.5, 80.9, 81.3], n = 30 + T0.filter(x => t >= x + .7).length;
  s += jar(740, 610, .9, { t, n, glow: .7 });
  T0.forEach((x, i) => { s += flyer(t, x, .7, 640, 860 + i * 120, 740, 480, 16, 160); });
  return frame(cam(s, 540, 860, 1.0 + .05 * eio(prog(t, 79.3, 82.404))));
}
