// 30.86–32.46: extremely hard — a red lock slams onto the torso ("schwer" 30.86) while arms and legs stay marked green.
import { K, DEFS, BG, TX, prog, eout, f1 } from './lib.js';
import { bodyDiagram } from './lib2.js';
export default function renderShot(t) {
  const k = eout(prog(t, 30.86, 31.1)), l = eout(prog(t, 31.2, 31.6));
  return `${DEFS}${BG()}${bodyDiagram(t, { glowOrg: 1, ring: 1, lock: k, limbs: l })}${TX('TIEF IM KÖRPER', 540, 150, 80, K.orange)}`;
}
