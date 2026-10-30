// 18.98–20.90: pain limits the surgeon — a red pain burst flares from du; the surgeon's saw hand stops and pulls back ("begrenzte" 19.6).
import { K, DEFS, cam, pain, prog, eio, lerp } from './lib.js';
import { orScene } from './or.js';
export default function renderShot(t) {
  const flare = eio(prog(t, 19.3, 19.6)) * (1 - .4 * eio(prog(t, 20.2, 20.9)));
  const back = eio(prog(t, 19.55, 20.1));
  const sc = orScene(t, { inA: 1, inB: 1, gripA: 1, gripB: 1, jerk: -14 * flare * Math.abs(Math.sin(t * 9)), lift: 8, face: { eyes: 'closed', brow: 1, mouth: 'grit' }, saw: 'hand', sawUp: lerp(.1, 1, back),
    surg: { look: -.6, lookY: .3, brow: lerp(.2, 1, back), mouth: back > .5 ? 'down' : 'flat' }, over: pain(300, 1000, 80, flare, t) + pain(760, 1030, 60, flare * .8, t, 2) });
  return `${DEFS}${cam(sc, 1.5, 640, 900, -100, 0)}`;
}
