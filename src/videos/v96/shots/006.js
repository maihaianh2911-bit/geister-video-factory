// L3b 11.12–13.94: alarm rings ("klingelt" 11.46), du opens eyes, reaches to the nightstand ("greifst" 12.3) and holds the lit phone above the face ("Handy" 13.32).
import { K, frame, cam, prog, eio, lerp, cl } from './lib.js';
import { bedroom2, bedDu, nightstand } from './sets.js';
import { hourglass, gphone, phoneDown, screenGlow } from './base.js';
export default function renderShot(t) {
  let s = bedroom2(t, { dawn: .2, strong: true });
  const ring = t >= 11.46 && t < 12.5 ? 1 : 0;
  const awake = t >= 11.75;
  const r = eio(prog(t, 12.3, 12.75)), b = eio(prog(t, 12.75, 13.3));
  // hand path: under blanket → nightstand phone (860,1290) → above face (560,820)
  const arm = t < 12.3 ? null : [lerp(lerp(620, 640, r), 600, b), lerp(lerp(1180, 1330, r), 820, b)];
  const lit = cl(prog(t, 13.1, 13.35));
  s += bedDu(t, { hx: 330, hy: 1040, s: 1.1, eyes: awake ? (t < 12.3 ? 'half' : 'n') : 'closed', blink: awake, look: t < 12.3 ? [14, 0] : t < 12.9 ? [16, 8] : [14, -10], brows: awake ? 'worried' : 'calm', mouth: 'flat', arm, phone: arm && b > 0 ? (x, y) => gphone(x, y - 40, .9, lerp(80, -12, b), { lit, id: 'p6', scroll: 0 }) : null });
  if (lit > 0) s += screenGlow(400, 1000, 260, .35 * lit);
  s += nightstand(t, 780, 1390, { txt: '06:30', ring, cdx: 60, phone: arm && b > 0 ? '' : phoneDown(640, 1372, .75, -4) });
  s += hourglass(330, 640, .72, { t, id: 'h6' });
  s = cam(s, 600, 1100, 1.06 + .05 * eio(prog(t, 11.12, 13.94)) + (ring ? .02 * Math.sin(t * 40) : 0));
  return frame(s);
}
