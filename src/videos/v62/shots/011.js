// The brain sends a move command down on "Bewegungsbefehle": it fades at the pinch, the foot only twitches instead of lifting (dashed = intended move); a second try on "schlechter" — same weak result.
import { K, brain, footIcon, prog, eio, lerp, cl } from './lib.js';
import { path, pulse } from './010.js';

export default function renderShot(t) {
  const cmd = (t0) => { const p = prog(t, t0, t0 + .65), y = lerp(500, 1130, p); return p <= 0 || p >= 1 ? '' : pulse(y, y < 860 ? 1 : .2); };
  const tw = (t0) => Math.sin(prog(t, t0 + .65, t0 + 1.1) * Math.PI);
  const twitch = -6 * Math.max(tw(18.38), tw(20.4));
  const want = Math.max(Math.sin(prog(t, 19.0, 20.0) * Math.PI), Math.sin(prog(t, 21.05, 21.9) * Math.PI));
  return path(t) + brain(540, 340, 1.35, { mouth: t > 19.2 ? 'worry' : 'flat' })
    + (want > .05 ? footIcon(533, 1330, 2.2, -28, { a: want * .9, dash: true, col: 'none', w: 7 }) : '')
    + footIcon(533, 1330, 2.2, twitch) + cmd(18.38) + cmd(20.4);
}
