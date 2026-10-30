// 11.62–14.02: bubbles let go of the shell and rise to the surface ("lösen sich ab … steigen nach oben")
import { K, prog, eio, eout, lerp } from './lib.js';
import { closeBG, glass, egg, shellBubbles, rising, CGX, CGY, CS, EY, GL } from './sets.js';
export default function renderShot(t) {
  const top = -.78 * (GL.h - 22) - 4;
  const inner = egg(0, EY, 1, { id: 'e7', w: 2.4 }) + shellBubbles(0, EY, 48, 60, 1 - .35 * eio(prog(t, 11.9, 12.5)), t, 26, 1, 4.2)
    + rising(0, EY, 48, 60, top, t, 12.2, { n: 16, speed: 110, r: 4.2 });
  return `${closeBG()}${glass(CGX, CGY, CS, { id: 'g7', level: .78, inner })}`;
}
