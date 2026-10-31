// 37.3–39.9: a tiny spark between you and the colleague ("Kleinigkeit" 37.38) grows into an argument ("Streit" 38.7)
import { K, BG, bust, table, prog, eio, back, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const sp = back(prog(t, 37.38, 37.6)), g = eio(prog(t, 38.1, 38.7)), ang = eio(prog(t, 38.3, 38.7));
  const r = lerp(14, 170, g);
  let burst = '';
  if (sp > 0) { const n = 12; let d = ''; for (let i = 0; i <= n * 2; i++) { const a = i / (n * 2) * Math.PI * 2, rr = i % 2 ? r * .55 : r; d += `${i ? 'L' : 'M'} ${f1(545 + Math.cos(a) * rr * sp)} ${f1(800 + Math.sin(a) * rr * sp)} `; } burst = `<path d="${d}Z" fill="${g > .5 ? K.red : K.amber}" stroke="${K.ink}" stroke-width="5"/>`; }
  const talk = k => t > 38.7 && Math.sin(t * 13 + k) > 0 ? 'o' : (ang > .5 ? 'down' : 'flat');
  const du = bust('du', 280, 1090, 1.15, { look: 1, tired: .9, lid: .35, brow: -ang, mouth: talk(0), aR: [[420, 1280], [470, 1360]] });
  const col = bust('other', 810, 1090, 1.15, { look: -1, brow: -ang, mouth: talk(1.5), aL: [[680, 1280], [630, 1360]] });
  return `${BG('#EEF3F6')}<rect x="-60" y="720" width="1200" height="14" fill="${K.room2}"/>${du}${col}${table(1330, '#DDE3E8', K.steelD)}${burst}`;
}
