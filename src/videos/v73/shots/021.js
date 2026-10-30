// 72.3–75.36: every tree stands for one person ("einen Menschen"): close on a single magnolia; beside it a faint outline of a person appears
import { K, DEFS, BG, magnolia, person, grain, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const a = eout(prog(t, 73.0, 73.8));
  const fallP = (i) => { const ph = ((t * .25 + i * .17) % 1); return `<ellipse cx="${f1(420 + 300 * Math.sin(i * 2.3) + 40 * Math.sin(t + i))}" cy="${f1(500 + ph * 900)}" rx="10" ry="14" fill="${K.bloom}" stroke="${K.bloomD}" stroke-width="2" opacity="${f1(1 - ph)}"/>`; };
  return `${DEFS}${BG('url(#lSky)')}${grain(17)}<rect x="-60" y="1300" width="1200" height="700" fill="${K.paperD}"/>
    ${magnolia(420, 1300, 3.2, 1, 5)}${[...Array(6)].map((_, i) => fallP(i)).join('')}
    <g opacity="${f1(.55 * a)}">${person(780, 1300, 1.6, { col: K.paperL, hair: K.paperD })}</g>`;
}
