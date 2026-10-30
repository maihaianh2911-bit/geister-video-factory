// 32.3–36.82: pushed where you did not want to go ("gedrängt"): you face left and reach that way (dashed arrow), but the whole crowd slides right and carries you along
import { K, DEFS, BG, person, crowdRow, grain, f1, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const m = eio(prog(t, 33.0, 36.4));
  const dx = 260 * m;
  const want = `<path d="M ${f1(380 + dx)} 820 L 120 820" stroke="${K.ink}" stroke-width="10" stroke-dasharray="26 18" fill="none"/><path d="M 160 790 L 120 820 L 160 850" stroke="${K.ink}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  const push = `<path d="M 560 560 L ${f1(760 + 140 * m)} 560" stroke="${K.red}" stroke-width="16" stroke-linecap="round"/><path d="M ${f1(720 + 140 * m)} 526 L ${f1(760 + 140 * m)} 560 L ${f1(720 + 140 * m)} 594" stroke="${K.red}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const sc = `${BG('url(#lSky)')}${grain(8)}<rect x="-60" y="1400" width="1200" height="600" fill="${K.concreteD}"/>
    <g transform="translate(${f1(dx * .9)} 0)">${crowdRow(t, 1180, .75, 13, -400, 110, 9, { lean: () => 8 * m })}</g>
    <g transform="translate(${f1(dx)} 0)">${crowdRow(t, 1400, 1.05, 3, -300, 170, 10, { lean: () => 10 * m })}${crowdRow(t, 1400, 1.05, 3, 660, 170, 11, { lean: () => 6 * m })}
      ${person(380, 1400, 1.05, { you: true, face: 1, brow: 1, dir: -1, aF: 70, aB: 20, lean: -6 + 4 * m, stepL: [30 * m, 0], stepR: [-10, 0] })}</g>
    ${want}${push}`;
  return `${DEFS}${sc}`;
}
