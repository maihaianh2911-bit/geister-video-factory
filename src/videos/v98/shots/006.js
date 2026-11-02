// L3b 13.4–15.3: close-up of the roommate: tired eyes, rubbing an eye, "schlecht geschlafen" (13.72–14.52); bags under the eyes.
import { K, frame, cam, prog, eio, person } from './lib.js';
import { kitchen } from './sets.js';
export default function renderShot(t) {
  let s = kitchen(t, { strong: true });
  const rub = t >= 13.9 && t < 14.9;
  s += person('room', 520, 2180, 1.7, { t, seed: 3, eyes: 'tired', brows: 'sad', mouth: 'frown', look: [6, 4], headTilt: -6, armR: rub ? [90, -760 + Math.sin(t * 14) * 8] : undefined });
  s += `<g stroke="#9aa0b4" stroke-width="7" fill="none" stroke-linecap="round"><path d="M ${520 - 1.7 * 85} ${2180 - 1.7 * 713 + 1.7 * 52} q ${1.7 * 30} ${1.7 * 14} ${1.7 * 60} 0"/><path d="M ${520 + 1.7 * 20} ${2180 - 1.7 * 713 + 1.7 * 52} q ${1.7 * 30} ${1.7 * 14} ${1.7 * 60} 0"/></g>`;
  return frame(cam(s, 540, 900, 1.0 + .05 * eio(prog(t, 13.4, 15.3))));
}
