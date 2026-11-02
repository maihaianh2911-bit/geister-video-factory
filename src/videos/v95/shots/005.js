// L2a 10.24–12.70: MORGENS, cold grey bathroom seen from the mirror: du stares at herself; the speaker crackles on "knackt" (11.96).
import { K, frame, cam, shadow, dayCard, pop, prog, eio } from './lib.js';
import { bathroom, sinkFg, mirrorFrame } from './sets.js';
import { duSp } from './base.js';
export default function renderShot(t) {
  let s = bathroom(t, { mood: 'grey' });
  const cr = t >= 11.96 ? Math.max(0, 1 - (t - 11.96) * 1.4) : 0;
  s += duSp(560, 1760, 1.02, { t, eyes: 'tired', brows: 'calm', mouth: 'flat', look: [0, 4] }, { crack: cr, talk: 0 });
  s += sinkFg(t);
  s = cam(s, 540, 1100, 1.0 + .07 * eio(prog(t, 10.24, 12.7)));
  s += mirrorFrame(false) + dayCard(t, 10.24, 'MORGENS');
  return frame(s);
}
