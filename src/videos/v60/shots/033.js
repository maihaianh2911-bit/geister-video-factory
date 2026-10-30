// A thermometer on a trunk: the red column sinks on "Kälte", frost grows over the frame and hits on "Feind".
import { K, DEFS60, trunk, FG, TX, prog, eio, eout, lerp, hash, rings } from './lib.js';

export default function renderShot(t) {
  const lv = lerp(.62, .14, eio(prog(t, 50.0, 51.4)));
  const fr = eout(prog(t, 50.2, 51.5));
  const hit = t > 51.46 ? Math.max(0, 1 - (t - 51.46) * 2) : 0;
  let frost = '';
  for (const [cx, cy, sx, sy] of [[0, 0, 1, 1], [1080, 0, -1, 1], [0, 1440, 1, -1], [1080, 1440, -1, -1]]) {
    for (let i = 0; i < 8; i++) {
      const a = (i / 7) * Math.PI / 2, L = (200 + 260 * hash(i + cx + cy)) * fr;
      frost += `<path d="M ${cx} ${cy} L ${(cx + sx * Math.cos(a) * L).toFixed(0)} ${(cy + sy * Math.sin(a) * L).toFixed(0)}" stroke="#DCEBF4" stroke-width="6" opacity="${(.6 * fr).toFixed(2)}"/>`;
    }
    frost += `<circle cx="${cx}" cy="${cy}" r="${(380 * fr).toFixed(0)}" fill="#DCEBF4" opacity="${(.14 * fr).toFixed(2)}"/>`;
  }
  const top = 360, bot = 1160, colY = lerp(bot, top, lv);
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#101A20"/>
  ${trunk(540, 560, '#2E241C', '#46382A', -20, 1940)}
  <ellipse cx="540" cy="760" rx="520" ry="560" fill="url(#fCold)" opacity=".35"/>
  <rect x="440" y="300" width="200" height="960" rx="100" fill="#E6EEF2" stroke="#0B0F12" stroke-width="8"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M 470 ${380 + i * 100} h 40" stroke="#5A6A74" stroke-width="6"/>`).join('')}
  <rect x="520" y="${colY}" width="40" height="${bot - colY + 20}" rx="20" fill="${K.red}"/>
  <circle cx="540" cy="1190" r="56" fill="${K.red}" stroke="#0B0F12" stroke-width="8"/>
  <rect x="520" y="${top}" width="40" height="${bot - top}" rx="20" fill="none" stroke="#0B0F12" stroke-width="5"/>
  ${frost}
  ${rings(t, 51.46, 540, 760, '#DCEBF4', 3, 500, 14)}
  <rect x="0" y="0" width="1080" height="1920" fill="#DCEBF4" opacity="${(hit * .35).toFixed(2)}"/>
  ${FG(1440)}`;
}
