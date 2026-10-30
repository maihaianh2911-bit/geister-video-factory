// 47.2–49.74: mosquitoes don't only sit on your skin — the mosquito on your arm lifts off and flies toward the flowers on "nur"
import { K, DEFS, BG, vig, mosquito, flower, f1, cam, prog, eio, eout, ein, lerp } from './lib.js';
export default function renderShot(t) {
  const up = prog(t, 47.75, 49.5);
  const mx = lerp(470, 1160, ein(up)), my = lerp(680, 360, eio(up));
  const arm = `<path d="M -80 700 Q 300 640 640 700 Q 860 740 960 800 Q 1010 840 980 900 Q 940 950 860 930 Q 640 880 300 920 Q 60 950 -80 960 Z" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/>`;
  const sc = `${BG('url(#mDusk)')}
    ${flower(820, 1300, 520, .9, { t })}${flower(940, 1300, 600, .8, { t: t + 1 })}${flower(700, 1300, 640, .7, { t: t + 2 })}
    <rect x="-60" y="1000" width="1200" height="1000" fill="#203A3A"/>${arm}
    ${mosquito(mx, my, 1.15, { t, wings: up > 0 ? 1 : 0, ang: up > 0 ? -16 : 4, sip: up > 0 ? 0 : .9 })}`;
  return `${DEFS}${cam(sc, lerp(1.1, 1, eio(prog(t, 47.2, 49.74))), 540, 760)}${vig()}`;
}
