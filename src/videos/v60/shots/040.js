// Front view of the seated huddle: the shivering friend in the grey beanie slides into the middle on "Mitte".
import { K, DEFS60, forest, fig, FG, prog, eio, lerp, blinkAt } from './lib.js';

export default function renderShot(t) {
  const m = eio(prog(t, 63.5, 64.2));
  const bx = lerp(900, 540, m);
  const make = lerp(0, 1, m);
  return DEFS60 + `${forest(t, { hz: 1000, px: -70 })}
  <ellipse cx="540" cy="1100" rx="520" ry="380" fill="url(#fAmb)" opacity="${.35 + .25 * m}"/>
  ${fig('green', lerp(220, 180, make), 1480, 1.0, { sit: true, look: lerp(10, 6, m), brow: 'calm', blink: blinkAt(t) })}
  ${fig('red', lerp(470, 330, make), 1490, 1.0, { sit: true, look: 12, brow: 'calm', aR: [lerp(10, 50, m), lerp(6, 70, m)] })}
  ${fig('yellow', lerp(700, 750, make), 1490, 1.0, { sit: true, look: -12, brow: 'calm', aL: [lerp(10, 50, m), lerp(6, 70, m)] })}
  ${fig('blue', bx, 1500, 1.05, { sit: true, hug: true, cold: true, shiver: lerp(1, .4, m), t, brow: 'worry', mouth: 'tight', look: -6 })}
  ${FG(1460)}`;
}
