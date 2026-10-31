// 40.26–43.28: "solange noch jemand im Wagen eingeschlossen ist" — a rule pictogram (not the story's family): a generic person icon trapped in a car icon is priority 1; the phone/bag/112 icons from the previous shot drop to priority 2
import { K, DEFS, BG, TX, f1, prog, eio, eout, lerp } from './lib.js';
const ICON = '#C9D3D8';
function carIcon(x, y, p) {
  // flat outline car half in water, rule-card style
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${(.85 + .15 * p).toFixed(3)})" opacity="${f1(p)}">
    <path d="M -300 40 L -300 -30 Q -296 -60 -250 -70 L -170 -80 L -110 -160 Q -96 -176 -70 -176 L 140 -176 Q 168 -176 184 -150 L 236 -80 L 280 -70 Q 300 -60 300 -30 L 300 40 Z" fill="#26323A" stroke="${ICON}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M -86 -150 L 30 -150 L 30 -86 L -136 -86 Z" fill="#0F171C" stroke="${ICON}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M 52 -150 L 140 -150 Q 156 -150 166 -134 L 196 -86 L 52 -86 Z" fill="#0F171C" stroke="${ICON}" stroke-width="6" stroke-linejoin="round"/>
    <rect x="-330" y="10" width="660" height="70" fill="${K.waterL}" opacity=".85"/>
    <path d="M -330 10 q 40 -14 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0" fill="none" stroke="${K.foam}" stroke-width="6"/></g>`;
}
function person(x, y, s, a) {
  return a <= .01 ? '' : `<g opacity="${f1(a)}"><circle cx="${f1(x)}" cy="${f1(y - 26 * s)}" r="${f1(18 * s)}" fill="${K.white}"/><path d="M ${f1(x - 30 * s)} ${f1(y + 22 * s)} Q ${f1(x - 30 * s)} ${f1(y - 4 * s)} ${f1(x)} ${f1(y - 4 * s)} Q ${f1(x + 30 * s)} ${f1(y - 4 * s)} ${f1(x + 30 * s)} ${f1(y + 22 * s)} Z" fill="${K.white}"/></g>`;
}
const badge = (x, y, n, col, a) => a <= .01 ? '' : `<g opacity="${f1(a)}"><circle cx="${x}" cy="${y}" r="56" fill="${col}" stroke="${K.ink}" stroke-width="6"/>${TX(n, x, y + 24, 70, K.ink)}</g>`;
function items(x, y, a, dim) {
  const ph = `<g transform="translate(${x - 230} ${y})"><rect x="-44" y="-80" width="88" height="160" rx="14" fill="#15191C" stroke="${ICON}" stroke-width="7"/><rect x="-32" y="-64" width="64" height="118" rx="6" fill="#33424C"/></g>`;
  const bag = `<g transform="translate(${x} ${y + 10})"><path d="M -60 -30 Q -56 -96 0 -96 Q 56 -96 60 -30" fill="none" stroke="${ICON}" stroke-width="12"/><rect x="-90" y="-36" width="180" height="110" rx="20" fill="#8A5A34" stroke="${ICON}" stroke-width="7"/></g>`;
  const call = `<g transform="translate(${x + 230} ${y})"><rect x="-80" y="-60" width="160" height="120" rx="20" fill="#1F3B2E" stroke="${ICON}" stroke-width="7"/>${TX('112', 0, 22, 62, K.white)}</g>`;
  return `<g opacity="${f1(a * (1 - .55 * dim))}">${ph}${bag}${call}<path d="M ${x - 330} ${y + 4} L ${x + 330} ${y + 4}" stroke="${K.red}" stroke-width="14" stroke-linecap="round"/></g>`;
}
export default function renderShot(t) {
  const car = eout(prog(t, 40.3, 40.75)), who = eout(prog(t, 40.86, 41.12));
  const ring = eout(prog(t, 41.8, 42.15)), dim = eio(prog(t, 42.1, 42.6));
  // the struck-out items start where shot 16 left them (upper half) and settle below as priority 2
  const drop = eio(prog(t, 40.26, 40.9));
  const iy = lerp(760, 1180, drop), is = lerp(1.25, 1, drop);
  const cx = 540, cy = 640;
  const pulse = ring > 0 ? 1 + .04 * Math.sin((t - 41.8) * 9) * (1 - prog(t, 42.4, 43.0)) : 1;
  const frame = `<rect x="80" y="330" width="920" height="1020" rx="36" fill="#0E1418" stroke="${K.mono}" stroke-width="4" stroke-dasharray="22 16" opacity=".55"/>`;
  return `${DEFS}${BG('#10161A')}${frame}
    ${carIcon(cx, cy, car)}
    ${person(cx - 40, cy - 100, 1.5, who)}
    ${ring > 0 ? `<circle cx="${cx - 40}" cy="${cy - 118}" r="${f1(92 * pulse * ring)}" fill="none" stroke="${K.amber}" stroke-width="10" opacity="${f1(ring)}"/>` : ''}
    ${badge(190, 470, '1', K.amber, ring)}
    <g transform="translate(540 ${f1(iy)}) scale(${is.toFixed(3)}) translate(-540 ${f1(-iy)})">${items(540, iy, 1, dim)}</g>
    ${badge(190, 1060, '2', '#7C8A92', dim)}`;
}
