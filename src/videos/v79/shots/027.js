// 121.52–128.28 swap roles: they change places; then her question shows her driving another man every day — he is not okay with it
import { K, TEXT, CH, chip, kitchen, chair, table, woman, man, speech, car, miniHead, prog, eio, eout, talk, blink, fade, pop, lerp } from './lib.js';
export default function renderShot(t) {
  const sw = eio(prog(t, 121.95, 122.65)), s = 1.25, T = 1300;
  const wx = lerp(285, 790, sw), mx = lerp(790, 285, sw), lift = Math.sin(sw * Math.PI) * 60;
  const unhappy = eio(prog(t, 126.4, 126.9));
  const W = woman(wx, T + 20 - lift, s * (1 + .06 * Math.sin(sw * Math.PI)), { t, look: sw > .5 ? -1 : 1, talk: talk(t, 123.3, 127.6, 8), brow: .4, hL: sw > .9 ? [-70, -200] : [-80, -24], handL: sw > .9 ? 'palm' : 'rest', blink: blink(t, 1) });
  const M = man(mx, T + 20 + lift * .3, s, { t, look: sw > .5 ? 1 : -1, brow: lerp(.2, 1, unhappy), mouth: unhappy > .5 ? 'frown' : 'tight', lid: 0, wide: .3 * unhappy, blink: blink(t, 2) });
  const ws = s * (1 + .06 * Math.sin(sw * Math.PI));
  let sc = kitchen() + chair(mx, T + 20 + lift * .3, s, true) + chair(wx, T + 20 - lift, ws, false) + M.body + W.body + table(T) + M.arms + W.arms;
  const arrows = sw > 0 && sw < 1 ? `<path d="M 330 560 Q 540 430 750 560" stroke="${K.cream}" stroke-width="12" fill="none" opacity=".8"/><path d="M 750 650 Q 540 760 330 650" stroke="${K.cream}" stroke-width="12" fill="none" opacity=".8"/>` : '';
  const lab = t > 122.0 && t < 123.6 ? `<g opacity="${fade(t, 122.0) * (1 - fade(t, 123.3))}"><rect x="260" y="300" width="560" height="90" rx="45" fill="${K.ink}" opacity=".88"/><text x="540" y="362" ${TEXT(46, K.cream)}>ROLLEN TAUSCHEN</text></g>` : '';
  const days = ['MO', 'DI', 'MI', 'DO', 'FR'];
  let cal = '';
  days.forEach((d, i) => { const a = pop(t, 123.72 + i * .12, .25); cal += `<g transform="translate(${230 + i * 120} 340)"><rect x="-48" y="-36" width="96" height="72" rx="12" fill="#fff" stroke="${K.ol}" stroke-width="5"/><text y="14" ${TEXT(34)}>${d}</text>${a > 0 ? `<rect x="-48" y="-36" width="96" height="72" rx="12" fill="${K.green}" stroke="${K.ol}" stroke-width="5" opacity="${a > 1 ? 1 : a}"/><text y="14" ${TEXT(34, '#fff')}>${d}</text>` : ''}</g>`; });
  const pas = t >= 125.1;
  const cx = lerp(330, 720, eio(prog(t, 124.3, 127.4)));
  const inner = `${cal}<path d="M 130 560 L 950 560" stroke="#59606e" stroke-width="30"/><g clip-path="url(#v27c)">${car(cx, 585, .62, { color: K.blue, inner: `${miniHead(60, -112, .9, K.wHair, K.wSkin)}${pas ? miniHead(-10, -112, .9, '#c9a24a', K.mSkin) : ''}` })}</g><text x="${cx < 600 ? 790 : 300}" y="480" ${TEXT(t > 127.3 ? 46 : 40, t > 127.3 ? K.red : K.ink)}>${t > 127.3 ? 'IN ORDNUNG?' : pas ? 'JEDEN TAG' : ''}</text>`;
  const bub = t > 123.2 ? `<g transform="translate(540 450) scale(${pop(t, 123.25)}) translate(-540 -450)"><clipPath id="v27c"><rect x="110" y="270" width="860" height="320" rx="40"/></clipPath>${speech(110, 270, 860, 330, 830, 620, inner)}</g>` : '';
  const ok = pop(t, 127.3);
  const okq = ok > 0 ? `<g transform="translate(250 700) scale(${ok})"><rect x="-150" y="-46" width="300" height="80" rx="40" fill="${K.red}" stroke="${K.ol}" stroke-width="5"/><text y="12" ${TEXT(40, '#fff')}>IN ORDNUNG?</text></g>` : '';
  return sc + arrows + lab + bub + chip(CH[6]);
}
