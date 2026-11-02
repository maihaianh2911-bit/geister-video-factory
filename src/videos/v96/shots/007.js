// L4a 13.94–16.6: close-up from above: du on the pillow, face lit blue, scrolling news ("Nachrichten" 14.64); the sand starts to run ("rieselt" 16.0).
import { K, frame, cam, prog, eio, head, chip, fade } from './lib.js';
import { bedroom2 } from './sets.js';
import { hourglass, gphone, screenGlow } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = bedroom2(t, { dawn: .3, strong: true });
  s += `<rect x="-100" y="760" width="1300" height="1300" rx="120" fill="#f4f1ea" stroke="${INK}" stroke-width="6"/>`;
  s += head('du', 460, 1080, 1.65, { t, seed: 1, look: [12, -12], brows: 'calm', mouth: 'flat', headTilt: -6, rim: '#7fd4ff' });
  s += `<path d="M -60 1460 C 200 1380 600 1400 1140 1360 V 2000 H -60 Z" fill="#4f7fb5" stroke="${INK}" stroke-width="7"/><path d="M -60 1470 C 200 1400 600 1420 1140 1380" stroke="#7fa7d8" stroke-width="22" fill="none"/>`;
  // arm from blanket up to the phone
  s += `<path d="M 840 1400 Q 900 1200 780 1040" stroke="${INK}" stroke-width="72" fill="none" stroke-linecap="round"/><path d="M 840 1400 Q 900 1200 780 1040" stroke="${K.du}" stroke-width="58" fill="none" stroke-linecap="round"/>`;
  s += screenGlow(560, 1040, 380, .4);
  s += gphone(760, 900, 1.5, -18, { scroll: t * 45, id: 'p7' }) + `<circle cx="790" cy="1030" r="36" fill="${INK}"/>`;
  s += hourglass(840, 430, .9, { t, id: 'h7', glow: t > 15.5 ? .6 : .3 });
  s += chip(780, 250, 'NACHRICHTEN', { size: 36, a: fade(t, 14.6, .3) });
  s = cam(s, 540, 1000, 1.02 + .06 * eio(prog(t, 13.94, 16.6)));
  return frame(s);
}
