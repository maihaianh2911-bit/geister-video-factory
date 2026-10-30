// 0–2.875: cover — you stand in the middle of a packed festival crowd ("Musikfestival"); headline LOVEPARADE 2010
import { cam, K, DEFS, BG, person, crowdRow, card, grain, f1, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const sw = 6 * Math.sin(t * 2.4);
  const lights = [...Array(9)].map((_, i) => `<circle cx="${60 + i * 120}" cy="${f1(520 + 30 * Math.sin(i * 1.3))}" r="14" fill="${(Math.floor(t * 3) + i) % 3 ? '#E8C877' : K.paperL}" stroke="${K.ink}" stroke-width="3"/>`).join('');
  const sc = `${BG('url(#lSky)')}${grain(1)}<path d="M -40 500 Q 540 600 1120 500" fill="none" stroke="${K.ink}" stroke-width="4"/>${lights}
    ${crowdRow(t, 900, .55, 14, -20, 82, 1, { sway: 4 })}${crowdRow(t, 1050, .7, 11, -40, 108, 2, { sway: 5 })}
    ${crowdRow(t, 1230, .9, 9, -60, 130, 3, { sway: 6 }).slice(0)}
    ${person(540 + sw, 1240, .95, { you: true, face: 1, brow: 1, aF: 5, aB: -5 })}
    ${crowdRow(t, 1460, 1.15, 7, -100, 190, 4, { sway: 6 })}`;
  return `${DEFS}<rect x="-60" y="1200" width="1200" height="800" fill="#3F362F"/>${cam(sc, 1.15, 540, 1460, 0, -220)}${card(540, 320, 'LOVEPARADE 2010', 1, 76)}`;
}
