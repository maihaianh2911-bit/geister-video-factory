// L9 40.6–44.5: two lists pinned side by side. Left UNTERBROCHEN: the open tasks glow and blink ("Unterbrochene" 41.28);
// right ERLEDIGT: ticked tasks fade away ("erledigte" 43.4).
import { K, frame, cam, study, T, light, wash, prog, eio, eout, lerp, cl, pop, f1, op } from './lib.js';
const OPEN = ['E-Mail Vermieter', 'Zahnarzt', 'Steuer', 'Oma anrufen', 'Wäsche'];
const DONE = ['Einkaufen', 'Müll raus', 'Blumen gießen', 'Rechnung'];
function card(x, y, w, h, head, col, items, glow, dim, t, open) {
  let g = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#fffdf4" stroke="${K.ink}" stroke-width="6"/><rect x="${x}" y="${y}" width="${w}" height="96" rx="14" fill="${col}" stroke="${K.ink}" stroke-width="6"/>` + T(x + w / 2, y + 64, head, 40, { fill: '#fff', stroke: K.ink, sw: 8 });
  items.forEach((it, i) => {
    const yy = y + 170 + i * 104;
    const blink = open ? (.6 + .4 * Math.sin(t * 7 + i * 1.3)) * glow : 0;
    const a = open ? 1 : 1 - .72 * dim;
    if (blink > 0) g += `<rect x="${x + 16}" y="${yy - 52}" width="${w - 32}" height="80" rx="16" fill="${K.yellow}" opacity="${op(blink)}"/>`;
    g += `<g opacity="${op(a)}">` + (open ? `<rect x="${x + 30}" y="${yy - 30}" width="40" height="40" rx="6" fill="#fff" stroke="${K.ink}" stroke-width="5"/>` : `<rect x="${x + 30}" y="${yy - 30}" width="40" height="40" rx="6" fill="${K.green}" stroke="${K.ink}" stroke-width="5"/><path d="M ${x + 38} ${yy - 10} l 10 12 l 16 -22" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`) + T(x + 88, yy + 2, it, 36, { fill: K.ink, anchor: 'start', w: 800 }) + (open ? '' : `<line x1="${x + 84}" y1="${yy - 10}" x2="${x + 84 + it.length * 20}" y2="${yy - 10}" stroke="${K.ink}" stroke-width="4"/>`) + `</g>`;
  });
  return g;
}
export default function renderShot(t) {
  let s = study({ mood: 'evening', dx: 20, clock: [21, 2] }) + wash('#1d1d1d', .35);
  const glow = eio(prog(t, 41.28, 41.7)), dim = eio(prog(t, 43.3, 44.0));
  s += light(290, 820, 320, 420, '#ffd23f', .35 * glow);
  const pl = pop(t, 40.7, .45), pr = pop(t, 40.95, .45);
  if (pl > 0) s += `<g transform="translate(290 860) scale(${f1(pl * 1000) / 1000}) rotate(-2) translate(-290 -860)">${card(50, 470, 480, 760, 'UNTERBROCHEN', K.red, OPEN, glow, 0, t, true)}</g>`;
  if (pr > 0) s += `<g transform="translate(780 860) scale(${f1(pr * 1000) / 1000}) rotate(2) translate(-780 -860)">${card(560, 470, 440, 660, 'ERLEDIGT', K.green, DONE, 0, dim, t, false)}</g>`;
  s += `<path d="M 100 250 h 0" />`;
  s = cam(s, 540, 860, 1 + .06 * eio(prog(t, 40.6, 44.5)), 30 * eio(prog(t, 42.2, 44.5)));
  return frame(s);
}
