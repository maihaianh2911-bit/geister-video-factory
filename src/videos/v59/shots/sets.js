// v59 interior sets: bedroom (front view of the bed), flat corridor to the front door, back room with window.
import { K, OL, TX, nightWindow, flatDoor, detector, hash } from './lib.js';

export function clock(x, y, s, txt = '03:00', blink = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-120" y="-56" width="240" height="112" rx="18" fill="#101418" ${OL(6)}/>
    <rect x="-104" y="-40" width="208" height="80" rx="10" fill="#060708"/>
    <ellipse cx="0" cy="0" rx="190" ry="110" fill="url(#vRed)" opacity=".5"/>
    ${TX(txt.slice(0, 2), -52, 26, 70, K.red)}${TX(':', 0, 22, 70, K.red, 'middle', `opacity="${blink}"`)}${TX(txt.slice(3), 52, 26, 70, K.red)}</g>`;
}
// bedroom, camera at the foot of the bed. o.flash 0..1 = red alarm light on the walls
export function bedroom(t, o = {}) {
  const f = o.flash || 0;
  let boards = '';
  for (let i = 0; i < 12; i++) boards += `<path d="M ${i * 100 - 40} 1180 L ${i * 130 - 180} 1920" stroke="#121816" stroke-width="5"/>`;
  return `<rect x="-40" y="-40" width="1160" height="1240" fill="${K.wall}"/>
    <rect x="-40" y="-40" width="1160" height="150" fill="${K.wallSh}"/><path d="M -40 110 H 1120" stroke="${K.ol}" stroke-width="5"/>
    <rect x="-40" y="1180" width="1160" height="800" fill="${K.floor}"/>${boards}
    ${nightWindow(60, 330, 260, 380, t)}
    <polygon points="60,710 320,710 520,1180 0,1180" fill="${K.cold}" opacity=".06"/>
    <rect x="740" y="380" width="170" height="130" fill="#3A4B56" ${OL(5)}/><rect x="756" y="396" width="138" height="98" fill="#22323A"/><path d="M 770 480 L 810 430 L 840 460 L 870 420 L 880 480 Z" fill="#4F6D6A"/>
    ${detector(540, 150, .62, f)}
    <rect x="-40" y="-40" width="1160" height="2000" fill="${K.red}" opacity="${.13 * f}"/>`;
}
export function bedFrame(t, o = {}) {
  return `<rect x="150" y="760" width="780" height="300" rx="30" fill="${K.wood}" ${OL(7)}/><rect x="180" y="790" width="720" height="40" rx="14" fill="${K.woodHi}"/>
    <path d="M 180 890 Q 330 850 430 900 Q 540 870 650 900 Q 760 850 900 890 L 900 1000 L 180 1000 Z" fill="${K.pillow}" ${OL(6)}/>
    <path d="M 230 910 Q 330 890 400 915 M 680 915 Q 760 890 860 910" stroke="${K.pillowSh}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <g transform="translate(990 1010)"><rect x="-80" y="0" width="200" height="220" rx="8" fill="${K.woodSh}" ${OL(6)}/><rect x="-80" y="0" width="200" height="26" fill="${K.wood}" ${OL(6)}/></g>`;
}
// blanket front with top edge at y (bumps for the three sleepers)
export function blanket(y, t, o = {}) {
  const b = (o.breath || 0) * Math.sin(t * 2.6);
  return `<path d="M 120 ${y + 40} Q 200 ${y - 10 + b} 330 ${y + 10} Q 440 ${y + 40} 540 ${y + 18 - b} Q 640 ${y + 40} 750 ${y + 8 + b} Q 870 ${y - 8} 960 ${y + 40} L 990 1330 L 90 1330 Z" fill="${K.bed}" ${OL(7)}/>
    <path d="M 200 ${y + 120} Q 330 ${y + 80} 460 ${y + 130} M 600 ${y + 140} Q 760 ${y + 90} 900 ${y + 130}" stroke="${K.bedSh}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M 150 ${y + 60} Q 300 ${y + 20} 420 ${y + 50}" stroke="${K.bedHi}" stroke-width="9" fill="none" stroke-linecap="round" opacity=".7"/>
    <rect x="80" y="1320" width="920" height="80" rx="16" fill="${K.wood}" ${OL(7)}/>`;
}
// flat corridor in one-point perspective toward the front door (vanishing point 540,760)
export function corridor(t, o = {}) {
  const vx = 540, dl = 400, dr = 680, dt = 520, db = 1010;
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="${K.wallSh}"/>
    <polygon points="-40,-40 ${dl},${dt} ${dl},${db} -40,1980" fill="${K.wall}" ${OL(5)}/>
    <polygon points="1120,-40 ${dr},${dt} ${dr},${db} 1120,1980" fill="#202C33" ${OL(5)}/>
    <polygon points="-40,-40 1120,-40 ${dr},${dt} ${dl},${dt}" fill="#18222A" ${OL(5)}/>
    <polygon points="-40,1980 1120,1980 ${dr},${db} ${dl},${db}" fill="${K.floor}" ${OL(5)}/>
    ${[0, 1, 2, 3].map(i => `<path d="M ${vx + (i - 1.5) * 70} ${db} L ${vx + (i - 1.5) * 520} 1980" stroke="#121816" stroke-width="5"/>`).join('')}
    <polygon points="${dl},${dt} ${dr},${dt} ${dr},${db} ${dl},${db}" fill="#202A30"/>
    ${flatDoor(dl + 40, dt + 40, dr - dl - 80, db - dt - 40, o.open || 0, { gap: '#0C0C0E' })}
    <rect x="${dl + 60}" y="${db - 6}" width="${dr - dl - 120}" height="8" fill="${K.amb}" opacity="${o.strip ?? .5}"/>
    <polygon points="120,420 300,560 300,860 120,900" fill="#3A4B56" ${OL(5)}/>
    <path d="M 840 300 L 900 250 M 820 330 L 760 380" stroke="${K.ol}" stroke-width="0"/>
    <g transform="translate(870 560)"><rect x="-30" y="-20" width="60" height="120" rx="6" fill="#2E3B44" ${OL(4)}/></g>
    <polygon points="1120,560 880,700 880,1180 1120,1440" fill="#2A363E" ${OL(5)}/>
    <circle cx="540" cy="180" r="26" fill="#1A2228" ${OL(4)}/>
    <rect x="-40" y="-40" width="1160" height="2000" fill="${K.red}" opacity="${.12 * (o.flash || 0)}"/>`;
}
// back room ("Zimmer"): window on the right wall; open 0..1 swings the casement
export function backRoom(t, o = {}) {
  const op = o.open || 0;
  return `<rect x="-40" y="-40" width="1160" height="1300" fill="#2A3A40"/>
    <rect x="-40" y="1240" width="1160" height="740" fill="#1A2422"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M ${i * 200 - 80} 1240 L ${i * 260 - 300} 1920" stroke="#121816" stroke-width="5"/>`).join('')}
    <rect x="-40" y="1220" width="1160" height="24" fill="#22302F" ${OL(4)}/>
    <g>${nightWindow(520, 300, 440, 620, t)}
      ${op > 0 ? `<polygon points="960,300 ${960 - 210 * (1 - op) + 20},${300 + 40 * op} ${960 - 210 * (1 - op) + 20},${920 - 40 * op} 960,920" fill="#3A4B56" opacity=".95" ${OL(6)}/>` : ''}
      <rect x="500" y="920" width="480" height="34" rx="6" fill="#D9D2C5" ${OL(5)}/></g>
    <polygon points="520,920 960,920 1120,1500 300,1500" fill="${K.cold}" opacity=".07"/>
    <g transform="translate(130 820)"><rect x="0" y="0" width="300" height="420" rx="10" fill="#7BC8A4" opacity=".25" ${OL(5)}/><rect x="20" y="20" width="260" height="120" rx="8" fill="#2F4A44"/></g>`;
}
export const windowXY = { x: 740, y: 610, sill: 920 };
