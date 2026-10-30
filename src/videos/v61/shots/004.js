// 4.0–6.0: chewing happily (genießen) — then she freezes, eyes wide, just before the sting
import { K, DEFS, parlour, counterFront, lea, cam, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const freeze = prog(t, 5.55, 5.85);
  const chewing = freeze < 1;
  const cone = { x: 790, y: 1005, rot: 4, bite: 1 };
  const z = lerp(1.25, 1.32, eio(prog(t, 4, 6)));
  const eyes = t < 4.5 ? 'open' : freeze > .3 ? 'open' : 'happy';
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'd', cone, eyes, eyeS: lerp(1, 1.35, eout(freeze)), brow: freeze > .3 ? 'up' : 'calm', look: 0, lookY: freeze > .3 ? -6 : 0,
    mouth: chewing ? 'chew' : 'flat', chew: chewing ? Math.sin(t * 13) * .5 + .5 : 0, puff: lerp(.8, .35, prog(t, 4, 5.6)), tilt: chewing ? 3 * Math.sin(t * 6.5) : 0 }) + counterFront(1236);
  return `${DEFS}${cam(scene, z, 540, 860)}`;
}
