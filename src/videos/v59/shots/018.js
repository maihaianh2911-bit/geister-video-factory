// 28.8–30.58: phone close-up: the thumb taps 1 – 1 – 2 on the spoken digits, then the green call button on "anrufen".
import { K, DEFS, FG, prog, back, eio, phone, TX, rings, lerp } from './lib.js';
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', ''];
export default function renderShot(t) {
  const taps = [28.8, 29.08, 29.32, 29.64];
  const typed = taps.slice(0, 3).filter(x => t >= x).length;
  const call = t >= 29.64;
  const pos = k => { const i = KEYS.indexOf(k); return [-52 + (i % 3) * 52, -20 + Math.floor(i / 3) * 44]; };
  // thumb target sequence
  const tg = [[-52, -20], [-52, -20], [0, -20], [0, 150]];
  let ti = 0; for (let i = 0; i < 4; i++) if (t >= taps[i] - .12) ti = i;
  const press = taps.reduce((a, x) => a + Math.max(0, 1 - Math.abs(t - x) / .08), 0);
  const [tx, ty] = tg[ti];
  let keys = '';
  KEYS.forEach((k, i) => { if (!k) return; const [x, y] = pos(k); const hot = t >= taps[0] - .05 && ((k === '1' && (Math.abs(t - taps[0]) < .1 || Math.abs(t - taps[1]) < .1)) || (k === '2' && Math.abs(t - taps[2]) < .1)); keys += `<circle cx="${x}" cy="${y}" r="21" fill="${hot ? K.amb : '#22343F'}"/>${TX(k, x, y + 8, 22, hot ? K.ol : '#DDE7EE')}`; });
  const num = '112'.slice(0, typed);
  const screen = call ? `<rect x="-82" y="-160" width="164" height="318" rx="16" fill="#0E3A2A"/>${TX('112', 0, -40, 50, '#FFFFFF')}<circle cx="0" cy="40" r="36" fill="${K.safe}" stroke="#0B0F12" stroke-width="4"/><path d="M -14 32 q 4 -14 14 -6 q 10 -8 14 6" stroke="#fff" stroke-width="6" fill="none"/>${rings(t, 29.64, 0, 40, K.safe, 3, 90, 6)}`
    : `${TX(num || ' ', 0, -96, 40, '#FFFFFF')}${keys}<circle cx="0" cy="150" r="0" fill="none"/><circle cx="0" cy="132" r="20" fill="${K.safe}"/>`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#141A1F"/>
    <g transform="translate(540 800) scale(3.4) rotate(-4)">
      ${phone(0, 0, 1, 0, screen, .6)}
      ${call ? '' : `<g transform="translate(${tx + 34} ${ty + 70 - 10 * press})"><path d="M -40 120 Q -30 30 -6 -6 Q 10 -18 22 -4 Q 30 40 40 120 Z" fill="${K.skin}" stroke="#0B0F12" stroke-width="3"/></g>`}
    </g>
    ${FG(1430)}`;
}
