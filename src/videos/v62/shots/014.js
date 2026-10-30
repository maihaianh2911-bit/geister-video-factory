// The pinch closes again: the position signals fade above it, and the bubble's foot turns faint and dashed, drifting away from the real one on "weniger deutlich".
import { K, brain, footIcon, prog, eio, lerp } from './lib.js';
import { path } from './010.js';
import { bubble, ups } from './012.js';
export default function renderShot(t) {
  const close = eio(prog(t, 26.3, 26.8));
  const fade = eio(prog(t, 27.3, 28.0));
  return path(t, { open: 1 - close }) + brain(540, 340, 1.35, { mouth: fade > .5 ? 'worry' : 'flat' }) + footIcon(533, 1330, 2.2, 10) + ups(t, 26.16, .85 * close)
    + bubble(1, footIcon(-40, 70, 1.05, lerp(10, -22, fade), { a: lerp(1, .45, fade), dash: fade > .2 }));
}
