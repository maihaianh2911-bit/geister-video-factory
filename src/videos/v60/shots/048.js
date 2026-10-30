// The four friends' faces light up blue: relief, they look up and smile — they have been heard.
import { K, DEFS60, forest, fig, FG, prog, eio, lerp, blinkAt } from './lib.js';

export default function renderShot(t) {
  const r = eio(prog(t, 77.9, 78.3));
  const bl = Math.floor(t * 4) % 2;
  const m = r > .5 ? 'smile' : 'o';
  return DEFS60 + `${forest(t, { hz: 900, px: -100 })}
  <ellipse cx="900" cy="500" rx="500" ry="460" fill="url(#fBlue)" opacity="${.35 + .25 * bl}"/>
  <ellipse cx="540" cy="1100" rx="520" ry="400" fill="url(#fAmb)" opacity=".4"/>
  ${fig('green', 170, 1520, 1.0, { sit: true, look: 12, lookY: -10, brow: r > .5 ? 'up' : 'calm', mouth: m, blink: blinkAt(t) })}
  ${fig('red', 400, 1530, 1.05, { sit: true, look: 12, lookY: -10, brow: 'up', mouth: m, aR: [lerp(10, 150, r), lerp(6, 160, r)] })}
  ${fig('blue', 640, 1540, 1.05, { sit: true, hug: true, cold: true, look: 10, lookY: -10, brow: 'up', mouth: m })}
  ${fig('yellow', 880, 1530, 1.0, { sit: true, look: 8, lookY: -10, brow: 'up', mouth: m, blink: blinkAt(t, 1) })}
  ${FG(1460)}`;
}
