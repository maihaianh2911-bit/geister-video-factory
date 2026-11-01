// 117.08–121.52 she asks: from when is such help crossing a line? A red "GRENZE?" marker climbs the yardstick between them
import { K, TEXT, CH, chip, twoShot, yardstick, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const W = { look: 1, talk: talk(t, 117.1, 117.9, 8) + talk(t, 118.3, 121.2, 8), brow: .5, hR: [160, -170], handR: 'palm', blink: blink(t, 1) };
  const M = { look: -1, brow: .5, mouth: 'tight', lookY: t > 120.2 ? .4 : 0, blink: blink(t, 2) };
  const grow = eout(prog(t, 117.2, 117.7)), mk = eio(prog(t, 119.3, 120.2));
  const top = 1266 - 640 * grow;
  const my = lerp(1200, 820, mk);
  const marker = mk > 0 ? `<path d="M 470 ${my} L 610 ${my}" stroke="${K.red}" stroke-width="12" stroke-linecap="round"/><path d="M 470 ${my} l -24 -16 l 0 32 Z" fill="${K.red}"/>` : '';
  const lab = t > 120.1 ? `<g transform="translate(540 600) scale(${pop(t, 120.1)})"><rect x="-125" y="-46" width="250" height="80" rx="40" fill="${K.red}" stroke="${K.ol}" stroke-width="5"/><text y="12" ${TEXT(40, '#fff')}>GRENZE?</text></g>` : '';
  return twoShot(t, W, M, { mugs: false }) + yardstick(540, 1266, 640 * grow, .9) + marker + lab + chip(CH[6]);
}
