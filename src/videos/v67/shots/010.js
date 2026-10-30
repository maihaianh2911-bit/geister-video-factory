// 20.46–22.88: cutaway of a CLOSED bottle — CO2 molecules are already dissolved in the cola ("gelöst"), card CO2
import { K, card, prog, eout, cl } from './lib.js';
import { cutBG, bigBottle, molecules, molSvg } from './sets.js';
export const MOL = molecules(46, 300, 3);
export function molsFade(t, t0, t1) { return MOL.map((p, i) => [p, cl((t - t0 - (i / MOL.length) * (t1 - t0)) / .25)]); }
export default function renderShot(t) {
  const inner = molsFade(t, 20.55, 21.5).map(([p, a]) => molSvg([p], a, 6.5, t)).join('');
  return `${cutBG()}${bigBottle({ id: 'c10', cap: 'on', inner })}${card(810, 360, 'CO₂', 92, prog(t, 21.6, 21.9), { col: K.red, rot: -4 })}`;
}
