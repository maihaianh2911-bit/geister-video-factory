// L17b 78.16–81.444: same evening, warm amber living room: du relaxes on the sofa with the guitar (own plans), battery green. "FALSCHES JA" (78.3, red) "= EIN GANZER ABEND" (79.58) – the evening du kept.
import { frame, cam, pop, prog, eio, label, room, sitOnSofa, batOver, duBat, guitar } from './all.js';
import { fgTable as fg } from './fg.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 20, mm: 0, sofa: false });
  const strum = Math.sin(t * 9) * 6;
  s += sitOnSofa('du', 540, 1320, .95, { t, seed: 1, eyes: 'happy', brows: 'calm', mouth: 'smile', armR: [120 + strum, -330], armL: [-140, -420], behindHead: '', front: '' }, { x: 540, col: '#7a5a8a', dark: '#5a3f6a' });
  s += `<g transform="translate(540 ${1320 + 150 * .95}) scale(.95)">${guitar(-10, -170, .62, -62)}</g>`;
  s += batOver(540, 1320 + 150 * .95, .95, duBat(t).lvl, { t, bs: .9 });
  s += fg(t, { y: 1720, mugX: 860 });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 78.16, 81.44)));
  s += label('FALSCHES JA', 540, 250, 100, { p: pop(t, 78.3, .45), fill: '#ff6b5e' });
  s += label('= EIN GANZER ABEND', 540, 370, 76, { p: pop(t, 79.58, .45) });
  return frame(s);
}
