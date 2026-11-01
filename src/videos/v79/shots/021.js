// 96.84–101.56 she does not prompt the earlier answer (greyed "18 Uhr" is crossed out); he has to tell it again himself
import { K, TEXT, CH, chip, twoShot, speech, cross, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const W = { look: 1, mouth: 'tight', brow: 0, hL: [-30, -40], hR: [30, -40], blink: blink(t, 1) };
  const M = { look: -1, lookY: t > 99.1 ? -.5 : 0, talk: talk(t, 99.2, 101.4, 8), hR: [150 + Math.sin(t * 4) * 20, -160], handR: t > 99.1 ? 'palm' : 'rest', brow: .3, blink: blink(t, 2) };
  const gh = fade(t, 97.3) * (1 - fade(t, 98.6, .4));
  const ghost = gh > 0 ? `<g opacity="${gh}">${speech(110, 340, 380, 170, 300, 600, `<text x="300" y="447" ${TEXT(60, '#9a8f84')}>18 Uhr</text>`, { fill: '#f1ece4', stroke: '#9a8f84' })}${cross(300, 425, 1.5 * eout(prog(t, 97.9, 98.1)))}</g>` : '';
  const sb = pop(t, 99.15);
  const dots = [0, 1, 2].map(i => `<circle cx="${700 + i * 60}" cy="${440 + Math.sin(t * 8 - i) * 10}" r="16" fill="${K.ink}"/>`).join('');
  const his = sb > 0 ? `<g transform="translate(760 430) scale(${sb}) translate(-760 -430)">${speech(560, 340, 400, 180, 780, 600, dots)}</g>` : '';
  const lab = t > 99.4 ? `<g opacity="${fade(t, 99.4)}"><rect x="330" y="1180" width="420" height="80" rx="40" fill="${K.ink}" opacity=".88"/><text x="540" y="1235" ${TEXT(40, K.cream)}>ER ERZÄHLT SELBST</text></g>` : '';
  return twoShot(t, W, M, { clock: 21.2 + (t - 96.84) * .02 }) + ghost + his + lab + chip(CH[5]);
}
