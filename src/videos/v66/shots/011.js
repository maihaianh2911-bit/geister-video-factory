// 40.64–44.4: dried, salted, smoked and preserved — four panels light up one by one on their words
import { K, DEFS, BG, chip, f1, prog, eio, eout, back, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const P = [[40.9, 'GETROCKNET', 300, 520], [41.82, 'GESALZEN', 780, 520], [42.58, 'GERÄUCHERT', 300, 1060], [43.14, 'EINGEKOCHT', 780, 1060]];
  let s = '';
  P.forEach(([t0, lab, cx, cy], i) => {
    const a = eout(prog(t, t0 - .15, t0 + .2)), on = a > .5;
    let art = '';
    if (i === 0) art = `<path d="M -180 -120 H 180" stroke="${K.ink}" stroke-width="5"/>${[0, 1, 2, 3, 4].map(k => `<g transform="translate(${-140 + k * 70} ${-60 + 6 * Math.sin(t * 2 + k)})"><circle r="34" fill="#E8C27A" stroke="${K.ink}" stroke-width="4"/><circle r="12" fill="#C9A24A"/><path d="M 0 -34 v -26" stroke="${K.ink}" stroke-width="3"/></g>`).join('')}`;
    if (i === 1) art = `<path d="M -130 -40 L 130 -40 L 110 140 L -110 140 Z" fill="#C9B8A0" stroke="${K.ink}" stroke-width="5"/>${[0, 1, 2].map(k => `<path d="M ${-90 + k * 70} -20 q 40 -30 70 0 q -30 30 -70 0 Z" fill="#9FB3C8" stroke="${K.ink}" stroke-width="3"/>`).join('')}${[...Array(18)].map((_, k) => `<circle cx="${f1(-110 + hash(k) * 220)}" cy="${f1(-80 + hash(k + 5) * 30 + ((t * 80 + k * 20) % 60))}" r="4" fill="#fff"/>`).join('')}`;
    if (i === 2) art = `<path d="M -120 -140 H 120" stroke="${K.ink}" stroke-width="5"/>${[-60, 0, 60].map(x => `<path d="M ${x} -140 Q ${x + 10} -20 ${x + 20} 40" stroke="#8A3B2B" stroke-width="34" stroke-linecap="round"/>`).join('')}${[0, 1, 2].map(k => `<path d="M ${-80 + k * 80} 160 q -20 -40 0 -80 q 20 -40 0 -80" fill="none" stroke="#C8C8D0" stroke-width="10" stroke-linecap="round" opacity="${f1(.4 + .3 * Math.sin(t * 3 + k))}" transform="translate(0 ${f1(-((t * 30 + k * 20) % 40))})"/>`).join('')}`;
    if (i === 3) art = [-90, 0, 90].map(x => `<rect x="${x - 40}" y="-60" width="80" height="140" rx="14" fill="${K.jar}" fill-opacity=".9" stroke="${K.ink}" stroke-width="4"/><rect x="${x - 44}" y="-80" width="88" height="24" rx="6" fill="#C9A24A" stroke="${K.ink}" stroke-width="3"/>${[0, 1, 2].map(k => `<circle cx="${x - 18 + k * 18}" cy="${20 + (k % 2) * 30}" r="14" fill="${['#C0392B', '#E3B341', '#7BA05B'][(k + (x > 0 ? 1 : 0)) % 3]}"/>`).join('')}`).join('');
    s += `<g opacity="${f1(.25 + .75 * a)}"><rect x="${cx - 230}" y="${cy - 250}" width="460" height="480" rx="26" fill="${on ? '#3A2C20' : '#2A2018'}" stroke="${on ? K.warm : '#5A4632'}" stroke-width="5"/>
      <g transform="translate(${cx} ${cy - 30}) scale(${f1(lerp(.85, 1, a))})">${art}</g></g>${chip(cx, cy + 170, lab, a, K.warm, 38)}`;
  });
  return `${DEFS}${BG('url(#kOld)')}${s}`;
}
