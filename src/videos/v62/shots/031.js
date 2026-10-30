// Or it keeps coming back without pressure: she just stands normally, yet sparkles flare on the foot again and again; a crossed-out pressure symbol on "ohne erkennbaren Druck".
import { K, room, person, POSE, HIP, joints, tingle, cam, prog, eio, back, lerp, blinkAt } from './lib.js';
export default function renderShot(t) {
  const J = joints(...HIP.stand, 1, POSE.stand);
  const burst = Math.max(Math.sin(Math.PI * prog(t, 64.6, 65.3)), Math.sin(Math.PI * prog(t, 65.5, 66.3)));
  const ic = back(prog(t, 65.12, 65.4));
  const icon = ic > 0 ? `<g transform="translate(800 380) scale(${ic.toFixed(3)})"><circle r="110" fill="${K.white}" stroke="${K.ol}" stroke-width="6"/>
    ${[-40, 0, 40].map(x => `<path d="M ${x} -50 V 30 M ${x - 20} 10 L ${x} 34 L ${x + 20} 10" stroke="${K.pants}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
    <path d="M -78 78 L 78 -78" stroke="${K.red}" stroke-width="16" stroke-linecap="round"/></g>` : '';
  const world = room({ lamp: false }) + person(...HIP.stand, 1, { ...POSE.stand, armN: { u: 5, f: 10 }, armF: { u: -5, f: 0 }, brow: burst > .4 ? 'worry' : 'calm', mouth: 'flat', lookY: 10 * burst, blink: blinkAt(t) })
    + tingle(t, J.ankle[0] + 30, J.ankle[1] - 10, 110, 60, burst, 13, 30, 0, 1.6);
  return cam(560, 900, 1.35, world, 780) + icon;
}
