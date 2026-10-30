// 57.64–60.38: he goes down to the men's toilet in the basement — stairs down, the door
import { K, DEFS, BG, fig, wcDoor, grain, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 57.7, 59.6));
  let steps = '';
  for (let i = 0; i < 8; i++) steps += `<rect x="${-60 + i * 80}" y="${900 + i * 70}" width="${1200}" height="70" fill="${i % 2 ? '#7A6A58' : '#8A7A66'}" stroke="${K.ink}" stroke-width="4"/>`;
  const x = lerp(80, 640, p), y = lerp(900, 1460, p);
  const a = fig(x, y, .75, { col: K.suit, coat: true, walk: (t - 57.64) * 6 * (p < 1 ? 1 : 0) });
  return `${DEFS}${BG('#5E544A')}${cam(steps + wcDoor(880, 1180, .62, 0) + a.svg + `<rect x="-60" y="1460" width="1200" height="600" fill="#4A4038"/>`, 1, 540, 1000)}${grain(t)}`;
}
