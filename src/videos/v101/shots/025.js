// L13 62.5–67.1: happiness graph: the line rises on "glücklicher" (62.8–63.8) and stays high along the months up to the marker 6 MONATE (65.38); label GLÜCKLICHER.
import { K, frame, cam, prog, eio, pop, label, T, f1, op } from './lib.js';
import { hall } from './sets.js';
import { orb } from './jar.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = hall(t, { strong: true }) + `<rect x="-200" y="-200" width="1480" height="2320" fill="#1d1a16" opacity=".35"/>`;
  s += `<rect x="70" y="420" width="940" height="900" rx="30" fill="#fbf8ef" stroke="${INK}" stroke-width="8"/>`;
  const X0 = 160, X1 = 940, Y0 = 1180, Ytop = 560;
  s += `<path d="M ${X0} ${Ytop - 20} V ${Y0} H ${X1 + 20}" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  s += T(X0 + 10, 520, 'GLÜCK', 34, { anchor: 'start', fill: K.txt }) + T(X1 - 10, Y0 + 60, 'ZEIT', 34, { anchor: 'end', fill: K.txt });
  // months ticks
  ['START', '1 WOCHE', '1 MON.', '3 MON.', '6 MONATE'].forEach((m, i) => { const x = X0 + 40 + i * 180; s += `<path d="M ${x} ${Y0} v 16" stroke="${INK}" stroke-width="6"/>` + T(x, Y0 + 50, m, i === 4 ? 30 : 24, { fill: i === 4 ? '#d9493f' : '#7a838c', op: i === 4 ? eio(prog(t, 65.3, 65.6)) : 1 }); });
  // curve: flat low → rises → stays high
  const fy = x => { const u = (x - X0) / (X1 - X0); return Y0 - 120 - 380 * eio(Math.min(1, Math.max(0, (u - .12) / .3))); };
  const reveal = X0 + (X1 - X0) * (prog(t, 62.6, 63.9) * .45 + prog(t, 64.2, 65.5) * .55);
  let d = ''; for (let x = X0; x <= reveal; x += 12) d += (d ? ' L ' : 'M ') + f1(x) + ' ' + f1(fy(x));
  if (d) s += `<path d="${d}" stroke="#3c9a5f" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` + orb(reveal, fy(reveal), 16, 1, t);
  if (t > 65.4) s += `<path d="M ${X0 + 760} ${Ytop - 20} V ${Y0}" stroke="#d9493f" stroke-width="6" stroke-dasharray="16 12" opacity="${op(eio(prog(t, 65.4, 65.7)))}"/>`;
  s = cam(s, 540, 880, 1.0 + .05 * eio(prog(t, 62.5, 67.1)));
  s += label('GLÜCKLICHER', 540, 250, 96, { p: pop(t, 63.48, .45) });
  return frame(s);
}
