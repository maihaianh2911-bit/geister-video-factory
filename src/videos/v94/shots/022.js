// L14 59.92–63.54: close-up of du in warm light: the old loop of words slows and fades one by one from "hört auf" (60.38); his face relaxes into a calm smile.
import { K, frame, person, cam, chip, pool, prog, eio, pop, f1 } from './lib.js';
import { kitchen } from './sets.js';
import { packOf } from './base.js';
const W = ['Vermieter.', 'Zahnarzt.', 'Steuer.', 'Oma.'];
export default function renderShot(t) {
  let s = kitchen(t, { strong: true });
  const calm = eio(prog(t, 61.2, 62.2));
  const hx = 560, hy = 900;
  s += person('du', hx, hy + 713 * 1.6, 1.6, { t, pack: packOf(5), eyes: calm > .5 ? 'closed' : 'n', brows: calm > .5 ? 'calm' : 'worried', mouth: calm > .5 ? 'smile' : 'flat', look: [0, -8], rim: '#ffd98a' });
  const slow = 1 - eio(prog(t, 60.38, 62.2));
  const a0 = (59.92 + (t - 59.92) * slow - 59.92) * 1.4;
  const rx = 330, ry = 150, cy = 560;
  const ringA = 1 - eio(prog(t, 61.6, 62.4));
  s += `<ellipse cx="${hx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#fff" stroke-width="10" stroke-dasharray="40 28" stroke-dashoffset="${f1(-a0 * 90)}" opacity="${f1(.85 * ringA)}"/>`;
  W.forEach((w, i) => {
    const a = 1 - eio(prog(t, 60.38 + i * .3, 60.68 + i * .3)); if (a <= 0) return;
    const an = a0 + Math.PI * 2 * i / 4 + 1;
    s += `<g opacity="${f1(a)}" transform="translate(${f1(hx + rx * Math.cos(an) * .95)} ${f1(cy + ry * Math.sin(an) + (1 - a) * 40)}) scale(${f1(.85 + .15 * Math.sin(an))})">${chip(0, 0, w, { size: 48 })}</g>`;
  });
  s += pool(700, 400, 400, 300, '#fff3b0', .3 * calm);
  return frame(cam(s, 540, 900, 1.02 + .06 * eio(prog(t, 59.92, 63.54))));
}
