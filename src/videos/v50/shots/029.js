// 54.9–56.4 · "damit er wieder warm wird" — the palate warms from blue to pink-orange, the thermometer climbs
import { P, pastel, profileHead, thermo, arrow, prog, eio, back, lerp, mix } from '../lib.js';

export default function renderShot(t) {
  const w = eio(prog(t, 54.95, 55.5));
  const lvl = lerp(.16, .62, w);
  const s = lerp(3.6, 3.45, prog(t, 54.9, 56.4));
  const px = 440, py = 760;
  let waves = '';
  for (let k = 0; k < 3; k++) { const p = ((t - 54.95) * 1.1 + k * .33) % 1; if (t > 54.95) waves += `<path d="M ${px - 300 + k * 30} ${py - 40 - 120 * p} q 60 -30 120 0 t 120 0 t 120 0" fill="none" stroke="${P.warm}" stroke-width="${12 * (1 - p)}" opacity="${1 - p}" stroke-linecap="round"/>`; }
  return `${pastel(t, { color: mix('#E1EFF8', '#FFF1E4', w) })}
    ${profileHead(px - 110 * s, py - 62 * s, s, { t, id: 's29', xray: 1, palWarm: w, palCold: 1 - w, tongueUp: 1, eye: 'open' })}
    ${waves}
    <rect x="770" y="300" width="250" height="760" rx="40" fill="#fff" stroke="${P.ink}" stroke-width="6" opacity=".92"/>
    ${thermo(895, 640, 1.25, lvl, { id: 's29t', col: mix(P.cold, P.warm, w) })}
    ${arrow(700, 820, 700, lerp(800, 460, w), P.warm, 26, w > 0 ? 1 : 0)}`;
}
