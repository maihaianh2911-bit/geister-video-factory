// 54.22–57.24: ether spreads — a glowing inhaler in the centre; small copies travel out along lines to other hospitals, which light up cyan ("verbreiten" 56.32).
import { K, DEFS, BG, inhaler, prog, eio, eout, lerp, f1 } from './lib.js';
const H = [[180, 360], [880, 330], [140, 1160], [920, 1180], [540, 220], [300, 760], [800, 790]];
const hosp = (x, y, lit) => `<g transform="translate(${x} ${y})"><rect x="-60" y="-40" width="120" height="80" fill="${lit > 0 ? K.white : '#5C6896'}" stroke="${K.ink}" stroke-width="4"/><path d="M -70 -40 L 0 -84 L 70 -40 Z" fill="${lit > 0 ? K.white : '#5C6896'}" stroke="${K.ink}" stroke-width="4"/><path d="M -10 -10 h 20 M 0 -20 v 20" stroke="${K.red}" stroke-width="7"/>
  <circle r="110" fill="url(#nCyan)" opacity="${f1(lit)}"/></g>`;
export default function renderShot(t) {
  const g = eout(prog(t, 54.22, 54.6));
  let s = '';
  H.forEach(([x, y], i) => {
    const t0 = 54.6 + (i % 4) * .35 + (i > 3 ? .25 : 0), p = eio(prog(t, t0, t0 + 1.1)), lit = eout(prog(t, t0 + 1.0, t0 + 1.3));
    s += `<path d="M 540 760 L ${x} ${y}" stroke="${K.cyan}" stroke-width="5" stroke-dasharray="14 12" opacity="${f1(.5 * g)}"/>${hosp(x, y, lit)}`;
    if (p > 0 && p < 1) s += inhaler(lerp(540, x, p), lerp(760, y, p), .22, 0, 1, t);
  });
  return `${DEFS}${BG()}${s}<circle cx="540" cy="760" r="${f1(200 * g)}" fill="url(#nCyan)"/>${inhaler(520, 760, .9, 0, 1, t)}`;
}
