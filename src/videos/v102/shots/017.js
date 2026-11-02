// L10 44.46–46.8: "Doch sie selbst fühlten sich nur ein bisschen müde": the right gauge GEFÜHL rises high and green (44.8–45.8),
// a slightly sleepy but content face pops above it; the low red LEISTUNG bar stays on the left for contrast.
import { frame, cam, prog, eio, pop, lerp, head, label } from './lib.js';
import { labBg, gauge, lines } from './graph.js';
export default function renderShot(t) {
  let s = labBg(t);
  s += gauge(300, 600, 520, .16, '#d9493f');
  s += gauge(780, 600, 520, lerp(0, .85, eio(prog(t, 44.8, 45.8))), '#3c9a5f');
  s += lines(300, 1210, ['LEISTUNG:'], 60, '#ffffff');
  s += lines(300, 1290, ['WIE NACH EINER', 'DURCHWACHTEN', 'NACHT'], 46, '#ff8a80');
  s += lines(780, 1210, ['GEFÜHL:'], 60, '#ffffff', eio(prog(t, 44.6, 45)));
  s += lines(780, 1290, ['NUR EIN', 'BISSCHEN MÜDE'], 46, '#8fe0a0', eio(prog(t, 45.64, 46.0)));
  const hp = pop(t, 45.9, .4);
  if (hp > 0) s += head('doc2', 780, 450, .6 * hp, { t, seed: 3, eyes: 'half', brows: 'calm', mouth: 'smile' });
  s = cam(s, 540, 880, 1.05, -40 * eio(prog(t, 44.46, 46.8)));
  s += label('NACH 14 NÄCHTEN', 540, 330, 80, { fill: '#ffffff' });
  return frame(s);
}
