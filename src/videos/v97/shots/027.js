// L13b 72.90–74.50: the new colleague at his desk reads the message on his phone and smiles ("geholfen" 73.74).
import { frame, cam, prog, eio, person, phone, pop, speech, f1, K, T } from './lib.js';
import { openOffice, desk } from './sets.js';
export default function renderShot(t) {
  let s = openOffice(t, { hh: 14, mm: 0 });
  const sm = t >= 73.6;
  s += person('neu', 560, 1700, 1.05, { t, seed: 2, look: [-8, 14], eyes: sm ? 'happy' : 'n', brows: 'up', mouth: sm ? 'smile' : 'soft', armR: [40, -470], elbowR: [210, -360], holdR: phone(-10, -40, .65, -10, '#e9f7f4', `<rect x="-48" y="-40" width="96" height="60" rx="12" fill="#2fa59a"/>`) });
  s += desk(t, { y: 1460, monitor: false, keyboard: true, mx: 540, mugX: 880 });
  s += speech(540, 400, ['„Danke für gestern …“'], 600, 650, { p: pop(t, 73.0, .35), size: 50 });
  return frame(cam(s, 540, 1100, 1.05 + .05 * eio(prog(t, 72.9, 74.5))));
}
