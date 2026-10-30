// 32.52–37.14: files that live only in the cloud stay unreachable ("Cloud" 34.36, "unerreichbar" 35.8) — the cloud file icon greys out, its link to your PC breaks
import { K, DEFS, BG, stars, cloud, monitor, crossOut, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const g = eio(prog(t, 34.3, 34.8)), x = eio(prog(t, 35.7, 36.1));
  const file = `<g transform="translate(540 430)"><rect x="-50" y="-60" width="100" height="120" rx="10" fill="${g > .5 ? K.grey : K.white}"/><path d="M 20 -60 L 50 -30 H 20 Z" fill="${K.greyL}"/></g>`;
  const line = `<path d="M 540 560 L 540 ${f1(lerp(860, 700, g))}" stroke="${g > .5 ? K.grey : K.data}" stroke-width="10" stroke-dasharray="20 18"/>${g > .5 ? `<path d="M 510 740 L 570 800 M 570 740 L 510 800" stroke="${K.red}" stroke-width="12" stroke-linecap="round"/>` : ''}`;
  const scr = `<rect x="160" y="70" width="140" height="160" rx="10" fill="${K.ind3}" opacity=".6"/>`;
  return `${DEFS}${BG()}${stars(20, 9)}${cam(`${cloud(540, 440, 2.2, g > .5 ? K.grey : K.data)}${file}${line}${monitor(540, 1070, 460, 300, scr)}`, lerp(1, 1.04, prog(t, 32.52, 37.14)), 540, 900)}${crossOut(540, 430, 230, x)}`;
}
