// Position sense: with the nerve free, little signals climb from the foot to the brain on "melden"; on "Gehirn" a thought bubble shows the foot in its current position.
import { K, brain, footIcon, prog, back, lerp } from './lib.js';
import { path, pulse } from './010.js';
export function bubble(p, inner) {
  if (p <= 0) return '';
  const sc = back(Math.min(1, p));
  return `<circle cx="690" cy="560" r="${18 * sc}" fill="${K.white}" stroke="${K.ol}" stroke-width="4"/><circle cx="730" cy="500" r="${26 * sc}" fill="${K.white}" stroke="${K.ol}" stroke-width="4"/>
   <g transform="translate(830 330) scale(${sc.toFixed(3)})"><circle r="170" fill="${K.white}" stroke="${K.ol}" stroke-width="6"/>${inner}</g>`;
}
export function ups(t, t0, weak = 0) {
  let s = '';
  if (t < t0) return s;
  for (let i = 0; i < 3; i++) { const ph = ((t - t0) * 1.4 + i / 3) % 1, y = lerp(1130, 500, ph); s += pulse(y, y > 860 ? .9 : .9 * (1 - weak), 34); }
  return s;
}
export default function renderShot(t) {
  const b = prog(t, 22.86, 23.1);
  return path(t, { open: 1 }) + brain(540, 340, 1.35, { mouth: 'flat' }) + footIcon(533, 1330, 2.2, 0) + ups(t, 22.22) + bubble(b, footIcon(-40, 70, 1.05, 0));
}
