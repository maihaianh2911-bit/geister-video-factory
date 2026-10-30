// 58.86–61.0 · "Hält ein Kopfschmerz deutlich länger an" — the pain stays while the stopwatch runs on and on
import { P, pastel, girl, stopwatch, prog, eio, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const ang = eio(prog(t, 59.1, 60.9)) * Math.PI * 2 * 2.2;
  return `${pastel(t, { color: '#F3EEF7' })}
    ${girl(380, 1560, 1.75, { t, id: 's31', eyes: 'half', brow: 1, mouth: 'flat', painFore: .9 + .1 * Math.sin(t * 8), handL: [-20, -300], palmL: 8, handR: [300, 700] })}
    ${stopwatch(800, 420, .9 * back(prog(t, 58.9, 59.15)), ang, { sweep: Math.min(ang, Math.PI * 1.98) })}`;
}
