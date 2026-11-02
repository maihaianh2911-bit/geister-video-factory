// L5 20.76–24.28 Office, bright daytime window light. Wide → push in: du walks up to the colleague's desk with a folder;
// she keeps her eyes on the monitor and answers with a speech bubble „Okay“ on "Okay" (23.4).
import { K, frame, cam, setOffice, officeDesk, person, shadow, speech, pop, prog, eio, lerp } from './lib.js';
import { push } from './base.js';
function monitor(x, y) {
  return `<rect x="${x - 150}" y="${y - 250}" width="300" height="200" rx="12" fill="#2b2f36" stroke="${K.ink}" stroke-width="5"/><rect x="${x - 136}" y="${y - 236}" width="272" height="172" rx="6" fill="#bfe0f5"/><g fill="#7fa9c8"><rect x="${x - 116}" y="${y - 214}" width="160" height="16" rx="4"/><rect x="${x - 116}" y="${y - 186}" width="220" height="12" rx="4"/><rect x="${x - 116}" y="${y - 164}" width="190" height="12" rx="4"/><rect x="${x - 116}" y="${y - 142}" width="210" height="12" rx="4"/></g><rect x="${x - 14}" y="${y - 50}" width="28" height="50" fill="#2b2f36" stroke="${K.ink}" stroke-width="4"/>`;
}
export default function renderShot(t) {
  let s = setOffice(t);
  const w = eio(prog(t, 20.76, 22.6)), dx = lerp(-60, 290, w);
  s += shadow(dx, 1560, 160) + person('du', dx, 1560, 1.5, { t, seed: 2, walk: w < 1 ? t * 1.7 : undefined, armR: [70, -240], front: `<rect x="40" y="-300" width="90" height="120" rx="6" fill="#f0b45c" stroke="${K.ink}" stroke-width="5"/>`, look: [8, 0], brows: t > 23.5 ? 'up' : 'soft', mouth: t > 23.5 ? 'flat' : 'smile' });
  // colleague behind her desk (lower body hidden by the desk)
  s += person('kol', 760, 1640, 1.5, { t, seed: 11, look: [6, 4], eyes: 'half', brows: 'flat', mouth: t > 23.3 && t < 23.9 ? 'talk' : 'tight' });
  s += officeDesk(1420, { kx: 640, mx: 920, papers: false }) + monitor(900, 1420);
  s += speech(700, 560, 'Okay', 740, 720, { p: pop(t, 23.4, .3), size: 64 });
  return frame(cam(s, 600, 1000, push(t, 20.76, 24.28, 1.0, 1.08)));
}
