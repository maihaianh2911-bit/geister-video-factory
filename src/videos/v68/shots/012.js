// 27.2–31.12: time passes — the window goes day → evening → night → day; bubbles keep rising, the shell fades
import { K, prog, eio, lerp, cam } from './lib.js';
import { kitchen, glass, egg, rising, shellBubbles, vinegar, TY } from './sets.js';
export default function renderShot(t) {
  const u = prog(t, 27.4, 30.9), night = u < .5 ? u * 2 : (1 - u) * 2;
  const sh = lerp(1, .55, eio(u));
  const inner = egg(0, -66, .69, { id: 'e12', shell: sh }) + shellBubbles(0, -66, 33, 41, .8, t, 14, 3, 3) + rising(0, -66, 33, 41, -170, t, 27, { n: 8, speed: 60, r: 3 });
  return cam(`${kitchen({ night })}${vinegar(930, TY, .7)}${glass(720, TY, .9, { id: 'g12', level: .78, inner })}`, 1.45, 760, 900, -170, 40);
}
