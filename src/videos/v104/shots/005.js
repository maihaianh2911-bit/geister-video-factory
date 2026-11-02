// L3a 14.68–18.72: du wades through grass up to his chest, pushing it aside with both arms; every step is heavy (strained brows, sweat,
// slow walk); on "Kraft" (17.2) he stops, panting. Counter TAG 1.
import { K, frame, cam, prog, eio, pop } from './lib.js';
import { field } from './common.js';
import { dayCounter } from './meadow.js';
export default function renderShot(t) {
  const walking = t < 17.2;
  const ph = walking ? (t - 14.68) * .9 : undefined;
  const sw = Math.sin((t - 14.68) * 5.6);
  const s = field(t, 520 + 20 * Math.sin((t - 14.68) * 2.8), 1720, 1.0, { mood: 'morning', p: 0, tall: 1.8, tallBack: 1.3, du: { look: [0, 4], brows: 'strain', mouth: walking ? 'wavy' : 'o', sweat: .8, walk: ph, hunch: .2, armL: [-230 - 30 * sw, -600], elbowL: [-230, -500], armR: [230 + 30 * sw, -600], elbowR: [230, -500] } });
  return frame(cam(s, 540, 1050, 1.02 + .08 * eio(prog(t, 14.68, 18.72))) + dayCounter('TAG 1', 820, 400, 1));
}
