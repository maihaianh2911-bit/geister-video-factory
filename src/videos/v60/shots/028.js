// Red holds the phone to her ear and reads the sign aloud; the characters of FR-1234 light up one by one as she speaks.
import { K, DEFS60, forest, trunk, sign, fig, reach, phone, FG, prog, lerp, talkAt, blinkAt } from './lib.js';

export default function renderShot(t) {
  const hi = t < 41.86 ? -1 : Math.min(6, Math.floor((t - 41.86) / .14));
  const [a1, a2] = reach(720, 1640, 1.25, 1, 830, 900, false, -1);
  return DEFS60 + `${forest(t, { hz: 1000, px: 80, noNear: true })}
  <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity=".45"/>
  ${trunk(250, 220, K.bark, K.barkHi, -20, 1500)}
  <ellipse cx="260" cy="720" rx="340" ry="320" fill="url(#fAmb)" opacity=".75"/>
  ${sign(260, 720, .9, { hi })}
  ${fig('red', 720, 1640, 1.25, { look: -14, lookY: 4, brow: 'focus', talk: talkAt(t, 41.62, 42.85), blink: blinkAt(t), aR: [a1, a2], holdR: (x, y) => phone(x - 4, y - 20, .42, -10, { on: 1, glow: false }) })}
  ${FG(1420)}`;
}
