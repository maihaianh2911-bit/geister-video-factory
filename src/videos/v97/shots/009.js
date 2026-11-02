// L4b 23.30–24.92: insert on the monitor: the error box ("nicht klarkommst"), the colleague's hand points, the cursor clicks and the fix bar fills green.
import { frame, cam, prog, eio } from './lib.js';
import { openOffice, desk, programUI } from './sets.js';
export default function renderShot(t) {
  let s = openOffice(t, { hh: 12, mm: 30, strong: true });
  const fix = eio(prog(t, 24.25, 24.9));
  const mv = eio(prog(t, 23.4, 24.1));
  const cur = [-40 + 140 * mv, -180 - 60 * mv];
  s += desk(t, { y: 1400, mx: 540, inner: programUI({ cursor: cur, fix }), notes: true });
  // the new colleague's sleeve + hand pointing in from the right
  const hx = 820 - 120 * mv, hy = 1150 - 40 * mv;
  s += `<path d="M 1180 1300 Q 1000 1240 ${hx} ${hy}" stroke="#1d1d1d" stroke-width="56" fill="none" stroke-linecap="round"/><path d="M 1180 1300 Q 1000 1240 ${hx} ${hy}" stroke="#d9a62e" stroke-width="44" fill="none" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="23" fill="#1d1d1d"/>`;
  return frame(cam(s, 540, 1210, 2.0 + .1 * eio(prog(t, 23.3, 24.92)), 0, -80));
}
