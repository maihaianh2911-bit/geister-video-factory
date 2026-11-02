// L11 42.48–46.30: split screen: left warm "MIT IHR: WIE EINE FREUNDIN" (du smiling, phone, heart); right cold "MIT DIR: WIE EIN STRENGER CHEF" (44.46) — the red speaker with a tie and angry brows looms over a small du.
import { K, frame, cam, person, speaker, phone, head, label, T, pool, prog, eio, pop, f1 } from './lib.js';
import { room, meeting } from './sets.js';
import { RED } from './base.js';
const angry = `<path d="M -54 -66 L -14 -52 M 14 -52 L 54 -66" stroke="#fff" stroke-width="9" stroke-linecap="round"/><path d="M -6 96 L 0 130 L 6 96 Z M -16 96 L 16 96 L 26 200 L 0 230 L -26 200 Z" fill="${K.ink}"/>`;
export default function renderShot(t) {
  const inR = eio(prog(t, 44.3, 44.7));
  let L = cam(room(t, { mood: 'amber', clock: false }), 540, 960, 1.1, -270, 0);
  L += person('duw', 270, 1620, .74, { t, look: [10, 0], mouth: 'smile', eyes: 'happy', brows: 'calm', armR: [190, -620], elbowR: [230, -420], front: `<g transform="translate(220 -680) rotate(-8)">${phone(0, 0, .9, 0, '#e9dff2', head('bff', 0, -10, .26, { t, mouth: 'smile', eyes: 'happy' }))}</g>` });
  L += `<path d="M 270 520 c -40 -50 -110 -10 -70 50 l 70 70 l 70 -70 c 40 -60 -30 -100 -70 -50 Z" fill="#e2577a" stroke="${K.ink}" stroke-width="5" transform="translate(0 ${f1(Math.sin(t * 4) * 8)})"/>`;
  let R = cam(meeting(t), 540, 960, 1.1, 270, 0) + `<rect x="540" y="0" width="540" height="1920" fill="#20304a" opacity=".45"/>`;
  R += person('duw', 830, 1640, .56, { t, hunch: .6, look: [10, -14], brows: 'sad', mouth: 'frown', eyes: 'tired' });
  R += speaker(830, 760, 1.25 * (0.6 + .4 * inR), { t, ...RED, talk: 1, face: angry, rot: 0 });
  let s = `<defs><clipPath id="v95cl"><rect x="0" y="0" width="536" height="1920"/></clipPath><clipPath id="v95cr"><rect x="544" y="0" width="536" height="1920"/></clipPath></defs>`;
  s += `<g clip-path="url(#v95cl)">${L}</g><g clip-path="url(#v95cr)">${R}</g><rect x="534" y="0" width="12" height="1920" fill="${K.ink}"/>`;
  s += label('MIT IHR:', 270, 210, 70, { p: pop(t, 42.48, .4) }) + label('WIE EINE', 270, 300, 60, { fill: '#fff', p: pop(t, 43.24, .4) }) + label('FREUNDIN', 270, 380, 66, { fill: '#fff', p: pop(t, 43.64, .4) });
  s += label('MIT DIR:', 810, 210, 70, { fill: '#ff6a5a', p: pop(t, 44.46, .4) }) + label('WIE EIN STRENGER', 810, 300, 50, { fill: '#fff', p: pop(t, 45.04, .4) }) + label('CHEF', 810, 390, 80, { fill: '#fff', p: pop(t, 45.8, .4) });
  return frame(s);
}
