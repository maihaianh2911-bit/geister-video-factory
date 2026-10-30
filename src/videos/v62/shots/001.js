// Cover: on the sofa with one leg tucked under, watching a series; the camera pushes toward the tucked foot, it is ringed on "Bein" and goes pale/dashed on "einschläft".
import { K, room, sofa, tv, person, POSE, HIP, joints, headline, cam, prog, eio, back, cl, lerp, blinkAt } from './lib.js';

export default function renderShot(t) {
  const z = lerp(1.25, 1.42, eio(prog(t, .2, 2.9)));
  const numb = eio(prog(t, 2.1, 2.6));
  const J = joints(...HIP.tucked, 1, POSE.tucked);
  const rp = back(prog(t, 1.3, 1.6));
  const ring = rp > 0 ? `<ellipse cx="${J.ankle[0] - 20}" cy="${J.ankle[1] + 10}" rx="${130 * rp}" ry="${80 * rp}" fill="none" stroke="${K.teal}" stroke-width="10" stroke-dasharray="22 14"/>` : '';
  const world = room() + sofa() + tv(880, 560, .8, { t, prog: .3 + t * .02 }) + person(...HIP.tucked, 1, { ...POSE.tucked, numb, mouth: 'smile', look: 10, lookY: -4, blink: blinkAt(t, .5) }) + ring;
  return cam(400, 930, z, world, 980) + `<rect x="0" y="120" width="1080" height="300" fill="${K.wall}" opacity=".85"/>` + headline(['BEIN', 'EINGESCHLAFEN?'], 250, 104);
}
