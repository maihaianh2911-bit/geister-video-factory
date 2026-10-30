// One friend (green) walks off alone into the black forest; his tiny light shrinks while the group stays behind.
import { K, DEFS60, forest, fig, FG, prog, eio, lerp } from './lib.js';

export default function renderShot(t) {
  const w = eio(prog(t, 15.9, 17.3));
  const s = lerp(.7, .32, w), y = lerp(1500, 1180, w), x = lerp(560, 720, w);
  return DEFS60 + `${forest(t, { hz: 1120, px: 20 })}
  <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity="${lerp(.1, .45, w)}"/>
  <ellipse cx="${x + 30 * s}" cy="${y - 420 * s}" rx="${200 * s}" ry="${200 * s}" fill="url(#fAmb)" opacity=".8"/>
  ${fig('green', x, y, s, { back: true, walk: t * 8, aR: [50, 40], noShadow: false })}
  <g opacity=".85">${fig('red', 140, 1700, .9, { back: true })}${fig('yellow', 330, 1720, .85, { back: true })}${fig('blue', 920, 1720, .9, { back: true, hug: true })}</g>
  ${FG(1440)}`;
}
