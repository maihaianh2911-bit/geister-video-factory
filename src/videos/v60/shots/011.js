// Close-up at ground level: four pairs of boots stop on the firm forest track; gravel puffs; they stand still.
import { K, DEFS60, P, FG, prog, eout, lerp, hash, shk } from './lib.js';

function boots(x, y, col, t, tStop) {
  const p = eout(prog(t, tStop - .3, tStop));
  const lift = (1 - p) * 60, fx = lerp(-80, 0, p);
  return `<g transform="translate(${x + fx} ${y - lift})">
    <rect x="-70" y="-1400" width="62" height="1340" rx="20" fill="${K.pants}" stroke="#0B0F12" stroke-width="6"/>
    <rect x="18" y="-1400" width="62" height="1340" rx="20" fill="${K.pants}" stroke="#0B0F12" stroke-width="6"/>
    <path d="M -80 -70 h 82 v 40 q 0 30 -30 30 h -70 q -20 0 -20 -24 Z" fill="${K.boot}" stroke="#0B0F12" stroke-width="6"/>
    <path d="M 8 -70 h 82 v 40 q 0 30 -30 30 h -70 q -20 0 -20 -24 Z" fill="${K.boot}" stroke="#0B0F12" stroke-width="6"/>
    <path d="M -96 -1500 L 106 -1500 L 112 -1040 Q 6 -1000 -102 -1040 Z" fill="${col}" stroke="#0B0F12" stroke-width="6"/></g>`;
}
export default function renderShot(t) {
  const stops = [14.75, 14.85, 15.0, 15.1];
  const [sx, sy] = shk(t, 15.0, 6, 9);
  let gravel = '';
  for (let i = 0; i < 60; i++) gravel += `<ellipse cx="${(hash(i) * 1080).toFixed(0)}" cy="${(1150 + hash(i * 2) * 260).toFixed(0)}" rx="${(8 + 10 * hash(i + 4)).toFixed(0)}" ry="6" fill="${i % 2 ? '#6A6656' : '#55524A'}"/>`;
  let puff = '';
  stops.forEach((ts, k) => { const p = prog(t, ts, ts + .6); if (p > 0 && p < 1) for (let j = 0; j < 4; j++) puff += `<circle cx="${180 + k * 240 + (j - 1.5) * 40 * (1 + p)}" cy="${1320 - 40 * p - j * 6}" r="${10 + 24 * p}" fill="#8A8676" opacity="${(.5 * (1 - p)).toFixed(2)}"/>`; });
  return DEFS60 + `<g transform="translate(${sx} ${sy})">
    <rect x="0" y="0" width="1080" height="1920" fill="#0E1513"/>
    <rect x="0" y="0" width="1080" height="1100" fill="#101A18"/>
    ${[120, 400, 760, 980].map((x, i) => `<rect x="${x}" y="0" width="${50 + 20 * i % 3}" height="1100" fill="#1A1410" opacity=".8"/>`).join('')}
    <path d="M 0 1100 L 1080 1100 L 1080 1460 L 0 1460 Z" fill="#4A4A40"/>${gravel}
    <ellipse cx="540" cy="1250" rx="560" ry="260" fill="url(#fAmb)" opacity=".45"/>
    ${['green', 'red', 'blue', 'yellow'].map((id, k) => boots(170 + k * 240, 1330, P[id].j, t, stops[k])).join('')}
    ${puff}
  </g>
  ${FG(1440)}`;
}
