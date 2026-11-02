// L5 18.48–20.36 MITTWOCH: the friends arrive at the café table one after another ("Café mit Freunden").
import { K, frame, dayCard, cam, prog, eio, eout, pop } from './lib.js';
import { cafeScene } from './cafe.js';
export default function renderShot(t) {
  const enter = { du: eout(prog(t, 18.5, 19.0)), lena: eout(prog(t, 18.7, 19.2)), gl: eout(prog(t, 19.1, 19.6)), cap: eout(prog(t, 19.3, 19.8)) };
  let s = cafeScene(t, { enter, pose: { du: { hear: .6, quiff: true, mouth: 'smile', look: [-6, 0] }, lena: { mouth: 'smile', look: [8, 0] }, gl: { mouth: 'smile', look: [8, 0] }, cap: { mouth: 'smile', look: [-8, 0] } } });
  s += dayCard(t, 18.48, 'MITTWOCH');
  return frame(cam(s, 540, 1000, 1 + .03 * eio(prog(t, 18.48, 20.36))));
}
