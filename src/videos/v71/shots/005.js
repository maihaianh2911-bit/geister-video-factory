// 9.28–14.48: the feeling (GEFÜHL bar full) says little ("wenig" 10.8) about how reliably you can still work ("zuverlässig" 12.16): the second bar stays unknown
import { K, BG, headOf, bar, label, TX, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const f = eio(prog(t, 9.3, 9.9)), dash = eio(prog(t, 10.8, 11.3)), b2 = eio(prog(t, 12.05, 12.4));
  const stripes = b2 > 0 ? `<g opacity="${f1(b2)}"><clipPath id="v71s5"><rect x="148" y="848" width="784" height="80" rx="40"/></clipPath><g clip-path="url(#v71s5)">${[...Array(22)].map((_, i) => `<path d="M ${f1(100 + i * 50 + ((t * 60) % 50))} 930 l 40 -90" stroke="${K.steel}" stroke-width="18"/>`).join('')}</g>
    <circle cx="540" cy="888" r="${f1(62 + 6 * Math.sin(t * 5))}" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/>${TX('?', 540, 916, 84, K.amberD)}</g>` : '';
  const conn = dash > 0 ? `<path d="M 540 470 L 540 ${f1(470 + 280 * dash)}" stroke="${K.ink}" stroke-width="8" stroke-dasharray="18 16" stroke-linecap="round"/>` : '';
  return `${BG()}${bar(140, 340, 800, 96, .92 * f, K.teal, 'GEFÜHL', { sz: 56 })}${conn}${label(760, 610, 'SAGT WENIG', prog(t, 10.8, 11.1), K.red, 46)}
    ${b2 > 0 ? bar(140, 840, 800, 96, 0, K.teal, 'ZUVERLÄSSIG?', { sz: 56 }) : ''}${stripes}
    ${headOf('du', 540, 1230, 1.5, { look: 0, lookY: t > 12.1 ? -.8 : -.5, tired: .8, lid: .3, brow: t > 12.2 ? .8 : .3, mouth: t > 12.2 ? 'o' : 'smile' })}`;
}
