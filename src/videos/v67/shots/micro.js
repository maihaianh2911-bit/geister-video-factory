// Surface cross-section used in shots 015–016: candy material below a rough profile, cola above.
import { K, OL, f1, hash, lerp } from './lib.js';
export const SY = 1060; // mean surface height
// rough profile: r 0..1 roughness; returns points [x, y]
export function profile(r) {
  const pts = [];
  for (let i = 0; i <= 54; i++) {
    const x = -40 + i * 21.5, pit = (i % 9 === 4) ? 1 : 0;
    const y = SY + r * ((hash(i * 3.3) - .5) * 70 + pit * 120 + (i % 9 === 3 || i % 9 === 5 ? 40 : 0));
    pts.push([x, y]);
  }
  return pts;
}
export const PITS = [4, 13, 22, 31, 40, 49].map(i => -40 + i * 21.5);
export function section(r, extra = '') {
  const p = profile(r);
  const d = 'M ' + p.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L ');
  return `<rect x="-60" y="-60" width="1200" height="2040" fill="${K.cola}"/>
  <path d="${d} L 1140 2000 L -60 2000 Z" fill="${K.mentos}"/>${extra}
  <path d="${d}" fill="none" ${OL(9)}/>
  ${[0, 1, 2, 3, 4].map(i => `<circle cx="${120 + i * 210}" cy="${1350 + (i % 2) * 120}" r="10" fill="${K.mentosD}"/>`).join('')}`;
}
export const pitY = (r) => SY + r * 120 + 10;
