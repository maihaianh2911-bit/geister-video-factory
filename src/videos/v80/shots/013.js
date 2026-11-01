// 80.74–87.34: I ask Châu his secret; he just smiles and shows me a message he sent Trang
import { K, bg, fade, pop, fig, poseAt, chip, bubble, headline, phone, chat } from './lib.js';
export default function renderShot(t) {
  const ich = fig(260, 1340, 1.2, 'ich', poseAt(t, [[80.74, 'stand'], [81.2, 'ask']]));
  const ph = `<g transform="rotate(-8) scale(.5)"><rect x="-60" y="-110" width="120" height="200" rx="18" fill="${K.ink}"/><rect x="-48" y="-96" width="96" height="170" rx="10" fill="#fff"/></g>`;
  const ch = fig(800, 1340, 1.2, 'chau', poseAt(t, [[80.74, 'stand'], [84.24, 'show']]), { f: -1, smile: fade(t, 83.0), prop: t >= 84.0 ? ph : '' });
  const q = bubble(70, 560, 490, [{ s: '„Was ist dein Geheimnis?“' }], { size: 54, a: fade(t, 81.5), tail: [280, 840] });
  const pa = fade(t, 85.0);
  const prev = `<g opacity="${pa}" transform="translate(0 ${(1 - pa) * 30})">` + phone(610, 440, 320, 360, chat(320, 120, ['Trang, …'], 'r', { size: 40 }).svg, { title: 'An: Trang' }) + '</g>';
  return bg(K.sky) + headline(t, 260, 'CHÂUS GEHEIMNIS?', 92, { mark: { word: 'GEHEIMNIS?', t: 81.66 } }) + ich + ch + q.svg + prev;
}
