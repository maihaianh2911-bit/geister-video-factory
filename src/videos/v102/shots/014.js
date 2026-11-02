// L7 32.14–35.2: the research: a bright brick university campus; a researcher (glasses, white coat) with a clipboard walks in
// and taps it; on "Pennsylvania" (33.52) the big label PENNSYLVANIA pops. Full colour (outside du's world, no meter).
import { K, frame, cam, prog, eio, person, shadow, label, pop, paper, f1 } from './lib.js';
import { campus } from './sets.js';
export default function renderShot(t) {
  let s = campus(t, { brick: true });
  const x = 820 - 200 * eio(prog(t, 32.14, 33.2));
  const tap = t > 33.4 ? Math.max(0, Math.sin((t - 33.4) * 10)) * 20 : 0;
  s += shadow(x, 1650);
  s += person('doc1', x, 1650, 1, { t, seed: 6, walk: t < 33.2 ? t * 1.6 : undefined, look: [-10, 6], brows: 'calm', mouth: 'small',
    armL: [-120, -400], elbowL: [-200, -330], armR: [-20, -420 + tap], elbowR: [150, -380],
    front: paper(-110, -440, 160, 210, -8, '', {}) });
  s = cam(s, 540, 1050, 1.0 + .06 * eio(prog(t, 32.14, 35.2)));
  s += label('PENNSYLVANIA', 540, 330, 100, { p: pop(t, 33.52, .45), fill: '#ffffff' });
  return frame(s);
}
