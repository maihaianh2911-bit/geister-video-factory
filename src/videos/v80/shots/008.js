// 51.62–57.64: she doesn't even look up – "put it down, I'll look when I have time"; the poster goes on the desk
import { K, bg, fade, prog, eio, lerp, fig, poseAt, bubble, lisaDesk, poster, chip, pop } from './lib.js';
export default function renderShot(t) {
  const m = eio(prog(t, 54.5, 55.13));
  const ich = fig(230, 1340, 1.2, 'ich', poseAt(t, [[51.62, 'show'], [55.03, 'stand']]), { prop: m < .05 ? poster(-20, -150, 100, 0) : '' });
  const px = lerp(230 + (130 - 20) * 1.2, 545, m), py = lerp(1340 - 270 * 1.2 - 150 * 1.2, 1090 - 100 * 1.36 + 4, m);
  const moving = m >= .05 ? poster(px, py, lerp(120, 100, m), 0) : '';
  const look = chip(700, 780, 'SIEHT NICHT AUF', { size: 42, bg: K.red, a: fade(t, 52.04), sc: pop(t, 52.04) });
  const b = bubble(140, 300, 800, [{ s: '„Leg es hin.“', a: fade(t, 54.34) }, { s: '„Ich schau’s mir an, wenn ich Zeit habe.“', a: fade(t, 55.38) }], { size: 54, a: fade(t, 52.92), tail: [700, 760], fill: K.lav });
  return bg(K.cream) + lisaDesk('type') + ich + moving + b.svg + look;
}
