// Close-up: the red jacket's hand holds the phone; the battery icon drains to AKKU 4 % and flashes red.
import { K, DEFS60, phone, battery, armTo, lab, P, FG, TX, prog, eio, eout, lerp, shk, hash } from './lib.js';

export default function renderShot(t) {
  const lvl = lerp(.22, .04, eio(prog(t, 5.0, 5.95)));
  const warn = t > 5.95 ? (Math.floor((t - 5.95) * 4) % 2 ? .45 : 1) : 1;
  const [sx, sy] = shk(t, 6.0, 8, 8);
  const lift = lerp(120, 0, eout(prog(t, 4.9, 5.25)));
  let bokeh = '';
  for (let i = 0; i < 14; i++) bokeh += `<circle cx="${(hash(i + 3) * 1080).toFixed(0)}" cy="${(hash(i * 2.7) * 1300).toFixed(0)}" r="${(30 + 50 * hash(i)).toFixed(0)}" fill="${i % 4 ? '#2A3C44' : '#5A4A2A'}" opacity=".35"/>`;
  const pct = Math.max(4, Math.round(lvl * 100));
  const scr = `<rect x="-60" y="-112" width="120" height="224" rx="12" fill="${t > 5.95 ? '#3A1214' : '#16242C'}"/>
    ${battery(0, -20, .78, lvl, pct <= 10 ? K.red : '#E6B12E')}
    ${TX(pct + ' %', 0, 58, 40, pct <= 10 ? K.red : '#E6EEF2')}`;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0E161A"/>${bokeh}
  <g transform="translate(${sx} ${sy + lift})">
    ${armTo(-60, 1700, 470, 1080, 120, P.red.j, -1, P.red.skin)}
    ${phone(540, 860, 2.6, -6, { on: warn, screen: scr })}
    <g transform="translate(540 860) rotate(-6)"><path d="M -150 120 q -40 40 -10 90 M -150 40 q -50 30 -20 80" stroke="${K.ol}" stroke-width="10" fill="none"/>
      <ellipse cx="-190" cy="150" rx="46" ry="90" fill="${P.red.skin}" ${'stroke="#0B0F12" stroke-width="6"'}/><ellipse cx="180" cy="40" rx="40" ry="34" fill="${P.red.skin}" stroke="#0B0F12" stroke-width="6"/><ellipse cx="184" cy="120" rx="40" ry="34" fill="${P.red.skin}" stroke="#0B0F12" stroke-width="6"/></g>
  </g>
  ${lab('AKKU 4 %', 540, 300, 96, prog(t, 6.0, 6.25), '#FFFFFF', '#0B0F12', K.red)}
  ${FG(1380)}`;
}
