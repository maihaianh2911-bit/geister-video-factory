// 32.14–34.26: "Unter dem Mikroskop" — a magnifier slides over a Mentos; inside it the surface looks rough; card OBERFLÄCHE
import { K, OL, f1, mentos, lens, card, prog, eio, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const sl = eio(prog(t, 32.2, 32.9)), lx = lerp(1250, 600, sl), ly = 820;
  let rough = '';
  for (let i = 0; i < 40; i++) { const a = hash(i * 2.2) * 6.28, d = Math.sqrt(hash(i * 5.1)) * 330; rough += `<circle cx="${f1(540 + Math.cos(a) * d)}" cy="${f1(820 + Math.sin(a) * d * .62)}" r="${f1(8 + 16 * hash(i * 9.3))}" fill="${K.mentosD}" stroke="${K.ink}" stroke-width="4"/>`; }
  const big = `<g transform="translate(540 820)"><ellipse cx="0" cy="0" rx="420" ry="260" fill="${K.mentos}" ${OL(10)}/></g>`;
  const inner = `<rect x="-60" y="-60" width="1200" height="2040" fill="${K.mentos}"/>${rough}`;
  const z = lerp(1, 1.12, prog(t, 32.9, 34.26));
  return `<rect x="-60" y="-60" width="1200" height="2040" fill="${K.cola}"/>${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${f1(120 + i * 170)}" cy="${f1(1300 - ((t * 120 + i * 230) % 1100))}" r="${f1(10 + i % 3 * 5)}" fill="none" stroke="#F6E7D2" stroke-width="4"/>`).join('')}
  <g transform="translate(540 820) scale(${z.toFixed(3)}) translate(-540 -820)">${big}${sl > 0 ? lens(lx, ly, 300, `<g transform="translate(${f1(lx - 540)} ${f1(ly - 820)})">${inner}</g>`, 'l14') : ''}</g>
  ${card(540, 330, 'OBERFLÄCHE', 84, prog(t, 33.6, 33.9), { col: K.blue })}`;
}
