// 39.6–41.1: police wait out of sight — plain-clothes silhouettes behind a wall, one with a radio
import { K, DEFS, BG, fig, grain, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const a = fig(330, 1400, .9, { col: '#22262A', aR: [150, 20] }), b = fig(560, 1420, .92, { col: '#22262A', aL: [10, 4] });
  const radio = `<rect x="${f1(a.hR[0] - 18)}" y="${f1(a.hR[1] - 70)}" width="36" height="80" rx="6" fill="#111" stroke="${K.ink}" stroke-width="4"/>`;
  const blink = Math.sin(t * 10) > 0 ? 1 : .2;
  return `${DEFS}${BG('#9C8B72')}${cam(`<rect x="-60" y="1400" width="1200" height="600" fill="#6A5A48"/>` + a.svg + b.svg + radio + `<circle cx="${f1(a.hR[0])}" cy="${f1(a.hR[1] - 76)}" r="8" fill="${K.red}" opacity="${blink}"/><rect x="700" y="200" width="460" height="1300" fill="#C9B79A" stroke="${K.ink}" stroke-width="6"/>`, lerp(1.04, 1, eio(prog(t, 39.6, 41.1))), 540, 1000)}${grain(t)}`;
}
