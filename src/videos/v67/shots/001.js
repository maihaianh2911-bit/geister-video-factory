// 0–1.72: cover — backyard table, open cola bottle; the figure lifts one Mentos over the opening on "Mentos"
import { K, yard, table, bottle, stick, mentos, roll, capSvg, headline, prog, eio, lerp } from './lib.js';
export const FX = 500, FY = 1390, FS = 1.5, BX = 730, TY = 1140, BS = .62;
export default function renderShot(t) {
  const up = eio(prog(t, .3, 1.15));
  const hx = lerp(650, 728, up), hy = lerp(1060, 846, up);
  const fig = stick(FX, FY, FS, { hR: [hx, hy], hL: [395, 1150], look: lerp(.3, .9, up), lookY: lerp(.2, -.3, up), brow: 'up', mouth: up > .6 ? 'o' : 'smile',
    over: mentos(hx + 2, hy + 18, 17, 6) + roll(392, 1160, .9, -78) });
  return `${yard({ cloud: false, sunX: 930, sunY: 600 })}${table(560, 1080, TY, 400)}${capSvg(930, TY, 1, 90)}${bottle(BX, TY, BS, { id: 'c1', level: 300 })}${fig}
    ${headline([['MENTOS', 160, K.blue], ['IN COLA?', 140, K.red]], 330)}`;
}
