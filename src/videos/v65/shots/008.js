// 19.38–23.48: those already ill would not be cured by it — a patient lies feverish in bed; the thermometer stays high on "geheilt"
import { K, DEFS, BG, vig, head, limb, handC, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const sh = Math.sin(t * 22) * 2.2;
  const lvl = .78 + .04 * Math.sin(t * 1.3) - .04 * eio(prog(t, 21.0, 21.8)) + .04 * eio(prog(t, 22.0, 22.6));
  const cloth = eio(prog(t, 19.6, 20.5));
  const hx = lerp(1000, 520, cloth), hy = lerp(560, 690, cloth);
  const th = `<g transform="translate(860 520)"><rect x="-34" y="0" width="68" height="560" rx="34" fill="#F2F5FF" stroke="${K.ink}" stroke-width="5"/>
    <rect x="-14" y="${f1(30 + 470 * (1 - lvl))}" width="28" height="${f1(470 * lvl)}" fill="${K.red}"/><circle cx="0" cy="560" r="56" fill="${K.red}" stroke="${K.ink}" stroke-width="5"/>
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M -34 ${60 + i * 64} h 22" stroke="${K.ink}" stroke-width="4"/>`).join('')}
    <path d="M -50 ${f1(30 + 470 * (1 - lvl))} h -30" stroke="${K.sun}" stroke-width="6"/></g>`;
  const sc = `${BG(K.wall)}<rect x="-60" y="1100" width="1200" height="900" fill="#1C2648"/>
    <rect x="60" y="200" width="300" height="380" fill="#3A5A9A" stroke="${K.ink}" stroke-width="8"/><path d="M 210 200 v 380 M 60 390 h 300" stroke="${K.ink}" stroke-width="6"/>
    <rect x="20" y="880" width="760" height="90" rx="24" fill="${K.woodD}" stroke="${K.ink}" stroke-width="5"/>
    <ellipse cx="300" cy="830" rx="220" ry="72" fill="#E9EEF9" stroke="${K.ink}" stroke-width="4"/>
    ${head(330 + sh, 770, 1.15, { pale: true, sweat: true, mouth: 'down', rot: -10 })}
    <path d="M 60 ${f1(900 + sh)} Q 400 840 760 880 L 780 1200 L 40 1200 Z" fill="#6E7FB8" stroke="${K.ink}" stroke-width="5"/>
    ${cloth > 0 ? `${limb([[1140, 420], [hx + 140, hy - 40], [hx + 30, hy]], 44, '#4E6E8E')}<rect x="${f1(hx - 70)}" y="${f1(hy - 22)}" width="120" height="44" rx="10" fill="#F2F5FF" stroke="${K.ink}" stroke-width="4"/>${handC(hx + 40, hy, 22)}` : ''}
    ${th}`;
  return `${DEFS}${cam(sc, lerp(1, 1.06, eio(prog(t, 19.38, 23.48))), 500, 800)}${vig()}`;
}
