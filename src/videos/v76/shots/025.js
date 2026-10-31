// 45.42–46.80: Warren operates at the neck — his back and arms hide the work; the patient's face stays calm; the audience leans forward.
import { K, DEFS, cam, knife, prog, eio, lerp } from './lib.js';
import { theatre } from './t46.js';
import { inhaler as inh46 } from './lib.js';
const mortonIdle = t => ({ x: 200, look: .8, lookY: .1, aL: [[130, 950], [230, 1010]], aR: [[300, 920], [350, 990]], inh: inh46(330, 1010, .5, 0, .3, t) });
export default function renderShot(t) {
  const bend = eio(prog(t, 45.42, 45.8)), work = Math.sin(t * 5) * 6 * bend;
  const sc = theatre(t, { morton: mortonIdle(t), lean: lerp(.5, 1, bend), pt: { face: { eyes: 'closed', tilt: -8, mouth: 'flat' } },
    warren: { x: lerp(820, 740, bend), lean: lerp(0, -40, bend), look: -1, lookY: .8, brow: .4, aL: [[650, 860], [lerp(640, 600, bend), lerp(980, 905 + work, bend)]], aR: [[790, 900], [lerp(800, 640, bend), lerp(1000, 930 - work, bend)]], heldL: '' } });
  return `${DEFS}${cam(sc, 1.25, 600, 950)}`;
}
