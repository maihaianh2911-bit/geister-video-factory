// 43.38–48.72: built-up dead skin cells ("abgestorbene Hautzellen" 43.94–44.64) make some spots darker and rougher ("dunkler" 46.34, "rauer" 47.24) — flakes pile up into a darker, scaly patch
import { K, BG, lens, card, calendar, prog, eio, lerp, f1, hash } from './lib.js';
import { skin } from './sets.js';
export default function renderShot(t) {
  const c = eio(prog(t, 43.6, 45.4)), dk = eio(prog(t, 46.2, 46.8)), rg = eio(prog(t, 47.1, 47.7));
  let flakes = '';
  const n = Math.round(30 * c);
  for (let i = 0; i < n; i++) { const x = 360 + hash(i * 3.3) * 360, y = 760 + hash(i * 6.1) * 360; flakes += `<path d="M ${f1(x)} ${f1(y)} l 30 -8 l 14 18 l -26 14 z" fill="${K.paper}" stroke="${K.skinD}" stroke-width="3" opacity=".9"/>`; }
  const dark = `<ellipse cx="540" cy="940" rx="230" ry="210" fill="#B98E6E" opacity="${f1(.6 * dk)}"/>`;
  const rough = rg > 0 ? [...Array(10)].map((_, i) => `<path d="M ${380 + i * 34} ${f1(860 + (i % 3) * 60)} l 20 ${f1(-20 * rg)} l 20 ${f1(20 * rg)}" fill="none" stroke="#7A5A44" stroke-width="5"/>`).join('') : '';
  const label = dk > .5 ? (rg > .5 ? 'RAUER' : 'DUNKLER') : 'HAUTZELLEN';
  return `${BG()}${lens(540, 940, 420, `${skin()}${dark}${flakes}${rough}`, 'l16', { handle: false })}${card(540, 330, label, 70, eio(prog(t, 43.9, 44.2)))}${calendar(930, 150, 22)}`;
}
