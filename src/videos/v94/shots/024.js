// L18a 73.8–76.5: daylight desk — du, now upright with an empty backpack, types the e-mail he avoided all week; a stopwatch runs.
import { K, frame, cam, study, person, laptop, mailScreen, stopwatch, mug, light, prog, eio, eout, lerp, cl, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = study({ mood: 'day', dx: -20 * eio(prog(t, 73.8, 76.5)), clock: [10, 0] }) + light(300, 500, 400, 400, '#fff6d0', .35);
  const X = 330, Y = 1600, S = 1.55;
  const ty = Math.sin(t * 18) * 8;
  s += person('du', X, Y, S, { t, seed: 1, load: 0, eyes: 'n', brows: 'calm', mouth: 'smile', look: [16, 10], armR: [190 + ty, -236], armL: [-40, -236 - ty], rim: '#fff2c0' });
  s += `<rect x="80" y="1250" width="1000" height="34" rx="8" fill="#a8774f" stroke="${K.ink}" stroke-width="5"/><rect x="100" y="1284" width="960" height="700" fill="#8a5d3c" stroke="${K.ink}" stroke-width="5"/>`;
  s += laptop(680, 1252, 1.0, { screen: mailScreen({ typed: prog(t, 74.0, 76.6) }) });
  s += stopwatch(960, 1160, .55, prog(t, 73.8, 76.5) * .8) + mug(160, 1252, .9, '#3f7fd8', { t });
  s = cam(s, 600, 1050, 1.0 + .08 * eio(prog(t, 73.8, 76.5)));
  return frame(s, { vig: .4 });
}
