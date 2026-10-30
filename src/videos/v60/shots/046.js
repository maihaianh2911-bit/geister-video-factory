// The red friend holds the torch up and flashes six times; a counter at the top fills one dot per flash and pulses on "Notsignal" — the alpine distress signal.
import { K, DEFS60, forest, fig, reach, torch, lab, rings, FG, prog, back, lerp, blinkAt } from './lib.js';

export default function renderShot(t) {
  const ts = [73.45, 73.67, 73.89, 74.11, 74.32, 74.54];
  const n = ts.filter(x => t >= x).length;
  const on = ts.some(x => t >= x && t < x + .12) ? 1 : 0;
  const fx = 380, fy = 1560, s = 1.1, hx = 600, hy = 820;
  const [a1, a2] = reach(fx, fy, s, 1, hx, hy);
  let dots = '';
  for (let i = 0; i < 6; i++) {
    const lit = t >= ts[i], p = back(prog(t, ts[i], ts[i] + .15));
    dots += `<circle cx="${215 + i * 130}" cy="480" r="${lit ? 26 + 18 * p : 26}" fill="${lit ? K.amb : '#2A3A44'}" stroke="#0B0F12" stroke-width="6"/>`;
  }
  return DEFS60 + `${forest(t, { hz: 1150, px: 50, noNear: true })}
  <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity=".25"/>
  ${on ? `<g transform="translate(${hx + 30} ${hy - 50}) rotate(-58)"><polygon points="0,0 1300,-330 1300,330" fill="url(#fBeam)" opacity=".9"/></g><rect x="0" y="0" width="1080" height="1920" fill="#FFF1CF" opacity=".06"/>` : ''}
  <ellipse cx="${fx}" cy="${fy - 420}" rx="360" ry="420" fill="url(#fAmb)" opacity="${on ? .7 : .35}"/>
  ${fig('red', fx, fy, s, { look: 12, lookY: -12, brow: 'focus', mouth: 'tight', blink: blinkAt(t), aR: [a1, a2], holdRFront: (x, y) => torch(x + 10, y - 10, .9, -58, on) })}
  <rect x="140" y="420" width="800" height="120" rx="60" fill="#0B0F12" opacity=".8" stroke="#2A3A44" stroke-width="6"/>
  ${dots}
  ${lab('6× / MIN', 540, 300, 104, 1, '#FFFFFF', '#0B0F12', K.amb)}
  ${rings(t, 74.32, 540, 480, K.amb, 2, 420, 8)}
  ${FG(1440)}`;
}
