// 58.18–63.0: a small bog orchid (Platanthera obtusata) in North America — map pin on "Nordamerika"; a mosquito visits and leaves with yellow pollen packets on "bestäubt"
import { K, DEFS, BG, vig, stars, chip, TI, orchid, mosquito, f1, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const m = prog(t, 59.38, 59.7);
  const v = t < 61.3 ? eio(prog(t, 60.0, 60.8)) : 1;
  const away = eio(prog(t, 61.4, 62.6));
  const mx = t < 61.3 ? lerp(1100, 470, v) : lerp(470, 900, away), my = t < 61.3 ? lerp(600, 760, v) : lerp(760, 560, away);
  // simplified outline of North America for the inset (stylised, for orientation only)
  const na = 'M 40 60 L 120 30 L 200 40 L 250 20 L 300 50 L 280 90 L 240 110 L 250 150 L 210 190 L 170 200 L 150 250 L 120 230 L 110 190 L 70 160 L 50 120 Z';
  const inset = `<g transform="translate(640 230)" opacity="${f1(eout(prog(t, 58.3, 58.7)))}"><rect x="0" y="0" width="340" height="290" rx="22" fill="${K.n0}" stroke="${K.cyan}" stroke-width="4"/>
    <path d="${na}" transform="translate(10 10)" fill="#2E5A4A" stroke="${K.line}" stroke-width="3"/>
    ${m > 0 ? `<g transform="translate(170 110) scale(${f1(back(m))})"><path d="M 0 0 c -22 -26 -22 -56 0 -56 c 22 0 22 30 0 56 Z" fill="${K.red}" stroke="${K.ink}" stroke-width="3"/><circle cx="0" cy="-36" r="8" fill="#fff"/></g>` : ''}</g>`;
  const sc = `${BG('url(#mNight)')}${stars(30, 13, 700)}<path d="M -60 1240 Q 400 1180 1140 1240 L 1140 1980 L -60 1980 Z" fill="#24402E"/>
    ${[...Array(18)].map((_, i) => `<ellipse cx="${i * 64}" cy="${1250 + (i % 3) * 14}" rx="44" ry="18" fill="#3E6A42"/>`).join('')}
    ${orchid(420, 1260, 1.3, { t })}${inset}
    ${mosquito(mx, my, .95, { t, wings: v < 1 || away > 0 ? 1 : 0, pollen: t > 61.6, sip: v >= 1 && away === 0 ? .7 : 0 })}`;
  return `${DEFS}${sc}${chip(810, 580, 'NORDAMERIKA', m, K.cyan, 40)}${TI('Platanthera obtusata', 420, 1340, 44, K.star, 'middle', `opacity="${f1(eout(prog(t, 58.6, 59.0)))}"`)}${vig()}`;
}
