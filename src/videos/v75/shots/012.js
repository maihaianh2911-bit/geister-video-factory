// 30.04–32.52: the ones saved on your computer ("auf deinem Rechner gespeichert" 30.82–31.12) — the open document is linked to the PC's own drive, green tick
import { K, DEFS, BG, monitor, tick, TX, label, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const a = eio(prog(t, 30.7, 31.2));
  const doc = `<rect x="40" y="30" width="480" height="300" rx="10" fill="${K.white}"/>${[0, 1, 2, 3].map(i => `<rect x="80" y="${70 + i * 50}" width="${300 - i * 40}" height="16" rx="8" fill="${K.greyL}"/>`).join('')}`;
  const drive = `<g transform="translate(540 1300)"><rect x="-180" y="-70" width="360" height="140" rx="24" fill="${K.ind3}" stroke="${K.green}" stroke-width="6"/><circle cx="120" cy="0" r="14" fill="${K.green}"/>${[0, 1, 2].map(i => `<rect x="${-140 + i * 50}" y="-20" width="30" height="40" rx="6" fill="${K.grey}"/>`).join('')}</g>`;
  const link = `<path d="M 540 1020 V 1230" stroke="${K.green}" stroke-width="10" stroke-dasharray="${f1(210 * a)} 400"/>`;
  return `${DEFS}${BG()}${cam(`${monitor(540, 760, 560, 360, doc)}${link}${drive}`, 1, 540, 1000)}${tick(820, 1180, 1.4, eio(prog(t, 31.1, 31.5)))}${label(540, 330, 'LOKAL', a, K.green)}`;
}
