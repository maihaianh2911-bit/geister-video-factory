import { P, R, ST, fig, frame, prog } from './lib.js';
// 55.1–56.1 Famous: photographers' flashbulbs fire at the captain's portrait on "berühmt".
export default function renderShot(t) {
  const fl = [55.42, 55.62, 55.8];
  let flash = 0; fl.forEach(f => { const p = prog(t, f, f + .18); if (p > 0 && p < 1) flash = Math.max(flash, 1 - p); });
  const cams = [[170, 1250, 1.3], [910, 1270, -1.3]].map(([x, y, s], i) => `<g transform="translate(${x} ${y}) scale(${s} ${Math.abs(s)})"><rect x="-80" y="-120" width="160" height="120" rx="10" fill="${P.black}" ${ST(5)}/><circle cx="0" cy="-60" r="36" fill="${P.steel}" ${ST(4)}/><path d="M 40 -150 L 90 -210 L 120 -170 Z" fill="${P.silver}" ${ST(4)}/><circle cx="100" cy="-190" r="${prog(t, fl[i], fl[i] + .15) > 0 && prog(t, fl[i], fl[i] + .15) < 1 ? 70 : 16}" fill="#FFF8D8" opacity=".9"/><rect x="-16" y="0" width="32" height="400" fill="${P.woodSh}" ${ST(4)}/></g>`).join('');
  return frame(t, `${R(0, 0, 1080, 1920, '#5E4A3A')}
    <g filter="url(#drop)"><rect x="240" y="260" width="600" height="760" fill="${P.gold}" ${ST(8)}/><rect x="280" y="300" width="520" height="680" fill="#E6D6B0"/>
    <clipPath id="v74pf"><rect x="280" y="300" width="520" height="680"/></clipPath><g clip-path="url(#v74pf)">${fig(540, 1880, 2.2, { kind: 'voigt', aR: -8, look: 0, brow: 'angry', mouth: 'flat', shadow: false })}</g></g>
    ${cams}${R(0, 0, 1080, 1920, '#FFFFFF', `opacity="${(.55 * flash).toFixed(2)}"`)}`);
}
