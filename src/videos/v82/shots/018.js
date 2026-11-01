// 60.68–64.84 prevent misfortunes: a calendar day carries a warning sign; the kid crosses it out on "verhindern" → green ✓; memory glow on "weißt"
import { K, kid, chip, glow, cloudPath, T, fade, pop, prog, eout, f1 } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#f3e3c1"/><rect x="0" y="1330" width="1080" height="590" fill="#dcc293"/>`;
  // big calendar sheet with a month grid
  s += `<rect x="300" y="300" width="700" height="760" rx="24" fill="#fff" stroke="${K.ol}" stroke-width="8"/><rect x="300" y="300" width="700" height="130" rx="24" fill="${K.blue}" stroke="${K.ol}" stroke-width="8"/>` + T(650, 390, 'NÄCHSTES JAHR', 52, { fill: '#fff' });
  for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) s += `<rect x="${340 + c * 105}" y="${470 + r * 112}" width="90" height="96" rx="10" fill="${K.greyL}" opacity=".7"/>`;
  // the dangerous day
  const dx = 340 + 3 * 105 + 45, dy = 470 + 2 * 112 + 48;
  const warn = fade(t, 61.0, .3), cross = eout(prog(t, 62.72, 63.0)), ok = fade(t, 63.1, .25);
  s += `<g opacity="${f1(warn * (1 - ok) * 100) / 100}" transform="translate(${dx} ${dy}) scale(${f1(pop(t, 61.0) * 100) / 100})"><circle r="90" fill="${K.red}" opacity=".18"/><path d="M 0 -56 L 56 44 L -56 44 Z" fill="${K.gold}" stroke="${K.ol}" stroke-width="7" stroke-linejoin="round"/>${T(0, 32, '!', 64)}</g>`;
  if (cross > 0 && ok < 1) s += `<path d="M ${dx - 70} ${dy - 70} L ${f1(dx - 70 + 140 * cross)} ${f1(dy - 70 + 140 * cross)}" stroke="${K.red}" stroke-width="18" stroke-linecap="round"/>`;
  s += `<g opacity="${f1(ok * 100) / 100}" transform="translate(${dx} ${dy}) scale(${f1(pop(t, 63.1) * 100) / 100})"><circle r="64" fill="${K.green}" stroke="${K.ol}" stroke-width="6"/><path d="M -28 0 l 18 22 l 36 -44" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  s += chip(650, 1130, 'VERHINDERT', { a: ok, sc: pop(t, 63.1), bg: K.green, size: 44 });
  // the kid with a red marker, memory glow appears on "weißt"
  const m = fade(t, 63.98, .3);
  if (m > 0) s += glow(170, 560, 160, K.gold, .5 * m) + `<g opacity="${f1(m * 100) / 100}"><path d="${cloudPath(170, 560, 130, 90, 8)}" fill="${K.goldL}" stroke="${K.ol}" stroke-width="6"/><path d="M 170 520 L 206 584 L 134 584 Z" fill="${K.gold}" stroke="${K.ol}" stroke-width="5" stroke-linejoin="round"/>${T(170, 578, '!', 40)}</g>`;
  const draw = eout(prog(t, 62.2, 62.7));
  s += kid(170, 1330, .78, { aL: [12, 6], aR: [20 + 100 * draw, 40 - 30 * draw], mouth: ok > .5 ? 'smile' : 'flat', brows: ok > .5 ? 'up' : 'angry', look: [14, -6], hold: `<rect x="-6" y="-46" width="14" height="60" rx="5" fill="${K.red}" stroke="${K.ol}" stroke-width="4" transform="rotate(30)"/>` });
  return s;
}
