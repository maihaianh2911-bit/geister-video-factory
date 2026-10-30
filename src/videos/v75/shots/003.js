// 7.42–9.86: in the morning the alarm on your phone still rings ("Wecker" 8.5) — the phone buzzes on the bedside table, your hand reaches and taps it
import { K, DEFS, phone, reach, glow, cam, prog, eio, lerp, f1 } from './lib.js';
import { room } from './sets.js';
export default function renderShot(t) {
  const ring = t < 9.2 ? Math.sin(t * 50) * 6 : 0, r = eio(prog(t, 8.7, 9.2));
  const scr = `<circle cx="0" cy="-40" r="56" fill="none" stroke="${K.sun}" stroke-width="12"/><path d="M 0 -40 V -72 M 0 -40 L 24 -26" stroke="${K.sun}" stroke-width="10" stroke-linecap="round"/><path d="M -60 -100 l -22 -22 M 60 -100 l 22 -22" stroke="${K.sun}" stroke-width="10" stroke-linecap="round"/><rect x="-70" y="40" width="140" height="56" rx="28" fill="${t < 9.2 ? K.sun : K.grey}"/>`;
  const p = phone(540 + ring, 1080, 1.1, scr, -6);
  const waves = t < 9.2 ? [1, 2].map(i => `<path d="M ${380 - i * 40} ${1000 - i * 30} q -30 80 0 160 M ${700 + i * 40} ${1000 - i * 30} q 30 80 0 160" fill="none" stroke="${K.sun}" stroke-width="8" stroke-linecap="round" opacity=".7"/>`).join('') : '';
  const sc = `${room(0)}<rect x="160" y="1300" width="760" height="40" fill="${K.woodL}" stroke="${K.ink}" stroke-width="4"/><rect x="200" y="1340" width="680" height="400" fill="${K.wood}"/>${glow(540, 1080, 400, .5, 'iWarm')}${waves}${p}${reach(1200, 1700, lerp(1100, 600, r), lerp(1500, 1180, r), 1.3)}`;
  return `${DEFS}${cam(sc, 1.05, 540, 1100)}`;
}
