// 49.56–50.82 · "Gefährlich ist er nicht." — calm, smiling face; a teal check is drawn on "nicht"
import { P, pastel, girl, check, prog, eout, lerp } from '../lib.js';

export default function renderShot(t) {
  return `${pastel(t, { color: '#E3F5EF' })}
    ${girl(420, 1500, 1.9, { t, id: 's26', eyes: t > 50.2 ? 'happy' : 'open', look: 14, lookY: -6, mouth: 'smile', handR: [300, 700], handL: [-300, 700], tilt: 4 * Math.sin(t * 2) })}
    ${check(840, 430, 1.25, prog(t, 50.15, 50.65))}`;
}
