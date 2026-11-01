// 4.92–8.04 waking up: eyes open on "wachst", tiny hands rise into view on "starrst", adult-size outline on "winzigen"
import { K, kidHead, glow, chip, windowFrame, fade, prog, eio, eout, lerp, f1 } from './lib.js';
function palm(x, y, s, flip, col = '#f6c9a3', o = {}) {
  const f = [[-38, -70, 50], [-13, -86, 58], [12, -84, 56], [36, -70, 48]];
  const fingers = f.map(([fx, fy, l]) => `<rect x="${fx - 11}" y="${fy - l / 2}" width="22" height="${l}" rx="11"/>`).join('');
  const body = `<g fill="${o.line ? 'none' : col}" stroke="${o.line || K.ol}" stroke-width="${o.line ? 7 : 5}" ${o.dash ? 'stroke-dasharray="16 12"' : ''}>${fingers}<rect x="-52" y="-62" width="104" height="104" rx="44"/><rect x="40" y="-44" width="24" height="60" rx="12" transform="rotate(32 52 6)"/><rect x="-22" y="36" width="44" height="70" rx="12"/></g>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * flip * 100) / 100} ${f1(s * 100) / 100})">${body}</g>`;
}
export default function renderShot(t) {
  const open = eout(prog(t, 5.0, 5.5));
  const up = eio(prog(t, 5.9, 6.6));
  const cmp = fade(t, 6.66, .3);
  let s = `<rect width="1080" height="1920" fill="#f3e1c4"/>` + windowFrame(640, 260, 320, 380, { sun: true });
  s += glow(800, 420, 260, K.goldL, .5);
  // pillow + kid head on pillow, sitting up as eyes open
  s += `<rect x="-20" y="1000" width="1120" height="920" fill="#7fa7d9" stroke="${K.ol}" stroke-width="6"/>`;
  s += `<ellipse cx="420" cy="${f1(lerp(980, 960, open))}" rx="300" ry="110" fill="#fff" stroke="${K.ol}" stroke-width="6"/>`;
  const hy = lerp(900, 760, eio(prog(t, 5.6, 6.2)));
  s += `<g transform="translate(420 ${f1(hy)}) rotate(${f1(lerp(-12, 0, eio(prog(t, 5.6, 6.2))))}) scale(1.6)">${kidHead({ blink: 1 - open, mouth: t > 6.4 ? 'o' : 'flat', brows: t > 6.4 ? 'up' : 'calm', look: [0, lerp(0, 14, up)] })}</g>`;
  // blanket
  s += `<path d="M -20 1060 Q 300 1000 540 1050 Q 800 1100 1100 1040 L 1100 1920 L -20 1920 Z" fill="#9bc2ec" stroke="${K.ol}" stroke-width="6"/>`;
  for (let i = 0; i < 5; i++) s += `<circle cx="${120 + i * 210}" cy="${1220 + (i % 2) * 90}" r="26" fill="#fff" opacity=".6"/>`;
  // the two tiny hands rise into the foreground
  const hyH = lerp(1700, 1210, up);
  if (up > 0) {
    if (cmp > 0) s += `<g opacity="${f1(cmp * 55) / 100}">${palm(320, hyH - 70, 2.3, 1, '#fff')}${palm(760, hyH - 70, 2.3, -1, '#fff')}</g>`;
    s += palm(320, hyH, 1.5, 1) + palm(760, hyH, 1.5, -1);
    if (cmp > 0) s += chip(540, 1500 - 300 * cmp, 'WINZIG!', { a: cmp, bg: K.red, size: 44 });
  }
  return s;
}
