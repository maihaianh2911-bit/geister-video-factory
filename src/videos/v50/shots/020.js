// 35.36–37.85 · "Das Gleiche ... bei eiskalten Getränken" — an iced drink slides onto the table, ice cubes splash in
import { P, parlour, table, iceGlass, snowflake, cam, prog, eio, eout, back, lerp, hash } from '../lib.js';

const DROPS = [36.38, 36.54, 36.72];
export default function renderShot(t) {
  const gx = lerp(1300, 560, eout(prog(t, 35.36, 35.75))), gy = 1020;
  const cubes = [[-40, 0], [30, 30], [-10, 80]];
  let falling = '', splash = '';
  const placed = [];
  DROPS.forEach((d, i) => {
    const ox = [-30, 40, 0][i];
    if (t < d) { const p = prog(t, d - .35, d); if (p > 0) falling += `<g transform="translate(${gx + ox * 1.2} ${lerp(280, 760, p * p)}) rotate(${40 * p + i * 20}) scale(1.2)"><rect x="-34" y="-30" width="68" height="60" rx="10" fill="#EFFAFF" stroke="${P.ink}" stroke-width="5"/></g>`; }
    else {
      placed.push(cubes[i]);
      const p = prog(t, d, d + .45);
      if (p < 1) for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * .45; splash += `<circle cx="${gx + ox * 1.2 + Math.cos(a) * 160 * p}" cy="${770 + Math.sin(a) * 140 * p + 200 * p * p}" r="${12 * (1 - p)}" fill="#7FD3E8" stroke="${P.ink}" stroke-width="3"/>`; }
    }
  });
  const z = lerp(1.05, 1.15, eio(prog(t, 35.6, 37.85)));
  return `<g transform="${cam(z, 540, 950, 540, 950)}">${parlour(t)}
    <rect x="-40" y="-40" width="1160" height="2000" fill="#fff" opacity=".35"/>
    ${table(1180)}
    <ellipse cx="${gx}" cy="1235" rx="170" ry="26" fill="${P.ink}" opacity=".15"/>
    ${iceGlass(gx, 1030, 1.15, { id: 's20', level: .78, t, cubes: placed, straw: t > 37.3 })}
    ${falling}${splash}</g>
    ${snowflake(850, 420, 1.1 * back(prog(t, 36.5, 36.8)), t * .5, P.coldL)}`;
}
