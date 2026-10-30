// Close-up of the shivering friend: chattering teeth, breath fog, frost creeping in; shaking peaks on "zittern".
import { K, DEFS60, head, P, BEANIE, breath, FG, prog, eout, lerp, hash, shiver, blinkAt } from './lib.js';

export default function renderShot(t) {
  const a = lerp(.8, 2.2, eout(prog(t, 8.0, 8.3)));
  const sx = shiver(t, a), z = lerp(1.05, 1.0, eout(prog(t, 8.0, 8.3)));
  const fr = eout(prog(t, 8.1, 9.3));
  let frost = '';
  for (const [cx, cy, sx, sy] of [[0, 0, 1, 1], [1080, 0, -1, 1], [0, 1400, 1, -1], [1080, 1400, -1, -1]]) {
    for (let i = 0; i < 7; i++) {
      const a = (i / 6) * Math.PI / 2, L = (140 + 160 * hash(i + cx)) * fr;
      const ex = cx + sx * Math.cos(a) * L, ey = cy + sy * Math.sin(a) * L;
      frost += `<path d="M ${cx} ${cy} L ${ex.toFixed(0)} ${ey.toFixed(0)}" stroke="#DCEBF4" stroke-width="5" opacity="${(.55 * fr).toFixed(2)}"/>`;
      frost += `<path d="M ${(cx + sx * Math.cos(a) * L * .6 + sx * 20).toFixed(0)} ${(cy + sy * Math.sin(a) * L * .6).toFixed(0)} L ${(cx + sx * Math.cos(a) * L * .6).toFixed(0)} ${(cy + sy * Math.sin(a) * L * .6).toFixed(0)} L ${(cx + sx * Math.cos(a) * L * .6).toFixed(0)} ${(cy + sy * Math.sin(a) * L * .6 + sy * 20).toFixed(0)}" stroke="#DCEBF4" stroke-width="4" fill="none" opacity="${(.5 * fr).toFixed(2)}"/>`;
    }
    frost += `<circle cx="${cx}" cy="${cy}" r="${(260 * fr).toFixed(0)}" fill="#DCEBF4" opacity="${(.12 * fr).toFixed(2)}"/>`;
  }
  const p = P.blue;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#101A20"/>
  <ellipse cx="540" cy="800" rx="620" ry="700" fill="url(#fCold)" opacity=".35"/>
  <g transform="translate(${540 + sx} 1000) scale(${z})">
    <path d="M -380 560 Q -400 160 -220 110 L 220 110 Q 400 160 380 560 Z" fill="${p.j}" stroke="#0B0F12" stroke-width="8"/>
    <path d="M 160 120 Q 400 160 380 560 L 260 560 Z" fill="${p.jSh}"/>
    <path d="M -240 100 Q 0 260 240 100 L 250 170 Q 0 330 -250 170 Z" fill="${p.jHi}" stroke="#0B0F12" stroke-width="7"/>
    <g transform="translate(0 -170) scale(2.6)">${head('blue', { brow: 'worry', chat: t, cold: true, look: -6, lookY: 4, blink: blinkAt(t, .4) })}</g>
  </g>
  ${breath(t, 8.25, 580, 1080, 1, 1.0)}${breath(t, 8.9, 580, 1080, -1, .8)}
  ${frost}
  ${FG(1420)}`;
}
