// 29.72–31.66: photographers ride along — three press photographers at the end of the cabin aim box cameras at Tuffi, flashes pop
import { K, DEFS, interior, tuffi, person, grain, cam, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const fl = t0 => { const p = prog(t, t0, t0 + .35); return p > 0 && p < 1 ? 1 - p : 0; };
  const ph = [[610, 1290, 29.85, 'fedora'], [755, 1300, 30.45, 'boater'], [895, 1280, 31.05, 'fedora']]
    .map(([x, y, t0, hat], i) => person(x, y, .95, { cam: true, flash: fl(t0), hat, dir: -1, look: -1, col: ['#5A5048', '#6B6A5E', '#4E4A52'][i] }).svg).join('');
  const blink = [29.85, 30.45, 31.05].some(t0 => t > t0 && t < t0 + .12);
  const sc = `${interior(t)}${tuffi(260, 1262, 1.05, { dir: 1, ear: .4, tr: .2, eye: blink ? 'shut' : 'n' })}${ph}`;
  return `${DEFS}${cam(sc, 1.12, 540, 1000)}${grain(t)}`;
}
