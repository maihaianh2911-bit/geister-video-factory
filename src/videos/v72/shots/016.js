// 40.52–43.82: others get nausea ("Übelkeit" 41.22), stomach ache ("Bauchschmerzen" 42.06) or diarrhoea ("Durchfall" 43.0) — a second person, icons appear in turn
import { K, DEFS, kitchen, bust, stomach, bodyWindow, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const n = eio(prog(t, 41.1, 41.5)), b = eio(prog(t, 41.95, 42.35)), d = eio(prog(t, 42.9, 43.3));
  const win = bodyWindow(540, 1270, 1.6, stomach(540, 1280, .7, { mood: b > .5 ? 'ill' : 'calm', rot: b > .5 ? Math.sin(t * 20) * 3 : 0 }));
  const p = bust('other', 540, 1000, 1.3, { look: 0, lookY: .4, brow: .9, mouth: n > .5 ? 'wavy' : 'down', sick: n, front: win,
    aL: [[lerp(400, 380, b), lerp(1240, 1200, b)], [lerp(380, 450, b), lerp(1360, 1300, b)]], aR: [[lerp(680, 700, b), lerp(1240, 1200, b)], [lerp(700, 630, b), lerp(1360, 1320, b)]] });
  const icon = (x, y, a, svg) => a <= 0 ? '' : `<g transform="translate(${x} ${y}) scale(${f1(a)})"><circle r="90" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/>${svg}</g>`;
  const swirl = `<path d="M -40 0 Q -40 -40 0 -40 Q 40 -40 40 0 Q 40 30 10 30 Q -14 30 -14 6 Q -14 -10 4 -10" fill="none" stroke="${K.moldD}" stroke-width="10" stroke-linecap="round"/>`;
  const ache = `<path d="M -30 -40 L 6 -4 L -14 6 L 26 44" fill="none" stroke="${K.red}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`;
  const wc = `<rect x="-36" y="-50" width="44" height="60" rx="8" fill="${K.steel}" stroke="${K.ink}" stroke-width="4"/><path d="M -48 10 H 44 Q 40 50 0 50 Q -40 50 -48 10 Z" fill="${K.white}" stroke="${K.ink}" stroke-width="4"/>`;
  return `${DEFS}${cam(`${kitchen(1500)}${p}`, 1.0, 540, 1000)}${icon(190, 360, n, swirl)}${icon(540, 300, b, ache)}${icon(890, 360, d, wc)}`;
}
