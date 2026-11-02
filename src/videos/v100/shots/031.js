// L17a 75.14–78.16: warm daylight close-up: du breathes out, relieved (eyes closed on "Nein" 75.8), a little breath puff; "10 SEKUNDEN MUT" pops on "zehn Sekunden" (76.78). Battery green above.
import { frame, cam, head, pop, prog, eio, label, office2, battery, duBat, pool, K, op } from './all.js';
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  s += pool(700, 700, 600, 600, '#fff3b0', .3);
  const relief = t > 75.8 && t < 77.2;
  s += head('du', 460, 1220, 1.65, { t, seed: 1, eyes: relief ? 'closed' : 'n', brows: 'calm', mouth: relief ? 'o' : 'smile', blink: !relief, headTilt: relief ? 5 : 0, look: [10, -4] });
  const pf = prog(t, 76.0, 77.0);
  if (pf > 0 && pf < 1) s += `<g opacity="${op(1 - pf)}" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"><path d="M ${600 + pf * 90} ${1395} q 30 -20 60 0"/><path d="M ${620 + pf * 120} ${1430} q 30 -20 60 0"/></g>`;
  s += `<path d="M 120 1960 C 140 1640 280 1510 460 1510 C 640 1510 780 1640 800 1960 Z" fill="${K.du}" stroke="${K.ink}" stroke-width="6"/>`;
  s += battery(460, 600, 1.0, duBat(t).lvl, { t, glow: .6 });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 75.14, 78.16)), 0, 0);
  s += label('10 SEKUNDEN MUT', 540, 300, 96, { p: pop(t, 76.78, .45) });
  return frame(s);
}
