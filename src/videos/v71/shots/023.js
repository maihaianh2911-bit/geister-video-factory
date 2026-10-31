// 62.6–68.772: top-down road — with eyes closed for 3 s ("drei Sekunden" 62.73) the car covers more than 40 m ("vierzig Meter" 64.19) that you do not see ("nicht verfolgst" 65.96)
import { K, BG, carTop, label, TX, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const m = eio(prog(t, 62.9, 64.36)), y0 = 1330, y1 = 560;
  const cy = lerp(y0, y1, m) - 40 * prog(t, 64.36, 68.772);
  const dashes = [...Array(14)].map((_, i) => `<rect x="532" y="${i * 150 - 40}" width="16" height="80" rx="6" fill="${K.white}"/>`).join('');
  const shade = m > 0 ? `<rect x="360" y="${f1(cy + 100)}" width="360" height="${f1(Math.max(0, y0 + 100 - cy - 100))}" fill="${K.ink}" opacity=".55"/>` : '';
  const br = prog(t, 64.19, 64.4);
  const bracket = br > 0 ? `<path d="M 330 ${y0 + 90} H 300 V ${y1 + 100} H 330" fill="none" stroke="${K.red}" stroke-width="10" stroke-linecap="round" opacity="${f1(br)}"/>` : '';
  const eye = `<path d="M -40 0 q 40 28 80 0" fill="none" stroke="${K.white}" stroke-width="10" stroke-linecap="round"/><path d="M -30 14 l -10 18 M 0 22 v 20 M 30 14 l 10 18" stroke="${K.white}" stroke-width="7" stroke-linecap="round"/>`;
  const blind = prog(t, 65.9, 66.3);
  const ahead = blind > 0 ? `<rect x="360" y="-60" width="360" height="${f1(cy - 100 + 60)}" fill="${K.ink}" opacity="${f1(.35 * blind)}"/><g opacity="${f1(blind)}"><circle cx="540" cy="${f1(cy - 330)}" r="62" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/>${TX('?', 540, cy - 302, 84, K.red)}</g>` : '';
  return `${BG(K.grass)}<rect x="360" y="-60" width="360" height="2040" fill="${K.road}" stroke="${K.ink}" stroke-width="5"/>${dashes}${shade}${m > .3 ? `<g transform="translate(540 ${f1((cy + y0) / 2 + 60)})" opacity="${f1(cl1(m))}">${eye}</g>` : ''}${ahead}${carTop(540, cy, 1.25)}${bracket}
    ${label(170, 940, '> 40 M', br, K.red, 54)}${label(300, 250, '50 KM/H', 1, K.ink, 50)}${label(780, 250, '3 S', prog(t, 62.73, 62.95), K.ink, 50)}`;
}
const cl1 = v => Math.max(0, Math.min(1, (v - .3) / .4));
