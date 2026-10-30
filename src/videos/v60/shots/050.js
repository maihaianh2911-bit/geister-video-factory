// The flashlight beam blinks up through the pine trunks into the night — the signals go out on "Signale".
import { K, DEFS60, forest, trunk, fig, reach, torch, FG, prog, lerp } from './lib.js';

export default function renderShot(t) {
  const ph = ((t - 80.4) / 1.6) % 1;
  const on = ph < .5 && (ph * 12) % 1 < .55 ? 1 : 0;
  const [a1, a2] = reach(500, 1640, 1.15, 1, 700, 900);
  return DEFS60 + `${forest(t, { hz: 1050, px: 30, noNear: true })}
  <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity=".35"/>
  ${trunk(120, 130, K.bark, K.barkHi, -20, 1400)}${trunk(960, 140, K.bark, K.barkHi, -20, 1400)}
  ${on ? `<g transform="translate(720 880) rotate(-62)"><polygon points="0,0 1200,-300 1200,300" fill="url(#fBeam)" opacity=".85"/></g><rect x="0" y="0" width="1080" height="1920" fill="#FFF1CF" opacity=".05"/>` : ''}
  ${fig('red', 500, 1640, 1.15, { back: true, aR: [a1, a2], holdRFront: (x, y) => torch(x + 10, y - 10, .9, -62, 0) })}
  ${FG(1440)}`;
}
