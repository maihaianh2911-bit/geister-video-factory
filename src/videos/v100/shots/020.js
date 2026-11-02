// L10 43.48–46.38: close-up du, hand to chin, grey-blue light. "WARUM?" (43.48); a speech bubble "Ja!" (44.78) and, behind it, the thought "Nein …" (45.6).
import { frame, cam, person, pop, prog, eio, label, speech, thought, room } from './all.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'grey', hh: 22, mm: 0, strong: true });
  s += person('du', 400, 2320, 1.75, { t, seed: 1, look: [14, -8], brows: t > 45.5 ? 'worried' : 'calm', mouth: 'flat', armR: [40, -600], elbowR: [210, -380], legs: false, rim: '#cfe2ff' });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 43.48, 46.38)), 20 * prog(t, 43.48, 46.38));
  s += label('WARUM?', 540, 300, 140, { p: pop(t, 43.5, .45) });
  s += speech(800, 620, 'Ja!', 620, 900, { p: pop(t, 44.78), size: 80 });
  s += thought(820, 900, 'Nein …', 660, 1020, { p: pop(t, 45.6), size: 64 });
  return frame(s);
}
