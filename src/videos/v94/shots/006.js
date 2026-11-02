// L3 15.68–17.1: from behind — the stone VERMIETER drops into du's open backpack with a "Plopp" (lands 15.84); counter 1.
import { K, frame, cam, study, person, shadow, dropStone, impact, bigText, light, prog, eio, eout, lerp, cl, pop, packTopBack } from './lib.js';
export default function renderShot(t) {
  let s = study({ mood: 'evening', dx: -20 * eio(prog(t, 15.68, 17.1)), clock: [20, 15] }) + light(860, 1100, 320, 300, '#ffd98a', .45);
  const X = 540, Y = 1760, S = 1.9, land = 15.84;
  const landed = t >= land;
  const dip = landed ? Math.sin(cl((t - land) / .4) * Math.PI) * .25 + .08 : 0;
  s += shadow(X, Y + 4, 240);
  const top = packTopBack(.15);
  s += person('du', X, Y, S, { t, seed: 1, back: true, load: .15, stones: landed ? [{ label: 'VERMIETER', dx: 0, rot: -6, s: .7 }] : [], hunch: dip });
  if (!landed) s += dropStone(t, land, X, -100, Y + (top + 34) * S + dip * 26 * S, .7 * S, 'VERMIETER', { dur: .4, rot: -6 });
  s += impact(t, land, X, Y + (top + 30) * S, 220);
  // desk edge foreground (sharp)
  s += `<rect x="-60" y="1790" width="1200" height="200" fill="#8a5d3c" stroke="${K.ink}" stroke-width="5"/><rect x="-60" y="1790" width="1200" height="22" fill="#a8774f"/>`;
  s = cam(s, 540, 1000, 1.02 + .05 * eio(prog(t, 15.68, 17.1)) + .03 * Math.max(0, 1 - Math.abs(t - land - .05) / .2));
  s += bigText(860, 330, '1', 190, { fill: K.yellow, p: pop(t, 16.3, .45), sw: 22 });
  return frame(s);
}
