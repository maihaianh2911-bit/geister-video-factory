// L13 42.66–45.02 close on the hug: du can't see Lena's face — she smirks; thought "Endlich läuft es bei ihr mal schlecht."
import { K, frame, bg, shadow, person, sofa, chocolate, thought, cam, hearLvl, prog, eio, eout, pop, fade, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('living');
  s += shadow(540, 1340, 340);
  s += sofa(540, 1340, 660);
  const turn = t > 42.9;
  const shock = t > 43.9;
  s += person('du', 450, 1340, 1, { t, seed: 1, sit: true, hear: hearLvl(t, [43.28]), armR: [60, -230], eyes: shock ? 'wide' : 'closed', mouth: shock ? 'o' : 'smile', look: [12, -4], headDy: 6 });
  s += chocolate(510, 1170, .75, 0);
  s += person('lena', 670, 1340, 1, { t, seed: 2, eyes: turn ? 'sly' : 'happy', mouth: turn ? 'smirk' : 'smile', look: [10, -2], tilt: -8, armL: [-300, -245] });
  s = cam(s, 560, 950, 1.08 + .2 * eio(prog(t, 42.66, 43.3)));
  s += thought(560, 440, ['Endlich läuft es', 'bei ihr mal schlecht.'], 700, 690, { p: pop(t, 43.28, .45) });
  return frame(s);
}
