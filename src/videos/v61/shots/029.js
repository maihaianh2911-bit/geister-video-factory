// 56.5–59.16: a sip of lukewarm water can help — she lifts a plain glass and drinks (Schluck … Wasser)
import { K, DEFS, parlour, counterFront, lea, cam, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const up = eio(prog(t, 56.5, 56.95)), dn = eio(prog(t, 58.3, 58.9)), drink = prog(t, 57.0, 58.2);
  const k = up * (1 - dn);
  const handL = { kind: 'glass', x: lerp(320, 360, k), y: lerp(1200, 900, k), rot: lerp(0, 38, k), level: lerp(.75, .5, drink), warm: true, ice: false, gs: .85 };
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'C', cone: null, handL, eyes: k > .8 ? 'closed' : 'open', brow: 'calm', mouth: k > .8 ? 'sip' : t > 58.7 ? 'smile' : 'soft', lookY: 6 }) + counterFront(1236);
  return `${DEFS}${cam(scene, lerp(1.35, 1.42, eio(prog(t, 56.5, 59.16))), 500, 860)}`;
}
