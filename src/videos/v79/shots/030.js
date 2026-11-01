// 138.28–143.46 calm ending: she checks the contradictions with a magnifier over her notes, then draws her conclusion (check mark)
import { K, TEXT, twoShot, notebook, magnifier, check, prog, eio, eout, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const scan = eio(prog(t, 139.1, 139.6)), mv = Math.sin((t - 139.6) * 2.2) * 40 * (t > 139.6 && t < 141.7 ? 1 : 0), done = pop(t, 141.88);
  const mx = 470 + mv, my = 1350;
  const hand = [(mx - 55 - 285) / 1.25, (my + 95 - 1320) / 1.25];
  const W = { look: lerp(1, .3, scan), lookY: lerp(0, 1, scan) * (1 - eio(prog(t, 142.1, 142.5))), mouth: done > 0 ? 'smile' : 'tight', brow: 0, hR: scan > 0 ? [lerp(80, hand[0], scan), lerp(-24, hand[1], scan)] : [80, -24], dy: done > 0 ? Math.sin((t - 141.9) * 6) * 6 * (t < 142.6 ? 1 : 0) : 0, blink: blink(t, 1) };
  const M = { look: -1, mouth: 'tight', brow: .3, blink: blink(t, 2) };
  const sc = twoShot(t, W, M, { mugs: false });
  const nb = notebook(470, 1370, 1.3, 2);
  const mg = scan > 0 ? magnifier(lerp(380, mx, scan), lerp(1450, my, scan), .7, 30) : '';
  const banner = `<g><rect x="90" y="250" width="900" height="220" rx="30" fill="${K.cream}" stroke="${K.red}" stroke-width="10"/><text x="540" y="345" ${TEXT(70, K.red)}>NERVOSITÄT IST</text><text x="540" y="430" ${TEXT(70, K.red)}>KEIN BEWEIS</text></g>`;
  const ck = done > 0 ? check(700, 1340, done) : '';
  const lab = t > 141.9 ? `<g opacity="${fade(t, 141.9)}"><rect x="290" y="520" width="500" height="84" rx="42" fill="${K.green}" stroke="${K.ol}" stroke-width="5"/><text x="540" y="578" ${TEXT(44, '#fff')}>ERST DANN URTEILEN</text></g>` : '';
  return sc + nb + mg + ck + banner + lab;
}
