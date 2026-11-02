// L5 20.94–23.84: du sits at the desk, the desk lamp switches on (21.0), he opens the notebook and puts the pen to the paper ("aufzuschreiben" 22.5).
import { K, frame, cam, prog, eio, person, f1 } from './lib.js';
import { bedroom } from './base.js';
import { lamp } from './desk.js';
const INK = K.ink;
export default function renderShot(t) {
  const on = t >= 21.1 ? 1 : 0, open = eio(prog(t, 21.6, 22.2)), wr = t > 22.4 ? Math.sin(t * 9) * 14 : 0;
  let s = bedroom(t, { light: .35 * on });
  s += person('du', 560, 1640, 1, { t, seed: 1, look: [-4, 16], brows: 'worried', mouth: 'flat', hunch: .25, armR: [-10 + wr, -300], elbowR: [180, -330], armL: [-200, -320], elbowL: [-240, -400], rimL: on ? '#ffc46b' : undefined });
  s += `<path d="M -60 1300 H 1140 V 2000 H -60 Z" fill="#8a5a3c" stroke="${INK}" stroke-width="6"/><rect x="-60" y="1300" width="1200" height="26" fill="#a26c4a"/>`;
  s += lamp(110, 1300, on);
  // notebook: closed cover lifting open
  const k = Math.cos(open * Math.PI);
  s += `<g transform="translate(560 1360)"><path d="M -230 -40 L 0 -26 L 230 -40 L 250 50 L 0 62 L -250 50 Z" fill="#fbf7ea" stroke="${INK}" stroke-width="5"/><path d="M 0 -26 V 62" stroke="#c9b99a" stroke-width="6"/><g transform="scale(${f1(k * 1000) / 1000} 1)"><path d="M 0 -26 L 230 -40 L 250 50 L 0 62 Z" fill="${k > 0 ? '#2f6f8f' : '#fbf7ea'}" stroke="${INK}" stroke-width="5"/></g></g>`;
  if (open > .8) s += `<g transform="translate(${f1(560 - 20 + wr)} 1340) rotate(25)"><rect x="-10" y="-150" width="20" height="130" rx="6" fill="#2f5fb5" stroke="${INK}" stroke-width="4"/><path d="M -10 -20 L 0 6 L 10 -20 Z" fill="#e8d8b0" stroke="${INK}" stroke-width="4"/></g>`;
  return frame(cam(s, 540, 1050, 1.0 + .05 * eio(prog(t, 20.94, 23.84))));
}
