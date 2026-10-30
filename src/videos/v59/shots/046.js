// 76.2–77.44: ending: the fire engine pulls up with blue lights below the block; the family waves from their lit window.
import { K, DEFS, FG, prog, eout, facade, famWindowXY, fireTruck, lerp } from './lib.js';
export default function renderShot(t) {
  const x = lerp(1200, 330, eout(prog(t, 76.2, 76.9)));
  const [wx, wy] = famWindowXY();
  const bl = Math.sin(t * 18) > 0 ? 1 : .2;
  return `${DEFS}<g transform="translate(540 900) scale(.92) translate(-540 -900)">${facade(t)}
    <g transform="translate(${wx} ${wy})"><path d="M 30 10 L ${30 + 30 * Math.sin(t * 9)} -70" stroke="#0B0F12" stroke-width="22" stroke-linecap="round"/><path d="M 30 10 L ${30 + 30 * Math.sin(t * 9)} -70" stroke="${K.vTop}" stroke-width="12" stroke-linecap="round"/></g></g>
    <rect x="-60" y="-60" width="1200" height="2040" fill="${K.blue}" opacity="${.12 * bl}"/>
    ${fireTruck(x, 1400, .95, t)}
    ${FG(1440)}`;
}
