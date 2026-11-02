// L15c 67.38–69.924: final medium shot: du stands in the sunny street; the world is briefly washed out, then on "zurückkommt" (67.94)
// the colour sweeps back as a ring from du outward; du opens his arms and smiles, the FARBE meter glows at 100 %.
import { frame, cam, prog, eio, person, shadow, f1 } from './lib.js';
import { street } from './sets2.js';
import { farbeBar } from './common.js';
export default function renderShot(t) {
  const p = eio(prog(t, 67.8, 68.7));
  const base = street(t, {});
  const r = 2200 * p;
  const R = f1(Math.max(1, r));
  const hole = `M -300 -300 H 1380 V 2220 H -300 Z M ${440 - R} 1100 a ${R} ${R} 0 1 0 ${2 * R} 0 a ${R} ${R} 0 1 0 ${-2 * R} 0 Z`;
  let s = base + (p < 1 ? `<path d="${hole}" fill-rule="evenodd" fill="#808080" style="mix-blend-mode:saturation"/><path d="${hole}" fill-rule="evenodd" fill="#9a9a9a" opacity=".18"/>` : '');
  if (p > 0 && p < 1) s += `<circle cx="440" cy="1100" r="${f1(r)}" fill="none" stroke="#fff3b0" stroke-width="${f1(30 * (1 - p) + 4)}" opacity="${(.8 * (1 - p)).toFixed(2)}"/>`;
  const o = eio(prog(t, 67.9, 68.4));
  s += shadow(440, 1660);
  s += person('du', 440, 1660, 1, { t, seed: 1, eyes: o > .5 ? 'happy' : 'n', brows: 'up', mouth: o > .5 ? 'grin' : 'smile', look: [0, -6],
    armL: [-140 - 140 * o, -420 - 200 * o], elbowL: [-240, -420], armR: [140 + 140 * o, -420 - 200 * o], elbowR: [240, -420] });
  s = cam(s, 540, 1050, 1.0 + .06 * eio(prog(t, 67.38, 69.924)));
  s += farbeBar(1, { glow: .5 + .5 * Math.sin(t * 4) * Math.sin(t * 4) });
  return frame(s);
}
