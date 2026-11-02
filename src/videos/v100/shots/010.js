// L5a 21.76–24.78: evening corridor of the building, medium shot. The acquaintance (yellow cap, orange top) holds out a birthday invitation ("Geburtstagsparty" 23.5); du (battery 80 %) is tired.
import { frame, cam, shadow, person, pop, prog, eio, eout, corridor, invite, batOver, duBat, label } from './all.js';
export default function renderShot(t) {
  let s = corridor(t);
  const w = eout(prog(t, 21.8, 22.6)), bx = 1150 - 380 * w, up = eio(prog(t, 23.2, 23.6));
  s += shadow(320, 1660) + shadow(bx, 1660);
  s += person('du', 320, 1660, .95, { t, seed: 1, look: t > 23.4 ? [14, 6] : [14, 0], eyes: 'tired', brows: 'calm', mouth: 'flat' });
  s += person('bek', bx, 1660, .95, { t, seed: 7, flip: true, walk: w < 1 ? t * 1.6 : undefined, look: [12, 0], brows: 'up', mouth: t > 22.2 && t < 24.6 && Math.sin(t * 14) > 0 ? 'talk' : 'smile',
    armR: up > 0 ? [180, -420 + 60 * (1 - up)] : null, front: up > 0 ? invite(200, -470 + 60 * (1 - up), .85 * Math.max(.01, up), -6) : '' });
  s += batOver(320, 1660, .95, duBat(t).lvl, { t, bs: .85 });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 21.76, 24.78)), -20 * prog(t, 21.76, 24.78));
  s += label('ABENDS', 540, 250, 90, { p: pop(t, 21.8, .45), fill: '#ffffff' });
  return frame(s);
}
