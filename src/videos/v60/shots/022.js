// Close-up: a finger presses the side button; on "aus" the screen goes black — the battery is spared.
import { K, DEFS60, P, phone, battery, armTo, FG, TX, prog, eout, lerp } from './lib.js';

export default function renderShot(t) {
  const push = eout(prog(t, 32.3, 32.55)) * (1 - eout(prog(t, 32.7, 32.9)));
  const on = t < 32.6 ? 1 : 0;
  const s = 3.0, px = 500, py = 860;
  const scr = `${battery(0, -30, .6, .04, K.red)}${TX('4 %', 0, 30, 32, K.red)}`;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0E161A"/>
  <ellipse cx="500" cy="860" rx="${on ? 560 : 300}" ry="${on ? 620 : 300}" fill="url(#fCold)" opacity="${on ? .35 : .06}"/>
  ${armTo(-60, 1800, 300, 1150, 120, P.red.j, -1, P.red.skin)}
  ${phone(px, py, s, 0, { on, screen: scr, glow: false })}
  <rect x="${px + 70 * s}" y="${py - 70 * s}" width="18" height="90" rx="6" fill="#3A464E" stroke="#0B0F12" stroke-width="5"/>
  ${armTo(1180, 1500, px + 70 * s + 70 - 30 * push, py - 30 * s, 110, P.red.j, 1, P.red.skin)}
  ${FG(1440)}`;
}
