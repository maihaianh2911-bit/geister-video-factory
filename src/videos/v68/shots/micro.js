// Shell surface in section (shots 009–011): chalk blocks (Kalk) under vinegar; acid particles; CO2 bubbles.
import { K, OL, f1, hash, lerp, cl } from './lib.js';
export const SY = 1000;
export function shell(th, o = {}) { // th = remaining thickness factor 0..1
  const H = 340 * th;
  let blocks = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) {
    const y = SY + r * 85, x = -20 + c * 130 + (r % 2) * 65;
    if (y + 80 > SY + H + 2 && r > 0) continue;
    const eat = o.eat ? cl(o.eat - hash(c * 3 + r) * .5) : 0;
    blocks += `<rect x="${f1(x + eat * 18)}" y="${f1(y + eat * 22)}" width="${f1(120 - eat * 36)}" height="${f1(76 - eat * 26)}" rx="10" fill="#F2E3CF" ${OL(5)}/>`;
  }
  return `<rect x="-60" y="-60" width="1200" height="2040" fill="#F3E7B8"/>
  <rect x="-60" y="${f1(SY + H)}" width="1200" height="2000" fill="#F6EBD9"/><path d="M -60 ${f1(SY + H)} H 1140" stroke="#C9B48F" stroke-width="10" stroke-dasharray="20 12"/>
  <g clip-path="url(#shClip)"><defs><clipPath id="shClip"><rect x="-60" y="${SY - 10}" width="1200" height="${f1(H + 10)}"/></clipPath></defs>${blocks}</g>`;
}
export const acid = (x, y, a = 1) => `<g opacity="${cl(a).toFixed(2)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="16" fill="${K.red}" ${OL(4)}/><path d="M ${f1(x - 7)} ${f1(y)} H ${f1(x + 7)} M ${f1(x)} ${f1(y - 7)} V ${f1(y + 7)}" stroke="#FFFFFF" stroke-width="4"/></g>`;
