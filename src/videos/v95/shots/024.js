// L16 64.22–68.40: next morning, the bathroom is warm and sunny; du stands at the mirror; the green speaker crackles on "knackt" (67.52).
import { K, frame, cam, dayCard, label, pop, prog, eio } from './lib.js';
import { bathroom, sinkFg, mirrorFrame } from './sets.js';
import { duSp, GREEN } from './base.js';
export default function renderShot(t) {
  let s = bathroom(t, { mood: 'sun' });
  const cr = t >= 67.52 ? Math.max(0, 1 - (t - 67.52) * 1.4) : 0;
  s += duSp(560, 1760, 1.02, { t, eyes: 'tired', brows: 'calm', mouth: 'flat', look: [0, 4] }, { ...GREEN, crack: cr, talk: 0 });
  s += sinkFg(t);
  s = cam(s, 540, 1100, 1.0 + .07 * eio(prog(t, 64.22, 68.4)));
  s += mirrorFrame(true) + label('NÄCHSTER MORGEN', 540, 250, 88, { p: pop(t, 64.36, .45) });
  return frame(s);
}
