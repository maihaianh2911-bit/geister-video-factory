// L6 28.34–32.14: grey living room at home; du stands left, confident, one hand raised; speech bubble
// "Ich bin daran gewöhnt." (29.34) then "Sechs Stunden reichen mir." (30.66). The room behind him is almost colourless (meter 16 %).
import { frame, cam, prog, eio, person, shadow, speech, pop } from './lib.js';
import { room } from './sets.js';
import { fgTable } from './fg.js';
import { farbeBar, colourAt, grey } from './common.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 19, mm: 0 });
  s += grey(1 - colourAt(t));
  const g = eio(prog(t, 30.5, 30.9));
  s += shadow(330, 1650);
  s += person('du', 330, 1650, 1, { t, seed: 1, eyes: t > 31.2 ? 'happy' : 'n', look: [10, -6], brows: 'calm', mouth: t > 29.3 ? 'smile' : 'small',
    armR: [180, -470 - 150 * g], elbowR: [250, -380], armL: [-90, -330], elbowL: [-200, -380] });
  s += fgTable(t, { y: 1730, mugX: 820 });
  s = cam(s, 540, 1050, 1.0 + .06 * eio(prog(t, 28.34, 32.14)), 20 * eio(prog(t, 28.34, 32.14)));
  if (t < 30.6) s += speech(650, 560, ['Ich bin daran', 'gewöhnt.'], 450, 760, { p: pop(t, 29.34, .4), size: 52 });
  else s += speech(650, 560, ['Sechs Stunden', 'reichen mir.'], 450, 760, { p: pop(t, 30.66, .4), size: 52 });
  s += farbeBar(colourAt(t));
  return frame(s);
}
