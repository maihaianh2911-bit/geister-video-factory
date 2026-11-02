// L9a 38.82–42.52: same split: right student (phone outside) gets three green checks fast ("deutlich besser" 41.12–41.5) and smiles; left gets one and sweats.
import { frame, cam, prog, eio, chip } from './lib.js';
import { split } from './split.js';
export default function renderShot(t) {
  const good = t >= 41.5;
  const s = split({ t, aL: 0, aR: 0, checksR: [39.9, 40.9, 41.5], checksL: [41.6], mouthR: good ? 'smile' : 'flat', browsR: good ? 'up' : 'calm', lookR: [-6, good ? 0 : 16], sweatL: t > 40.5 ? 1 : 0, lookL: [14, 16], glowL: .2 + .2 * Math.max(0, Math.sin(t * 3)) });
  return frame(cam(s, 540, 960, 1.04 + .04 * eio(prog(t, 38.82, 42.52)), 0, 0));
}
