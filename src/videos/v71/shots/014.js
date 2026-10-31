// 34.38–37.3: emotional control suffers — a dial swings from calm teal into red ("leidet" 35.82); your face tightens
import { K, BG, dial, headOf, label, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const up = eio(prog(t, 35.5, 35.95)), shake = t > 35.95 ? .04 * Math.sin(t * 30) * (1 - prog(t, 35.95, 37)) : 0;
  const p = .25 + .03 * Math.sin(t * 4) + up * .55 + shake;
  return `${BG()}${label(540, 300, 'EMOTIONSKONTROLLE', prog(t, 34.74, 35.0), K.ink, 52)}${dial(540, 820, 300, p, '')}${headOf('du', 540, 1230, 1.5, { look: 0, lookY: -.6, tired: .9, lid: .35, brow: -up, mouth: up > .5 ? 'down' : 'flat' })}`;
}
