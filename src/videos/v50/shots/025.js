// 47.0–49.56 · "nach ein paar Sekunden bis wenigen Minuten" — stopwatch ticks seconds, then sweeps minutes
import { P, pastel, stopwatch, label, prog, eio, back } from '../lib.js';

export default function renderShot(t) {
  const sec = Math.floor(prog(t, 47.1, 48.6) * 8) / 60 * Math.PI * 2;
  const sw = eio(prog(t, 48.62, 49.4)) * Math.PI * 1.7;
  const ang = sec + sw;
  const a = back(prog(t, 47.45, 47.65)), b = back(prog(t, 48.6, 48.8));
  return `${pastel(t, { color: '#E8F6F3' })}
    ${stopwatch(540, 760, 1.65, ang, { sweep: sw > 0 ? sw : 0 })}
    ${b > 0 ? label('SEKUNDEN – MINUTEN', 540, 1260, 80, { scale: b, w: 880 }) : label('SEKUNDEN', 540, 1260, 92, { scale: a })}`;
}
