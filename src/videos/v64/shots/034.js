// 73.14–75.1: all photographers sat in the carriage — outside view: three cameras at the carriage windows, flashes inside
import { K, DEFS, bahnScene, person, grain, cam, f1, prog, lerp } from './lib.js';
export default function renderShot(t) {
  const fl = t0 => { const p = prog(t, t0, t0 + .3); return p > 0 && p < 1 ? 1 - p : 0; };
  // photographer busts inside, seen through windows 0,1,5 (car at 540,420 s .75 → window centres)
  const inner = [[-241, 73.4], [-143, 73.9], [249, 74.4]].map(([x, t0]) => person(x, 310, .28, { bust: true, cam: true, flash: fl(t0), hat: 'fedora', col: '#5A5048' }).svg).join('');
  const world = bahnScene(t, { carX: 540, car: { inner, id: 'w34', tilt: 1.5 * Math.sin(t * 2) } });
  return `${DEFS}${cam(world, 2.1, 540, 600)}${grain(t)}`;
}
