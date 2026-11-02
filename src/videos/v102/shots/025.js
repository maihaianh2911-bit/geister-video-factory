// L15a 63.16–65.78: close-up of du relaxed in the warm sunshine on the sunny street, eyes closed, calm smile;
// sun rays turn behind him; on "mach den Test" (64.88) the label MACH DEN TEST pops.
import { frame, cam, prog, eio, person, label, pop } from './lib.js';
import { street } from './sets2.js';
import { sun } from './props.js';
import { farbeBar, colourAt } from './common.js';
export default function renderShot(t) {
  let s = street(t, { strong: true });
  s += sun(820, 520, 70, t);
  s += person('du', 430, 2110, 1.75, { t, seed: 1, eyes: t > 64.8 ? 'n' : 'closed', look: [0, -8], brows: 'calm', mouth: 'smile', rim: '#ffd23f' });
  s = cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 63.16, 65.78)));
  s += label('MACH DEN TEST', 540, 330, 92, { p: pop(t, 64.88, .45) });
  s += farbeBar(colourAt(t));
  return frame(s);
}
