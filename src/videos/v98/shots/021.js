// L14 57.48–61.46: evening living room, warm orange lamp: the phone rings ("ruft an" 57.88), du answers the video call; Papa (glasses, moustache, brown knit) asks „Alles gut bei dir?“ (60.4).
import { K, frame, cam, shadow, person, prog, eio, pop, label, speech, lerp } from './lib.js';
import { room } from './sets.js';
import { callPhone } from './base.js';
import { fgTable } from './fg.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 20, mm: 0 });
  const up = eio(prog(t, 58.4, 58.9));
  s += shadow(360, 1640) + person('du', 360, 1640, 1, { t, seed: 1, look: [16, -4], brows: 'calm', mouth: 'smile', armR: [lerp(150, 230, up), lerp(-380, -640, up)] });
  const talk = t > 60.3 && t < 61.2 && Math.sin(t * 15) > 0;
  s += callPhone(t, lerp(600, 690, up), lerp(1300, 860, up), lerp(.55, .95, up), { ring: t < 58.4, mouth: talk ? 'talk' : 'smile', brows: 'calm', look: [0, 4], time: up > 0 ? '00:0' + Math.max(1, Math.floor(t - 58.4)) : 'Papa', rot: lerp(-10, 4, up) });
  s += speech(700, 330, ['„Alles gut', 'bei dir?“'], 720, 450, { p: pop(t, 60.4, .4), size: 56 });
  s += fgTable(t, { mugX: 140, remote: 820 });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 57.48, 61.46)));
  s += label('ABENDS', 300, 240, 96, { p: pop(t, 57.5, .45) });
  return frame(s);
}
