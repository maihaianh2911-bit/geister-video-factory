// Cover 0–1.6: the bronze disc half in forest soil; a looter's shovel, held in two hands, already scrapes earth off it. Headline HIMMELSSCHEIBE VON NEBRA
import { K, DEFS, BG, disc, grain, cam, HL, prog, eout, eio, lerp, f1 } from './lib.js';
import { shovel } from './hands.js';
export default function renderShot(t) {
  const z = lerp(1.06, 1, eout(prog(t, 0, 1.6)));
  const sc = eio(prog(t, .25, 1.0)) - .55 * eio(prog(t, 1.0, 1.5));
  const soil = `${BG(K.soilD)}${[...Array(30)].map((_, i) => `<circle cx="${(i * 137) % 1100}" cy="${(i * 263) % 1900}" r="${20 + (i % 5) * 9}" fill="${K.soil}" opacity=".6"/>`).join('')}`;
  // earth still covering the lower rim; the blade pushes it away to the right
  const mound = `<path d="M 180 ${f1(1120 - 40 * sc)} Q 420 ${f1(1040 - 60 * sc)} ${f1(700 + 140 * sc)} ${f1(1110 - 20 * sc)} Q ${f1(820 + 160 * sc)} 1180 ${f1(900 + 140 * sc)} 1260 L 160 1260 Z" fill="${K.soil}" stroke="#2A1F16" stroke-width="6"/>`;
  const clumps = sc > .1 ? [0, 1, 2, 3].map(i => { const k = (sc * 1.3 + i * .2) % 1; return `<circle cx="${f1(780 + 160 * k + i * 12)}" cy="${f1(1060 - 120 * Math.sin(k * Math.PI) + i * 10)}" r="${14 + i * 3}" fill="${K.soil}" stroke="#2A1F16" stroke-width="4"/>`; }).join('') : '';
  const sh = shovel(lerp(560, 740, sc), lerp(1170, 1130, sc), -38, { L: 760 });
  return `${DEFS}${cam(soil + disc(540, 860, 330, { id: 'a', glow: .6 + .2 * Math.sin(t * 4), damage: true }) + mound + clumps + sh, z, 540, 860)}
    ${HL('HIMMELSSCHEIBE', 540, 330, 108, K.goldL, 16)}${HL('VON NEBRA', 540, 460, 108, K.paperL, 16)}${grain(t)}`;
}
