// Phone close-up: the thumb taps 1 – 1 – 2 exactly on "eins-eins-zwei", then the green call button on "anrufen".
import { K, DEFS60, P, phone, armTo, lab, rings, FG, TX, prog, eout, back, lerp } from './lib.js';

const KEYS = [['1', -40, -40], ['2', 0, -40], ['3', 40, -40], ['4', -40, -6], ['5', 0, -6], ['6', 40, -6], ['7', -40, 28], ['8', 0, 28], ['9', 40, 28], ['0', 0, 60]];
export default function renderShot(t) {
  const taps = [21.9, 22.08, 22.26], call = 22.42;
  const typed = '112'.slice(0, taps.filter(x => t >= x).length);
  // thumb target per moment (phone-local coords)
  let target = [70, 120];
  if (t < taps[0]) target = [lerp(70, -40, eout(prog(t, 21.3, 21.85))), lerp(120, -40, eout(prog(t, 21.3, 21.85)))];
  else if (t < taps[2] - .05) target = t < taps[1] ? [-40, -40] : [lerp(-40, 0, eout(prog(t, taps[1] + .03, taps[2] - .03))), -40];
  else if (t < call) target = [lerp(0, 0, 1), lerp(-40, 92, eout(prog(t, taps[2] + .02, call - .02)))];
  else target = [0, 92];
  const press = [...taps, call].some(x => t >= x && t < x + .08) ? 1 : 0;
  const s = 3.2, px = 560, py = 820;
  const tx = px + target[0] * s, ty = py + target[1] * s + 40 - press * 10;
  let keys = '';
  for (const [k, x, y] of KEYS) {
    const hit = (k === '1' && ((t >= taps[0] && t < taps[0] + .15) || (t >= taps[1] && t < taps[1] + .15))) || (k === '2' && t >= taps[2] && t < taps[2] + .15);
    keys += `<circle cx="${x}" cy="${y}" r="15" fill="${hit ? K.amb : '#2A3A44'}"/><text x="${x}" y="${y + 6}" text-anchor="middle" fill="#E6EEF2" style="font-family:'Inter';font-weight:900;font-size:16px">${k}</text>`;
  }
  const callOn = t >= call;
  const scr = `${TX(typed, 0, -76, 40, '#FFFFFF')}${keys}<circle cx="0" cy="92" r="${callOn ? 18 + 3 * Math.sin(t * 20) : 16}" fill="#2EB872"/><path d="M -7 88 q 7 10 14 0" stroke="#fff" stroke-width="4" fill="none"/>`;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0E161A"/>
  <ellipse cx="540" cy="820" rx="560" ry="620" fill="url(#fCold)" opacity=".3"/>
  ${armTo(-80, 1800, 380, 1150, 120, P.red.j, -1, P.red.skin)}
  ${phone(px, py, s, 0, { on: 1, screen: scr, glow: false })}
  <g transform="translate(${tx} ${ty}) rotate(-30)"><ellipse cx="40" cy="90" rx="44" ry="110" fill="${P.red.skin}" stroke="#0B0F12" stroke-width="7"/><ellipse cx="40" cy="20" rx="26" ry="22" fill="#F2C9A6" opacity=".7"/></g>
  ${callOn ? rings(t, call, px, py + 92 * s, '#2EB872', 3, 260, 10) : ''}
  ${lab('112', 540, 260, 150, prog(t, taps[2], taps[2] + .25), '#FFFFFF', '#0B0F12', K.red)}
  ${FG(1440)}`;
}
