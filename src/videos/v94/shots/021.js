// L15 63.54–66.02: SAMSTAGMORGEN — sunny kitchen. du (still with the heavy backpack) stands at the table and writes a few
// lines on a sheet of paper; teapot and plant in the sharp foreground.
import { K, frame, cam, kitchen, person, shadow, dayCard, teapot, leaf, mug, pen, tableEdge, prog, eio, eout, lerp, cl, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = kitchen({ dx: -24 * eio(prog(t, 63.54, 66.02)), clock: [9, 5] });
  const X = 430, Y = 1560, S = 1.55;
  const w = t > 64.0 ? Math.sin(t * 9) * 12 : 0;
  const hx = 140 + w + Math.max(0, (t - 64) % 1) * 30, hy = -190;
  s += person('du', X, Y, S, { t, seed: 1, load: .85, nStones: 5, hunch: .45, eyes: 'n', brows: 'calm', mouth: 'flat', look: [10, 16], armR: [hx, hy], rim: '#fff2c0', hold: pen(hx + 4, hy - 2, .5, 30) });
  // table with the sheet (sharp foreground)
  s += tableEdge(1290, '#d4b48a', '#e4c8a0');
  s += `<path d="M 560 1300 L 840 1300 L 900 1420 L 520 1420 Z" fill="#fffdf4" stroke="${K.ink}" stroke-width="4"/>` + [0, 1, 2].map(i => `<path d="M ${590 - i * 8} ${1330 + i * 28} L ${f1(590 - i * 8 + cl((t - 64.0 - i * .6) / .6) * 220)} ${1330 + i * 28}" stroke="#1f3a8a" stroke-width="5" stroke-linecap="round"/>`).join('');
  s += teapot(170, 1440, 1.2, t) + mug(960, 1420, 1, '#f2efe8', { t }) + leaf(1080, 1900, 1.3, -150) + leaf(-30, 1880, 1.1, -30);
  s = cam(s, 560, 1100, 1.02 + .06 * eio(prog(t, 63.54, 66.02)));
  s += dayCard(t, 63.54, 'SAMSTAGMORGEN', { size: 84 });
  return frame(s, { vig: .4 });
}
