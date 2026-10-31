// 39.38–43.38: in the following days skin oil keeps holding dust and dirt ("Hautfett" 40.9, "Staub und Schmutz" 41.58–42.32) — lens: an oily sheen, falling dust specks stick to it
import { K, BG, lens, card, calNote, prog, eio, ein, lerp, f1, hash } from './lib.js';
import { skin } from './sets.js';
export default function renderShot(t) {
  const o = eio(prog(t, 40.6, 41.2)), d = prog(t, 41.4, 43.0);
  let specks = '';
  for (let i = 0; i < 26; i++) { const tx = 180 + hash(i * 2.2) * 720, ty = 620 + hash(i * 4.4) * 640, ph = cl2(d * 1.6 - hash(i) * .6);
    specks += `<circle cx="${f1(tx)}" cy="${f1(lerp(ty - 300, ty, ein(ph)))}" r="${f1(6 + hash(i * 7) * 8)}" fill="${K.dirt}" opacity="${f1(ph > 0 ? 1 : 0)}"/>`; }
  const sheen = `<g opacity="${f1(.55 * o)}">${[0, 1, 2, 3].map(i => `<ellipse cx="${300 + i * 160}" cy="${800 + (i % 2) * 260}" rx="110" ry="60" fill="#FFF6D8"/>`).join('')}</g>`;
  return `${BG()}${lens(540, 940, 420, `${skin()}${sheen}${specks}`, 'l15', { handle: false })}${card(540, 330, 'HAUTFETT', 70, o, { col: K.orangeD })}${calNote(850, 150, ['IN DEN FOLGENDEN', 'TAGEN'])}`;
}
function cl2(x) { return Math.max(0, Math.min(1, x)); }
