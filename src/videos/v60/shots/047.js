// The answer: far between the trees a rescuer's lamp blinks three times; 3× / MIN appears on "dreimal".
import { K, DEFS60, forest, lab, FG, prog, back, lerp } from './lib.js';

export default function renderShot(t) {
  const ts = [75.85, 76.24, 76.62];
  let dots = '';
  for (let i = 0; i < 3; i++) { const on = t >= ts[i]; dots += `<circle cx="${380 + i * 160}" cy="1180" r="${on ? 44 * back(prog(t, ts[i], ts[i] + .2)) : 28}" fill="${on ? '#BFE0FF' : '#2A3A44'}" stroke="#0B0F12" stroke-width="6"/>`; }
  const fl = ts.some(x => t >= x && t < x + .2) ? 1 : 0;
  return DEFS60 + `${forest(t, { hz: 1000, px: 120, noNear: true })}
  <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity=".4"/>
  <circle cx="760" cy="880" r="${fl ? 220 : 60}" fill="url(#fBlue)"/>
  <circle cx="760" cy="880" r="${fl ? 22 : 8}" fill="#E6F2FF"/>
  ${dots}
  ${lab('3× / MIN', 540, 360, 110, prog(t, 76.24, 76.5), '#FFFFFF', '#0B0F12', '#5AA0FF')}
  ${FG(1440)}`;
}
