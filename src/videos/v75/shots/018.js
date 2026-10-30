// 50.1–53.02: orders, stock and staff schedules ("Bestellungen" 50.1, "Lagerbestände" 51.0, "Einsatzpläne" 52.0) — three panels appear in turn, linked by cyan sync arrows
import { K, DEFS, BG, label, prog, eio, f1 } from './lib.js';
export function panels(t, a, br) {
  const P = [[540, 470], [260, 1080], [820, 1080]];
  const inner = [
    i => [0, 1, 2].map(r => `<rect x="-110" y="${-50 + r * 40}" width="220" height="24" rx="6" fill="${K.white}"/>`).join(''),
    i => [0, 1].map(r => `<rect x="-120" y="${-30 + r * 70}" width="240" height="10" fill="${K.woodL}"/>${[0, 1, 2].map(c => `<rect x="${-100 + c * 70}" y="${-70 + r * 70}" width="50" height="40" fill="${K.bread}"/>`).join('')}`).join(''),
    i => [0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<rect x="${-110 + c * 56}" y="${-60 + r * 40}" width="46" height="30" rx="4" fill="${(r + c) % 3 ? K.ind3 : K.sun}"/>`).join('')).join(''),
  ];
  const labels = ['BESTELLUNGEN', 'LAGER', 'EINSATZPLAN'];
  let s = '';
  P.forEach(([x, y], i) => { if (a[i] <= 0) return; s += `<g opacity="${f1(a[i])}" transform="translate(${x} ${y})"><rect x="-160" y="-130" width="320" height="260" rx="20" fill="${K.ind2}" stroke="${K.data}" stroke-width="5"/>${inner[i]()}</g>${label(x, y + 200, labels[i], a[i], K.data, 36)}`; });
  const links = [[0, 1], [1, 2], [2, 0]].map(([i, j], k) => { const [x1, y1] = P[i], [x2, y2] = P[j]; const on = Math.min(a[i], a[j]); if (on <= 0) return '';
    const b = br[k]; const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    return `<path d="M ${x1} ${y1} L ${x2} ${y2}" stroke="${b > .5 ? K.red : K.data}" stroke-width="10" stroke-dasharray="${b > .5 ? '20 30' : '30 14'}" stroke-dashoffset="${f1(-t * 80)}" opacity="${f1(on * .8)}"/>${b > .5 ? `<path d="M ${mx - 26} ${my - 26} L ${mx + 26} ${my + 26} M ${mx + 26} ${my - 26} L ${mx - 26} ${my + 26}" stroke="${K.red}" stroke-width="12" stroke-linecap="round"/>` : ''}`; }).join('');
  return links + s;
}
export default function renderShot(t) {
  const a = [eio(prog(t, 50.1, 50.4)), eio(prog(t, 50.95, 51.25)), eio(prog(t, 51.95, 52.25))];
  return `${DEFS}${BG()}${panels(t, a, [0, 0, 0])}`;
}
