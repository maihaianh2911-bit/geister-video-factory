// 67.0–68.9 · "und langsamer essen" — close and calm: eyes closed, slow chewing, a slow stopwatch hand
import { P, pastel, girl, stopwatch, prog, eio, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const chew = Math.abs(Math.sin(t * 3.2));
  return `${pastel(t, { color: '#FFF6E6' })}
    ${girl(470, 1600, 2.1, { t, id: 's35', hold: 'cone', handR: [250, -20], bite: .45, biteSide: -1, eyes: 'closed', mouth: 'chew', chew: .4 * chew, blush: .6, tilt: 3 * Math.sin(t * 1.6) })}
    ${stopwatch(830, 380, .8 * back(prog(t, 67.05, 67.3)), lerp(.2, .9, prog(t, 67.0, 68.9)))}`;
}
