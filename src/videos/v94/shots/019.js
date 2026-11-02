// L12a 50.68–53.30: bright office: two psychologists with a clipboard; chip "Florida State University · 2011" on "Florida" (51.68).
import { K, frame, person, cam, shadow, chip, paper, T, pop, prog, eio } from './lib.js';
import { office } from './sets.js';
export default function renderShot(t) {
  let s = office(t);
  const talk = t > 50.7 && t < 53.3 && Math.sin(t * 12) > 0;
  s += shadow(330, 1640) + person('doc1', 330, 1640, 1, { t, seed: 2, look: [14, 0], brows: 'up', mouth: talk ? 'talk' : 'smile', armR: [210, -470], elbowR: [240, -380], front: paper(240, -520, 140, 180, 8, '', {}) });
  s += shadow(770, 1620, 170) + person('doc2', 770, 1620, .95, { t, seed: 6, look: [-14, 0], brows: 'calm', mouth: 'smile', armL: [-260, -760 + Math.sin(t * 5) * 10], elbowL: [-230, -560] });
  s += `<rect x="-60" y="1720" width="1200" height="260" fill="#e6e6e2" stroke="${K.ink}" stroke-width="5"/><rect x="-60" y="1720" width="1200" height="22" fill="#fff"/>`;
  s = cam(s, 540, 1100, 1.0 + .06 * eio(prog(t, 50.68, 53.3)), -20 * prog(t, 50.68, 53.3), 0);
  const p = pop(t, 51.68, .4);
  if (p > 0) s += `<g transform="translate(540 260) scale(${Math.max(.01, p)})">${chip(0, 0, 'Florida State University', { size: 50, bg: K.yellow })}${chip(0, 96, '2011', { size: 42 })}</g>`;
  s += `<g transform="translate(540 160) scale(${Math.max(.01, pop(t, 50.68, .4))})">${chip(0, 0, '2 PSYCHOLOGEN', { size: 40 })}</g>`;
  return frame(s);
}
