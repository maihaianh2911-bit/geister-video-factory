import { P, R, ST, TX, frame, prog, eout, lerp, hash } from './lib.js';
// 53.3–55.1 Beyond Germany: from Berlin, newspapers fly across the border of the map ("über Deutschland hinaus").
const DE = [[8.6,54.9],[9.9,54.8],[11,54.4],[12.5,54.5],[14.2,53.9],[14.4,53.3],[14.6,52.6],[14.7,51.8],[15.0,51.1],[14.3,51.0],[12.1,50.3],[12.5,49.8],[13.8,48.8],[13.0,48.3],[13.0,47.5],[12.2,47.7],[10.5,47.5],[9.6,47.5],[7.6,47.6],[7.6,48.1],[8.2,49.0],[6.4,49.2],[6.1,50.1],[6.0,50.8],[6.2,51.4],[7.0,52.2],[7.0,53.3],[8.4,53.6],[8.9,53.9]];
const mx = lon => 540 + (lon - 10.5) * 80, my = lat => 760 - (lat - 51.2) * 125;
export default function renderShot(t) {
  const d = 'M ' + DE.map(([a, b]) => `${mx(a).toFixed(0)} ${my(b).toFixed(0)}`).join(' L ') + ' Z';
  const bx = mx(13.4), by = my(52.5);
  const targets = [[70, 380], [1010, 330], [960, 1250], [90, 1180], [540, 120], [1020, 760], [60, 760]];
  let fly = '';
  targets.forEach(([x, y], i) => {
    const t0 = 53.4 + i * .12, p = eout(prog(t, t0, t0 + .7));
    if (p <= 0) return;
    const cx = lerp(bx, x, p), cy = lerp(by, y, p) - 120 * Math.sin(p * Math.PI);
    fly += `<path d="M ${bx} ${by} Q ${(bx + x) / 2} ${(by + y) / 2 - 140} ${cx} ${cy}" stroke="${P.red}" stroke-width="5" fill="none" stroke-dasharray="14 10" opacity=".8"/><g transform="translate(${cx} ${cy}) rotate(${(hash(i) - .5) * 30}) scale(${.6 + .4 * p})"><rect x="-44" y="-56" width="88" height="112" fill="#F2E7CF" ${ST(4)}/><path d="M -30 -36 h 60 M -30 -16 h 60 M -30 4 h 40 M -30 24 h 60" stroke="#9A8A72" stroke-width="7"/></g>`;
  });
  const rp = prog(t, 53.4, 54.6);
  return frame(t, `${R(0, 0, 1080, 1920, P.paper)}${Array.from({ length: 12 }, (_, i) => `<path d="M ${i * 100} 0 V 1920 M 0 ${i * 170} H 1080" stroke="${P.paperDk}" stroke-width="2" opacity=".5"/>`).join('')}
    <path d="${d}" fill="${P.oliveHi}" ${ST(7)}/>
    ${rp > 0 && rp < 1 ? `<circle cx="${bx}" cy="${by}" r="${40 + 700 * rp}" fill="none" stroke="${P.red}" stroke-width="${12 * (1 - rp)}" opacity="${1 - rp}"/>` : ''}
    <circle cx="${bx}" cy="${by}" r="18" fill="${P.red}" ${ST(4)}/>${TX(bx - 30, by - 34, 44, 'BERLIN', P.ink, { anchor: 'end' })}
    ${TX(470, 900, 60, 'DEUTSCHLAND', P.white, { sw: 8, sc: P.ink, ls: 3 })}
    ${fly}`);
}
