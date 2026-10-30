// 37.14–40.36: a video conference drops out of your day ("Videokonferenz" 37.36, "weg" 39.54) — the call grid on your monitor freezes, tiles go grey, the call ends
import { K, DEFS, monitor, headOf, crossOut, cam, prog, eio, lerp, f1 } from './lib.js';
import { room, desk } from './sets.js';
export default function renderShot(t) {
  const fz = eio(prog(t, 38.0, 38.6)), end = eio(prog(t, 39.4, 39.8));
  const tiles = [0, 1, 2, 3].map(i => { const x = 20 + (i % 2) * 280, y = 20 + Math.floor(i / 2) * 170, gr = cl2(fz * 4 - i);
    return `<rect x="${x}" y="${y}" width="260" height="150" rx="8" fill="${gr > .5 ? '#3A4260' : K.ind3}"/>${gr > .5 ? '' : `<g transform="translate(${x + 130} ${y + 90}) scale(.5)">${headOf('baker', 0, 0, 1, { mouth: 'flat' }).replace(/F2F5FF/g, ['F2F5FF', '8A5A3C', 'E3A35A', '4FD1E8'][i])}</g>`}`; }).join('');
  return `${DEFS}${cam(`${room(1)}${monitor(540, 820, 580, 360, `<g opacity="${f1(1 - end)}">${tiles}</g>`)}${desk(1250)}`, lerp(1, 1.06, prog(t, 37.14, 40.36)), 540, 900)}${crossOut(540, 820, 200, end)}`;
}
function cl2(x) { return Math.max(0, Math.min(1, x)); }
