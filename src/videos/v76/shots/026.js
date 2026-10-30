// 46.80–48.68: the patient wakes up with a white bandage on the neck, turns to Warren and starts to report ("berichtete" 47.18).
import { K, DEFS, cam, prog, eio, lerp } from './lib.js';
import { theatre } from './t46.js';
export const bandage = `<path d="M 488 850 Q 540 868 592 850 L 594 884 Q 540 902 486 884 Z" fill="${K.white}" stroke="${K.ink}" stroke-width="4"/>`;
export default function renderShot(t) {
  const wake = eio(prog(t, 46.8, 47.15)), talk = t > 47.18;
  const sc = theatre(t, { lean: 1, pt: { neck: bandage, face: { t, eyes: wake > .5 ? 'open' : wake > .1 ? 'half' : 'closed', look: lerp(0, 1, wake), lookY: 0, brow: 0, mouth: talk ? 'talk' : 'flat', tilt: lerp(-8, 4, wake) } },
    warren: { x: 830, look: -.9, lookY: .2, brow: .6, mouth: 'flat' } });
  return `${DEFS}${cam(sc, 1.45, 640, 920, -60, 0)}`;
}
