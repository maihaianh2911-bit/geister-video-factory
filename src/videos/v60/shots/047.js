// The four friends sit with their backs to us; far between the trees the rescuers' blue lamp blinks three times, a dot lights for each blink and 3× / MIN lands on "dreimal".
import { K, DEFS60, forest, fig, lab, FG, prog, back, lerp } from './lib.js';

export default function renderShot(t) {
  const ts = [75.85, 76.24, 76.62];
  let dots = '';
  for (let i = 0; i < 3; i++) { const on = t >= ts[i]; dots += `<circle cx="${380 + i * 160}" cy="520" r="${on ? 30 + 14 * back(prog(t, ts[i], ts[i] + .2)) : 28}" fill="${on ? '#BFE0FF' : '#2A3A44'}" stroke="#0B0F12" stroke-width="6"/>`; }
  const fl = ts.some(x => t >= x && t < x + .2) ? 1 : 0;
  const lx = 700, ly = 860;
  const turn = prog(t, 75.85, 76.1);
  return DEFS60 + `${forest(t, { hz: 960, px: 120, noNear: true })}
  <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity=".2"/>
  <circle cx="${lx}" cy="${ly}" r="${fl ? 300 : 90}" fill="url(#fBlue)"/>
  <circle cx="${lx}" cy="${ly}" r="${fl ? 26 : 12}" fill="#E6F2FF"/>
  ${fl ? `<rect x="0" y="0" width="1080" height="1920" fill="#5AA0FF" opacity=".06"/>` : ''}
  <ellipse cx="540" cy="1380" rx="560" ry="260" fill="url(#fAmb)" opacity=".45"/>
  ${fig('green', 170, 1500, 1.0, { sit: true, back: true, tilt: lerp(0, 8, turn) })}
  ${fig('red', 400, 1510, 1.05, { sit: true, back: true, tilt: lerp(0, 6, turn) })}
  ${fig('blue', 650, 1520, 1.05, { sit: true, back: true, tilt: lerp(0, 2, turn) })}
  ${fig('yellow', 890, 1510, 1.0, { sit: true, back: true, tilt: lerp(0, -4, turn) })}
  ${fl ? `<rect x="0" y="1000" width="1080" height="520" fill="#5AA0FF" opacity=".08"/>` : ''}
  <rect x="270" y="470" width="540" height="100" rx="50" fill="#0B0F12" opacity=".8" stroke="#2A3A44" stroke-width="6"/>
  ${dots}
  ${lab('3× / MIN', 540, 340, 104, prog(t, 76.24, 76.5), '#FFFFFF', '#0B0F12', '#5AA0FF')}
  ${FG(1440)}`;
}
