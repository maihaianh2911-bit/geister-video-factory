// L13 51.26–55.94 Split screen. Left "BEI ANDEREN": the man from the train, a red label CHARAKTER is stamped on him on "Charakter" (53.02).
// Right "BEI MIR": du, surrounded by the day's circumstances (clock, rain, low battery) on "Umständen" (54.88), blue label UMSTÄNDE.
import { K, frame, cam, setOffice, person, chip, icon, T, pop, fade, f1 } from './lib.js';
import { push } from './base.js';
export default function renderShot(t) {
  let s = setOffice(t, { heavy: true });
  s += `<rect x="-80" y="-80" width="620" height="2080" fill="#3a1f24" opacity=".35"/><rect x="540" y="-80" width="620" height="2080" fill="#1f3a5a" opacity=".3"/><rect x="532" y="120" width="16" height="1320" rx="8" fill="#fff" opacity=".85"/>`;
  s += person('mann', 270, 1500, 1.25, { t, seed: 7, look: [0, 6], brows: 'worried', mouth: 'tight' });
  s += person('du', 810, 1500, 1.25, { t, seed: 2, look: [-4, 0], brows: 'soft', mouth: 'flat' });
  const ip = [54.3, 54.5, 54.7].map(c => pop(t, c, .35));
  s += icon.clock(650, 740, 1.6 * ip[0]) + icon.cloud(810, 660, 1.6 * ip[1]) + icon.battery(960, 740, 1.6 * ip[2]);
  s += chip(270, 1180, 'CHARAKTER', { p: pop(t, 53.02, .3), size: 52, bg: K.red, fill: '#fff', sq: true, rot: -6 });
  s += chip(810, 1180, 'UMSTÄNDE', { p: pop(t, 54.88, .3), size: 52, bg: K.blue, fill: '#fff', sq: true, rot: 5 });
  const h1 = fade(t, 51.3, .3), h2 = fade(t, 53.46, .3);
  let txt = T(270, 300, 'BEI ANDEREN', 62, { fill: '#fff', stroke: K.ink, sw: 14, op: h1 }) + T(810, 300, 'BEI MIR', 62, { fill: K.yellow, stroke: K.ink, sw: 14, op: h2 });
  return frame(cam(s, 540, 1000, push(t, 51.26, 55.94, 1.0, 1.05)) + txt);
}
