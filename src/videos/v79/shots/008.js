// 31.46–37.44 he sticks to his version (forward timeline); she asks him to tell it from the end; a rewind arrow sweeps end→start
import { K, TEXT, CH, chip, twoShot, speech, office, road, house, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const ask = eio(prog(t, 33.4, 33.9));
  const W = { look: 1, talk: talk(t, 33.5, 35.3) + talk(t, 35.95, 36.7), brow: .3 * ask, hR: [lerp(80, 170, ask), lerp(-24, -230, ask)], handR: ask > .3 ? 'palm' : 'rest', blink: blink(t, 1) };
  const M = { look: -1, talk: talk(t, 31.5, 33.3), tilt: t < 33.3 ? Math.sin(t * 6) * 3 : 0, mouth: 'tight', blink: blink(t, 2), brow: .2 * ask };
  const sw = eio(prog(t, 35.95, 36.6));
  const hi = (i) => { const on = i === 2 ? prog(t, 35.95, 36.1) : i === 1 ? prog(t, 36.2, 36.35) : prog(t, 36.45, 36.6); return on; };
  const icon = (fn, x, i) => `${hi(i) > 0 ? `<circle cx="${x}" cy="420" r="${78}" fill="${K.gold}" opacity="${.55 * hi(i)}"/>` : ''}${fn}`;
  const arrowLen = sw;
  const arc = sw > 0 ? `<path d="M 870 300 Q 560 170 250 300" stroke="${K.accent}" stroke-width="16" fill="none" stroke-linecap="round" pathLength="1" stroke-dasharray="${arrowLen} 1"/>${sw > .95 ? `<path d="M 250 300 l 50 -2 M 250 300 l 30 40" stroke="${K.accent}" stroke-width="16" stroke-linecap="round"/>` : ''}` : '';
  const fwd = `<path d="M 340 520 L 790 520" stroke="${K.ol}" stroke-width="6" stroke-dasharray="14 12" opacity="${1 - sw}"/><path d="M 790 520 l -20 -14 l 0 28 Z" fill="${K.ol}" opacity="${1 - sw}"/>`;
  const lab = t > 31.6 ? `<text x="560" y="595" ${TEXT(38)}>${sw > .5 ? 'VOM ENDE ZUM ANFANG' : 'SEINE VERSION'}</text>` : '';
  const bub = `<g transform="translate(560 430) scale(${pop(t, 31.5)}) translate(-560 -430)">${speech(130, 320, 860, 300, 760, 620, `${icon(office(250, 480, .9), 250, 0)}${icon(road(560, 480, .9), 560, 1)}${icon(house(870, 480, .85), 870, 2)}${fwd}${lab}`)}</g>`;
  return twoShot(t, W, M) + bub + arc + chip(CH[2]);
}
