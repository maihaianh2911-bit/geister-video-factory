// L5b 23.98–26.76: noon at the desk (sandwich), du with the phone in his hand; cloud 1 ("Ich verliere meinen Job.") still above; cloud 2 slides in (24.1) with "Ist sie sauer auf mich?" (24.76).
import { K, frame, cam, prog, eio, person, f1 } from './lib.js';
import { office2, desk } from './sets.js';
import { cloud, gloom } from './clouds.js';
import { chatPhone } from './props.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = office2(t);
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#22324a" opacity=".32"/>` + gloom(480, 900, 560, 560, .5, 'g');
  const sand = `<g transform="translate(170 1350)"><ellipse cx="0" cy="10" rx="110" ry="24" fill="#f4f1ea" stroke="${INK}" stroke-width="5"/><path d="M -80 0 L 80 0 L 60 -40 L -60 -40 Z" fill="#e8c27a" stroke="${INK}" stroke-width="5"/><path d="M -70 -16 H 70" stroke="#7aa27a" stroke-width="10"/></g>`;
  s += person('du', 480, 1640, 1, { t, seed: 1, look: [10, 14], brows: 'sad', mouth: 'frown', hunch: .45, armR: [150, -300], elbowR: [210, -330] });
  s += desk(t, { y: 1300, monitor: false, mug: false, kbX: 560, extra: sand });
  s += chatPhone(t, 650, 1340, .34, { id: 'c10', name: 'Freundin', who: 'gf', clock: '14:30', msgs: [{ lines: ['Bis später!'], time: '09:15' }], rot: -10 });
  s += cloud(300, 520, 470, { t, seed: 11, dark: .9, lines: ['Ich verliere', 'meinen Job.'], size: 48 });
  const c = eio(prog(t, 24.0, 24.6));
  s += cloud(760 + 500 * (1 - c), 430, 500, { t, seed: 21, dark: .85, a: c, p: c > 0 ? 1 : 0, lines: t >= 24.76 ? ['Ist sie sauer', 'auf mich?'] : [], size: 50 });
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 23.98, 26.76)), -15 * prog(t, 23.98, 26.76)));
}
