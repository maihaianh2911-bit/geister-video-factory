// L9 36.52–40.26: close-up: du talks gently into the phone: white bubble "Das passiert jedem. Morgen machst du es fertig." (37.84); the speaker stays silent.
import { K, frame, cam, head, speech, phone, pool, prog, eio, pop, f1 } from './lib.js';
import { room } from './sets.js';
import { duSp } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', strong: true });
  const talk = t > 37.84 && Math.sin(t * 14) > 0;
  const o = { t, look: [14, 0], brows: 'calm', eyes: 'n', mouth: talk ? 'talk' : 'smile', armR: [250, -660], elbowR: [300, -420] };
  const call = `<rect x="-58" y="-112" width="116" height="222" rx="10" fill="#e9dff2"/>` + head('bff', 0, -10, .26, { t, eyes: t > 39.4 ? 'happy' : 'tired', brows: t > 39.4 ? 'calm' : 'sad', mouth: t > 39.4 ? 'smile' : 'frown' });
  s += pool(380, 800, 360, 360, '#ffd98a', .25);
  s += duSp(380, 2080, 1.5, { ...o, front: `<g transform="translate(270 -790) rotate(-8)">${phone(0, 0, 1.25, 0, '#e9dff2', call)}</g>` }, { hide: true });
  s += speech(560, 330, ['„Das passiert jedem.', 'Morgen machst du', 'es fertig.“'], 420, 560, { p: pop(t, 37.84, .4), size: 52 });
  return frame(cam(s, 540, 960, 1.0 + .06 * eio(prog(t, 36.52, 40.26))));
}
