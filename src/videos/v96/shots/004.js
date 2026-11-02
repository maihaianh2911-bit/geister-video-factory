// L2b 7.02–9.54: wide, cold: du alone; dotted outlines of the sister and a friend beside him fade away ("Verlust" 7.66, "nicht die Zeit" 8.46).
import { K, frame, cam, shadow, person, prog, eio, fout, fade } from './lib.js';
import { room } from './sets.js';
import { duHG } from './base.js';
function ghostOf(who, x, y, s, a, t) {
  if (a <= 0) return '';
  return `<g opacity="${(a * .75).toFixed(2)}">${person(who, x, y, s, { t, seed: 4, mouth: 'smile', brows: 'calm', look: [-10, 0] }).replace(/fill="#(?!fff)[0-9a-f]{3,6}"/gi, 'fill="#8fa3c8"')}</g>`;
}
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 22, mm: 30, light: .5 });
  const a1 = 1 - eio(prog(t, 7.66, 8.6)), a2 = 1 - eio(prog(t, 8.2, 9.2));
  s += ghostOf('sis', 240, 1600, .78, a1, t) + ghostOf('mate', 840, 1610, .78, a2, t);
  s += shadow(540, 1640, 170);
  s += duHG(540, 1640, .85, { t, seed: 1, look: [-14 + 28 * eio(prog(t, 8.2, 8.6)), 4], brows: 'sad', mouth: 'frown' }, { fill: .96, flow: 0, glow: .2, s: .82 });
  s = cam(s, 540, 1100, 1.06 - .05 * eio(prog(t, 7.02, 9.54)));
  return frame(s);
}
