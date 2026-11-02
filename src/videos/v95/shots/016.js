// L10 40.26–42.48: du freezes: both bubbles appear side by side – the kind white one and the red one – and she sees the difference ("Unterschied" 41.7).
import { K, frame, cam, speech, spiky, label, prog, eio, pop } from './lib.js';
import { room } from './sets.js';
import { duSp, spPos } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', strong: true });
  const real = eio(prog(t, 41.2, 41.7));
  const o = { t, look: [0, -10], eyes: real > .5 ? 'wide' : 'n', brows: real > .5 ? 'up' : 'calm', mouth: real > .5 ? 'o' : 'small' };
  s += duSp(540, 2080, 1.45, o, { talk: 0 });
  s += speech(290, 470, ['„Das passiert', 'jedem.“'], 400, 700, { p: pop(t, 40.4, .4), size: 46 });
  s += spiky(790, 470, ['„Du kriegst', 'nie etwas hin.“'], 760, 680, { p: pop(t, 40.76, .4), size: 44 });
  s = cam(s, 540, 960, 1.0 + .07 * eio(prog(t, 40.26, 42.48)));
  s += label('DER UNTERSCHIED', 540, 230, 88, { p: pop(t, 41.7, .4) });
  return frame(s);
}
