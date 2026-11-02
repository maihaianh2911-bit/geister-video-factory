// L11 36.2–39.8 SONNTAG, living room: the phone buzzes (date cancelled), du sits sad on the sofa.
import { K, frame, bg, shadow, person, dayCard, sofa, phone, heart, cam, prog, eio, eout, pop, fade, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('living');
  s += shadow(540, 1340, 340);
  s += sofa(540, 1340, 660);
  const sad = eio(prog(t, 38.1, 38.6));
  const buzz = t > 36.96 && t < 37.9 ? Math.sin(t * 70) * 4 : 0;
  // du holds the phone in front of the chest, lowers it when sad
  const ph = [20 + buzz, -300 + 90 * sad];
  const scr = t > 37.3 ? `${heart(0, -10, 1.3, K.red)}<path d="M -4 -52 L 8 -30 L -6 -12 L 6 8" stroke="#eef3f7" stroke-width="7" fill="none"/>` : '';
  const phoneSvg = phone(ph[0], ph[1], .7, { screen: scr, rot: buzz * 2 });
  s += person('du', 450, 1340, 1, { t, seed: 1, sit: true, hear: .6, armL: [ph[0] - 46, ph[1] + 40], armR: [ph[0] + 46, ph[1] + 40], front: phoneSvg, eyes: sad > .5 ? 'sad' : (t > 37.3 ? 'wide' : 'n'), mouth: sad > .5 ? 'sad' : (t > 37.3 ? 'o' : 'flat'), look: [0, 10], headDy: 14 * sad });
  if (t > 36.96 && t < 37.9) s += `<g stroke="${K.ink}" stroke-width="6" stroke-linecap="round" opacity=".7"><path d="M 400 1000 l -30 -10 M 400 1030 l -34 6 M 540 1000 l 30 -10 M 540 1030 l 34 6"/></g>`;
  s += dayCard(t, 36.2, 'SONNTAG');
  return frame(cam(s, 450, 1100, 1 + .08 * eio(prog(t, 36.2, 39.8))));
}
