// 29.12–31.0 · "Dein Gehirn spürt den Schmerz" — the signal climbs into the brain; the brain winces on "Schmerz"
import { P, pastel, profileHead, NERVE_PROFILE, prog, eio, back, lerp } from '../lib.js';

const PATH = [[-24, 6], [-30, -40], [-10, -110]];
export default function renderShot(t) {
  const s = 2.6, hx = 560 + 10 * s, hy = 980 + 60 * s;
  const sig = prog(t, 29.3, 30.2);
  const hitT = t >= 30.24;
  const sh = hitT ? 10 * Math.exp(-(t - 30.24) * 6) * Math.sin(t * 80) : 0;
  let rings = '';
  if (hitT) for (let k = 0; k < 3; k++) { const p = ((t - 30.24) * 1.3 + k * .33) % 1; rings += `<ellipse cx="${hx - 6 * s}" cy="${hy - 128 * s}" rx="${(150 + 120 * p) * s}" ry="${(100 + 80 * p) * s}" fill="none" stroke="${P.pain}" stroke-width="${12 * (1 - p)}" opacity="${1 - p}"/>`; }
  return `${pastel(t, { color: '#FDEFF2' })}${rings}
    <g transform="translate(${sh} 0)">${profileHead(hx, hy, s, { t, id: 's17', xray: 1, ice: 1, palCold: 1, nMain: 1, nTemple: 0, brainFace: hitT ? 'wince' : 'calm', eye: 'shut',
      signal: sig < 1 && t >= 29.3 ? sig : undefined, signalPath: PATH })}</g>`;
}
