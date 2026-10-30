// Next series evening (window dark, lamp on): a new episode starts — she sits with both feet down on "Serienabend".
import { K, room, sofa, tv, person, POSE, HIP, cam, prog, lerp, blinkAt } from './lib.js';
export default function renderShot(t) {
  const world = room({ night: true }) + sofa() + tv(820, 620, 1.1, { t: t * 3, prog: lerp(0, .12, prog(t, 59.2, 60.3)) }) + person(...HIP.sit, 1, { ...POSE.sit, mouth: 'smile', look: 12, lookY: -6, blink: blinkAt(t), armN: { u: 15, f: 60 } });
  return cam(560, 840, lerp(1.2, 1.28, prog(t, 58.86, 60.3)), world, 760);
}
