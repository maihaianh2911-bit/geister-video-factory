// 71.18–76.92 something seems off ("?"), she almost points but stops, and instead offers an open hand: a chance to explain
import { K, TEXT, CH, chip, twoShot, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const up = eio(prog(t, 72.95, 73.45)) * (1 - eio(prog(t, 73.6, 74.1))), offer = eio(prog(t, 74.7, 75.2));
  const hR = offer > 0 ? [lerp(80, 215, offer), lerp(-24, -75, offer)] : [lerp(80, 190, up), lerp(-24, -290, up)];
  const W = { look: 1, brow: -.6 * up + .35 * offer, lid: .25 * (1 - offer), mouth: offer > .5 ? 'smile' : 'tight', talk: talk(t, 74.8, 76.5, 7), hR, handR: offer > .2 ? 'palm' : (up > .05 ? 'point' : 'rest'), blink: blink(t, 1) };
  const lift = eio(prog(t, 75.1, 75.6));
  const M = { look: lerp(-.2, -1, lift), lookY: lerp(1, 0, lift), lid: .4 * (1 - lift), dy: 14 * (1 - lift), brow: lerp(.8, .1, lift), mouth: 'tight', blink: blink(t, 2) };
  const q = pop(t, 71.6) * (1 - fade(t, 74.6));
  const qs = q > 0 ? `<g transform="translate(300 450) scale(${q})"><circle r="62" fill="${K.gold}" stroke="${K.ol}" stroke-width="6"/><text y="30" ${TEXT(86)}>?</text></g>` : '';
  const ghost = up > .4 ? `<text x="560" y="560" ${TEXT(54, K.red)} opacity="${(up - .4) * 1.6}">Du lügst …</text>` : '';
  const ch = offer > 0 ? `<g opacity="${fade(t, 75.15)}"><rect x="330" y="470" width="420" height="90" rx="45" fill="${K.green}" stroke="${K.ol}" stroke-width="5"/><text x="540" y="532" ${TEXT(48, '#fff')}>CHANCE</text></g>` : '';
  return twoShot(t, W, M) + qs + ghost + ch + chip(CH[4]);
}
