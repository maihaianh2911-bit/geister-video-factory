// 134.32–141.46: trusted in the right place → wants to do it well, not just get it done somehow
import { K, bg, fade, pop, prog, fig, poseAt, chip, headline, badge, T, textW } from './lib.js';
export default function renderShot(t) {
  const row = (y, s, kind, t0, strike) => {
    const a = fade(t, t0), w = textW(s, 64);
    return `<g opacity="${a}"><rect x="90" y="${y - 80}" width="900" height="130" rx="30" fill="${kind === 'check' ? K.greenL : '#fff'}" stroke="${K.ink}" stroke-width="6"/>${badge(170, y - 15, 42, kind, { sc: pop(t, t0) })}${T(240, y + 8, s, 64, { anchor: 'start' })}${strike ? `<line x1="236" y1="${y - 14}" x2="${236 + (w + 10) * prog(t, strike, strike + .5)}" y2="${y - 14}" stroke="${K.red}" stroke-width="10" stroke-linecap="round"/>` : ''}</g>`;
  };
  const f = fig(540, 1340, 1.0, 'x', poseAt(t, [[134.32, 'stand'], [138.0, 'cheer']]));
  return bg(K.butter) + headline(t, 280, 'RICHTIG VERTRAUT?', 92, { mark: { word: 'VERTRAUT?', t: 136.32 } })
    + row(560, 'GUT MACHEN', 'check', 138.26) + row(760, 'IRGENDWIE ERLEDIGEN', 'x', 139.4, 139.98) + f;
}
