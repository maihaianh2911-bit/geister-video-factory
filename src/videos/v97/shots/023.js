// L11b 62.70–65.54: two-shot: du says it out loud — "Deine Präsentation gestern war richtig gut." (62.76); the colleague's eyes widen.
import { frame, cam, shadow, pop, prog, eio, person, speech, mug } from './lib.js';
import { openOffice } from './sets.js';
import { duNotes } from './base.js';
export default function renderShot(t) {
  let s = openOffice(t, { mood: 'sun', hh: 9, mm: 15 });
  const talk = t > 62.76 && t < 64.96 && Math.sin(t * 11) > 0 ? 'talk' : 'smile';
  const sur = t > 63.4;
  s += shadow(330, 1660) + person('du', 330, 1660, 1, { t, seed: 3, look: [14, -4], brows: 'up', mouth: talk, notes: duNotes(t) });
  s += shadow(760, 1660) + person('kol', 760, 1660, 1, { t, seed: 4, look: [-14, 0], eyes: sur ? 'wide' : 'n', mouth: sur ? 'o' : 'soft', brows: sur ? 'up' : 'calm', armL: [-60, -420], elbowL: [-180, -360], holdL: mug(0, 40, .6, '#f2efe8', t) });
  s += speech(540, 420, ['„Deine Präsentation', 'gestern war richtig gut.“'], 380, 720, { p: pop(t, 62.76, .4), size: 54 });
  return frame(cam(s, 540, 1100, 1.02 + .05 * eio(prog(t, 62.7, 65.54))));
}
