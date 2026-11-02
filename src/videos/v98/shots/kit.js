// v98 kitchen pieces: coffee machine + sharp counter with mugs
import { K, f1, mug } from './lib.js';
const INK = K.ink;
export function coffeeMachine(x, y, s = 1, t = 0, on = true) {
  let g = `<rect x="-90" y="-220" width="180" height="220" rx="16" fill="#3a3f48" stroke="${INK}" stroke-width="5"/><rect x="-70" y="-200" width="140" height="50" rx="8" fill="#555c66"/><circle cx="40" cy="-175" r="10" fill="${on ? '#3c9a5f' : '#777'}"/><rect x="-30" y="-140" width="60" height="30" fill="#22262c"/><rect x="-60" y="-20" width="120" height="14" fill="#22262c"/>`;
  if (on) for (let i = 0; i < 2; i++) { const p = (t * .6 + i * .5) % 1; g += `<path d="M ${-8 + i * 16} ${f1(-110 - p * 60)} c -8 -14 8 -22 0 -40" stroke="#fff" stroke-width="4" fill="none" opacity="${(0.5 * Math.sin(p * Math.PI)).toFixed(2)}"/>`; }
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">${g}</g>`;
}
export function counterFg(t, o = {}) {
  const y = o.y || 1680;
  let s = `<rect x="-60" y="${y}" width="1200" height="${2000 - y}" fill="#a8744a" stroke="${INK}" stroke-width="6"/><rect x="-60" y="${y}" width="1200" height="26" fill="#c9a26b"/>`;
  s += mug(o.m1 || 180, y, 1, '#f2efe8', t) + mug(o.m2 || 900, y, 1, '#e8b85c', t, false);
  s += `<g transform="translate(${o.bread || 560} ${y})"><ellipse cx="0" cy="-10" rx="110" ry="22" fill="#f4f1ea" stroke="${INK}" stroke-width="5"/><path d="M -60 -26 C -60 -70 60 -70 60 -26 Z" fill="#d9a35e" stroke="${INK}" stroke-width="5"/></g>`;
  return s;
}
