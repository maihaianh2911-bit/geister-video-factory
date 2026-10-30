// 58.1–62.36: opening the window on a warm day is no solution — you open it, warm air streams in toward the food; red cross on "keine Lösung"
import { K, DEFS, BG, person, arrow, cross, milk, meat, f1, cam, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const op = eio(prog(t, 58.5, 59.2));
  const air = prog(t, 59.4, 62.3);
  const x = eout(prog(t, 61.0, 61.4));
  const p = person(330, 1460, 1.05, { aR: [[460, 1000], [lerp(520, 600, op), lerp(900, 820, op)]], head: { look: 1, mouth: x > 0 ? 'down' : 's' } });
  let arr = '';
  for (let i = 0; i < 3; i++) { const u = (air * 1.6 + i / 3) % 1; if (air <= 0) break; arr += arrow(lerp(780, 560, u) + 20 * Math.sin(u * 9 + i), 520 + i * 110 + 40 * u, lerp(780, 560, u) - 90, 540 + i * 110 + 40 * u, K.sun, 12, Math.sin(u * Math.PI)); }
  const win = `<rect x="560" y="300" width="400" height="560" fill="url(#kSun)" stroke="${K.ink}" stroke-width="10"/><circle cx="820" cy="420" r="70" fill="#FFD25A" stroke="${K.sun}" stroke-width="5"/>
    <path d="M 560 300 L ${f1(lerp(560, 470, op))} 320 L ${f1(lerp(560, 470, op))} 840 L 560 860 Z" fill="#CFE3EE" fill-opacity=".8" stroke="${K.ink}" stroke-width="5"/>`;
  const sc = `${BG('url(#kWall)')}${win}<rect x="-60" y="1000" width="1200" height="40" fill="${K.counterT}" stroke="${K.ink}" stroke-width="4"/><rect x="-60" y="1040" width="1200" height="1000" fill="${K.counter}"/>
    ${milk(760, 940)}${meat(880, 970, .9)}${p.svg}${arr}`;
  return `${DEFS}${cam(sc, 1.05, 540, 850)}${x > 0 ? `<g>${cross(760, 620, 150, x)}</g>` : ''}`;
}
