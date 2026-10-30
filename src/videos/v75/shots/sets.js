// v75 shared sets for this video only: room, desk, street, bakery counter, globe
import { K, f1, OL, TX, glow, stars, cl, lerp, hash } from './lib.js';
// bedroom/office interior wall + floor, window with night or day
export const room = (day = 0) => `<rect x="-60" y="-60" width="1200" height="1400" fill="${K.wall}"/><rect x="-60" y="1340" width="1200" height="700" fill="${K.floor}"/>
  <rect x="660" y="260" width="320" height="420" rx="10" fill="${day ? '#3C5FA8' : '#0E1636'}" ${OL(5)}/><path d="M 820 260 V 680 M 660 470 H 980" stroke="${K.ink}" stroke-width="8"/>`;
export const desk = (y = 1250) => `<rect x="-60" y="${y}" width="1200" height="40" fill="${K.woodL}" ${OL(4)}/><rect x="-60" y="${y + 40}" width="1200" height="800" fill="${K.wood}"/>`;
// globe with network arcs; lit 0..1 (each arc dims in order as lit falls)
export function globe(x, y, r, lit = 1, t = 0) {
  const pts = [[-.6, -.3], [-.2, -.6], [.35, -.45], [.6, .05], [.2, .45], [-.35, .4], [-.7, .15], [.0, .0]];
  let arcs = '';
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j += 2) {
    const k = (i * 3 + j) % 11 / 11, on = cl((lit - k) * 6);
    const [ax, ay] = pts[i], [bx, by] = pts[j];
    arcs += `<path d="M ${f1(x + ax * r)} ${f1(y + ay * r)} Q ${f1(x + (ax + bx) / 2 * r * 1.3)} ${f1(y + (ay + by) / 2 * r * 1.3 - r * .3)} ${f1(x + bx * r)} ${f1(y + by * r)}" fill="none" stroke="${on > .5 ? K.data : K.grey}" stroke-width="${on > .5 ? 6 : 3}" opacity="${f1(.35 + .65 * on)}"/>`;
  }
  const dots = pts.map(([a, b]) => `<circle cx="${f1(x + a * r)}" cy="${f1(y + b * r)}" r="12" fill="${lit > .3 ? K.data : K.grey}"/>`).join('');
  return `${glow(x, y, r * 1.5, lit * .8)}<circle cx="${x}" cy="${y}" r="${r}" fill="${K.ind2}" stroke="${K.dataD}" stroke-width="6"/>
    <path d="M ${f1(x - r * .7)} ${f1(y - r * .2)} q ${f1(r * .3)} ${f1(-r * .4)} ${f1(r * .6)} ${f1(-r * .1)} q ${f1(r * .1)} ${f1(r * .3)} ${f1(-r * .2)} ${f1(r * .5)} Z M ${f1(x + r * .1)} ${f1(y + r * .1)} q ${f1(r * .4)} ${f1(-r * .2)} ${f1(r * .55)} ${f1(r * .15)} q ${f1(-r * .2)} ${f1(r * .4)} ${f1(-r * .5)} ${f1(r * .3)} Z" fill="${K.ind3}"/>${arcs}${dots}`;
}
// card terminal on a counter: (x, y) centre; state 'idle' | 'wait' | 'fail' | 'offline'
export function terminal(x, y, s, state = 'idle', t = 0) {
  const scr = state === 'fail' ? `<rect x="-70" y="-120" width="140" height="90" rx="8" fill="#3A1A2A"/><path d="M -24 -100 L 24 -50 M 24 -100 L -24 -50" stroke="${K.red}" stroke-width="12" stroke-linecap="round"/>`
    : state === 'wait' || state === 'offline' ? `<rect x="-70" y="-120" width="140" height="90" rx="8" fill="${K.screen}"/><g transform="translate(0 -75) rotate(${f1(t * 300 % 360)})"><circle r="22" fill="none" stroke="${K.ind3}" stroke-width="7"/><path d="M 22 0 A 22 22 0 0 1 0 22" fill="none" stroke="${K.greyL}" stroke-width="7" stroke-linecap="round"/></g>`
    : `<rect x="-70" y="-120" width="140" height="90" rx="8" fill="${K.screen}"/>`;
  const keys = [0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${-56 + c * 40}" y="${-10 + r * 34}" width="32" height="24" rx="6" fill="${K.grey}"/>`).join('')).join('');
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><rect x="-90" y="-150" width="180" height="270" rx="26" fill="#2A2F45" ${OL(4)}/>${scr}${keys}</g>`;
}
// bakery counter with glass display, breads and a pretzel sign
export const bakery = () => `<rect x="-60" y="-60" width="1200" height="1400" fill="#3A2E5A"/><rect x="-60" y="1100" width="1200" height="900" fill="${K.wood}" ${OL(4)}/><rect x="-60" y="1100" width="1200" height="30" fill="${K.woodL}"/>
  ${[0, 1, 2].map(i => `<rect x="${90 + i * 320}" y="400" width="260" height="30" fill="${K.woodL}" ${OL(3)}/>${[0, 1, 2].map(j => `<ellipse cx="${140 + i * 320 + j * 80}" cy="380" rx="36" ry="24" fill="${K.bread}" ${OL(3)}/>`).join('')}`).join('')}
  ${glow(540, 300, 500, .5, 'iWarm')}`;
