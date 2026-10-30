// 23.94–26.1 · "Das Signal läuft über einen Gefühlsnerv" — x-ray profile: the nerve draws from palate to its hub
import { P, pastel, profileHead, prog, eio, eout, lerp } from '../lib.js';

export default function renderShot(t) {
  const xr = eout(prog(t, 23.94, 24.25));
  const n = eio(prog(t, 24.15, 25.2));
  const glow = t > 25.2 ? 1 : 0;
  const sig = t < 24.15 ? -1 : prog(t, 24.15, 25.2);
  const s = lerp(2.0, 2.15, prog(t, 23.94, 26.1));
  return `${pastel(t, { color: '#FFF7E6' })}
    ${profileHead(560 - 40 * s, 820 - 20 * s, s, { t, id: 's15', xray: xr, ice: 1, palCold: 1, eye: 'shut', nMain: n, signal: sig < 1 ? sig : undefined })}
    ${glow ? `<circle cx="${560 - 40 * s - 24 * s}" cy="${820 - 20 * s + 6 * s}" r="${70 + 12 * Math.sin(t * 10)}" fill="${P.nerve}" opacity=".45" filter="url(#blur20)"/>` : ''}`;
}
