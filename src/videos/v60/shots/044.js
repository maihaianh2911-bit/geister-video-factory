// Signal diagram: a torch flashes and six dots light up one by one across the minute bar; 6× / MIN lands on "Minute".
import { K, DEFS60, torch, lab, FG, prog, eout, back, lerp } from './lib.js';

export default function renderShot(t) {
  const ts = [69.3, 69.66, 70.0, 70.3, 70.54, 70.86];
  const n = ts.filter(x => t >= x).length;
  const flash = ts.some(x => t >= x && t < x + .18) ? 1 : 0;
  let dots = '';
  for (let i = 0; i < 6; i++) {
    const on = t >= ts[i], p = back(prog(t, ts[i], ts[i] + .2));
    dots += `<circle cx="${190 + i * 140}" cy="1060" r="${on ? 46 * p : 30}" fill="${on ? K.amb : '#2A3A44'}" stroke="#0B0F12" stroke-width="6"/>`;
    if (on && t < ts[i] + .3) dots += `<circle cx="${190 + i * 140}" cy="1060" r="${46 + 60 * prog(t, ts[i], ts[i] + .3)}" fill="none" stroke="${K.amb}" stroke-width="6" opacity="${1 - prog(t, ts[i], ts[i] + .3)}"/>`;
  }
  const bar = prog(t, 69.27, 71.8);
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0B1014"/>
  <rect x="0" y="0" width="1080" height="1920" fill="#FFF1CF" opacity="${flash * .08}"/>
  ${torch(300, 560, 2.2, -12, flash, 500)}
  <rect x="120" y="1180" width="840" height="24" rx="12" fill="#2A3A44"/>
  <rect x="120" y="1180" width="${840 * bar}" height="24" rx="12" fill="#9DB8C8"/>
  ${dots}
  ${lab('6× / MIN', 540, 300, 110, prog(t, 71.2, 71.45), '#FFFFFF', '#0B0F12', K.amb)}
  ${FG(1440)}`;
}
