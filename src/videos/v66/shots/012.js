// 44.4–48.34: each method changes what lands on your plate — fresh cucumber, fish and plum turn into pickled, smoked and dried versions on "verändert"
import { K, DEFS, BG, f1, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const m = eio(prog(t, 45.3, 46.0));
  const plate = `<ellipse cx="540" cy="900" rx="420" ry="190" fill="#F2F5FF" stroke="${K.ink}" stroke-width="6"/><ellipse cx="540" cy="900" rx="320" ry="135" fill="none" stroke="#D6DCEA" stroke-width="6"/>`;
  const cuc = `<g transform="translate(330 880) rotate(-20)"><ellipse rx="110" ry="${f1(lerp(42, 36, m))}" fill="${m > .5 ? '#9AAE4A' : '#4E9A62'}" stroke="${K.ink}" stroke-width="4"/>${m > .5 ? [0, 1, 2, 3].map(k => `<circle cx="${-60 + k * 40}" cy="${(k % 2) * 8 - 4}" r="6" fill="#C9D88A"/>`).join('') : [0, 1, 2].map(k => `<circle cx="${-50 + k * 50}" cy="-10" r="5" fill="#2F6B44"/>`).join('')}</g>`;
  const fish = `<g transform="translate(560 940)"><path d="M -110 0 Q -40 -60 80 -20 L 130 -50 L 130 50 L 80 20 Q -40 60 -110 0 Z" fill="${m > .5 ? '#C98A3A' : '#B8C8D8'}" stroke="${K.ink}" stroke-width="4"/>${m > .5 ? '<path d="M -60 -10 q 20 10 40 0 q 20 10 40 0" fill="none" stroke="#8A5A2A" stroke-width="5"/>' : ''}<circle cx="-70" cy="-8" r="7" fill="${K.ink}"/></g>`;
  const plum = `<g transform="translate(760 860) scale(${f1(lerp(1, .7, m))})"><ellipse rx="70" ry="64" fill="${m > .5 ? '#4A2E3A' : '#6A3E8A'}" stroke="${K.ink}" stroke-width="4"/>${m > .5 ? '<path d="M -40 -10 q 20 -16 40 0 q 20 16 40 0 M -40 20 q 20 -16 40 0" fill="none" stroke="#2A1A22" stroke-width="5"/>' : '<ellipse cx="-24" cy="-22" rx="14" ry="8" fill="#fff" opacity=".4"/>'}</g>`;
  const fl = back(prog(t, 45.4, 45.7)) * (1 - prog(t, 46.0, 46.3));
  return `${DEFS}${BG('url(#kWall)')}<rect x="-60" y="700" width="1200" height="1300" fill="${K.wood}"/>
    ${plate}${cuc}${fish}${plum}
    ${fl > 0 ? `<circle cx="540" cy="900" r="${f1(460 * fl)}" fill="#fff" opacity="${f1(.35 * fl)}"/>` : ''}`;
}
