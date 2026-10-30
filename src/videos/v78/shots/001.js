// 0–3.12: cover — you stand in the bathroom next to the shower, the shower is crossed out; headline + day counter
import { K, BG, stick, cross, headline, calendar, cam, prog, eio, lerp } from './lib.js';
import { bathroom, shower, FY, FS } from './sets.js';
export default function renderShot(t) {
  const turn = eio(prog(t, .3, 1.0)), shake = Math.sin(t * 9) * eio(prog(t, 1.6, 2.0)) * (1 - eio(prog(t, 2.6, 3.0)));
  const fig = stick(690, FY, FS, { look: lerp(.3, -1, turn) + shake * .6, mouth: 'flat', brow: 'calm', hL: [600, 1100], hR: [780, 1110] });
  return `${cam(`${bathroom({ sink: false })}${shower(260, t, { on: 0 })}${cross(300, 300, 90, 1)}${fig}`, lerp(1, 1.04, prog(t, 0, 3.12)), 540, 1000)}
    ${headline([['1 MONAT', 112, K.ink], ['OHNE DUSCHE?', 104, K.red]], 470)}${calendar(930, 150, 1)}`;
}
