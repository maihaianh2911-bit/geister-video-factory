// L12a 65.54–68.50: close-up colleague: she blushes ("rot" 66.32), then smiles ("lächelt" 66.90) and keeps smiling.
import { frame, cam, prog, eio, person, mug } from './lib.js';
import { openOffice } from './sets.js';
export default function renderShot(t) {
  let s = openOffice(t, { mood: 'sun', hh: 9, mm: 20, strong: true });
  const b = eio(prog(t, 65.9, 66.5)), sm = t >= 66.9;
  s += person('kol', 540, 2260, 1.6, { t, seed: 4, look: sm ? [-6, 6] : [-12, 8], eyes: t > 67.6 ? 'happy' : 'n', blush: b, brows: 'up', mouth: sm ? 'smile' : 'small', headTilt: -5 * b, armR: [120, -560], elbowR: [230, -380] });
  return frame(cam(s, 540, 1050, 1 + .07 * eio(prog(t, 65.54, 68.5))));
}
