// 37.6–40.52: drinking fast through the straw (schnellen Trinken … Strohhalm) — and the sting comes back
import { K, DEFS, parlour, counterFront, lea, cam, zap, prog, eout, eio, back, lerp } from './lib.js';
export default function renderShot(t) {
  const lift = eio(prog(t, 37.6, 38.25)), suck = eio(prog(t, 38.3, 38.75)), drain = prog(t, 38.75, 40.2);
  const sting = prog(t, 39.75, 39.95);
  const gx = lerp(330, 392, lift), gy = lerp(1200, 1088, lift);
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'v', cone: { x: 800, y: 1010, rot: 8, bite: 1 }, handL: { kind: 'glass', x: gx, y: gy, straw: true, suck: suck, level: lerp(.82, .3, drain), ice: true },
    eyes: sting > .3 ? 'squeeze' : lift > .9 ? 'closed' : 'open', brow: sting > .3 ? 'pain' : 'calm', mouth: lift > .9 && sting < .3 ? 'sip' : sting > .3 ? 'grit' : 'soft', puff: lift > .9 && sting < .3 ? .25 : 0, pain: eout(sting), lookY: 8 }) + counterFront(1236);
  const z = lerp(1.3, 1.45, eio(prog(t, 37.6, 40.5)));
  return `${DEFS}${cam(scene, z, 520, 860)}${zap(560, 330, back(prog(t, 39.75, 40)), sting)}`;
}
