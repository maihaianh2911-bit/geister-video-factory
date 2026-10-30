// 32.9–34.68: the three people of the flat pop in one by one (Vater, Kind, Mutter) → "PERSONEN", then the full checklist.
import { K, DEFS, FG, prog, back, head, icon, TX } from './lib.js';
export default function renderShot(t) {
  const pops = [33.0, 33.18, 33.36].map(x => back(prog(t, x, x + .22)));
  const lab = back(prog(t, 33.36, 33.6));
  const row = back(prog(t, 33.85, 34.1));
  const n = pops.filter(p => p > .5).length;
  const ring = (x, y, p, col) => `<circle cx="${x}" cy="${y}" r="${150 * p}" fill="${col}" opacity=".22"/><circle cx="${x}" cy="${y}" r="${150 * p}" fill="none" stroke="${col}" stroke-width="10"/>`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#141A1F"/>
    <ellipse cx="540" cy="900" rx="560" ry="460" fill="url(#vAmb)" opacity=".25"/>
    ${pops[0] > 0 ? ring(250, 820, pops[0], K.vTop) + head('v', 250, 830, .95 * pops[0], { brow: 'worry', mouth: 'tight' }) : ''}
    ${pops[1] > 0 ? ring(540, 900, pops[1] * .85, K.kTop) + head('k', 540, 910, .9 * pops[1], { brow: 'worry', mouth: 'o', eyeS: 1.1 }) : ''}
    ${pops[2] > 0 ? ring(830, 820, pops[2], K.mTop) + head('m', 830, 840, .95 * pops[2], { brow: 'worry', mouth: 'worried' }) : ''}
    ${n ? TX(String(n), 540, 1240, 170, K.amb, 'middle', 'stroke="#0B0F12" stroke-width="14" paint-order="stroke"') : ''}
    ${lab > 0 ? `<g transform="translate(540 1340) scale(${lab})">${TX('PERSONEN', 0, 20, 64, '#FFFFFF', 'middle', 'letter-spacing="4"')}</g>` : ''}
    ${row > 0 ? `<g transform="translate(540 300) scale(${row})"><rect x="-500" y="-90" width="1000" height="180" rx="26" fill="${K.ol}" stroke="${K.amb}" stroke-width="6"/>
      ${TX('ADRESSE · ETAGE · PERSONEN', 0, 24, 62, '#FFFFFF', 'middle', 'letter-spacing="1"')}</g>` : ''}
    ${FG(1430)}`;
}
