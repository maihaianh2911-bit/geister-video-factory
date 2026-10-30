// 14.02–17.5: the figure leans in, a finger heads for the glass — then pulls back and leaves it standing ("statt … abzukratzen")
import { K, stick, cam, prog, eio, lerp } from './lib.js';
import { kitchen, glass, egg, vinegar, shellBubbles, rising, TY, FY, FS } from './sets.js';
export default function renderShot(t) {
  const reach = eio(prog(t, 15.2, 16.2)) * (1 - eio(prog(t, 16.5, 17.1)));
  const hx = lerp(560, 700, reach), hy = lerp(1080, 880, reach);
  const inner = egg(0, -66, .69, { id: 'e8' }) + shellBubbles(0, -66, 33, 41, 1, t, 18, 1, 3) + rising(0, -66, 33, 41, -170, t, 14, { n: 8, speed: 60, r: 3 });
  const fig = stick(460, FY, FS, { hR: [hx, hy], hL: [360, 1180], lean: 4 * reach, look: .9, lookY: .5, brow: t > 16.5 ? 'knit' : 'up', mouth: t > 16.5 ? 'flat' : 'o' });
  return cam(`${kitchen()}${vinegar(930, TY, .7)}${glass(720, TY, .9, { id: 'g8', level: .78, inner })}${fig}`, 1.5, 640, 1000, -40, 60);
}
