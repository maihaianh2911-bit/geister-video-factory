// 66.4–68.74: handcuffs on everyone — three pairs of wrists, the last in the archaeologist's suit (auch ihn selbst)
import { K, DEFS, BG, cuffs, grain, cam, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const sl = (c) => (y, p, cuffc) => `<path d="M -60 ${y - 60} L 330 ${y - 30}" stroke="${c}" stroke-width="110" stroke-linecap="round"/><path d="M 1140 ${y - 60} L 750 ${y - 30}" stroke="${c}" stroke-width="110" stroke-linecap="round"/>
    ${cuffc ? `<rect x="300" y="${y - 90}" width="24" height="110" fill="#F2EEE6" stroke="${K.ink}" stroke-width="4"/><rect x="756" y="${y - 90}" width="24" height="110" fill="#F2EEE6" stroke="${K.ink}" stroke-width="4"/>` : ''}
    <ellipse cx="400" cy="${y - 30}" rx="80" ry="52" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/><ellipse cx="680" cy="${y - 30}" rx="80" ry="52" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/>${cuffs(410, y - 30, 670, y - 30, p)}`;
  const rows = [[480, K.pull, 66.5, false], [900, '#3E4A3A', 66.95, false], [1320, K.suit, 67.72, true]];
  return `${DEFS}${BG('#9C8B72')}${rows.map(([y, c, t0, cf]) => sl(c)(y, prog(t, t0, t0 + .3), cf)).join('')}${grain(t)}`;
}
