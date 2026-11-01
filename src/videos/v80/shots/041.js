// 312.18–322.07: trusted, deliberately chosen, respected – that makes people want to work with you
import { K, bg, fade, pop, fig, poseAt, chip, headline } from './lib.js';
export default function renderShot(t) {
  const w = (y, s, col, t0) => chip(540, y, s, { size: 74, bg: col, a: fade(t, t0), sc: pop(t, t0) });
  const ich = fig(380, 1340, .95, 'ich', poseAt(t, [[312.18, 'stand'], [319.8, 'cheer']]), { a: fade(t, 317.8) });
  const ot = fig(700, 1340, .95, 'x', poseAt(t, [[312.18, 'stand'], [319.9, 'cheer']]), { f: -1, a: fade(t, 317.8), smile: 1 });
  return bg(K.cream) + w(330, 'VERTRAUEN', K.blue, 314.12) + w(480, 'BEWUSSTE WAHL', K.orange, 315.6) + w(630, 'RESPEKT', K.green, 316.76)
    + ich + ot + chip(540, 800, 'ZUSAMMENARBEIT', { size: 52, bg: K.ink, a: fade(t, 319.96), sc: pop(t, 319.96) });
}
