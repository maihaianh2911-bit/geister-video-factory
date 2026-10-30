// 53.54–58.1: natural ice could cool as long as supply and storage work — an ice man carries a block with tongs into a wooden icebox ("Nachschub"); the block melts and drips ("Lagerung")
import { K, DEFS, BG, person, chip, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const w = prog(t, 53.6, 55.6), x = lerp(-60, 420, eio(w));
  const drop = eio(prog(t, 55.7, 56.3));
  const melt = prog(t, 56.4, 58.1);
  const bx = drop > 0 ? lerp(x + 170, 760, drop) : x + 170, by = drop > 0 ? lerp(1000, 940, drop) : 1000;
  const p = person(x, 1460, 1.05, { walk: w < 1 ? t * 6 : 0, aR: [[x + 120, 1030], [bx - 30, by - 70]], aL: [[x + 60, 1050], [bx - 60, by - 60]], head: { look: .5 } });
  const tong = `<path d="M ${f1(bx - 40)} ${f1(by - 70)} L ${f1(bx - 70)} ${f1(by - 10)} M ${f1(bx - 40)} ${f1(by - 70)} L ${f1(bx + 70)} ${f1(by - 10)}" stroke="#4A4A55" stroke-width="8" stroke-linecap="round" opacity="${f1(1 - drop)}"/>`;
  const ice = `<rect x="${f1(bx - 70)}" y="${f1(by - 50 + 40 * melt)}" width="140" height="${f1(100 - 40 * melt)}" rx="12" fill="${K.ice}" fill-opacity=".9" stroke="${K.cyan}" stroke-width="4"/>`;
  const drips = melt > 0 ? [0, 1, 2].map(i => `<circle cx="${760 - 40 + i * 40}" cy="${f1(1010 + ((t * 160 + i * 50) % 150))}" r="8" fill="${K.cold}"/>`).join('') : '';
  const box = `<rect x="600" y="900" width="340" height="420" rx="14" fill="${K.wood}" stroke="${K.ink}" stroke-width="5"/>
    <path d="M 600 ${f1(900)} L ${f1(lerp(940, 650, drop * (1 - prog(t, 56.2, 56.4))))} ${f1(lerp(900, 700, drop * (1 - prog(t, 56.2, 56.4))))}" stroke="${K.woodD}" stroke-width="16" stroke-linecap="round"/>
    ${[0, 1, 2].map(i => `<path d="M 600 ${1000 + i * 100} h 340" stroke="${K.woodD}" stroke-width="4"/>`).join('')}`;
  return `${DEFS}${BG('url(#kOld)')}<rect x="-60" y="1300" width="1200" height="700" fill="#2A2018"/>${box}${p.svg}${ice}${tong}${drips}
    ${chip(300, 420, 'NATUREIS', prog(t, 54.0, 54.3), K.cold, 46)}${chip(770, 820, 'NACHSCHUB?', prog(t, 55.6, 55.9), K.warm, 36)}`;
}
