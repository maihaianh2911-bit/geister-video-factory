// 55.66–60.06: split view — your eyes close for a few seconds ("Augen fallen … zu" 55.9–57.58) while below the car keeps driving ("weiterfährt" 58.88)
import { K, BG, headOf, carSide, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const lid = lerp(.45, 1, eio(prog(t, 55.9, 57.5)));
  const top = `<g clip-path="url(#v71top)"><rect x="-60" y="-60" width="1200" height="1000" fill="#3D4F7A"/>${headOf('du', 540, 600, 4.2, { look: 0, tired: 1, lid, mouth: 'flat' })}</g><defs><clipPath id="v71top"><rect x="-60" y="-60" width="1200" height="980"/></clipPath></defs>`;
  const sc = (t - 55.66) * 300;
  const dashes = [...Array(8)].map((_, i) => { const x = ((i * 180 - sc) % 1440 + 1440) % 1440 - 180; return `<rect x="${f1(x)}" y="1356" width="90" height="10" rx="5" fill="${K.white}"/>`; }).join('');
  let trees = '';
  for (let i = 0; i < 6; i++) { const x = ((i * 260 - sc * .4) % 1560 + 1560) % 1560 - 200; trees += `<circle cx="${f1(x)}" cy="1180" r="${70 + (i % 3) * 16}" fill="#5E7F86" stroke="${K.ink}" stroke-width="4"/>`; }
  const bottom = `<rect x="-60" y="920" width="1200" height="1100" fill="#7E8FC2"/>${trees}<rect x="-60" y="1240" width="1200" height="60" fill="#6E9A7A"/><rect x="-60" y="1300" width="1200" height="110" fill="${K.road}"/>${dashes}<rect x="-60" y="1410" width="1200" height="600" fill="#6E9A7A"/>${carSide(520, 1350, .95, sc / 60, { lights: .8, id: 'v71c21' })}`;
  return `${bottom}${top}<rect x="-60" y="912" width="1200" height="16" fill="${K.white}"/><path d="M -60 912 H 1140 M -60 928 H 1140" stroke="${K.ink}" stroke-width="4"/>`;
}
