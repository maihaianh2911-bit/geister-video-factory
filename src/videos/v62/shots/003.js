// Over the sofa toward the TV: the episode plays on "schaust eine Serie" and its progress bar runs on — time passes while she sits still.
import { K, room, sofa, tv, person, POSE, HIP, cam, prog, eio, lerp, blinkAt } from './lib.js';

export default function renderShot(t) {
  const pr = lerp(.15, .95, eio(prog(t, 5.3, 7.1)));
  const world = room({ lamp: false }) + sofa() + tv(820, 620, 1.1, { t: t * 3, prog: pr }) + person(...HIP.tucked, 1, { ...POSE.tucked, mouth: t > 5.7 ? 'smile' : 'flat', look: 12, lookY: -6, blink: blinkAt(t, 1.2), armN: { u: 20, f: 80 } });
  return cam(560, 820, 1.25, world, 760);
}
