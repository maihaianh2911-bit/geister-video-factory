// L7 31.23–33.88: medium shot at the desk: three lights rise from the notebook one after another ("Lichter" 31.94) and float into the jar on the nightstand ("Glas" 33.16); the jar glows warm.
import { K, frame, cam, prog, eio, person } from './lib.js';
import { bedroom, nightstand } from './base.js';
import { jar, flyer } from './jar.js';
import { lamp } from './desk.js';
const INK = K.ink;
export default function renderShot(t) {
  const T0 = [31.4, 32.0, 32.6], D = .8, n = T0.filter(x => t >= x + D).length;
  let s = bedroom(t, { light: .35 + .15 * n });
  s += person('du', 360, 1640, 1, { t, seed: 1, look: [14, -6], brows: 'up', mouth: n > 0 ? 'smile' : 'small', hunch: .1, armL: [-200, -320], elbowL: [-240, -400], armR: [150, -310], elbowR: [210, -340], rim: '#ffc46b' });
  s += `<path d="M -60 1300 H 640 V 2000 H -60 Z" fill="#8a5a3c" stroke="${INK}" stroke-width="6"/><rect x="-60" y="1300" width="700" height="26" fill="#a26c4a"/>`;
  s += lamp(60, 1300, 1);
  s += `<g transform="translate(360 1360)"><path d="M -230 -40 L 0 -26 L 230 -40 L 250 50 L 0 62 L -250 50 Z" fill="#fbf7ea" stroke="${INK}" stroke-width="5"/><path d="M 0 -26 V 62" stroke="#c9b99a" stroke-width="6"/><g stroke="#22324d" stroke-width="5">${[0, 1, 2].map(i => `<path d="M 30 ${-10 + i * 22} H ${150 - i * 30}"/>`).join('')}</g></g>`;
  s += nightstand(t, 860, 1300, { book: false }) + jar(860, 1300, 1.0, { t, n, pops: T0.map(x => x + D) });
  T0.forEach((x, i) => { s += flyer(t, x, D, 420 + i * 40, 1330, 860, 1160, 20, 380); });
  return frame(cam(s, 600, 1050, 1.0 + .05 * eio(prog(t, 31.23, 33.88))));
}
