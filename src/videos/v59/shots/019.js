// 30.58–31.9: the father on the phone at the closed door, talking; "ADRESSE" chip with house icon on "Adresse".
import { K, DEFS, FG, prog, back, person, reach, phone, lab, icon, talkAt, flatDoor } from './lib.js';
export default function renderShot(t) {
  const c = back(prog(t, 30.95, 31.2));
  const talk = talkAt(t, 30.6, 31.9);
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#1E2A30"/>
    <rect x="-60" y="1250" width="1200" height="800" fill="${K.floor}"/>
    ${flatDoor(560, 380, 380, 880, 0)}
    <rect x="574" y="1256" width="352" height="6" fill="${K.safe}" opacity=".8"/>
    ${person('v', 360, 700, 1.0, { aR: reach('v', 360, 700, 1, 1, 440, 600, -1), aL: [10, 6], brow: 'worry', talk, mouth: 'flat', look: 10, holdR: (x, y) => phone(x + 4, y - 20, .42, 10, '', .5) })}
    ${c > 0 ? `<g transform="translate(540 250) scale(${c})"><rect x="-270" y="-80" width="540" height="160" rx="24" fill="${K.ol}" stroke="${K.amb}" stroke-width="6"/>${icon.house(-170, 6, .9, K.amb)}<text x="40" y="26" text-anchor="middle" fill="#fff" style="font-family:'Inter';font-weight:900;font-size:70px" letter-spacing="3">ADRESSE</text></g>` : ''}
    ${FG(1430)}`;
}
