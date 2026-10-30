// v64 carriage-interior helpers for this video (shots 014, 015, 018, 027, 035): seated and standing passengers
import { K, person, bench, f1 } from './lib.js';
// seated passenger on a bench, seat line y0-130
export function seated(x, y0, s, o = {}) {
  const p = person(x, y0 - 130 + 300 * s, s, { bust: true, ...o });
  return p.svg + `<rect x="${f1(x - 80 * s - 20)}" y="${y0 - 130}" width="${f1(160 * s + 40)}" height="34" rx="8" fill="${K.brownD}" stroke="${K.ink}" stroke-width="5"/>`;
}
export const backrest = (x, y0, w) => `<rect x="${x - w / 2}" y="${y0 - 240}" width="${w}" height="120" rx="12" fill="${K.brown}" stroke="${K.ink}" stroke-width="5"/><path d="M ${x - w / 2 + 14} ${y0 - 96} V ${y0} M ${x + w / 2 - 14} ${y0 - 96} V ${y0}" stroke="${K.ink}" stroke-width="10"/>`;
// the crowd in the carriage: r = reaction 0..1 (recoil, fear), t time
export function crowd(t, y0, r = 0, o = {}) {
  const L = [
    [110, { hat: 'fedora', col: '#6A5A4A' }], [250, { hat: 'cloche', hatCol: '#7B4B5A', col: '#8C6A7A', hair: '#5A3A2A' }],
    [830, { hat: 'boater', col: '#5A6670' }], [970, { hat: 'none', col: '#7A6A4A', hair: '#2E2420' }],
  ];
  let s = backrest(180, y0, 300) + backrest(900, y0, 300);
  L.forEach(([x, oo], i) => {
    const side = x < 540 ? -1 : 1;
    s += seated(x + side * 14 * r, y0, .78, { ...oo, lean: side * 12 * r, brow: r, mouth: r > .4 ? 'o' : 'n', look: -side, aL: r > .4 ? [60 * r, 60] : [10, 20], aR: r > .4 ? [60 * r, 60] : [10, 20], band: o.band && (i === 0 || i === 3) });
  });
  return s;
}
