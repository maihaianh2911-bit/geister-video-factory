// 17.0–18.25 · "und dann wieder weiten" — the vessel snaps wide, red again, blood rushes through
import { P, pastel, vesselTube, arrow, prog, eio, back, lerp, mix } from '../lib.js';

export default function renderShot(t) {
  const w = back(prog(t, 17.28, 17.55), 2.4);
  const wf = lerp(.42, 1.55, w);
  const col = mix(P.cold, '#E5484D', cl01(w));
  const a = t > 17.3 ? 1 - prog(t, 17.9, 18.2) : 0;
  const ay = 2.1 * (110 * wf / 2 + 22) + 20;
  let pulse = '';
  if (t > 17.46) for (let k = 0; k < 2; k++) { const p = ((t - 17.46) * 1.4 + k * .5) % 1; pulse += `<ellipse cx="540" cy="900" rx="${300 + 400 * p}" ry="${120 + 200 * p}" fill="none" stroke="#E5484D" stroke-width="${10 * (1 - p)}" opacity="${.6 * (1 - p)}"/>`; }
  return `${pastel(t, { color: '#FBEDEF' })}${pulse}
    <g transform="rotate(14 540 900) translate(540 900) scale(2.1) translate(-540 -900)">${vesselTube(540, 900, 760, wf, col, t, 1 + 2.5 * w)}</g>
    ${[330, 750].map(x => arrow(x, 900 - ay, x, 900 - ay - 150, '#E5484D', 22, a) + arrow(x, 900 + ay, x, 900 + ay + 150, '#E5484D', 22, a)).join('')}`;
}
const cl01 = x => Math.max(0, Math.min(1, x));
