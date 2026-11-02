// L1a 0–2.86: sunny colourful street, du (teal hoodie) walks in mid-frame and stops, smiling; hook title; on "fehlt" (2.3) a chip "−1 STUNDE SCHLAF" drops in and du's smile falters. FARBE meter appears full.
import { frame, cam, prog, eio, pop, person, shadow, label, chip, fade } from './lib.js';
import { street } from './sets2.js';
import { fgTable, bar } from './base.js';
export default function renderShot(t) {
  let s = street(t);
  const w = eio(prog(t, 0, 1.1)), x = 260 + 160 * w;
  const hit = t > 2.3;
  s += shadow(x, 1640);
  s += person('du', x, 1640, 1, { t, seed: 1, walk: t < 1.1 ? t * 1.6 : undefined, look: hit ? [10, -12] : [6, -4], brows: hit ? 'worried' : 'calm', mouth: hit ? 'flat' : 'smile' });
  s += fgTable(t, 1720, { col: '#7d8a6a', hi: '#93a07c' });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 0, 2.86)));
  s += label('WAS WÄRE, WENN …', 540, 330, 92, { p: pop(t, .1, .45) });
  const c = pop(t, 2.3, .4);
  if (c > 0) s += `<g transform="translate(760 560) scale(${Math.max(.01, c).toFixed(3)}) translate(-760 -560)">${chip(760, 560, '−1 STUNDE SCHLAF', { size: 44, bg: '#2b3566', fill: '#fff' })}</g>`;
  s += bar(t, fade(t, 2.2, .4));
  return frame(s);
}
