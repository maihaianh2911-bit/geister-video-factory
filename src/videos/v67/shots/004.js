// 5.22–7.42: the figure twists the cap off (puff of gas on "geöffnete"), sets the cap down, puts the bottle on the table on "Tisch"
import { K, OL, f1, stick, capSvg, cam, prog, eio, eout, lerp } from './lib.js';
import { wide, TY, BS, FY, FS } from './sets.js';
import { carry } from './003.js';
const X = 470;
export default function renderShot(t) {
  const twist = prog(t, 5.4, 5.95), off = t >= 5.95;
  // right hand: holds bottle at chest, then lowers it to the table (contact 6.62)
  const dn = eio(prog(t, 6.1, 6.62));
  const hx = lerp(575, 700, dn), hy = lerp(1060, TY - 128 * BS, dn);
  const capTop = [hx, hy + 128 * BS - 384 * BS];
  // left hand: grips the cap, twists, lifts it away and sets it on the table (6.3)
  const lift = eout(prog(t, 5.95, 6.3));
  const cx = off ? lerp(capTop[0] + 0, 640, lift) : capTop[0], cy = off ? lerp(capTop[1] - 30, TY, lift) : capTop[1] - 6;
  const after = t > 6.32, reach = eio(prog(t, 5.22, 5.42));
  const hl = after ? [lerp(640, 420, eio(prog(t, 6.32, 6.8))), lerp(TY - 10, 1200, eio(prog(t, 6.32, 6.8)))] : [lerp(400, cx, reach), lerp(1200, cy - 12, reach)];
  const capS = off || twist > 0 ? capSvg(cx, cy, BS, twist * 160 * (off ? 0 : 1)) : '';
  const puff = t > 5.9 && t < 6.6 ? `<g opacity="${f1(1 - prog(t, 5.9, 6.6))}">${[-1, 0, 1].map(k => `<path d="M ${f1(capTop[0] + k * 22)} ${f1(capTop[1] - 20)} q ${k * 8} -30 ${k * 16} -${f1(40 + 50 * prog(t, 5.9, 6.4))}" fill="none" stroke="${K.grey}" stroke-width="6" stroke-linecap="round"/>`).join('')}</g>` : '';
  const fig = stick(X, FY, FS, { hR: [hx, hy], hL: hl, look: .7, lookY: dn > .5 ? .5 : -.2, brow: 'up', mouth: t > 5.9 && t < 6.4 ? 'o' : 'smile',
    mid: carry(hx, hy, off || twist > 0 ? 'none' : 'on', 'c4'), over: capS + puff });
  const world = wide({ fig: null, caps: after ? [[640, 90]] : [], bottles: [], extra: fig });
  return cam(world, 1.45, 620, 1080, -80, -60);
}
