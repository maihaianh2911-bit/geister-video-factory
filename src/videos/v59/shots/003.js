// 2.8–4.54: close on the sleeping father; red alarm light starts (Rauchmelder) and his eyes snap open on "schrillt".
import { K, DEFS, FG, prog, back, eout, shk, head, alarmRings, cl } from './lib.js';
export default function renderShot(t) {
  const on = t >= 3.14, led = on && Math.sin(t * 26) > -.2 ? 1 : 0;
  const wake = back(prog(t, 3.66, 3.86));
  const [sx, sy] = shk(t, 3.72, 18, 6);
  const lift = -30 * cl(wake);
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#1B2329"/>
    <g transform="translate(${sx} ${sy})">
    <path d="M -60 760 Q 300 640 700 700 Q 1000 740 1140 820 L 1140 1500 L -60 1500 Z" fill="${K.pillow}" ${'stroke="#0B0F12" stroke-width="8"'}/>
    <path d="M 60 820 Q 360 740 640 790" stroke="${K.pillowSh}" stroke-width="14" fill="none" stroke-linecap="round"/>
    ${head('v', 560, 900 + lift, 2.6, { tilt: -78 + 30 * cl(wake), sleep: t < 3.68 ? 1 : 0, eyeS: 1 + .25 * cl(wake), brow: wake > .2 ? 'up' : 'calm', mouth: wake > .2 ? 'o' : 'flat', look: wake > .2 ? 10 : 0, lookY: -10 })}
    <path d="M -60 1180 Q 300 1120 600 1200 Q 900 1260 1140 1180 L 1140 1980 L -60 1980 Z" fill="${K.bed}" stroke="#0B0F12" stroke-width="8"/>
    <path d="M 80 1290 Q 400 1230 760 1320" stroke="${K.bedSh}" stroke-width="16" fill="none" stroke-linecap="round"/>
    ${on ? alarmRings(t, 3.14, 900, 120, .45, 600) : ''}
    </g>
    <rect x="-60" y="-60" width="1200" height="2040" fill="${K.red}" opacity="${.2 * led}"/>
    ${FG(1430)}`;
}
