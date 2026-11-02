// L7 31.40–35.56: close-up of du in the café, cool light: a loop arrow circles his head ("läuft im Kreis") and the four words appear on it one by one.
import { K, frame, person, cam, chip, pool, prog, eio, pop, f1 } from './lib.js';
import { cafe } from './sets.js';
import { packOf } from './base.js';
const W = [[33.18, 'Vermieter.'], [33.84, 'Zahnarzt.'], [34.62, 'Steuer.'], [35.15, 'Oma.']];
export default function renderShot(t) {
  let s = cafe(t, { strong: true });
  s += `<rect width="1080" height="1920" fill="#3a4a6a" opacity=".45"/>`;
  const hx = 560, hy = 900;
  s += person('du', hx, hy + 713 * 1.6, 1.6, { t, pack: packOf(5), hunch: 0, eyes: 'blank', brows: 'worried', mouth: 'flat', blink: false, look: [Math.sin(t * 3) * 10, 0] });
  // loop arrow (dashed ring) + words riding on it
  const a0 = (t - 31.4) * 1.4, ring = eio(prog(t, 31.5, 32.2));
  const rx = 330, ry = 150, cy = 560;
  s += `<ellipse cx="${hx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#fff" stroke-width="10" stroke-dasharray="40 28" stroke-dashoffset="${f1(-t * 120)}" opacity="${f1(.85 * ring)}"/>`;
  const ax = hx + rx * Math.cos(a0), ay = cy + ry * Math.sin(a0);
  if (ring > 0) s += `<g transform="translate(${f1(ax)} ${f1(ay)}) rotate(${f1(a0 * 180 / Math.PI + 90)})"><path d="M -30 -10 L 0 30 L 30 -10 Z" fill="#fff"/></g>`;
  W.forEach(([t0, w], i) => {
    const p = pop(t, t0, .4); if (p <= 0) return;
    const a = a0 + Math.PI * 2 * i / 4 + 1;
    const x = hx + rx * Math.cos(a) * .95, y = cy + ry * Math.sin(a);
    s += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(Math.max(.01, p) * (.85 + .15 * Math.sin(a)))})">${chip(0, 0, w, { size: 48 })}</g>`;
  });
  return frame(cam(s, 540, 900, 1.02 + .06 * eio(prog(t, 31.4, 35.56))));
}
