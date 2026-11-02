// L8c 46.60–49.34: close-up participant, hand on chin, estimating beforehand ("schätzten" 46.96): thought bubble with a wobbling gauge.
import { frame, cam, pop, prog, eio, person, thought, f1, K } from './lib.js';
import { office } from './sets.js';
export default function renderShot(t) {
  let s = office(t);
  s += person('stu', 540, 2120, 1.6, { t, seed: 11, look: [-10, -12], brows: 'worried', mouth: 'small', armL: [-60, -600], elbowL: [-230, -430] });
  const a = -60 + 50 * Math.sin(t * 2.4) + 30 * Math.sin(t * 5.1);
  const r = Math.PI / 180;
  const inner = `<path d="M 410 440 A 130 130 0 0 1 670 440" stroke="#e8e8e8" stroke-width="34" fill="none"/><path d="M 410 440 A 130 130 0 0 1 540 310" stroke="#9aa6b4" stroke-width="34" fill="none"/><path d="M 540 310 A 130 130 0 0 1 670 440" stroke="${K.yellow}" stroke-width="34" fill="none"/><path d="M 540 440 L ${f1(540 + Math.sin(a * r) * 110)} ${f1(440 - Math.cos(a * r) * 110)}" stroke="${K.ink}" stroke-width="12" stroke-linecap="round"/><circle cx="540" cy="440" r="16" fill="${K.ink}"/><text x="740" y="420" font-family="Inter" font-weight="900" font-size="90" fill="${K.txt}" style="font-family:'Inter';font-weight:900">?</text>`;
  s += thought(560, 380, [''], 600, 640, { p: pop(t, 46.96, .4), w: 520, h: 250, inner });
  return frame(cam(s, 540, 1050, 1 + .05 * eio(prog(t, 46.6, 49.34))));
}
