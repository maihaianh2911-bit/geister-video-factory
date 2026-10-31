// 48.94–52.0: the drive home at dusk — your car rolls along the road, background passing ("Heimweg" 50.6)
import { K, BG, carSide, headOf, label, mix, prog, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const sc = (t - 48.94) * 260;
  let poles = '';
  for (let i = 0; i < 5; i++) { const x = ((i * 320 - sc) % 1600 + 1600) % 1600 - 200; poles += `<rect x="${f1(x)}" y="880" width="16" height="370" fill="${K.ink}"/><path d="M ${f1(x + 8)} 890 q 50 -10 90 20" fill="none" stroke="${K.ink}" stroke-width="10"/><circle cx="${f1(x + 98)}" cy="914" r="14" fill="#FFE9A8" stroke="${K.ink}" stroke-width="4"/>`; }
  let trees = '';
  for (let i = 0; i < 6; i++) { const x = ((i * 260 - sc * .4) % 1560 + 1560) % 1560 - 200; trees += `<circle cx="${f1(x)}" cy="1060" r="${90 + (i % 3) * 20}" fill="#7FB08A" stroke="${K.ink}" stroke-width="4"/>`; }
  const dashes = [...Array(8)].map((_, i) => { const x = ((i * 180 - sc) % 1440 + 1440) % 1440 - 180; return `<rect x="${f1(x)}" y="1300" width="90" height="10" rx="5" fill="${K.white}"/>`; }).join('');
  const driver = `<g transform="translate(108 -168) scale(.5)">${headOf('du', 0, 0, 1, { look: 1, tired: 1, lid: .5 })}</g>`;
  const sky = `<rect x="-60" y="-60" width="1200" height="1300" fill="${mix('#F3B07C', '#7E8FC2', prog(t, 48.94, 52))}"/><circle cx="820" cy="${f1(820 + 60 * prog(t, 48.94, 52))}" r="90" fill="#FFD08A"/>`;
  return `${sky}${trees}<rect x="-60" y="1110" width="1200" height="140" fill="${K.grassD}"/>${poles}<rect x="-60" y="1250" width="1200" height="110" fill="${K.road}"/>${dashes}<rect x="-60" y="1360" width="1200" height="700" fill="${K.grassD}"/>
    ${carSide(520, 1290, 1.25, sc / 60, { driver, lights: .7, id: 'v71c19' })}${label(540, 300, 'HEIMWEG', prog(t, 50.6, 50.85), K.ink, 66)}`;
}
