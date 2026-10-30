// 57.9–61.04: on the last day of the month ("letzten Tag des Monats" 58.1–58.86) the calendar shows 30; you step back under the shower ("Dusche" 60.46) — curtain covers you from the shoulders down, water starts
import { K, stick, calendar, cam, prog, eio, lerp } from './lib.js';
import { bathroom, shower, curtain, FY, FS } from './sets.js';
export default function renderShot(t) {
  const day = t < 58.4 ? 27 : t < 58.6 ? 28 : t < 58.8 ? 29 : 30, in_ = eio(prog(t, 59.2, 60.0)), on = eio(prog(t, 60.3, 60.6));
  const x = lerp(860, 540, in_);
  const fig = stick(x, FY, FS, { shirt: K.white, look: -.3, lookY: -.6 * on, mouth: on > .5 ? 'smile' : 'flat', hL: [x - 80, 1100], hR: [x + 80, 1110] });
  return `${cam(`${bathroom({ sink: false })}${shower(560, t, { on })}${fig}${curtain(300, 820, 900)}`, 1, 540, 960)}${calendar(930, 150, day)}`;
}
