// The real foot tilts up and down on "in welcher Stellung"; the foot in the brain's bubble follows exactly — matched on "befindet" (teal check).
import { K, brain, footIcon, check, prog, eio } from './lib.js';
import { path } from './010.js';
import { bubble, ups } from './012.js';
const ang = t => -24 * Math.sin(Math.PI * eio(prog(t, 24.1, 24.7))) + 16 * Math.sin(Math.PI * eio(prog(t, 24.75, 25.3)));
export default function renderShot(t) {
  return path(t, { open: 1 }) + brain(540, 340, 1.35, { mouth: 'smile' }) + footIcon(533, 1330, 2.2, ang(t)) + ups(t, 23.5)
    + bubble(1, footIcon(-40, 70, 1.05, ang(t - .08))) + check(980, 520, .6, prog(t, 25.08, 25.35));
}
