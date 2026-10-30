// 51.38–53.6: chaos up in the carriage — passengers crowd the torn opening, one loses his hat, others shout from the windows
import { K, DEFS, bahnScene, person, grain, cam, f1, prog, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const sh = Math.sin(t * 14);
  const p1 = person(500, 668, .2, { bust: true, hat: 'none', brow: 1, mouth: 'o', aL: [150, 10 + 20 * sh], aR: [40, 40], col: '#6A5A4A' });
  const p2 = person(580, 668, .2, { bust: true, hat: 'cloche', brow: 1, mouth: 'o', aR: [140, 20 - 20 * sh], col: '#8C6A7A' });
  const hp = prog(t, 51.6, 53.4);
  const hat = `<g transform="translate(${f1(560 + 60 * hp)} ${f1(560 + 500 * hp * hp)}) rotate(${f1(400 * hp)}) scale(.2)"><ellipse cx="0" cy="0" rx="80" ry="16" fill="${K.hat}" stroke="${K.ink}" stroke-width="5"/><path d="M -48 -4 L -44 -52 Q 0 -70 44 -52 L 48 -4 Z" fill="${K.hat}" stroke="${K.ink}" stroke-width="5"/></g>`;
  const world = bahnScene(t, { carX: 540, car: { faces: true, gap: true, tilt: 1.5 * Math.sin(t * 4), inside: '' }, over: p1.svg + p2.svg + hat });
  return `${DEFS}${cam(world, 2.2, 540, 640, 3 * sh, 0)}${grain(t)}`;
}
