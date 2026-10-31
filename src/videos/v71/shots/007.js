// 17.0–19.04: close on the screen — the marker reads line by line but skips the instruction line; it flashes red ("Anweisung" 17.9)
import { K, BG, monitor, emailLines, label, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const p = prog(t, 17.05, 18.2), seq = [0, 1, 2, 3, 5, 6, 7], i = seq[Math.min(seq.length - 1, Math.floor(p * seq.length))];
  const red = t > 17.9;
  const scr = `${emailLines(900, 8, { red: red ? 4 : -1 })}<rect x="30" y="${f1(110 + i * 62 - 10)}" width="840" height="44" rx="12" fill="${K.amber}" opacity=".45"/>
    ${red ? `<rect x="24" y="${f1(110 + 4 * 62 - 14)}" width="852" height="52" rx="14" fill="none" stroke="${K.red}" stroke-width="${f1(5 + 3 * Math.sin(t * 12))}"/>` : ''}`;
  return `${BG('#EEF3F6')}${monitor(540, 830, 900, 640, scr)}${label(540, 330, 'ANWEISUNG', prog(t, 17.9, 18.15), K.red, 62)}`;
}
