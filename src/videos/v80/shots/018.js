// 126.18–133.86: name the other's abilities concretely → they feel recognised in their expertise
import { K, bg, fade, pop, fig, poseAt, chip, headline, badge } from './lib.js';
export default function renderShot(t) {
  const ich = fig(280, 1340, 1.2, 'ich', poseAt(t, [[126.18, 'stand'], [128.17, 'show']]));
  const ot = fig(790, 1340, 1.2, 'x', poseAt(t, [[126.18, 'stand'], [130.18, 'hips']]), { f: -1, smile: fade(t, 130.32) });
  const rays = `<g opacity="${fade(t, 129.36)}" stroke="${K.yellow}" stroke-width="12" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return `<line x1="${790 + 110 * Math.cos(a)}" y1="${780 + 110 * Math.sin(a)}" x2="${790 + 140 * Math.cos(a)}" y2="${780 + 140 * Math.sin(a)}"/>`; }).join('')}</g>`;
  return bg(K.mint) + headline(t, 280, 'FÄHIGKEITEN KONKRET SCHÄTZEN', 88, { lines: ['FÄHIGKEITEN', 'KONKRET SCHÄTZEN'], mark: { word: 'FÄHIGKEITEN', t: 128.24 } })
    + ich + ot + rays + badge(790, 780, 70, 'star', { a: fade(t, 129.36), sc: pop(t, 129.36) })
    + chip(540, 590, 'FACHKOMPETENZ ANERKANNT', { size: 46, bg: K.green, a: fade(t, 131.92), sc: pop(t, 131.92) });
}
