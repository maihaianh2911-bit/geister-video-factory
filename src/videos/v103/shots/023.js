// L15a 72.58–75.82: close-up young du by the window in warm evening light, thinking (hand to chin); on "achtzigjähriges Ich" (74.65)
// a thought bubble with the smiling old du (glasses, curls, scarf) appears and du's eyes turn up to it.
import { K, frame, cam, prog, eio, pop, person, head } from './lib.js';
import { room } from './sets.js';
import { memBubble } from './sets3.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', strong: true, hh: 19, mm: 45 });
  const up = t > 74.6;
  s += person('du', 430, 2120, 1.7, { t, seed: 1, look: up ? [10, -14] : [-4, 4], brows: up ? 'up' : 'calm', mouth: 'small', rim: '#ffd98a', armR: [60, -560], elbowR: [190, -380] });
  const inner = `<rect x="-200" y="-170" width="400" height="340" fill="#efe2cf"/><path d="M -150 170 C -150 70 150 70 150 170 Z" fill="#7fa9a2" stroke="${K.ink}" stroke-width="5"/><path d="M -100 80 Q 0 120 100 80 L 96 110 Q 0 150 -96 110 Z" fill="#9a9ca3" stroke="${K.ink}" stroke-width="4"/>` + head('old', 0, -30, .55, { t, seed: 7, eyes: 'happy', brows: 'calm', mouth: 'smile', blink: false });
  s += memBubble(740, 580, 380, 320, 620, 820, pop(t, 74.65, .45), inner, 'o23', { sepia: .12 });
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 72.58, 75.82))));
}
