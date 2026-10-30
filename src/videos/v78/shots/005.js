// 8.34–11.02: only showering is struck from your routine ("Duschen" 8.68, "streichst" 9.0) — a daily checklist: three ticks, the shower line is crossed out
import { K, OL, f1, TX, BG, cross, cam, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const rows = [['HÄNDE', 1], ['ZÄHNE', 1], ['KLEIDUNG', 1], ['DUSCHE', 0]];
  const st = eio(prog(t, 9.0, 9.6));
  const list = rows.map(([w, ok], i) => { const y = 620 + i * 170;
    return `${TX(w, 360, y + 30, 70, K.ink, 'start')}<rect x="200" y="${y - 30}" width="90" height="90" rx="14" fill="${K.white}" ${OL(6)}/>${ok ? `<path d="M 218 ${y + 14} l 22 24 l 36 -48" fill="none" stroke="${K.teal}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M 340 ${y + 6} H ${f1(lerp(340, 860, st))}" stroke="${K.red}" stroke-width="16" stroke-linecap="round"/>`}`; }).join('');
  return `${BG()}${cam(`<rect x="140" y="420" width="800" height="900" rx="30" fill="${K.paper}" ${OL()}/>${TX('JEDEN TAG', 540, 520, 64, K.blue)}${list}`, lerp(1, 1.04, prog(t, 8.34, 11.02)), 540, 900)}`;
}
