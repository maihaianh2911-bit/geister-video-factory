// 313.22–323.27: trusted, deliberately chosen, respected – that makes people want to work with you
import { K, bg, fade, pop, fig, poseAt, chip, headline } from './lib.js';
export default function renderShot(t) {
  const w = (y, s, col, t0) => chip(540, y, s, { size: 74, bg: col, a: fade(t, t0), sc: pop(t, t0) });
  const ich = fig(380, 1340, .95, 'ich', poseAt(t, [[313.22, 'stand'], [320.92, 'cheer']]), { a: fade(t, 318.84) });
  const ot = fig(700, 1340, .95, 'x', poseAt(t, [[313.22, 'stand'], [321.05, 'cheer']]), { f: -1, a: fade(t, 318.84), smile: 1 });
  return bg(K.cream) + headline(t, 270, 'GENAU DIESES GEFÜHL:', 76) + w(420, 'VERTRAUEN', K.blue, 315.24) + w(560, 'BEWUSSTE WAHL', K.orange, 316.52) + w(700, 'RESPEKT', K.green, 317.84)
    + ich + ot + chip(540, 850, 'ZUSAMMENARBEIT', { size: 52, bg: K.ink, a: fade(t, 321.14), sc: pop(t, 321.14) });
}
