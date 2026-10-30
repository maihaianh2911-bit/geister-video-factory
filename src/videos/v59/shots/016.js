// 25.22–27.5: a kitchen towel in the hand: smoke particles pass straight through the weave — red X on "nicht sicher".
import { K, DEFS, FG, prog, eio, back, armTo, xMark, cl, hash } from './lib.js';
export default function renderShot(t) {
  const lift = eio(prog(t, 25.22, 25.6));
  const sway = 6 * Math.sin(t * 3);
  const ty = 420 - 60 * lift;
  let parts = '';
  for (let i = 0; i < 46; i++) {
    const ph = ((t - 25.2) * .6 + hash(i)) % 1;
    const x = -40 + 1160 * ph, y = ty + 140 + 620 * hash(i + 7) + 20 * Math.sin(t * 3 + i);
    const inT = x > 330 && x < 760;
    parts += `<circle cx="${x}" cy="${y}" r="${6 + 8 * hash(i + 3)}" fill="${inT ? '#4A4950' : '#5B5A63'}" opacity="${inT ? .55 : .9}"/>`;
  }
  let stripes = '';
  for (let i = 0; i < 4; i++) stripes += `<rect x="330" y="${ty + 110 + i * 170}" width="430" height="34" fill="#C84B4F" opacity=".85"/>`;
  let weave = '';
  for (let i = 0; i < 14; i++) weave += `<path d="M ${340 + i * 30} ${ty + 70} V ${ty + 790}" stroke="#D8D0C2" stroke-width="3" opacity=".7"/>`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#1A2228"/>
    <rect x="-60" y="-60" width="300" height="2040" fill="url(#vFire)" opacity=".35"/>
    <g transform="rotate(${sway * .3} 545 ${ty})">
      <path d="M 330 ${ty + 60} Q 545 ${ty + 30} 760 ${ty + 60} L 770 ${ty + 800} Q 545 ${ty + 830} 320 ${ty + 800} Z" fill="#EDE6DA" stroke="#0B0F12" stroke-width="8"/>
      ${stripes}${weave}
    </g>
    <g filter="url(#vSoft2)">${parts}</g>
    ${armTo(1180, 160, 600, ty + 40, 110, K.vTop, 1)}
    <ellipse cx="560" cy="${ty + 50}" rx="90" ry="62" fill="${K.skin}" stroke="#0B0F12" stroke-width="7"/>
    ${xMark(545, 880, 1.25, prog(t, 26.9, 27.25))}
    ${FG(1430)}`;
}
