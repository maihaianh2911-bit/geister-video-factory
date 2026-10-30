// 43.18–47.4: staff can't reach the system to work on old orders ("Mitarbeiter" 43.18, "System nicht" 44.38–44.68, "alte Aufträge" 45.38–45.72) — her screen shows "no connection" next to a growing pile of order slips
import { K, DEFS, bust, monitor, wifi, TX, cam, prog, eio, lerp, f1 } from './lib.js';
import { room, desk } from './sets.js';
export default function renderShot(t) {
  const n = Math.floor(lerp(1, 7, eio(prog(t, 45.2, 46.6))));
  const slips = [...Array(n)].map((_, i) => `<g transform="translate(${880 + (i % 2) * 14} ${1230 - i * 26}) rotate(${(i % 3 - 1) * 5})"><rect x="-90" y="-20" width="180" height="40" rx="6" fill="${K.white}" stroke="${K.ink}" stroke-width="3"/><rect x="-70" y="-6" width="90" height="10" rx="5" fill="${K.greyL}"/></g>`).join('');
  const scr = `${wifi(220, 210, .7, prog(t, 44.3, 44.5) > .5 ? 0 : 1)}`;
  const p = bust('du', 260, 1120, 1.1, { look: .9, lookY: -.2, brow: .7, mouth: 'down', aR: [[400, 1300], [470, 1260]] });
  return `${DEFS}${cam(`${room(1)}${monitor(560, 820, 440, 320, scr)}${desk(1250)}${slips}${p}`, lerp(1, 1.05, prog(t, 43.18, 47.4)), 560, 1000)}`;
}
