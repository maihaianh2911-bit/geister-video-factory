// 34.68–36.9: close on the father speaking into the phone; his bubble shows the stairs full of smoke on "Fluchtweg … Rauch".
import { K, DEFS, FG, prog, back, eio, head, phone, armTo, talkAt, icon } from './lib.js';
export default function renderShot(t) {
  const b = back(prog(t, 35.95, 36.2));
  const talk = talkAt(t, 34.7, 36.8);
  const z = 1 + .04 * eio(prog(t, 34.68, 36.9));
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#1E2A30"/>
    <g transform="translate(540 900) scale(${z}) translate(-540 -900)">
    <path d="M 60 1700 Q 80 1300 300 1240 L 640 1240 Q 860 1300 880 1700 Z" fill="${K.vTop}" stroke="#0B0F12" stroke-width="8"/>
    ${head('v', 470, 990, 1.75, { brow: 'up', talk, mouth: 'flat', look: 12, tilt: 6, eyeS: 1.05 })}
    ${armTo(880, 1500, 700, 1060, 96, K.vTop, 1)}
    ${phone(690, 980, .62, 18, '', .4)}
    </g>
    ${b > 0 ? `<g transform="translate(700 470) scale(${b})">
      <path d="M -260 -190 H 260 Q 300 -190 300 -150 V 150 Q 300 190 260 190 H 60 L -20 260 L -10 190 H -260 Q -300 190 -300 150 V -150 Q -300 -190 -260 -190 Z" fill="${K.ol}" stroke="#FFFFFF" stroke-width="8"/>
      ${icon.stairsSmoke(0, 10, 2.6)}</g>` : ''}
    ${FG(1430)}`;
}
