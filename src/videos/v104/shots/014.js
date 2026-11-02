// L8b 45.48–49.86: under the graph a range bar: a dot at 18 TAGE pops on "viel schneller" (46.6); the bar stretches far to the right to 254 TAGE
// on "über zweihundert Tage" (48.56–49.1); label 18 – 254 TAGE.
import { K, frame, cam, prog, eio, pop, label, T, f1 } from './lib.js';
import { voidRoom2 } from './sets3.js';
import { board, GX0, GX1 } from './013.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = voidRoom2(t, { top: '#2c3346', bot: '#3d4258' });
  s += `<g opacity=".45">${board(t, 1)}</g>`;
  const by = 1000, x18 = GX0 + 40, x254 = GX1 - 10;
  const a = pop(t, 46.6, .4), b = eio(prog(t, 48.4, 49.2));
  s += `<rect x="${GX0 - 40}" y="${by - 90}" width="${GX1 - GX0 + 80}" height="180" rx="24" fill="#fbf8ef" stroke="${INK}" stroke-width="6"/>`;
  if (a > 0) s += `<circle cx="${x18}" cy="${by}" r="${f1(26 * Math.min(1.2, a))}" fill="#2f7fb5" stroke="${INK}" stroke-width="5"/>` + T(x18, by - 40, '18', 44, { fill: '#2f7fb5', op: Math.min(1, a) });
  if (b > 0) s += `<rect x="${x18}" y="${by - 14}" width="${f1((x254 - x18) * b)}" height="28" rx="14" fill="#7fb3d9"/><circle cx="${f1(x18 + (x254 - x18) * b)}" cy="${by}" r="26" fill="#d9493f" stroke="${INK}" stroke-width="5"/>` + (b > .9 ? T(x254, by - 40, '254', 44, { anchor: 'end', fill: '#d9493f' }) : '');
  s = cam(s, 540, 960, 1.05 + .04 * eio(prog(t, 45.48, 49.86)));
  s += label('18 – 254 TAGE', 540, 260, 96, { p: pop(t, 48.93, .45) });
  return frame(s);
}
