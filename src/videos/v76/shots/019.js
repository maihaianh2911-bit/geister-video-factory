// 32.46–34.84: a paper calendar — the page flips; 16 ("sechzehnten" 32.95), OKTOBER (33.24) and 1846 (34.25) appear as they are spoken.
import { K, DEFS, BG, TX, prog, eio, eout, f1, lerp } from './lib.js';
export default function renderShot(t) {
  const flip = eio(prog(t, 32.46, 32.85)), d = eout(prog(t, 32.9, 33.15)), m = eout(prog(t, 33.2, 33.45)), y = eout(prog(t, 34.2, 34.5));
  const page = (inner, sy = 1) => `<g transform="translate(540 560) scale(1 ${f1(sy)})"><rect x="-330" y="0" width="660" height="760" rx="26" fill="${K.paper}" stroke="${K.ink}" stroke-width="6"/>${inner}</g>`;
  const top = `<rect x="210" y="480" width="660" height="110" rx="20" fill="${K.red}" stroke="${K.ink}" stroke-width="6"/>${[300, 440, 640, 780].map(x => `<circle cx="${x}" cy="520" r="16" fill="${K.ink}"/>`).join('')}`;
  const old = flip < 1 ? page('', 1 - flip) : '';
  const nu = page(`<g opacity="${f1(d)}">${TX('16', 0, 380, 300, K.ink)}</g><g opacity="${f1(m)}">${TX('OKTOBER', 0, 520, 96, K.red)}</g><g opacity="${f1(y)}" transform="translate(0 ${f1(20 * (1 - y))})">${TX('1846', 0, 680, 130, K.ink)}</g>`);
  return `${DEFS}${BG()}<ellipse cx="540" cy="900" rx="600" ry="600" fill="url(#nLamp)" opacity=".6"/>${nu}${old}${top}`;
}
