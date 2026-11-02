// L8 35.56–40.6: "kein Zufall" — an old study; a framed sepia portrait of the psychologist Bljuma Zeigarnik appears
// ("Psychologin" 36.94), name plate (37.58), big title ZEIGARNIK-EFFEKT ("beobachtete" 38.64), chip 1920er (39.82).
import { K, frame, cam, study, person, bigText, chip, light, wash, T, prog, eio, eout, lerp, cl, pop, f1, op } from './lib.js';
export default function renderShot(t) {
  let s = study({ mood: 'evening', dx: -24 * eio(prog(t, 35.56, 40.6)), clock: [21, 0] }) + wash('#5a3a1a', .25) + light(540, 760, 360, 420, '#ffd98a', .45);
  const p = pop(t, 36.9, .5);
  if (p > 0) {
    let g = `<rect x="-260" y="-330" width="520" height="660" rx="18" fill="#b8893e" stroke="${K.ink}" stroke-width="6"/><rect x="-226" y="-296" width="452" height="592" rx="8" fill="#6e5236"/><rect x="-206" y="-276" width="412" height="552" fill="#d8c29a"/>`;
    g += `<defs><clipPath id="v94pf"><rect x="-206" y="-276" width="412" height="552"/></clipPath></defs><g clip-path="url(#v94pf)">${person('zg', 0, 470, 1.5, { t, seed: 9, brows: 'calm', mouth: 'flat', look: [0, 0], still: true })}<rect x="-206" y="-276" width="412" height="552" fill="#8a5a2a" opacity=".22"/></g>`;
    s += `<g transform="translate(540 760) scale(${f1(p * 1000) / 1000})">${g}</g>`;
    const q = pop(t, 37.58, .4);
    if (q > 0) s += `<g transform="translate(540 1135) scale(${f1(q * 1000) / 1000})"><rect x="-230" y="-40" width="460" height="80" rx="10" fill="#d9b44a" stroke="${K.ink}" stroke-width="5"/>${T(0, 14, 'Bljuma Zeigarnik', 40, { fill: K.ink })}</g>`;
  }
  s += `<rect x="-60" y="1720" width="1200" height="300" fill="#5a3a24" stroke="${K.ink}" stroke-width="5"/><g transform="translate(180 1720)"><rect x="-90" y="-50" width="180" height="50" fill="#7a2e2e" stroke="${K.ink}" stroke-width="4"/><rect x="-80" y="-90" width="170" height="40" fill="#2e4a6a" stroke="${K.ink}" stroke-width="4"/></g>`;
  s = cam(s, 540, 900, 1.02 + .07 * eio(prog(t, 35.56, 40.6)));
  s += bigText(540, 300, 'ZEIGARNIK-EFFEKT', 82, { fill: K.yellow, p: pop(t, 38.64, .45) });
  s += chip(800, 1260, '1920er', { p: pop(t, 39.82, .4), size: 48, bg: '#fff', rot: -4 });
  return frame(s);
}
