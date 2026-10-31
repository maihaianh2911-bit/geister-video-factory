// 59.48–63.48: know which panes your car has — close-up of the small marking in a pane corner; two examples side by side: ESG shatters into granules (tick, "einschlagen"), Verbundglas only cracks (cross). No fixed position diagram: the viewer checks their own car.
import { K, DEFS, BG, label, tick, crossOut, TX, f1, prog, eio, eout, lerp, hash } from './lib.js';
function pane(x, y, txt, col, a, mode, p) {
  // a pane corner: frame on left & bottom, glass fills the panel; marking sticker in the lower-left corner
  const w = 400, h = 560, x0 = x - w / 2, y0 = y - h / 2;
  let glass = `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#2B4250"/><path d="M ${x0 + 60} ${y0 + 40} L ${x0 + 150} ${y0 + 40} L ${x0 + 40} ${y0 + 200} L ${x0 + 40} ${y0 + 120} Z" fill="${K.glassL}" opacity=".18"/>`;
  if (mode === 'esg' && p > 0) {
    // granules: the pane falls apart into small cubes that drop
    let g = '';
    for (let i = 0; i < 10; i++) for (let j = 0; j < 14; j++) {
      const r = hash(i * 31 + j * 7);
      const dy = p * p * (120 + 380 * r), dx = p * (r - .5) * 60;
      g += `<rect x="${f1(x0 + 6 + i * 39 + dx)}" y="${f1(y0 + 6 + j * 39 + dy)}" width="30" height="30" rx="5" fill="#3E5A6A" stroke="${K.glassL}" stroke-width="2" opacity="${f1(1 - .7 * p)}"/>`;
    }
    glass = `<g clip-path="url(#c23${txt})">${g}</g>`;
  }
  let crack = '';
  if (mode === 'vsg' && p > 0) {
    const ox = x + 40, oy = y - 60;
    for (let k = 0; k < 9; k++) {
      const an = k / 9 * Math.PI * 2 + .3, L = 260 * p;
      crack += `<path d="M ${ox} ${oy} L ${f1(ox + Math.cos(an) * L * .5 + 14 * Math.sin(k))} ${f1(oy + Math.sin(an) * L * .5)} L ${f1(ox + Math.cos(an) * L)} ${f1(oy + Math.sin(an) * L)}" fill="none" stroke="${K.white}" stroke-width="4" opacity=".85"/>`;
    }
    for (const rr of [50, 110]) crack += `<circle cx="${ox}" cy="${oy}" r="${f1(rr * p)}" fill="none" stroke="${K.white}" stroke-width="3" opacity=".7" stroke-dasharray="26 14"/>`;
    crack = `<g clip-path="url(#c23${txt})">${crack}</g>`;
  }
  return `<g opacity="${f1(a)}"><defs><clipPath id="c23${txt}"><rect x="${x0}" y="${y0}" width="${w}" height="${h}"/></clipPath></defs>
    <rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#0E1418"/>${glass}${crack}
    <path d="M ${x0 - 24} ${y0 - 10} L ${x0 - 24} ${y0 + h + 24} L ${x0 + w + 10} ${y0 + h + 24} L ${x0 + w + 10} ${y0 + h} L ${x0} ${y0 + h} L ${x0} ${y0 - 10} Z" fill="${K.car}" stroke="${K.ink}" stroke-width="6" stroke-linejoin="round"/>
    <rect x="${x0 + 22}" y="${y0 + h - 110}" width="${f1(txt.length * 35 + 44)}" height="86" rx="8" fill="#0B1013" stroke="${col}" stroke-width="5"/>
    ${TX(txt, x0 + 42, y0 + h - 50, 50, col, 'start')}</g>`;
}
export default function renderShot(t) {
  const hd = eout(prog(t, 59.3, 59.6));
  const aL = eout(prog(t, 59.48, 59.8)), aR = eout(prog(t, 60.14, 60.5));
  const hit = prog(t, 62.02, 62.9), crack = eout(prog(t, 62.1, 62.5));
  const ringL = eout(prog(t, 59.8, 60.1)) * (1 - prog(t, 61.4, 61.8)), ringR = eout(prog(t, 60.3, 60.6)) * (1 - prog(t, 61.4, 61.8));
  const lx = 290, rx = 790, py = 790;
  // highlight around the marking sticker (sticker: x0+22, width len*35+44, y py+170..256)
  const ring = (x, n, a) => a <= .01 ? '' : `<rect x="${x - 200 + 8}" y="${py + 156}" width="${n * 35 + 72}" height="114" rx="16" fill="none" stroke="${K.amber}" stroke-width="7" opacity="${f1(a)}"/>`;
  return `${DEFS}${BG('#141A1F')}${label(540, 330, 'WELCHE SCHEIBE?', hd, K.amber, 64)}
    ${pane(lx, py, 'ESG', K.amber, aL, 'esg', hit)}${pane(rx, py, 'VERBUND', K.mono, aR, 'vsg', crack)}
    ${ring(lx, 3, ringL)}${ring(rx, 7, ringR)}
    ${tick(lx, 1190, 1.4, eout(prog(t, 62.1, 62.45)))}${crossOut(rx, 1190, 70, eout(prog(t, 62.35, 62.7)))}`;
}
