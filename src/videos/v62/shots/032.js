// At the doctor's: she sits and points to her foot; the doctor (white coat) listens and leans in to take a look on "ärztlich abklären" — final beat.
import { K, room, person, POSE, HIP, DOC, cam, prog, eio, lerp, blinkAt } from './lib.js';
export default function renderShot(t) {
  const lean = eio(prog(t, 66.7, 67.3));
  const pt = eio(prog(t, 66.4, 66.8));
  const chair = `<rect x="190" y="660" width="40" height="390" rx="16" fill="${K.wood}" stroke="${K.ol}" stroke-width="4"/><rect x="180" y="1030" width="280" height="40" rx="14" fill="${K.wood}" stroke="${K.ol}" stroke-width="4"/><rect x="200" y="1070" width="20" height="140" fill="${K.wood}" stroke="${K.ol}" stroke-width="4"/><rect x="420" y="1070" width="20" height="140" fill="${K.wood}" stroke="${K.ol}" stroke-width="4"/>`;
  const sign = `<rect x="700" y="300" width="160" height="160" rx="24" fill="${K.white}" stroke="${K.ol}" stroke-width="5"/><path d="M 780 330 V 430 M 730 380 H 830" stroke="${K.teal}" stroke-width="28" stroke-linecap="round"/>`;
  const doc = `<g transform="matrix(-1 0 0 1 ${2 * 780} 0)">${person(780, HIP.stand[1], 1, { ...POSE.stand, ...DOC, aB: 180 + 12 * lean, armN: { u: lerp(10, 40, lean), f: lerp(20, 80, lean) }, armF: { u: 30, f: 100 }, look: 6, lookY: lerp(4, 16, lean), mouth: 'smile', blink: blinkAt(t, 2),
    holdN: undefined })}</g>`;
  const world = room({ lamp: false, window: false }) + sign + chair + person(320, 1012, 1, { ...POSE.sit, armN: { u: lerp(15, 40, pt), f: lerp(60, 120, pt) }, look: 10, lookY: 2, mouth: 'flat', brow: 'calm', blink: blinkAt(t) }) + doc;
  return cam(560, 860, lerp(1.25, 1.32, prog(t, 66.4, 68.96)), world, 760);
}
