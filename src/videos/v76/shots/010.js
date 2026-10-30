// 15.90–17.34: close on du's head — the helper's hand brings a small cup to the lips and tilts it; du drinks.
import { K, DEFS, BG, head, arm, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const come = eio(prog(t, 15.9, 16.4)), tilt = eio(prog(t, 16.4, 16.85)), away = eio(prog(t, 17.0, 17.34));
  // hand holds the cup by its right side; cup rim meets du's mouth (≈ 450, 1090)
  const hx = lerp(980, 575, come) + 200 * away, hy = lerp(1250, 1080, come) + 60 * away;
  const rot = -55 * tilt * (1 - away);
  const cup = `<g transform="translate(${f1(hx - 70)} ${f1(hy)}) rotate(${f1(rot)})"><path d="M -60 -70 L 50 -70 L 40 50 Q 0 64 -46 50 Z" fill="${K.steel}" stroke="${K.ink}" stroke-width="6"/><ellipse cx="-5" cy="-70" rx="55" ry="14" fill="${K.bottle}" stroke="${K.ink}" stroke-width="5"/></g>`;
  const pillow = `<path d="M -80 1250 Q 100 1170 400 1180 Q 700 1170 900 1260 V 1420 H -80 Z" fill="${K.white}" stroke="${K.ink}" stroke-width="6"/>`;
  const shirt = `<path d="M 300 1420 Q 340 1250 560 1240 Q 900 1230 1160 1290 V 1420 Z" fill="${K.shirt}" stroke="${K.ink}" stroke-width="6"/>`;
  const drinking = tilt > .4 && away < .5;
  const h = head('du', 400, 960, 3.0, { t, eyes: drinking ? 'closed' : 'open', look: .6, lookY: .4, brow: .6, mouth: drinking ? 'o' : 'down', tilt: -6 });
  const fingers = `<path d="M ${f1(hx - 20)} ${f1(hy - 40)} h -40 M ${f1(hx - 20)} ${f1(hy - 10)} h -44 M ${f1(hx - 20)} ${f1(hy + 20)} h -40" stroke="${K.ink}" stroke-width="6" stroke-linecap="round"/>`;
  return `${DEFS}${BG('url(#nWall)')}<ellipse cx="540" cy="760" rx="700" ry="700" fill="url(#nLamp)" opacity=".7"/>${pillow}${shirt}${h}${cup}${arm([1250, 1500], [1000, 1300], [hx, hy], 1.4, K.shirt, { bare: true })}${fingers}`;
}
